# Fashion Inc. Phase 0 — Synty and Binary Asset Audit

Audit date: 2026-08-04. Location audited: `C:\dev\fashionvirus\Fashion_Inc\polygon\`. Labels: **[Verified]** / **[Inferred]** / **[Unknown]**.

## 1. Packs found

| Folder | Pack | Version evidence | Size |
|---|---|---|---|
| `polygon-city-01/` | POLYGON City | `POLYGON_City_Unity_2022_3_v1_12_3.unitypackage` → **v1.12.3** [Verified] | 1.4 GB |
| `polygon-shops-01/` | POLYGON Shops (Shopping Plaza content included — `PolygonMapsPlaza` Unreal map present) | `POLYGON_Shops_Unity_2022_3_v1_6_5.unitypackage` → **v1.6.5** [Verified] | 761 MB |
| `PolygonTown/` | POLYGON Town | `POLYGON_Town_Unity_2022_3_v1_9_1.unitypackage` → **v1.9.1** [Verified] | 805 MB |
| `PolygonNature/` | POLYGON Nature | `POLYGON_Nature_Unity_2022_3_v1_2_0.unitypackage` → **v1.2.0** [Verified] | 623 MB |
| `PolygonFarm/` | POLYGON Farm | Godot project (`project.godot`) + Unreal `.uproject`; **version [Unknown]** (no versioned archive name found) | 706 MB |

**[Verified]** Total: **4.2 GB**, **27,541 files**.

## 2. Formats — the packs are multi-engine distributions, not web assets

File-extension census [Verified]:

| Format | Count | Meaning |
|---|---|---|
| `.uasset` (5,543) + `.umap` (14) + `.uproject` (7) | 5,564 | **Unreal Engine** projects |
| `.tscn` (3,560) + `.tres` (292) + `.import` (3,184) + `.godot` | ~7,000 | **Godot** projects |
| `.unitypackage` (4 archives, one per pack except Farm) | 4 | **Unity** source archives (largest single files, >40 MB each) |
| `.fbx` (4,121) + `.obj` (3,694) | 7,815 | **Engine-agnostic source models** — the usable layer |
| `.png` (396) + `.tga` (21) + `.svg` (18) | 435 | Textures/icons |
| `.mb` / `.ma` (Maya) | 11+ | **Original DCC source files** (demo scenes, static meshes) |
| `.glb` / `.gltf` | **0** | ⚠ **No web-ready models exist** |

Key implications:

- **[Verified]** Original package/source files ARE mixed with runtime-usable assets: `.unitypackage` archives, Maya scenes, and per-engine project scaffolding sit alongside the raw FBX in `SourceFiles/` folders.
- **[Verified]** **Zero glTF/GLB.** For any web renderer (three.js or otherwise) a conversion pipeline (FBX → glTF via Blender or FBX2glTF, with texture atlas handling) is a prerequisite. Only the ~7,800 FBX/OBJ files plus the ~400 textures matter to the game; everything else is engine baggage.
- **[Verified]** The packs ship their own nested `.gitignore`/`.gitattributes`/`.editorconfig` (10 each, from engine project templates) — harmless while untracked, but they would fight the parent repo's config if ever committed as-is.

## 3. Content coverage

- **[Verified]** Characters: **69 character FBX files** across packs (City, Shops at minimum — `Models/Characters` and `FBX/Characters` directories).
- **[Verified]** Animations: only **4 FBX files** matched animation paths. **[Inferred]** These packs are environment/prop packs; character animation coverage is minimal. Rigs: Synty characters are typically humanoid-rigged **[Inferred — not verified per file]**; Unreal_Characters variants exist [Verified by folder names].
- **[Verified]** Vehicles: present in City (`SourceFiles/FBX/Veh/`).
- **[Verified]** Buildings/props: extensive across City, Town, Shops, Farm, Nature (thousands of FBX).
- **Gaps for Fashion Inc.** [Inferred against the PoC scope — one world, one utility jacket, one rival, one river, one crisis]:
  - **Industrial/factory interiors**: no dedicated garment-factory, textile-mill or dye-house assets in these five packs (Farm barns and City industrial edges can substitute early).
  - **Garments as objects**: no rack/garment/jacket meshes beyond shop-display props in Shops **[Inferred — spot-checked folder names, not every file]**. The signature "utility jacket the player recognises" will need custom or additional assets.
  - **River states**: Nature includes water planes/terrain, but no "polluted river" variant set; river degradation visuals will need shader/material work, not pack swaps.

## 4. Git status

- **[Verified]** Entirely **untracked**: zero `Fashion_Inc/` paths in git history; git status showed only `?? Fashion_Inc/` before this audit.
- **[Verified]** As of this audit, `Fashion_Inc/` is **explicitly gitignored** in the Fashion Virus repo as a guard rail (one `git add -A` would otherwise have attempted to stage 27,541 files / 4.2 GB).
- **[Verified]** Git LFS: client installed (3.6.1) but no `.gitattributes` in this repo — LFS is not active anywhere.
- **[Verified]** Deployment inclusion: none — Vite only bundles `src/` + `public/`; `Fashion_Inc/` is outside both.

## 5. Licence and provenance

- **[Verified]** Exactly **one** licence file exists across all five packs: `polygon-city-01/LICENCE.md`. The other four packs carry **no local licence or purchase-provenance record**.
- **[Unknown]** Purchase receipts / store account linkage (presumably in the Synty store account; not in the file system).
- **[Inferred, standard Synty terms]** Synty licences permit use in shipped games but **forbid redistribution of source assets**. Raw FBX/unitypackage files must therefore never be pushed to a **public** repository. Note: the new `4Sighteducation/fashioninc` GitHub repo is currently **PUBLIC** [Verified] — it must be made private, or (better) source packs kept out of git entirely.

## 6. Recommendations

1. **Do not put the raw packs in any git repository.** 4.2 GB of multi-engine sources doesn't belong in version control, even with LFS (GitHub LFS quota: 1–2 GB free tiers; cloning becomes miserable; licence exposure if visibility ever flips). Keep packs in local/cloud storage (e.g. a OneDrive/Backblaze folder) with a documented manifest.
2. **Version only the derived, game-ready assets**: a curated `assets/` of optimised `.glb` files + licence manifest, produced by a scripted FBX→glTF pipeline. Expected size: tens of MB, not GB. LFS optional at that scale.
3. Make `4Sighteducation/fashioninc` **private** before anything is pushed.
4. Record pack name + version + purchase date in a `ASSET_PROVENANCE.md` at the start (City v1.12.3, Shops v1.6.5, Town v1.9.1, Nature v1.2.0, Farm vUnknown — fill from store account).
5. Budget early work for the three content gaps: factory/dye-house kit-bashing, a hero utility-jacket asset, and river-state materials.
