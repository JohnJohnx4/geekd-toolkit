create table if not exists public.loot_buy_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) > 0),
  slug text not null unique check (length(trim(slug)) > 0),
  category_type text not null default 'tcg'
    check (category_type in ('tcg', 'sealed_product', 'other')),
  is_supported boolean not null default true,
  is_buying boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists loot_buy_categories_touch_updated_at on public.loot_buy_categories;
create trigger loot_buy_categories_touch_updated_at
  before update on public.loot_buy_categories
  for each row execute function public.loot_touch_updated_at();

alter table public.loot_buy_categories enable row level security;

drop policy if exists "Anyone can read supported buy categories" on public.loot_buy_categories;
create policy "Anyone can read supported buy categories"
  on public.loot_buy_categories for select
  to anon, authenticated
  using (is_supported = true or auth.role() = 'authenticated');

drop policy if exists "Authenticated users can manage buy categories" on public.loot_buy_categories;
create policy "Authenticated users can manage buy categories"
  on public.loot_buy_categories for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into public.loot_buy_categories
  (name, slug, category_type, is_supported, is_buying, sort_order)
values
  ('Pokemon', 'pokemon', 'tcg', true, true, 10),
  ('Magic: The Gathering', 'magic-the-gathering', 'tcg', true, true, 20),
  ('Yu-Gi-Oh!', 'yu-gi-oh', 'tcg', true, true, 30),
  ('One Piece', 'one-piece', 'tcg', true, true, 40),
  ('Lorcana', 'lorcana', 'tcg', true, true, 50),
  ('Sealed Product', 'sealed-product', 'sealed_product', true, true, 60),
  ('Star Wars Unlimited', 'star-wars-unlimited', 'tcg', true, false, 70),
  ('Union Arena', 'union-arena', 'tcg', true, false, 80),
  ('DragonBall Fusion', 'dragon-ball-fusion', 'tcg', true, false, 90),
  ('Digimon', 'digimon', 'tcg', true, false, 100),
  ('Cookie Run', 'cookie-run', 'tcg', true, false, 110),
  ('Riftbound', 'riftbound', 'tcg', true, false, 120),
  ('Gundam Card Game', 'gundam-card-game', 'tcg', true, false, 130),
  ('My Little Pony', 'my-little-pony', 'tcg', true, false, 140)
on conflict (slug) do update
set
  name = excluded.name,
  category_type = excluded.category_type,
  sort_order = excluded.sort_order;

notify pgrst, 'reload schema';
