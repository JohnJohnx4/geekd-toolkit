update public.reservation_profiles
set contact = auth_users.email,
    updated_at = now()
from auth.users auth_users
where reservation_profiles.id = auth_users.id
  and (
    reservation_profiles.contact is null
    or lower(trim(reservation_profiles.contact)) <> lower(trim(auth_users.email))
  );

drop policy if exists "Users can create own reservation profile" on public.reservation_profiles;
create policy "Users can create own reservation profile"
  on public.reservation_profiles for insert
  to authenticated
  with check (
    auth.uid() = id
    and length(trim(display_name)) > 0
    and is_admin = false
    and lower(trim(coalesce(contact, ''))) = lower(trim(coalesce(auth.jwt() ->> 'email', '')))
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
    and lower(trim(coalesce(contact, ''))) = lower(trim(coalesce(auth.jwt() ->> 'email', '')))
  );

notify pgrst, 'reload schema';
