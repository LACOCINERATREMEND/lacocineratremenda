create extension if not exists pgcrypto;

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  when_text text not null default '',
  price text not null default '',
  price_cents integer,
  stripe_product_id text not null default '',
  stripe_price_id text not null default '',
  images jsonb not null default '[]'::jsonb,
  published boolean not null default true,
  max_seats integer,
  updated_at timestamptz not null default now()
);

create table if not exists signups (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses (id) on delete cascade,
  name text not null,
  phone text not null,
  email text not null,
  note text not null default '',
  status text not null check (status in ('pendiente', 'pagado', 'cancelado', 'reembolsado')),
  pay_at_venue boolean not null default false,
  stripe_session_id text not null default '',
  stripe_payment_intent_id text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  signup_id uuid references signups (id) on delete set null,
  course_id uuid references courses (id) on delete set null,
  amount_cents integer not null default 0,
  currency text not null default 'eur',
  status text not null check (status in ('paid', 'refunded')),
  stripe_id text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists page_views (
  day date not null,
  page text not null,
  lang text not null,
  device text not null,
  count integer not null default 0,
  primary key (day, page, lang, device)
);

alter table courses enable row level security;
alter table signups enable row level security;
alter table payments enable row level security;
alter table page_views enable row level security;

insert into storage.buckets (id, name, public)
values ('course-photos', 'course-photos', true)
on conflict (id) do nothing;
