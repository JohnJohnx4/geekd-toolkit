do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'loot_buy_categories'
      and column_name = 'is_supported'
  ) and not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'loot_buy_categories'
      and column_name = 'is_active'
  ) then
    alter table public.loot_buy_categories
      rename column is_supported to is_active;
  end if;
end $$;

alter table public.loot_buy_categories
  add column if not exists is_active boolean not null default true;

update public.loot_buy_categories
set is_buying = false
where is_active = false;

alter table public.loot_buy_categories
  drop column if exists category_type;

drop policy if exists "Anyone can read supported buy categories" on public.loot_buy_categories;
drop policy if exists "Anyone can read active buy categories" on public.loot_buy_categories;

create policy "Anyone can read active buy categories"
  on public.loot_buy_categories for select
  to anon, authenticated
  using (is_active = true or auth.role() = 'authenticated');
