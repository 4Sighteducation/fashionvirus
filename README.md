# Fashion Virus / Wasteworld

**Build a fashion empire. Face the fallout.**

A browser-based game in two acts. Act 1: build a fashion label from bedroom to global — while a hidden ledger of environmental and human cost accumulates where you can't see it. Act 2: walk into the world you built.

Full concept: [docs/fashion-virus-concept-v0.3.md](docs/fashion-virus-concept-v0.3.md)

## Stack

- React + TypeScript (Vite)
- Supabase (telemetry / decision logs)
- Vercel (hosting)

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the Supabase values
npm run dev
```

Environment variables (see `.env.example`):

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable API key (safe for browser) |

## Project layout

- `src/lib/supabase.ts` — Supabase client
- `public/assets/scenes/` — scene-setting art (`act2-*` = wasteworld, `repair-*` = the repair path)
- `docs/` — concept doc and art references
