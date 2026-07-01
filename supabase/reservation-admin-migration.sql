alter table public.reservation_profiles
  add column if not exists is_admin boolean not null default false;

alter table public.reservations
  add column if not exists user_id uuid references auth.users(id) on delete set null;

alter table public.reservations
  alter column user_id set default auth.uid();

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
  with check (auth.uid() = user_id);

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

notify pgrst, 'reload schema';
