drop policy if exists "Public can read releases" on public.releases;
create policy "Public can read releases"
  on public.releases for select
  to authenticated
  using (auth.role() = 'authenticated');

drop policy if exists "Public can manage releases" on public.releases;
create policy "Public can manage releases"
  on public.releases for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Public can add reservation requests" on public.reservations;
create policy "Public can add reservation requests"
  on public.reservations for insert
  to authenticated
  with check (auth.role() = 'authenticated');

drop policy if exists "Public can read reservation queue" on public.reservations;
create policy "Public can read reservation queue"
  on public.reservations for select
  to authenticated
  using (auth.role() = 'authenticated');

drop policy if exists "Public can update reservation statuses" on public.reservations;
create policy "Public can update reservation statuses"
  on public.reservations for update
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

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
