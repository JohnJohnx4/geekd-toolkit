drop policy if exists "Public can add reservation requests" on public.reservations;
create policy "Public can add reservation requests"
  on public.reservations for insert
  to authenticated
  with check (auth.uid() = user_id or public.is_reservation_admin());

update public.reservations owner_reservation
set
  employee_name = 'Linda',
  notes = coalesce(owner_reservation.notes, 'Automatically reserved for the owner.'),
  status = 'pending'
from public.releases
where lower(trim(owner_reservation.employee_name)) = 'owner'
  and releases.id = owner_reservation.release_id
  and lower(replace(trim(releases.game), 'é', 'e')) = 'pokemon'
  and trim(coalesce(owner_reservation.employee_contact, '')) = ''
  and not exists (
    select 1
    from public.reservations linda_reservation
    where linda_reservation.release_id = owner_reservation.release_id
      and lower(trim(linda_reservation.employee_name)) = 'linda'
      and trim(coalesce(linda_reservation.employee_contact, '')) = ''
  );

insert into public.reservations (
  user_id,
  release_id,
  employee_name,
  employee_contact,
  notes,
  status
)
select
  null,
  releases.id,
  'Linda',
  null,
  'Automatically reserved for the owner.',
  'pending'
from public.releases
where lower(replace(trim(releases.game), 'é', 'e')) = 'pokemon'
on conflict (release_id, employee_lookup) do update
set
  notes = coalesce(public.reservations.notes, excluded.notes),
  status = 'pending';

delete from public.reservations owner_reservation
where lower(trim(owner_reservation.employee_name)) = 'owner'
  and trim(coalesce(owner_reservation.employee_contact, '')) = ''
  and exists (
    select 1
    from public.releases
    where releases.id = owner_reservation.release_id
      and lower(replace(trim(releases.game), 'é', 'e')) = 'pokemon'
  )
  and exists (
    select 1
    from public.reservations linda_reservation
    where linda_reservation.release_id = owner_reservation.release_id
      and lower(trim(linda_reservation.employee_name)) = 'linda'
      and trim(coalesce(linda_reservation.employee_contact, '')) = ''
  );

insert into public.reservation_products (reservation_id, product_id, status)
select
  reservations.id,
  release_products.id,
  'pending'
from public.reservations
join public.release_products
  on release_products.release_id = reservations.release_id
join public.releases
  on releases.id = reservations.release_id
where lower(trim(reservations.employee_name)) = 'linda'
  and lower(replace(trim(releases.game), 'é', 'e')) = 'pokemon'
  and trim(coalesce(reservations.employee_contact, '')) = ''
on conflict (reservation_id, product_id) do nothing;

delete from public.reservations reservations
using public.releases
where releases.id = reservations.release_id
  and lower(trim(reservations.employee_name)) = 'linda'
  and trim(coalesce(reservations.employee_contact, '')) = ''
  and reservations.user_id is null
  and reservations.notes in (
    'Automatically reserved for the owner.',
    'Automatically set aside for the owner.'
  )
  and lower(replace(trim(releases.game), 'é', 'e')) <> 'pokemon';
