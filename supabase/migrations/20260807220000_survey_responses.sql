-- Post-game habits questionnaire: anonymous, write-only, one row per
-- submission. run_id is informational (no FK — telemetry may be disabled
-- or the runs insert may have failed; the survey must still save).

create table public.survey_responses (
  id bigint generated always as identity primary key,
  run_id uuid,
  answers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.survey_responses enable row level security;

-- INSERT only; no SELECT/UPDATE/DELETE policies for anon.
create policy "anon insert survey_responses"
  on public.survey_responses for insert
  to anon
  with check (true);
