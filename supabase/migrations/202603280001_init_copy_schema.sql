create extension if not exists "pgcrypto";

create table if not exists public.copy_templates (
  id uuid primary key default gen_random_uuid(),
  channel text not null check (channel in ('sns', 'banner', 'landing')),
  pattern_type text not null check (pattern_type in ('brand_mention', 'problem_solution', 'social_proof', 'benefit_emphasis', 'scarcity_cta')),
  tone_label text not null,
  template_text text not null,
  variables jsonb not null default '[]'::jsonb,
  active boolean not null default true,
  priority smallint not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.copy_pattern_rules (
  id uuid primary key default gen_random_uuid(),
  pattern_type text not null unique check (pattern_type in ('brand_mention', 'problem_solution', 'social_proof', 'benefit_emphasis', 'scarcity_cta')),
  rule_description text not null,
  required_tokens jsonb not null default '[]'::jsonb,
  channel_tone_map jsonb not null,
  priority smallint not null default 100,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.copy_generation_history (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  request_payload jsonb not null,
  requested_channel text not null check (requested_channel in ('sns', 'banner', 'landing')),
  generation_mode text not null default 'dataset' check (generation_mode in ('dataset', 'openai')),
  generated_results jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.copy_selection_history (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  generation_id uuid not null references public.copy_generation_history(id) on delete cascade,
  selected_copy_text text not null,
  selected_pattern_type text not null check (selected_pattern_type in ('brand_mention', 'problem_solution', 'social_proof', 'benefit_emphasis', 'scarcity_cta')),
  selected_tone_label text not null,
  selected_channel text not null check (selected_channel in ('sns', 'banner', 'landing')),
  action_type text not null check (action_type in ('copy', 'select')),
  created_at timestamptz not null default now()
);

create index if not exists idx_copy_templates_channel_pattern
  on public.copy_templates(channel, pattern_type, active, priority);

create index if not exists idx_copy_generation_history_session
  on public.copy_generation_history(session_id, created_at desc);

create index if not exists idx_copy_selection_history_generation
  on public.copy_selection_history(generation_id, created_at desc);

alter table public.copy_templates enable row level security;
alter table public.copy_pattern_rules enable row level security;
alter table public.copy_generation_history enable row level security;
alter table public.copy_selection_history enable row level security;

create policy "allow read templates" on public.copy_templates
  for select to authenticated, anon
  using (active = true);

create policy "allow read rules" on public.copy_pattern_rules
  for select to authenticated, anon
  using (active = true);
