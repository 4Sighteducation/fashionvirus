# Fashion Inc. Phase 0 — Repository Audit

Audit date: 2026-08-04 · Auditor: Cursor agent session · Scope: `C:\dev\fashionvirus` working tree as of commit `5963a58`.

Labels: **[Verified]** = directly inspected · **[Inferred]** = concluded from evidence · **[Unknown]** = could not be established without further access.

## 1. Git

- **[Verified]** Repository root: `C:/dev/fashionvirus` (single repo; no nested repositories — `git -C Fashion_Inc rev-parse --show-toplevel` resolves to the same root).
- **[Verified]** Remote: `origin → https://github.com/4Sighteducation/fashionvirus.git` (fetch and push).
- **[Verified]** Branch: `main`, tracking `origin/main`, up to date at audit time.
- **[Verified]** Latest commit: `5963a58` — "Rebalance: make the clean path survivable (was 79% fold rate in simulation)".
- **[Verified]** Working tree at audit start: only `Fashion_Inc/` untracked; **zero** `Fashion_Inc` files are tracked or present anywhere in git history (`git ls-files Fashion_Inc` → 0).
- **[Verified]** During this audit a guard-rail `.gitignore` entry (`Fashion_Inc/`) was added to prevent accidental commit of ~4.2 GB of binary assets. This is the only change made.
- **[Verified]** Git LFS client installed (`git-lfs/3.6.1`) but **no `.gitattributes` exists** — LFS is not configured for this repository.
- **[Verified]** The separate GitHub repository `4Sighteducation/fashioninc` exists, is **empty**, and is currently **PUBLIC** (via `gh repo view`). The kickoff brief's provisional preference is a *private* repository. ⚠ Must be flipped to private before any purchased asset or unpublished design document is pushed.

## 2. Framework and toolchain

- **[Verified]** Framework: **Vite 8** (`vite ^8.1.1`, rolldown-based) + **React 19** (`react ^19.2.7`) + **TypeScript ~6.0.2**. Not Next.js; no SSR; pure static SPA build.
- **[Verified]** Package manager: **npm** (`package-lock.json` present; no yarn/pnpm lockfiles). npm 10.9.2 on the audit machine.
- **[Verified]** Node: v22.17.0 on the audit machine. **No `.nvmrc` / `.node-version` / `engines` field** — Node version is unpinned. [Inferred] Vercel will use its default Node runtime for builds.
- **[Verified]** Single app; no workspaces, no monorepo tooling (`package.json` has no `workspaces`; no turbo/nx config).

## 3. TypeScript configuration

- **[Verified]** Project references: `tsconfig.json` → `tsconfig.app.json` + `tsconfig.node.json`.
- **[Verified]** ⚠ **`strict` is NOT enabled.** `tsconfig.app.json` sets `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `verbatimModuleSyntax`, `erasableSyntaxOnly` — but no `strict: true`, so `strictNullChecks`, `noImplicitAny` etc. are off.
- **[Inferred]** The Fashion Virus code compiles today because it is small and disciplined, but a deterministic simulation kernel (Fashion Inc. law: one authoritative world state) should be built under full `strict` from day one. Retrofitting strict onto shared code later is costly.

## 4. Routing and entry points

- **[Verified]** Entry: `index.html` → `src/main.tsx`.
- **[Verified]** Routing: hand-rolled **hash routing** in `main.tsx` — `#world` lazy-loads the 3D world-builder (`src/world/WorldApp.tsx`); default renders the card game (`src/App.tsx`). No router library.
- **[Verified]** Code splitting: the three.js world is a separate lazy chunk (~900 kB min, 240 kB gzip); main game bundle ~505 kB min, 149 kB gzip.

## 5. Application modules

| Path | Purpose | Evidence |
|---|---|---|
| `src/game/types.ts` | Game state, ledger, cards, choices type model | [Verified] |
| `src/game/engine.ts` | Pure reducer state machine (`newGame`, `reduce`), no I/O, no React | [Verified] |
| `src/game/cards.ts` | 30+ card content corpus (converted from `docs/fashion-virus-30-cards.md`) | [Verified] |
| `src/game/act2.ts` | Act 2 repairs, allies, whispers, endings | [Verified] |
| `src/game/brand.ts` | Brand identity data (palettes, avatars, theses) | [Verified] |
| `src/game/format.ts` | Number/label formatting helpers | [Verified] |
| `src/components/*` (11 files) | React UI: Act1 desk, card modal, hinge, Act 2, end screen, brand setup, InfoTip | [Verified] |
| `src/lib/supabase.ts` | Anon Supabase client from `VITE_*` env (13 lines) | [Verified] |
| `src/lib/telemetry.ts` | Fire-and-forget run/event logging (56 lines) | [Verified] |
| `src/engine/island.ts` | Pure-TS procedural island gen (seeded RNG) for world-builder | [Verified] |
| `src/world/*` | React-three-fiber island visualisation (Milestone 1 only) | [Verified] |
| `scripts/simulate.ts` | Headless balance simulator run with `tsx` — proof the engine runs outside the DOM | [Verified] |

- **[Verified]** State management: React `useState` + `sessionStorage` persistence in `App.tsx`. **zustand 5.0.14 is installed but never imported anywhere** (reserved for world-builder milestone 2).
- **[Verified]** Engine purity: `src/game/engine.ts` uses `structuredClone`, `Math.random`, `crypto.randomUUID` — pure of DOM/React but **not deterministic** (unseeded RNG). `src/engine/island.ts` by contrast has a seeded RNG (`makeRng`). Relevant precedent for Fashion Inc.'s determinism law.

## 6. Tests, linting, formatting, CI

- **[Verified]** Tests: **none** (no vitest/jest config, no test files).
- **[Verified]** Linting: **oxlint** (`^1.71.0`) via `npm run lint`; no eslint, no config file (oxlint defaults).
- **[Verified]** Formatting: no prettier or other formatter config.
- **[Verified]** CI: **none** (no `.github/workflows`).
- **[Inferred]** Deployment verification relies entirely on Vercel's build passing.

## 7. Rendering / 3D dependencies

- **[Verified]** `three@0.185.1`, `@react-three/fiber@9.7.0`, `@react-three/drei@10.7.7` — already present for the Fashion Virus world-builder experiment; lazy-loaded so they do not affect the card game.
- **[Verified]** No Canvas2D/PixiJS/Babylon dependencies.

## 8. Server routes, functions, flags, monitoring

- **[Verified]** No server routes, API functions, edge functions, feature flags, or error-monitoring SDKs anywhere in the repo. The app is fully client-side; the only backend is Supabase via the anon key.

## 9. Build and deployment scripts

- **[Verified]** `dev` = vite; `build` = `tsc -b && vite build`; `preview` = vite preview; `lint` = oxlint. No deploy scripts; no `vercel.json`; no `.vercel` folder (project linked via Vercel dashboard, not CLI).

## 10. Notable facts for Fashion Inc.

1. **[Verified]** `Fashion_Inc/` (4.2 GB) sits untracked inside this repo's working tree — protected by `.gitignore` as of this audit, but it should move to a sibling folder when its own repo is created.
2. **[Verified]** The repo has no LFS, no CI, no tests, no strict TS — none of which hurts the card game, all of which would hurt a simulation product.
3. **[Verified]** The Fashion Virus game is healthy, deployed, and recently balance-tested; nothing in this audit found deployment risk to it *so long as Fashion Inc. work stays out of this repository*.
