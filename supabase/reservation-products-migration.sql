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

create index if not exists release_products_release_sort_idx
  on public.release_products (release_id, sort_order, created_at);

create index if not exists reservation_products_product_idx
  on public.reservation_products (product_id);

alter table public.release_products enable row level security;
alter table public.reservation_products enable row level security;

drop policy if exists "Public can read release products" on public.release_products;
create policy "Public can read release products"
  on public.release_products for select
  to authenticated
  using (auth.role() = 'authenticated');

drop policy if exists "Public can manage release products" on public.release_products;
create policy "Public can manage release products"
  on public.release_products for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Public can add reservation products" on public.reservation_products;
create policy "Public can add reservation products"
  on public.reservation_products for insert
  to authenticated
  with check (auth.role() = 'authenticated');

drop policy if exists "Public can read reservation products" on public.reservation_products;
create policy "Public can read reservation products"
  on public.reservation_products for select
  to authenticated
  using (auth.role() = 'authenticated');
