-- Contact form on the landing page: write-only for anonymous visitors,
-- same pattern as telemetry. Reading happens in the dashboard / service role.

create table public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320),
  message text not null check (char_length(message) between 1 and 4000),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- INSERT only; no SELECT/UPDATE/DELETE policies for anon.
create policy "anon insert contact_messages"
  on public.contact_messages for insert
  to anon
  with check (true);
