create table if not exists public.reservation_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (length(trim(display_name)) > 0),
  contact text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.reservation_profiles enable row level security;

drop policy if exists "Users can read own reservation profile" on public.reservation_profiles;
create policy "Users can read own reservation profile"
  on public.reservation_profiles for select
  to authenticated
  using (auth.uid() = id);

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
  with check (auth.uid() = id and length(trim(display_name)) > 0);

comment on table public.reservation_profiles is
  'Reservation profile attached to each authenticated employee.';
