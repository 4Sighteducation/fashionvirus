# Fashion Inc. Phase 0 — Repository Recommendation

Audit date: 2026-08-04. Options compared against verified facts in `REPOSITORY_AUDIT.md`, `SUPABASE_VERCEL_AUDIT.md`, `SYNTY_ASSET_AUDIT.md`, and the blueprint's provisional preference (Ch.21 / REP-003).

## Recommendation

**Option B — separate private GitHub repository + sibling local folder.**

**Confidence: High (≈90%).** The evidence converges with the blueprint's provisional preference; the remaining uncertainty is organisational (contractor access, publishing timeline), not technical.

Do **not** create a nested Git repository inside `C:\dev\fashionvirus`. Do **not** push anything until `4Sighteducation/fashioninc` is flipped from **PUBLIC → PRIVATE**.

## Option comparison

| Factor | A. Bounded module inside Fashion Virus | B. Separate private repo + sibling folder | Winner |
|---|---|---|---|
| Rendering dependencies | R3F already in this repo, but Gate B is OPEN; a later pivot to 2.5D/Canvas would churn Fashion Virus's lockfile and deploy size | Own dependency graph; Fashion Virus stays a light SPA | **B** |
| Synty binaries (4.2 GB, 0 glTF) | Even with LFS, packs would live near a public research game; licence risk if visibility or forks go wrong | Packs stay outside git; only curated runtime glTF enters Fashion Inc.; Fashion Virus never sees them | **B** |
| Git LFS | Would force LFS onto a repo that currently has none; every Fashion Virus clone pays the cost | Optional later, only if runtime assets grow; not required at scaffold | **B** |
| Build size / deploy cadence | Lazy `#world` chunk already ~900 kB; Fashion Inc. assets would either bloat the same Vercel project or need complex ignore rules | Separate Vercel project; Fashion Virus deploys untouched | **B** |
| Release cadence | Card-game balance hotfixes vs. sim spikes would collide on `main` | Independent release trains | **B** |
| Dependency upgrades | Vite 8 / React 19 / Three upgrades for the sim would risk the live card game | Upgrade freely per product | **B** |
| Supabase sharing | Same project possible with prefixes (blueprint allows) but couples quotas, RLS mistakes, key rotation | Separate project in same org; copy proven write-only pattern | **B** (share *pattern*, not project) |
| Vercel | One project = shared blast radius | Own project; Fashion Virus baseline protected | **B** |
| Protection of Fashion Virus | Soft protection via folders/flags — one bad `git add` or dependency bump still hurts | Hard isolation; `.gitignore` guard rail already proves the risk is real | **B** |
| Contractors / publishing | Contractors get the whole research card game; publishing Fashion Inc. means extracting later | Grant access to Fashion Inc. only; cleaner commercial path | **B** |
| Design docs (58k-line blueprint) | Already staged under `Fashion_Inc/` (now gitignored) — awkward either way | First commit of the new repo | **B** |
| Speed to first spike | Slightly faster (reuse tooling in place) | One-time scaffold cost (~half day) | **A** (marginal) |

Option A wins only on "start coding 4 hours sooner." Every structural factor favours B.

## Target layout (after approval)

```text
C:\dev\
  fashionvirus\          # existing; Fashion_Inc/ removed or left empty
  FashionInc\            # sibling; git root for 4Sighteducation/fashioninc (PRIVATE)
    docs\                # blueprint + Phase 0 reports (moved/copied)
    src\                 # simulation + app (strict TS)
    assets\
      source\            # optional thin manifests only — not 4.2 GB packs
      processed\
      runtime\           # curated .glb + textures for deploy
    supabase\
    .github\workflows\
```

Raw Synty packs live **outside** both repos, e.g. `C:\dev\FashionInc-source-art\polygon\` (or cloud archive), referenced by `ASSET_PROVENANCE.md`.

## Preconditions before creating / using the new repository

1. **Flip `4Sighteducation/fashioninc` to private** — [Verified] currently PUBLIC and empty.
2. Confirm no secrets or pack paths will be in the first commit.
3. Keep Fashion Virus `main` deployable (it already is at `5963a58`).
4. Relocate `C:\dev\fashionvirus\Fashion_Inc\` contents to the sibling folder (or copy Docs + leave packs in a source-art archive) — **after** approval; not during this audit.
5. Never `git init` inside `fashionvirus/Fashion_Inc`.

## What to share vs. isolate

| Resource | Share? |
|---|---|
| Philosophy / research docs | Cite / copy into Fashion Inc. docs |
| Telemetry RLS pattern | Copy as adapter |
| Typography choice | Re-install Fontsource packages in new repo |
| Supabase **project** | **No** — new project in same org |
| Vercel **project** | **No** |
| Auth system | N/A today; anonymous-first later |
| Synty packs | Outside git entirely |
| Fashion Virus engine/UI | No runtime dependency |

## Entire readiness (tied to this recommendation)

- **[Verified]** No Entire CLI, config directory, or Cursor `hooks.json` found on the audit machine.
- **[Unknown]** Whether Entire's GitHub App is linked to `4Sighteducation/*` org-wide (user stated "linked to all my repos").
- **Recommendation:** Configure Entire against the **new private** Fashion Inc. repo (and optionally Fashion Virus) with redaction rules that exclude `.env*`, `**/polygon/**`, `**/*.unitypackage`, `**/*.uasset`, `**/*.fbx` source trees, and any service-role keys. Do not upload purchased source assets or secrets into Entire checkpoints. Compatible with Option B; Option A would mix two products' agent memory in one repo context.

## Verdict line (for Chapter 21 lock)

> Repository restructuring is required before Fashion Inc. implementation. Separate private application recommended. Simulation may begin only after the sibling repo is scaffolded, packs are outside git, and Gate G0 criteria are met.
