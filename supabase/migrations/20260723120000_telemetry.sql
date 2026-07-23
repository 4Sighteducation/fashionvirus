-- Telemetry: anonymous, write-only decision logs.
-- The client generates run ids locally and only ever INSERTs.
-- Reading the data happens in the dashboard / with the service role.

create table public.runs (
  id uuid primary key,
  started_at timestamptz not null default now(),
  user_agent text,
  viewport text
);

create table public.run_events (
  id bigint generated always as identity primary key,
  run_id uuid not null references public.runs (id) on delete cascade,
  turn int not null,
  act smallint not null default 1,
  event_type text not null, -- run_start | choice | learn_more | whisper_shown | crisis_fired | hinge_reached | repair_chosen | run_end
  card_id text,
  choice_id text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index run_events_run_id_idx on public.run_events (run_id);
create index run_events_event_type_idx on public.run_events (event_type);

alter table public.runs enable row level security;
alter table public.run_events enable row level security;

-- Write-only for anonymous players: INSERT allowed, no SELECT/UPDATE/DELETE policies.
create policy "anon insert runs"
  on public.runs for insert
  to anon
  with check (true);

create policy "anon insert run_events"
  on public.run_events for insert
  to anon
  with check (true);
