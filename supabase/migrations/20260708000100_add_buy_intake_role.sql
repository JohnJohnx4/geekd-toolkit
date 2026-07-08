alter table public.loot_staff_profiles
  drop constraint if exists loot_staff_profiles_role_check;

alter table public.loot_staff_profiles
  add constraint loot_staff_profiles_role_check
  check (role in (
    'buy_intake',
    'staff',
    'lead',
    'card_supervisor',
    'manager',
    'owner',
    'admin'
  ));
