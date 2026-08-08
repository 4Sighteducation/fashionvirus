# Karen — Fashion Virus game content pack

Prepared for oversight, rewrite, and replacement of AI-generated material.

## What's in this folder

| File | Purpose |
|---|---|
| `LIVE-CARD-CORPUS.md` | **All 43 cards as implemented today** — copy, choices, effects, fuses, whispers |
| `GAME-DYNAMICS.md` | How cards connect to stats, ledger, fuses, crises, Act 2 |
| `fashion-virus-30-cards.md` | Your original 30-card seed document |
| `fashion-virus-dilemma-cards.md` | Your dilemma addendum (D1–D8) + editing principles |
| `card-difficulty-review.md` | Review of which seeds need hardening + new dilemma ideas |
| `fashion-virus-concept-v0.3.md` | Full game concept (Wiener, Schumacher, Piercy, Burtynsky framing) |
| `facts-and-sources.md` | Audited in-game facts and conversion factors |

## Suggested workflow for Karen

1. Read **GAME-DYNAMICS.md** first — understand what each field on a card *does*.
2. Review **LIVE-CARD-CORPUS.md** — this is what players currently see.
3. Compare against your **30-cards** and **dilemma** seeds — flag copy to keep, rewrite, or replace.
4. Use **card-difficulty-review.md** telemetry standard: aim for ~50/50 splits on dilemma cards.
5. Return revised cards in the same structure (or edit the markdown seeds; dev converts to `cards.ts`).

## Live build status (at export)

- Repo: `4Sighteducation/fashionvirus`, branch `main`
- Latest commit: Rebalance — clean path survivable (Aug 2026)
- Stack: React + TypeScript + Vite, Supabase telemetry, Vercel hosting
- Production build: passes (`npm run build`)

Questions: Tony / dev team.
