# Fashion Inc. Phase 0 — Supabase and Vercel Audit

Audit date: 2026-08-04. Labels: **[Verified]** / **[Inferred]** / **[Unknown]**. No secret values are reproduced in this document.

## 1. Supabase — client creation

- **[Verified]** One client, browser-side only: `src/lib/supabase.ts` calls `createClient(VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY)` from `import.meta.env`. Throws at startup if either is missing.
- **[Verified]** No server-side client, no service-role usage anywhere in `src/` (grep for `service_role`/`secret` returns nothing).
- **[Verified]** Environment variable **names** in `.env.local` (values not inspected): `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`. Both are `VITE_`-prefixed, therefore **bundled into the client by design** — correct for a publishable key, and a convention Fashion Inc. must keep in mind: *anything `VITE_`-prefixed is public*.
- **[Verified]** `.env.local` is gitignored (`*.local` rule); `.env.example` documents placeholders.

## 2. Supabase — project, schema, RLS

- **[Verified]** Project ref: `myqpdkirktkzjuoevhef` (`https://myqpdkirktkzjuoevhef.supabase.co`).
- **[Verified – as of 2026-07-23, not re-verified today]** Live schema was applied from local migrations via the Supabase MCP on 23 July. The MCP timed out during this audit, so today's live state is **[Unknown]**; the statements below describe the migration files, which are the intended source of truth.
- **[Verified]** Migrations (schema source of truth): `supabase/migrations/`
  - `20260723120000_telemetry.sql` — creates `public.runs` (uuid pk, started_at, brand fields, outcome fields) and `public.run_events` (generated identity pk, run_id fk, turn, event_type, card_id, choice_id, payload jsonb). RLS **enabled** on both, with **anon INSERT-only** policies (write-only telemetry: anon cannot read).
  - `20260723140000_card_choice_splits.sql` — `public.card_choice_splits` view with `security_invoker = true` (respects RLS; dashboard/service-role only).
- **[Verified]** Purpose: anonymous playtest telemetry, written fire-and-forget from `src/lib/telemetry.ts` (`startRun`, `logEvent`). Failures are swallowed; gameplay never blocks on Supabase.
- **[Unknown]** Auth providers configuration (dashboard-level; no auth is used by the app — no login of any kind).
- **[Verified]** Storage buckets: none referenced in code. **[Unknown]** whether any exist in the dashboard.
- **[Verified]** Edge Functions: none in repo. **[Unknown]** dashboard state.
- **[Verified]** Generated database types: **none** (no `database.types.ts`; the telemetry calls are untyped inserts).
- **[Verified]** Consent handling: the start screen states "anonymous decision logging for research". No PII is collected; no user identifier beyond a per-run `crypto.randomUUID()`. **[Inferred]** This is adequate for anonymous telemetry but Fashion Inc.'s research ambitions (Chapter 24 of the blueprint) will need an explicit consent step.
- **[Verified]** Environments: a single Supabase project serves development and production. No preview/branch databases.

## 3. Supabase — fitness for Fashion Inc.

- **[Inferred]** The write-only telemetry pattern (RLS anon-insert, security-invoker views for analysis) is a good, proven template to replicate.
- **[Inferred]** Sharing this exact project between two games is **not recommended**: Fashion Inc. will need its own tables (world snapshots, campaign saves, telemetry with different shape), its own key rotation story, and possibly the "secure AI boundary" (Edge Function) — mixing those into the Fashion Virus project couples release risk and quota. A separate Supabase project (same org) keeps the pattern, isolates the blast radius. Final call belongs with the repository decision.
- **[Verified]** The blueprint requires Supabase must not run the live simulation — nothing in the current codebase violates or tempts this; there is no server-side game logic at all today.

## 4. Vercel

- **[Verified]** No `vercel.json`, no `.vercel/` directory in the repo — the Vercel project is configured entirely through the dashboard.
- **[Unknown → user-confirmed in session]** Dashboard settings were reviewed by the user during initial setup (screenshot review on 23 July): framework preset **Vite**, build `npm run build`, output `dist`. Production branch **[Inferred]** `main` (deploys have followed pushes to `main`).
- **[Verified]** Environment variables in use by the build: only the two `VITE_SUPABASE_*` names (client-exposed by design). No server-only variables exist because there are no server functions.
- **[Verified]** No API routes / serverless functions / middleware in the repo.
- **[Inferred]** Deployment risk to Fashion Virus from Fashion Inc. work is **nil while Fashion Inc. lives in a separate repo and separate Vercel project**. If Fashion Inc. were built inside this repo, every asset-pipeline or dependency change would ride through the same build and could break or slow the live game's deploys — a strong argument for separation.
- **[Inferred]** A future Fashion Inc. Vercel project should pin Node (via `engines` or project setting) and exclude asset-source directories from build upload (`.vercelignore`) if raw packs ever sit near the app — better still, they never should.

## 5. Recommendations (carried into REPOSITORY_RECOMMENDATION.md)

1. Separate Supabase project for Fashion Inc. (same organisation), replicating the RLS write-only telemetry pattern with generated types from day one.
2. Separate Vercel project bound to the new repo; keep the Fashion Virus pipeline untouched.
3. Introduce typed database access (supabase gen types) in the new project — the untyped inserts in Fashion Virus are tolerable at 56 lines, not at simulation scale.
4. Add an explicit consent step before telemetry in Fashion Inc. (research-grade data per blueprint Chapter 24).
