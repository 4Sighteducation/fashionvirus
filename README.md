# Fashion Virus / Wasteworld

**Build a fashion empire. Face the fallout.**

A browser-based game in two acts. Act 1: build a fashion label from bedroom to global across 16 seasons — while a hidden ledger of environmental and human cost accumulates where you can't see it. Act 2: five years of repair in the world you built.

Alongside cash, heat and novelty, the game tracks **social capital** — trust, belonging, ambassadors. It's earned slowly (repair, transparency, staying local, paying properly) and it changes everything downstream: it buffers the novelty trap, absorbs one crisis, brings named allies into the run, unlocks community repairs and volunteer discounts in Act 2, and decides whether you face the ending alone or held. Damage decides the world; social capital decides the company you keep in it.

The game is also a learning experience: real, sourced industry figures surface as **THE RECORD** between seasons, and the end screen converts your hidden ledger into things a person can picture — Olympic pools, London–New York flights, bin lorries, working lives. Every figure and conversion is audited in [docs/facts-and-sources.md](docs/facts-and-sources.md).

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
- `public/assets/cards/` — card artwork, one file per card id (`<cardId>.jpeg/.png`); crisis cards use no photography by design
- `public/assets/editorial/` — editorial model photography used as emotional backdrops (awards fanfare, endings)
- `docs/facts-and-sources.md` — every in-game fact and conversion factor, with sources and verification notes
- `public/assets/scenes/` — Act 2 scene art, named by prompt ID (`a*` = wasteworld, `b*` = repaired world); see the README there
- `public/assets/hinge/` — animated hinge sequences (video)
- `public/assets/brand/` — logo / wordmark
- `docs/` — concept doc, image-generation prompt pack, typography brief, art references

Fonts (Bodoni Moda, Archivo, Space Mono) are self-hosted via Fontsource — see [docs/typography.md](docs/typography.md).
