create extension if not exists pgcrypto;

create table if not exists public.loot_staff_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  display_name text not null check (length(trim(display_name)) > 0),
  role text not null default 'staff'
    check (role in ('buy_intake', 'staff', 'lead', 'card_supervisor', 'manager', 'owner', 'admin')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create table if not exists public.loot_customers (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) > 0),
  phone text,
  government_id_number text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  customer_lookup text generated always as (
    lower(trim(name)) || '|' || lower(trim(coalesce(phone, '')))
  ) stored
);

create unique index if not exists loot_customers_lookup_idx
  on public.loot_customers (customer_lookup);

create table if not exists public.loot_buy_transactions (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.loot_customers(id) on delete restrict,
  transaction_date date not null default current_date,
  submitted_at timestamptz not null default now(),
  buy_type text not null check (length(trim(buy_type)) > 0),
  appraised_value numeric(12, 2) not null default 0 check (appraised_value >= 0),
  cash_offer numeric(12, 2) not null default 0 check (cash_offer >= 0),
  bulk_appraised_value numeric(12, 2) not null default 0 check (bulk_appraised_value >= 0),
  bulk_cash_offer numeric(12, 2) not null default 0 check (bulk_cash_offer >= 0),
  check_number text,
  notes text,
  is_in_progress boolean not null default false,
  cash_ready boolean not null default false,
  contact_status text not null default 'not_contacted'
    check (contact_status in ('not_contacted', 'contacted_awaiting_pickup', 'no_answer', 'picked_up')),
  customer_decision text
    check (customer_decision in ('accepted', 'declined')),
  intake_completed_at timestamptz,
  pricing_completed_at timestamptz,
  decision_recorded_at timestamptz,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  total_appraised_value numeric(12, 2) generated always as (
    appraised_value + bulk_appraised_value
  ) stored,
  total_cash_offer numeric(12, 2) generated always as (
    cash_offer + bulk_cash_offer
  ) stored,
  store_margin numeric(12, 2) generated always as (
    (appraised_value + bulk_appraised_value) - (cash_offer + bulk_cash_offer)
  ) stored,
  payout_percentage numeric(6, 2) generated always as (
    case
      when (appraised_value + bulk_appraised_value) > 0
      then round(((cash_offer + bulk_cash_offer) / (appraised_value + bulk_appraised_value)) * 100, 2)
      else 0
    end
  ) stored
);

create index if not exists loot_buy_transactions_date_idx
  on public.loot_buy_transactions (transaction_date desc, submitted_at desc);

create index if not exists loot_buy_transactions_customer_idx
  on public.loot_buy_transactions (customer_id);

create index if not exists loot_buy_transactions_contact_idx
  on public.loot_buy_transactions (contact_status, cash_ready, customer_decision);

