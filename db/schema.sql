-- CareerCraft schema. Safe to run repeatedly (npm run db:migrate).

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users (id) on delete cascade,
  title text not null,
  company text not null,
  location text not null,
  job_type text not null,
  description text not null,
  apply_url text,
  logo_url text,
  created_at timestamptz not null default now()
);

create index if not exists jobs_created_at_idx on jobs (created_at desc);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users (id) on delete cascade,
  title text not null,
  body text not null,
  cover_url text,
  created_at timestamptz not null default now()
);

create index if not exists posts_created_at_idx on posts (created_at desc);

create table if not exists resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users (id) on delete cascade,
  title text not null,
  template text not null,
  html text not null,
  created_at timestamptz not null default now()
);

create index if not exists resumes_user_created_idx on resumes (user_id, created_at desc);
