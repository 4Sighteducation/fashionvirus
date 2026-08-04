# Fashion Inc. Phase 0 — Reuse Matrix

Audit date: 2026-08-04. Classifications against the current Fashion Virus codebase (`C:\dev\fashionvirus`, commit `5963a58`) and the locked Fashion Inc. laws (one authoritative `SimulationState`, commands-only mutation, determinism, AI non-authoritative, Supabase stores-not-runs).

| Classification | Meaning |
|---|---|
| **Reuse directly** | Copy or share as-is with no behavioural change |
| **Reuse through adapter** | Keep the idea/API; wrap or reshape for Fashion Inc. contracts |
| **Rewrite for Fashion Inc.** | Useful precedent, wrong shape for a living sim |
| **Do not touch / unsafe** | Leave alone; shared mutation would endanger Fashion Virus or violate a product law |

## 1. Platform and infrastructure

| Module / concern | Path / evidence | Classification | Rationale |
|---|---|---|---|
| Supabase anon client pattern | `src/lib/supabase.ts` (13 lines, `VITE_*` env) | **Reuse through adapter** | Pattern is correct (publishable key, throw on missing). Fashion Inc. should have its **own** client module and ideally its **own** Supabase project; do not share the Fashion Virus client instance. |
| Telemetry write pattern | `src/lib/telemetry.ts` (`startRun`, `logEvent`, fire-and-forget, swallowed errors) | **Reuse through adapter** | Proven RLS write-only pattern. Fashion Inc. needs a different event shape (ticks, commands, legacy outcomes) — copy the posture, not the table. Do **not** overload `runs` / `run_events`. |
| Telemetry migrations + RLS | `supabase/migrations/20260723120000_telemetry.sql`, `…card_choice_splits.sql` | **Reuse through adapter** | Template for anon-insert + security-invoker views. Apply equivalent migrations in a Fashion Inc. project/schema; do not extend these tables for a second game. |
| Auth | None present | **Rewrite for Fashion Inc.** (greenfield) | No auth today. Blueprint prefers anonymous-first for PoC. Build only when cloud saves require it; do not invent an auth system inside Fashion Inc. early. |
| Deployment config | Vercel dashboard (no `vercel.json`) | **Do not touch / unsafe** for Fashion Virus; **Rewrite** for Fashion Inc. | Fashion Virus pipeline stays frozen. Fashion Inc. gets its own Vercel project. |
| Env var convention (`VITE_*` = public) | `.env.local`, `.env.example` | **Reuse directly** | Keep the rule: anything client-visible is `VITE_`-prefixed; service-role / AI keys never are. |
| Privileged credentials in client | None found (grep clean) | **Reuse directly** (as a hard rule) | Preserve: never ship service-role or AI provider keys to the browser. |

## 2. Simulation and game logic

| Module / concern | Path / evidence | Classification | Rationale |
|---|---|---|---|
| Pure reducer engine | `src/game/engine.ts` (`newGame`, `reduce`, no React) | **Reuse through adapter** | Architectural lesson (UI observes; logic is pure) is gold. The API is card-turn shaped and uses unseeded `Math.random` — incompatible with Fashion Inc. determinism. Port the *separation*, not the reducer. |
| Seeded RNG precedent | `src/engine/island.ts` `makeRng` | **Reuse directly** (pattern) | Closest in-house match to Fashion Inc. “named saved random streams”. Lift the approach into the simulation kernel; do not use bare `Math.random`. |
| Hidden ledger model | `Ledger` in `src/game/types.ts` (water, carbon, waste, microplastics, labour, land) | **Reuse through adapter** | Philosophy and unit vocabulary align with Chapters 11/14. Fashion Inc. needs named units (`cashPence`, `waterLitres`, …), batch/job identity, and conservation invariants — reshape, don’t paste. |
| Card / choice content model | `src/game/cards.ts`, `Choice`, `Card` types | **Rewrite for Fashion Inc.** | Content is turn-dilemma shaped. Fashion Inc. decisions flow through Weekly Strategy Meeting + commands against a continuous sim. Research value only. |
| Card-turn state machine | phases `start → setup → act1 → hinge → act2 → end` | **Do not touch / unsafe** | Fashion Virus product surface. Fashion Inc. uses ticks, command journals, and campaign eras — different state machine entirely. |
| Act 2 repairs / allies / endings | `src/game/act2.ts` | **Reuse through adapter** (design ideas) | Repair, social capital, and legacy-shaped endings inform stewardship and legacy snapshots. Not callable code. |
| Brand identity | `src/game/brand.ts` (palettes, avatars, theses) | **Reuse through adapter** | Useful for House identity UX (House Vale). Fashion Inc. houses are persistent organisations with doctrine, not a four-step setup wizard. |
| Balance simulator | `scripts/simulate.ts` | **Reuse through adapter** | Proves headless engine testing works. Fashion Inc. needs the same idea as a **determinism harness** (same seed → same world hash). |

