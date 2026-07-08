create extension if not exists pgcrypto;

insert into storage.buckets
  (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'tcg-logos',
    'tcg-logos',
    true,
    1048576,
    array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']::text[]
  ),
  (
    'customer-buy-images',
    'customer-buy-images',
    false,
    10485760,
    array['image/png', 'image/jpeg', 'image/webp']::text[]
  ),
  (
    'customer-interest-images',
    'customer-interest-images',
    false,
    10485760,
    array['image/png', 'image/jpeg', 'image/webp']::text[]
  ),
  (
    'customer-pii',
    'customer-pii',
    false,
    5242880,
    array['image/png', 'image/jpeg', 'image/webp']::text[]
  )
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

alter table public.loot_buy_categories
  add column if not exists logo_bucket text not null default 'tcg-logos'
    check (logo_bucket = 'tcg-logos'),
  add column if not exists logo_path text,
  add column if not exists logo_updated_at timestamptz;

create table if not exists public.loot_customer_buy_submissions (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null check (length(trim(customer_name)) > 0),
  phone text not null check (length(trim(phone)) > 0),
  buy_categories text[] not null default '{}'::text[],
  description text not null check (length(trim(description)) > 0),
  government_id_type text,
  government_id_issuing_state text,
  government_id_number text,
  consent_to_store_id boolean not null default false,
  notes text,
  status text not null default 'submitted'
    check (status in ('submitted', 'reviewing', 'offer_ready', 'accepted', 'declined', 'complete', 'canceled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists loot_customer_buy_submissions_created_idx
  on public.loot_customer_buy_submissions (created_at desc);

create index if not exists loot_customer_buy_submissions_phone_idx
  on public.loot_customer_buy_submissions (phone);

create table if not exists public.loot_customer_interest_submissions (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null check (length(trim(customer_name)) > 0),
  email text not null check (length(trim(email)) > 0),
  phone text,
  description text not null check (length(trim(description)) > 0),
  notes text,
  status text not null default 'submitted'
    check (status in ('submitted', 'reviewing', 'interested', 'not_interested', 'complete', 'canceled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists loot_customer_interest_submissions_created_idx
  on public.loot_customer_interest_submissions (created_at desc);

create index if not exists loot_customer_interest_submissions_email_idx
  on public.loot_customer_interest_submissions (lower(email));

create table if not exists public.loot_customer_buy_files (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.loot_customer_buy_submissions(id) on delete cascade,
  bucket text not null default 'customer-buy-images'
    check (bucket = 'customer-buy-images'),
  object_path text not null,
  image_kind text not null default 'cards'
    check (image_kind in ('cards', 'sealed_product', 'collection', 'other')),
  original_filename text,
  content_type text,
  file_size integer check (file_size is null or file_size >= 0),
  uploaded_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  unique (bucket, object_path)
);

create index if not exists loot_customer_buy_files_submission_idx
  on public.loot_customer_buy_files (submission_id, created_at);

create table if not exists public.loot_customer_interest_files (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.loot_customer_interest_submissions(id) on delete cascade,
  bucket text not null default 'customer-interest-images'
    check (bucket = 'customer-interest-images'),
  object_path text not null,
  image_kind text not null default 'cards'
    check (image_kind in ('cards', 'sealed_product', 'collection', 'other')),
  original_filename text,
  content_type text,
  file_size integer check (file_size is null or file_size >= 0),
  uploaded_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  unique (bucket, object_path)
);

create index if not exists loot_customer_interest_files_submission_idx
  on public.loot_customer_interest_files (submission_id, created_at);

create table if not exists public.loot_customer_pii_files (
  id uuid primary key default gen_random_uuid(),
  buy_submission_id uuid references public.loot_customer_buy_submissions(id) on delete cascade,
  interest_submission_id uuid references public.loot_customer_interest_submissions(id) on delete cascade,
  bucket text not null default 'customer-pii'
    check (bucket = 'customer-pii'),
  object_path text not null,
  pii_type text not null
    check (pii_type in ('drivers_license_photo', 'state_id_photo', 'passport_photo', 'military_id_photo', 'other_id_photo')),
  original_filename text,
  content_type text,
  file_size integer check (file_size is null or file_size >= 0),
  uploaded_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique (bucket, object_path),
  check (
    (buy_submission_id is not null and interest_submission_id is null)
    or (buy_submission_id is null and interest_submission_id is not null)
  )
);

create index if not exists loot_customer_pii_files_buy_submission_idx
  on public.loot_customer_pii_files (buy_submission_id, created_at);

create index if not exists loot_customer_pii_files_interest_submission_idx
  on public.loot_customer_pii_files (interest_submission_id, created_at);

drop trigger if exists loot_customer_buy_submissions_touch_updated_at on public.loot_customer_buy_submissions;
create trigger loot_customer_buy_submissions_touch_updated_at
  before update on public.loot_customer_buy_submissions
  for each row execute function public.loot_touch_updated_at();

drop trigger if exists loot_customer_interest_submissions_touch_updated_at on public.loot_customer_interest_submissions;
create trigger loot_customer_interest_submissions_touch_updated_at
  before update on public.loot_customer_interest_submissions
  for each row execute function public.loot_touch_updated_at();

alter table public.loot_customer_buy_submissions enable row level security;
alter table public.loot_customer_interest_submissions enable row level security;
alter table public.loot_customer_buy_files enable row level security;
alter table public.loot_customer_interest_files enable row level security;
alter table public.loot_customer_pii_files enable row level security;

drop policy if exists "Customers can submit buy requests" on public.loot_customer_buy_submissions;
create policy "Customers can submit buy requests"
  on public.loot_customer_buy_submissions for insert
  to anon
  with check (true);

drop policy if exists "Employees can manage buy submissions" on public.loot_customer_buy_submissions;
create policy "Employees can manage buy submissions"
  on public.loot_customer_buy_submissions for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Customers can submit interest requests" on public.loot_customer_interest_submissions;
create policy "Customers can submit interest requests"
  on public.loot_customer_interest_submissions for insert
  to anon
  with check (true);

drop policy if exists "Employees can manage interest submissions" on public.loot_customer_interest_submissions;
create policy "Employees can manage interest submissions"
  on public.loot_customer_interest_submissions for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Customers can attach buy files" on public.loot_customer_buy_files;
create policy "Customers can attach buy files"
  on public.loot_customer_buy_files for insert
  to anon
  with check (bucket = 'customer-buy-images');

drop policy if exists "Employees can manage buy files" on public.loot_customer_buy_files;
create policy "Employees can manage buy files"
  on public.loot_customer_buy_files for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Customers can attach interest files" on public.loot_customer_interest_files;
create policy "Customers can attach interest files"
  on public.loot_customer_interest_files for insert
  to anon
  with check (bucket = 'customer-interest-images');

drop policy if exists "Employees can manage interest files" on public.loot_customer_interest_files;
create policy "Employees can manage interest files"
  on public.loot_customer_interest_files for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Customers can attach pii files" on public.loot_customer_pii_files;
create policy "Customers can attach pii files"
  on public.loot_customer_pii_files for insert
  to anon
  with check (bucket = 'customer-pii');

drop policy if exists "Employees can manage pii files" on public.loot_customer_pii_files;
create policy "Employees can manage pii files"
  on public.loot_customer_pii_files for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Public can read tcg logos" on storage.objects;
create policy "Public can read tcg logos"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'tcg-logos');

drop policy if exists "Employees can manage tcg logos" on storage.objects;
create policy "Employees can manage tcg logos"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'tcg-logos')
  with check (bucket_id = 'tcg-logos');

drop policy if exists "Customers can upload buy images" on storage.objects;
create policy "Customers can upload buy images"
  on storage.objects for insert
  to anon
  with check (
    bucket_id = 'customer-buy-images'
    and (storage.foldername(name))[1] = 'buy-submissions'
  );

drop policy if exists "Customers can upload interest images" on storage.objects;
create policy "Customers can upload interest images"
  on storage.objects for insert
  to anon
  with check (
    bucket_id = 'customer-interest-images'
    and (storage.foldername(name))[1] = 'interest-submissions'
  );

drop policy if exists "Customers can upload pii images" on storage.objects;
create policy "Customers can upload pii images"
  on storage.objects for insert
  to anon
  with check (
    bucket_id = 'customer-pii'
    and (storage.foldername(name))[1] in ('buy-submissions', 'interest-submissions')
  );

drop policy if exists "Employees can manage private customer files" on storage.objects;
create policy "Employees can manage private customer files"
  on storage.objects for all
  to authenticated
  using (bucket_id in ('customer-buy-images', 'customer-interest-images', 'customer-pii'))
  with check (bucket_id in ('customer-buy-images', 'customer-interest-images', 'customer-pii'));

grant select, insert, update, delete on
  public.loot_customer_buy_submissions,
  public.loot_customer_interest_submissions,
  public.loot_customer_buy_files,
  public.loot_customer_interest_files,
  public.loot_customer_pii_files
to authenticated;

grant insert on
  public.loot_customer_buy_submissions,
  public.loot_customer_interest_submissions,
  public.loot_customer_buy_files,
  public.loot_customer_interest_files,
  public.loot_customer_pii_files
to anon;

notify pgrst, 'reload schema';
