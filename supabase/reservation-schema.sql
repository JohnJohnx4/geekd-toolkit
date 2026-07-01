create extension if not exists pgcrypto;

create table if not exists public.releases (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  game text not null,
  release_date date,
  description text,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  release_id uuid not null references public.releases(id) on delete cascade,
  employee_name text not null,
  employee_contact text,
  notes text,
  status text not null default 'pending'
    check (status in ('pending', 'set_aside', 'picked_up', 'skipped', 'canceled')),
  employee_lookup text generated always as (
    lower(trim(employee_name)) || '|' || lower(trim(coalesce(employee_contact, '')))
  ) stored,
  created_at timestamptz not null default now()
);

create table if not exists public.release_products (
  id uuid primary key default gen_random_uuid(),
  release_id uuid not null references public.releases(id) on delete cascade,
  name text not null,
  description text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.reservation_products (
  reservation_id uuid not null references public.reservations(id) on delete cascade,
  product_id uuid not null references public.release_products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (reservation_id, product_id)
);

create unique index if not exists reservations_one_request_per_employee
  on public.reservations (release_id, employee_lookup);

create index if not exists releases_sort_idx
  on public.releases (is_active, release_date, created_at);

create index if not exists reservations_release_queue_idx
  on public.reservations (release_id, created_at);

create index if not exists release_products_release_sort_idx
  on public.release_products (release_id, sort_order, created_at);

create index if not exists reservation_products_product_idx
  on public.reservation_products (product_id);

alter table public.releases enable row level security;
alter table public.reservations enable row level security;
alter table public.release_products enable row level security;
alter table public.reservation_products enable row level security;

drop policy if exists "Public can read releases" on public.releases;
create policy "Public can read releases"
  on public.releases for select
  using (true);

drop policy if exists "Public can manage releases" on public.releases;
create policy "Public can manage releases"
  on public.releases for all
  using (true)
  with check (true);

drop policy if exists "Public can add reservation requests" on public.reservations;
create policy "Public can add reservation requests"
  on public.reservations for insert
  with check (true);

drop policy if exists "Public can read reservation queue" on public.reservations;
create policy "Public can read reservation queue"
  on public.reservations for select
  using (true);

drop policy if exists "Public can update reservation statuses" on public.reservations;
create policy "Public can update reservation statuses"
  on public.reservations for update
  using (true)
  with check (true);

drop policy if exists "Public can read release products" on public.release_products;
create policy "Public can read release products"
  on public.release_products for select
  using (true);

drop policy if exists "Public can manage release products" on public.release_products;
create policy "Public can manage release products"
  on public.release_products for all
  using (true)
  with check (true);

drop policy if exists "Public can add reservation products" on public.reservation_products;
create policy "Public can add reservation products"
  on public.reservation_products for insert
  with check (true);

drop policy if exists "Public can read reservation products" on public.reservation_products;
create policy "Public can read reservation products"
  on public.reservation_products for select
  using (true);

comment on table public.releases is
  'Upcoming releases employees can request/reserve.';

comment on table public.reservations is
  'Employee reservation requests ordered by created_at.';

comment on table public.release_products is
  'Products/SKUs available under an upcoming release.';

comment on table public.reservation_products is
  'Products selected on each employee reservation request.';
