alter table public.release_products
  add column if not exists release_date date;

update public.release_products
set release_date = releases.release_date
from public.releases
where release_products.release_id = releases.id
  and release_products.release_date is null
  and releases.release_date is not null;

drop index if exists release_products_release_sort_idx;
create index if not exists release_products_release_sort_idx
  on public.release_products (
    release_id,
    release_date,
    sort_order,
    created_at
  );

notify pgrst, 'reload schema';