## 3. UI and design system

| Module / concern | Path / evidence | Classification | Rationale |
|---|---|---|---|
| Typography / fonts | Bodoni Moda, Archivo, Space Mono via Fontsource; `docs/typography.md` | **Reuse directly** (brand kinship) | Shared research identity; Fashion Inc. may adopt the same families. Copy font packages into the new repo rather than importing across repos. |
| CSS design tokens / desk aesthetic | `src/App.css`, brand CSS vars | **Reuse through adapter** | Tone and editorial grammar transfer; the desk UI is card-game specific. Extract tokens (colours, type scale, eyebrow style) — not the component tree. |
| `InfoTip` component | `src/components/InfoTip.tsx` | **Reuse through adapter** | Small, self-contained, useful for Strategy Meeting explainers. Copy and restyle; do not create a cross-repo dependency. |
| Card modal / Act1 desk / hinge UI | `src/components/*` | **Do not touch / unsafe** | Fashion Virus surface. Fashion Inc. UI is map + Strategy Meeting + overlays. |
| World-builder R3F scene | `src/world/*`, `@react-three/fiber`, `three`, `@react-three/drei` | **Reuse through adapter** (spike only) | Proves R3F + Vite + lazy chunking works in this toolchain. Renderer Gate B is still OPEN — treat as one candidate spike, not a locked choice. Do not couple Fashion Inc. to this folder. |
| Zustand | in `package.json`, **never imported** | **Rewrite / decide fresh** | Installed but unused. Fashion Inc. may choose Zustand (or XState / context) for **UI panels only**; `SimulationState` stays behind the simulation boundary (blueprint lock). |

## 4. Content and research IP

| Module / concern | Path / evidence | Classification | Rationale |
|---|---|---|---|
| Fashion Virus concept + card research docs | `docs/fashion-virus-*.md`, `docs/wasteworld-image-prompt-pack.md` | **Reuse through adapter** | Philosophical and research inheritance (blueprint “Source inheritance from Fashion Virus”). Cite; do not treat as runtime content. |
| Fashion Inc. blueprint + checklists | `Fashion_Inc/Docs/*` | **Reuse directly** — move into the new repo as first-class docs | Canonical design corpus. Currently untracked/gitignored inside Fashion Virus; must live in Fashion Inc.’s private repo. |
| Scene / hinge image assets | `public/assets/scenes/`, `public/assets/hinge/` | **Do not touch / unsafe** | Fashion Virus art. Fashion Inc. uses Synty + custom garment/river assets. |
| Synty POLYGON packs | `Fashion_Inc/polygon/*` (4.2 GB) | **Do not touch as-is** | Multi-engine source distributions. Only curated runtime glTF belongs in a deployable tree. See `SYNTY_ASSET_AUDIT.md`. |

## 5. Tooling quality bar

| Concern | Fashion Virus today | Fashion Inc. requirement | Classification |
|---|---|---|---|
| TypeScript strictness | `strict` off | `strict` + preferably `noUncheckedIndexedAccess` | **Rewrite** (new repo defaults) |
| Tests / CI | None | Determinism tests + GitHub Actions from commit 1 | **Rewrite** |
| Lint / format | oxlint only | oxlint or eslint + formatter | **Reuse through adapter** (oxlint is fine to keep) |
| Node pin | Unpinned | `engines.node` + `.nvmrc` | **Rewrite** |

## 6. Summary recommendation

- **Share philosophy and patterns**, not runtime modules.
- **Share nothing that mutates Fashion Virus** (its engine, UI, migrations, Vercel project, or asset folders).
- The highest-value reuses are: pure-logic / UI separation, seeded RNG, write-only telemetry + RLS, InfoTip, typography, and the headless simulator idea.
- Everything that looks like a card game, a hinge sequence, or an unseeded reducer is research inheritance — not a foundation to build on.
