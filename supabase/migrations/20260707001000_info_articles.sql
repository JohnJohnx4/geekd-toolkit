create table if not exists public.info_articles (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) > 0),
  summary text,
  url text,
  content_html text not null default '',
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    nullif(trim(coalesce(url, '')), '') is not null
    or length(trim(regexp_replace(content_html, '<[^>]*>', '', 'g'))) > 0
  )
);

alter table public.info_articles enable row level security;

drop policy if exists "Employees can read published info articles" on public.info_articles;
create policy "Employees can read published info articles"
  on public.info_articles for select
  to authenticated
  using (is_published = true or public.is_reservation_admin());

drop policy if exists "Admins can create info articles" on public.info_articles;
create policy "Admins can create info articles"
  on public.info_articles for insert
  to authenticated
  with check (public.is_reservation_admin());

drop policy if exists "Admins can update info articles" on public.info_articles;
create policy "Admins can update info articles"
  on public.info_articles for update
  to authenticated
  using (public.is_reservation_admin())
  with check (public.is_reservation_admin());

drop policy if exists "Admins can delete info articles" on public.info_articles;
create policy "Admins can delete info articles"
  on public.info_articles for delete
  to authenticated
  using (public.is_reservation_admin());

create index if not exists info_articles_published_sort_idx
  on public.info_articles (is_published, sort_order, updated_at desc);

comment on table public.info_articles is
  'Protected employee articles and important links.';

notify pgrst, 'reload schema';
