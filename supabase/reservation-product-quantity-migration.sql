alter table public.reservation_products
  add column if not exists quantity integer not null default 1 check (quantity > 0);
