# Fashion Inc. Phase 0 → G1 — First 30-Day Plan

Audit date: 2026-08-04. Aligned with roadmap v0.1.36 and blueprint Phase 0–1. **No implementation begins until this Phase 0 audit is approved.**

Assumes the repository recommendation (separate private repo + sibling folder) is accepted. If Option A is chosen instead, Week 2 changes shape but Weeks 3–4 spikes remain.

## Week 1 — Close Phase 0 (approval + hygiene)

**Goal:** G0 ready to sign.

| Day focus | Actions | Exit criteria |
|---|---|---|
| Approval | Review the seven Phase 0 reports; accept or contest Option B | Written go/no-go on repository decision |
| GitHub hygiene | Make `4Sighteducation/fashioninc` **private**; add branch protection on `main` once first commit lands | Visibility = private |
| Source-art home | Choose location for raw Synty packs **outside** both repos; write `ASSET_PROVENANCE.md` (pack + version + purchase date) | Packs not in any git working tree destined for commit |
| Entire | Confirm org linkage; configure redaction/exclusions (env, polygon, unitypackage, uasset, fbx source); one safe checkpoint test with a docs-only change | Searchable checkpoint without secrets/assets |
| Docs | Copy blueprint + checklists + these Phase 0 reports into the new repo's `docs/` | Canonical docs versioned |
| Missing one-pager | Regenerate or drop reference to `fashion-inc-golden-rules-one-page-v0.1.39.md` (rules live in blueprint Ch.25) | No broken file references |

**Not this week:** renderer install, migrations, simulation kernel, bulk FBX conversion.

## Week 2 — Scaffold the sibling product

**Goal:** Empty-but-strict Fashion Inc. app that builds and deploys.

1. Create sibling folder `C:\dev\FashionInc` (or agreed name); `git init` / clone private `fashioninc`; **never** nest inside Fashion Virus.
2. Scaffold: Vite + React 19 + TypeScript with **`strict: true`**, `engines.node`, oxlint, prettier (optional), vitest, GitHub Actions (`typecheck` + `test` + `build`).
3. Folder skeleton: `src/sim/`, `src/app/`, `src/content/`, `assets/{source,processed,runtime}/`, `supabase/migrations/`, `docs/`.
4. `.gitignore` + `.vercelignore` excluding `assets/source`, any polygon paths, `.env*`.
5. New Supabase project (same org); empty migration stub; publishable key in Vercel preview/production as `VITE_*` only.
6. New Vercel project bound to Fashion Inc. repo; confirm Fashion Virus Vercel project is untouched.
7. Move/remove `C:\dev\fashionvirus\Fashion_Inc\` from the Fashion Virus working tree once contents are relocated (keep Fashion Virus `.gitignore` entry as a belt-and-braces guard).

**Gate check:** `npm run build` green on CI; Fashion Virus still deploys from its own repo unchanged.

## Week 3 — Five spikes (Gate G1 evidence)

Run in parallel where possible; each spike has a kill criterion.

| Spike | Question | Minimum deliverable | Kill / pivot |
|---|---|---|---|
| **A — Renderer** | Constrained low-poly 3D (R3F candidate) vs 2.5D viable in browser? | One town block + orbit/pan camera at 60 fps laptop target | If 3D untenable → 2.5D |
| **B — Garment** | Can one utility jacket read as “mine” on one Synty character? | Single converted character + jacket mesh/material; screenshot at human zoom | If clipping/rig fails → four fixed meshes / 2D close-up hybrid |
| **C — River** | Four states readable without colour alone? | Stable / Under Pressure / Declining / Recovering prototype | If unreadable → rethink materials before building ecology systems |
| **D — Sim kernel** | Deterministic ticks + commands + save? | Headless: seed → N ticks → checksum; reload → same checksum; vitest | If nondeterminism appears → stop feature work until fixed |
| **E — World link** | Can a logical shipment drive a visible vehicle without the animation owning state? | One route; vehicle interpolates from sim output only | If animation mutates state → architectural violation; redesign binding |

**Asset work this week:** convert **only** the handful of FBX files needed for spikes A–C (scripted FBX→glTF). No bulk pack import.

## Week 4 — Feasibility review and lock

1. Performance + feasibility write-up against G1 criteria (roadmap): viable renderer; jacket recognition achievable; river readable; deterministic save/reload; vehicle follows logical route; repo supports asset pipeline.
2. Decision: **pass G1** / **pivot** (3D→2.5D, modular→fixed garments) / **repeat** one spike.
3. Revise blueprint Chapters 21–22 from evidence (renderer choice, LFS/runtime asset policy, garment method).
4. Freeze **Not Now** register (multiplayer, microservices, full modular wardrobe, live AI provider, etc.).
5. Plan Phase 2 (greybox tycoon) only if G1 passes — collection → cash → one supply route → warehouse → retail → launch.

## Capacity assumptions (fill in)

| Item | Owner input needed |
|---|---|
| Hours/week available | ___ |
| Technical-art / garment help | Yes / No / Later |
| Cash ceiling before G2 | ___ |
| Target first-playthrough length | Provisional 60–120 min (confirm) |

## Explicitly deferred (Not Now)

- Live Narrative AI provider integration
- Authenticated cloud accounts
- Bulk Synty conversion / LFS of source packs
- Full rival AI, full ecology, full Strategy Meeting staff
- Any change to the live Fashion Virus game beyond keeping the `Fashion_Inc/` gitignore guard

## Success definition for day 30

Phase 0 closed, Option B executed, G1 evidence in hand, Fashion Virus baseline untouched, and a written pass/pivot/stop recommendation for Phase 2 — not a feature-complete game.
