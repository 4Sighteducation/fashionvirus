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
- `public/assets/scenes/` — Act 2 scene art, named by prompt ID (`a*` = wasteworld, `b*` = repaired world); see the README there
- `public/assets/hinge/` — animated hinge sequences (video)
- `public/assets/brand/` — logo / wordmark
- `docs/` — concept doc, image-generation prompt pack, typography brief, art references

Fonts (Bodoni Moda, Archivo, Space Mono) are self-hosted via Fontsource — see [docs/typography.md](docs/typography.md).
