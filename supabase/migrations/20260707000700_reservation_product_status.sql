alter table public.reservation_products
  add column if not exists status text not null default 'pending';

alter table public.reservation_products
  drop constraint if exists reservation_products_status_check;

alter table public.reservation_products
  add constraint reservation_products_status_check
  check (status in ('pending', 'set_aside', 'picked_up', 'skipped', 'canceled', 'denied'));

update public.reservation_products
set status = 'pending'
where status is null;

drop policy if exists "Admins can update reservation products" on public.reservation_products;
create policy "Admins can update reservation products"
  on public.reservation_products for update
  to authenticated
  using (public.is_reservation_admin())
  with check (public.is_reservation_admin());
