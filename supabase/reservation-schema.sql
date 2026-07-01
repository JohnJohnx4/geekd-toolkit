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
  user_id uuid references auth.users(id) on delete set null default auth.uid(),
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
  status text not null default 'pending'
    check (status in ('pending', 'set_aside', 'picked_up', 'skipped', 'canceled', 'denied')),
  created_at timestamptz not null default now(),
  primary key (reservation_id, product_id)
);

create table if not exists public.reservation_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (length(trim(display_name)) > 0),
  contact text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_reservation_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.reservation_profiles
    where id = auth.uid()
      and is_admin = true
  );
$$;

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
alter table public.reservation_profiles enable row level security;

drop policy if exists "Public can read releases" on public.releases;
create policy "Public can read releases"
  on public.releases for select
  to authenticated
  using (auth.role() = 'authenticated');

drop policy if exists "Public can manage releases" on public.releases;
drop policy if exists "Admins can manage releases" on public.releases;
create policy "Admins can manage releases"
  on public.releases for all
  to authenticated
  using (public.is_reservation_admin())
  with check (public.is_reservation_admin());

drop policy if exists "Public can add reservation requests" on public.reservations;
create policy "Public can add reservation requests"
  on public.reservations for insert
  to authenticated
  with check (auth.uid() = user_id or public.is_reservation_admin());

drop policy if exists "Public can read reservation queue" on public.reservations;
drop policy if exists "Users can read own reservations and admins can read queue" on public.reservations;
create policy "Users can read own reservations and admins can read queue"
  on public.reservations for select
  to authenticated
  using (public.is_reservation_admin() or auth.uid() = user_id);

drop policy if exists "Public can update reservation statuses" on public.reservations;
drop policy if exists "Admins can update reservation statuses" on public.reservations;
create policy "Admins can update reservation statuses"
  on public.reservations for update
  to authenticated
  using (public.is_reservation_admin())
  with check (public.is_reservation_admin());

drop policy if exists "Users can update own reservation requests" on public.reservations;
create policy "Users can update own reservation requests"
  on public.reservations for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Public can read release products" on public.release_products;
create policy "Public can read release products"
  on public.release_products for select
  to authenticated
  using (auth.role() = 'authenticated');

drop policy if exists "Public can manage release products" on public.release_products;
drop policy if exists "Admins can manage release products" on public.release_products;
create policy "Admins can manage release products"
  on public.release_products for all
  to authenticated
  using (public.is_reservation_admin())
  with check (public.is_reservation_admin());

drop policy if exists "Public can add reservation products" on public.reservation_products;
create policy "Public can add reservation products"
  on public.reservation_products for insert
  to authenticated
  with check (
    public.is_reservation_admin()
    or exists (
      select 1
      from public.reservations
      where reservations.id = reservation_products.reservation_id
        and reservations.user_id = auth.uid()
    )
  );

drop policy if exists "Public can read reservation products" on public.reservation_products;
drop policy if exists "Users can read own reservation products and admins can read all" on public.reservation_products;
create policy "Users can read own reservation products and admins can read all"
  on public.reservation_products for select
  to authenticated
  using (
    public.is_reservation_admin()
    or exists (
      select 1
      from public.reservations
      where reservations.id = reservation_products.reservation_id
        and reservations.user_id = auth.uid()
    )
  );

drop policy if exists "Users can delete own reservation products and admins can delete all" on public.reservation_products;
create policy "Users can delete own reservation products and admins can delete all"
  on public.reservation_products for delete
  to authenticated
  using (
    public.is_reservation_admin()
    or exists (
      select 1
      from public.reservations
      where reservations.id = reservation_products.reservation_id
        and reservations.user_id = auth.uid()
    )
  );

drop policy if exists "Admins can update reservation products" on public.reservation_products;
create policy "Admins can update reservation products"
  on public.reservation_products for update
  to authenticated
  using (public.is_reservation_admin())
  with check (public.is_reservation_admin());

drop policy if exists "Users can read own reservation profile" on public.reservation_profiles;
create policy "Users can read own reservation profile"
  on public.reservation_profiles for select
  to authenticated
  using (auth.uid() = id or public.is_reservation_admin());

drop policy if exists "Users can create own reservation profile" on public.reservation_profiles;
create policy "Users can create own reservation profile"
  on public.reservation_profiles for insert
  to authenticated
  with check (
    auth.uid() = id
    and length(trim(display_name)) > 0
    and is_admin = false
  );

drop policy if exists "Users can update own reservation profile" on public.reservation_profiles;
create policy "Users can update own reservation profile"
  on public.reservation_profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and length(trim(display_name)) > 0
    and is_admin = public.is_reservation_admin()
  );

drop policy if exists "Admins can update reservation profiles" on public.reservation_profiles;
create policy "Admins can update reservation profiles"
  on public.reservation_profiles for update
  to authenticated
  using (public.is_reservation_admin())
  with check (public.is_reservation_admin() and length(trim(display_name)) > 0);

comment on table public.releases is
  'Upcoming releases employees can request/reserve.';

comment on table public.reservations is
  'Employee reservation requests ordered by created_at.';

comment on table public.release_products is
  'Products/SKUs available under an upcoming release.';

comment on table public.reservation_products is
  'Products selected on each employee reservation request.';

comment on table public.reservation_profiles is
  'Reservation profile attached to each authenticated employee.';