create table if not exists public.loot_buy_transaction_staff (
  transaction_id uuid not null references public.loot_buy_transactions(id) on delete cascade,
  staff_id uuid not null references public.loot_staff_profiles(id) on delete restrict,
  role text not null
    check (role in ('accepted_by', 'priced_by', 'purchaser', 'decision_by')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  primary key (transaction_id, staff_id, role)
);

create index if not exists loot_buy_transaction_staff_staff_idx
  on public.loot_buy_transaction_staff (staff_id);

create table if not exists public.loot_photos (
  id uuid primary key default gen_random_uuid(),
  bucket text not null default 'loot-tracker',
  object_path text not null,
  public_url text,
  caption text,
  uploaded_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  unique (bucket, object_path)
);

create table if not exists public.loot_buy_transaction_photos (
  transaction_id uuid not null references public.loot_buy_transactions(id) on delete cascade,
  photo_id uuid not null references public.loot_photos(id) on delete cascade,
  sort_order integer not null default 0,
  primary key (transaction_id, photo_id)
);

create table if not exists public.loot_card_show_transactions (
  id uuid primary key default gen_random_uuid(),
  transaction_date date not null default current_date,
  show_name text,
  transaction_type text not null
    check (transaction_type in ('buy', 'sell', 'trade', 'partial_trade')),
  payment_method text
    check (payment_method in ('Square', 'Venmo', 'PayPal', 'Zelle', 'Cash App', 'Cash')),
  appraised_value numeric(12, 2) not null default 0 check (appraised_value >= 0),
  cash_offered numeric(12, 2) not null default 0 check (cash_offered >= 0),
  change_given numeric(12, 2) not null default 0 check (change_given >= 0),
  trade_cash_direction text
    check (trade_cash_direction in ('geekd_paid', 'customer_paid')),
  trade_cash_amount numeric(12, 2) not null default 0 check (trade_cash_amount >= 0),
  trade_cash_payment_method text
    check (trade_cash_payment_method in ('Square', 'Venmo', 'PayPal', 'Zelle', 'Cash App', 'Cash')),
  staff_id uuid references public.loot_staff_profiles(id) on delete set null,
  staff_label text,
  notes text,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists loot_card_show_transactions_date_idx
  on public.loot_card_show_transactions (transaction_date desc, created_at desc);

create table if not exists public.loot_card_show_transaction_photos (
  transaction_id uuid not null references public.loot_card_show_transactions(id) on delete cascade,
  photo_id uuid not null references public.loot_photos(id) on delete cascade,
  sort_order integer not null default 0,
  primary key (transaction_id, photo_id)
);

create table if not exists public.loot_safe_cash_entries (
  id uuid primary key default gen_random_uuid(),
  staff_id uuid references public.loot_staff_profiles(id) on delete set null,
  staff_label text,
  entry_at timestamptz not null default now(),
  direction text not null check (direction in ('in', 'out')),
  amount numeric(12, 2) not null check (amount > 0),
  reason text not null check (length(trim(reason)) > 0),
  notes text,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now()
);

create index if not exists loot_safe_cash_entries_entry_at_idx
  on public.loot_safe_cash_entries (entry_at desc);

create table if not exists public.loot_inventory_adjustments (
  id uuid primary key default gen_random_uuid(),
  label text not null check (length(trim(label)) > 0),
  entry_type text not null check (entry_type in ('purchase', 'sale')),
  amount numeric(12, 2) not null check (amount > 0),
  entry_date date not null default current_date,
  source text not null default 'manual' check (source in ('manual', 'square_report')),
  notes text,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now()
);

create index if not exists loot_inventory_adjustments_date_idx
  on public.loot_inventory_adjustments (entry_date desc, created_at desc);

create table if not exists public.loot_activity_events (
  id uuid primary key default gen_random_uuid(),
  action text not null check (length(trim(action)) > 0),
  description text not null check (length(trim(description)) > 0),
  actor_user_id uuid references auth.users(id) on delete set null default auth.uid(),
  actor_label text,
  customer_id uuid references public.loot_customers(id) on delete set null,
  buy_transaction_id uuid references public.loot_buy_transactions(id) on delete set null,
  card_show_transaction_id uuid references public.loot_card_show_transactions(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists loot_activity_events_created_idx
  on public.loot_activity_events (created_at desc);

create index if not exists loot_activity_events_buy_transaction_idx
  on public.loot_activity_events (buy_transaction_id);

create or replace view public.loot_buy_transaction_summary
with (security_invoker = true) as
select
  tx.id,
  tx.transaction_date,
  tx.submitted_at,
  tx.buy_type,
  tx.appraised_value,
  tx.cash_offer,
  tx.bulk_appraised_value,
  tx.bulk_cash_offer,
  tx.total_appraised_value,
  tx.total_cash_offer,
  tx.payout_percentage,
  tx.store_margin,
  tx.check_number,
  tx.notes,
  tx.is_in_progress,
  tx.cash_ready,
  tx.contact_status,
  tx.customer_decision,
  tx.intake_completed_at,
  tx.pricing_completed_at,
  tx.decision_recorded_at,
  c.id as customer_id,
  c.name as customer_name,
  c.phone as customer_phone,
  c.government_id_number as customer_id_number,
  coalesce(
    array_agg(distinct accepted.staff_id) filter (where accepted.staff_id is not null),
    array[]::uuid[]
  ) as accepted_by_staff_ids,
  coalesce(
    array_agg(distinct priced.staff_id) filter (where priced.staff_id is not null),
    array[]::uuid[]
  ) as priced_by_staff_ids,
  coalesce(
    array_agg(distinct purchaser.staff_id) filter (where purchaser.staff_id is not null),
    array[]::uuid[]
  ) as purchaser_staff_ids,
  coalesce(
    array_agg(distinct photos.public_url) filter (where photos.public_url is not null),
    array[]::text[]
  ) as photo_urls
from public.loot_buy_transactions tx
join public.loot_customers c on c.id = tx.customer_id
left join public.loot_buy_transaction_staff accepted
  on accepted.transaction_id = tx.id and accepted.role = 'accepted_by'
left join public.loot_buy_transaction_staff priced
  on priced.transaction_id = tx.id and priced.role = 'priced_by'
left join public.loot_buy_transaction_staff purchaser
  on purchaser.transaction_id = tx.id and purchaser.role = 'purchaser'
left join public.loot_buy_transaction_photos tx_photos
  on tx_photos.transaction_id = tx.id
left join public.loot_photos photos on photos.id = tx_photos.photo_id
group by tx.id, c.id;

create or replace function public.loot_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists loot_staff_profiles_touch_updated_at on public.loot_staff_profiles;
create trigger loot_staff_profiles_touch_updated_at
  before update on public.loot_staff_profiles
  for each row execute function public.loot_touch_updated_at();

drop trigger if exists loot_customers_touch_updated_at on public.loot_customers;
create trigger loot_customers_touch_updated_at
  before update on public.loot_customers
  for each row execute function public.loot_touch_updated_at();

drop trigger if exists loot_buy_transactions_touch_updated_at on public.loot_buy_transactions;
create trigger loot_buy_transactions_touch_updated_at
  before update on public.loot_buy_transactions
  for each row execute function public.loot_touch_updated_at();

drop trigger if exists loot_card_show_transactions_touch_updated_at on public.loot_card_show_transactions;
create trigger loot_card_show_transactions_touch_updated_at
  before update on public.loot_card_show_transactions
  for each row execute function public.loot_touch_updated_at();

alter table public.loot_staff_profiles enable row level security;
alter table public.loot_customers enable row level security;
alter table public.loot_buy_transactions enable row level security;
alter table public.loot_buy_transaction_staff enable row level security;
alter table public.loot_photos enable row level security;
alter table public.loot_buy_transaction_photos enable row level security;
alter table public.loot_card_show_transactions enable row level security;
alter table public.loot_card_show_transaction_photos enable row level security;
alter table public.loot_safe_cash_entries enable row level security;
alter table public.loot_inventory_adjustments enable row level security;
alter table public.loot_activity_events enable row level security;

drop policy if exists "Authenticated users can read loot staff" on public.loot_staff_profiles;
create policy "Authenticated users can read loot staff"
  on public.loot_staff_profiles for select
  to authenticated
  using (auth.role() = 'authenticated');

drop policy if exists "Authenticated users can manage loot staff" on public.loot_staff_profiles;
create policy "Authenticated users can manage loot staff"
  on public.loot_staff_profiles for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users can manage loot customers" on public.loot_customers;
create policy "Authenticated users can manage loot customers"
  on public.loot_customers for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users can manage loot buy transactions" on public.loot_buy_transactions;
create policy "Authenticated users can manage loot buy transactions"
  on public.loot_buy_transactions for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users can manage loot buy transaction staff" on public.loot_buy_transaction_staff;
create policy "Authenticated users can manage loot buy transaction staff"
  on public.loot_buy_transaction_staff for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users can manage loot photos" on public.loot_photos;
create policy "Authenticated users can manage loot photos"
  on public.loot_photos for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users can manage loot buy transaction photos" on public.loot_buy_transaction_photos;
create policy "Authenticated users can manage loot buy transaction photos"
  on public.loot_buy_transaction_photos for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users can manage loot card show transactions" on public.loot_card_show_transactions;
create policy "Authenticated users can manage loot card show transactions"
  on public.loot_card_show_transactions for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users can manage loot card show transaction photos" on public.loot_card_show_transaction_photos;
create policy "Authenticated users can manage loot card show transaction photos"
  on public.loot_card_show_transaction_photos for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users can manage loot safe cash entries" on public.loot_safe_cash_entries;
create policy "Authenticated users can manage loot safe cash entries"
  on public.loot_safe_cash_entries for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users can manage loot inventory adjustments" on public.loot_inventory_adjustments;
create policy "Authenticated users can manage loot inventory adjustments"
  on public.loot_inventory_adjustments for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users can manage loot activity events" on public.loot_activity_events;
create policy "Authenticated users can manage loot activity events"
  on public.loot_activity_events for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

notify pgrst, 'reload schema';
