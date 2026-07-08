# Geek'd Toolkit

React + TypeScript + Vite app for Geek'd store tools. The current branch includes the reservations app plus the toolkit-native buy workflow being migrated from Loot Tracker.

## Requirements

- Node.js 20.19+ or 22.12+
- npm
- Docker Desktop, if running Supabase locally
- Supabase CLI, or use it through `npx supabase`

## Install

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local` before starting the app.

## Environment

Frontend variables:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Server-only variables are only needed when using the local Vite proxy or Netlify function to create employee accounts:

```bash
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
```

Do not commit `.env`, `.env.local`, or any Supabase secret key.

## Run With Hosted Supabase

Use the hosted project URL and publishable key in `.env.local`, then run:

```bash
npm run dev
```

The app runs at `http://127.0.0.1:5173` by default.

## Run With Local Supabase

Start the local Supabase stack:

```bash
npm run supabase:start
```

After it starts, copy the local API URL and anon key from `supabase status` into `.env.local`:

```bash
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_PUBLISHABLE_KEY=<local anon key>
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_PUBLISHABLE_KEY=<local anon key>
SUPABASE_SECRET_KEY=<local service_role key>
```

Apply or reset the local database:

```bash
npm run supabase:reset
```

Then start the app:

```bash
npm run dev
```

## Database Migrations

Migrations live in `supabase/migrations`.

Useful commands:

```bash
npm run supabase:push
npm run supabase:reset
```

Use `supabase db push` against a linked hosted project only when you are ready to apply the branch migrations to that project.

## Employee Accounts

Employee login uses Supabase Auth. Employee profile/role data is stored in:

- `reservation_profiles`
- `loot_staff_profiles`

Roles currently include:

- `buy_intake`
- `staff`
- `lead`
- `card_supervisor`
- `manager`
- `owner`
- `admin`

The Admin Controls screen can create/manage employee users when the server-only Supabase variables are configured.

## Verification

Before pushing a branch, run:

```bash
npm run build
```

`npm run lint` is available, but the imported legacy Loot Tracker code may still need cleanup as migration work continues.
