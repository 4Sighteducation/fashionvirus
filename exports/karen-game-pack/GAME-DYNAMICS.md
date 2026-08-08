# Fashion Virus — game dynamics (PoC reference)

For Karen: how the card data connects to systems. Source: `src/game/engine.ts`, `src/game/types.ts`, `docs/fashion-virus-concept-v0.3.md`.

---

## Structure

| Phase | Turns | What happens |
|---|---|---|
| Brand setup | — | Player names label, picks palette/avatar/thesis |
| Act 1 — Fashion Virus | 16 seasons | One dilemma card per turn; hidden ledger accumulates |
| Hinge | — | Awards fanfare → reveal of damage |
| Act 2 — Wasteworld | 5 years | Repair budget; choose Schumacher-style repairs |
| End | — | Ledger converted to tangible comparisons (pools, flights, lives) |

**Stage bands (which cards appear):** turns 1–5 = stage 1 (bedroom/indie), 6–11 = stage 2 (high street), 12–16 = stage 3 (global).

---

## Surface stats (what the player sees)

| Stat | Range | Role |
|---|---|---|
| **Cash** | £k pool | Revenue + capital folded together for PoC |
| **Heat** | 0–100 | Brand visibility / hype |
| **Novelty** | 0–100 | Decays every turn — the novelty trap |
| **Social** | 0–100 | Trust, belonging, ambassadors — slow to earn |

Starting values: cash £20k, heat 10, novelty 50, social 5.

**Novelty decay:** base 7/turn (thesis adjusts). At novelty 0, cash and heat take a hit — softer if social ≥ 50.

**Social buffer:** social ≥ 50 softens novelty-collapse penalties. Social ≥ 60 absorbs one crisis (halves negative crisis effects, once per run).

---

## Hidden ledger (what the player mostly cannot see)

| Key | Unit |
|---|---|
| water | million litres polluted/drawn |
| carbon | tonnes CO₂e |
| waste | tonnes to landfill/incineration/export |
| microplastics | kg fibres shed |
| labour | thousand poverty-wage / excess hours |
| land | hectares cleared/degraded |

Whispers fire at thresholds (see WHISPERS section). Card choices also carry inline whispers.

---

## Fuses (tag system — consequences fire on tags, not cards)

Duplicate tags = higher severity. Crisis cards interrupt when enough tags accumulate.

| Fuse id | Label shown on audit |
|---|---|
| `toxic_discharge` | untreated dye discharge |
| `supply_chain_opacity` | unaudited subcontracting |
| `worker_grievance` | wage and safety grievances |
| `undisclosed_animal_research` | a backer’s undisclosed animal research |
| `greenwashing_claim` | claims your practice does not support |
| `sandblast` | sandblasted finishing |

**Crisis cards (6):** expose, fishkill, fire, boycott, fund_story, silicosis — each needs specific tag counts.

**Special choice kinds:** `inspect` (visit factory, costs a turn), `audit` (reveals all fuses), `documentary_grant` / `documentary_decline`.

---

## Phone pings & desk actions

- **Follow-ups:** many choices spawn probabilistic phone pings between seasons.
- **Desk actions (once per season):** repair clinic, teaser drop, authorise overtime, sit tight.

---

## Brand thesis (setup choice reshapes outcomes)

| Thesis | Effect |
|---|---|
| growth | +novelty decay speed; social gains ×0.6 |
| integrity | social gains ×1.4; cash gains ×0.9 |
| craft | heat gains ×0.7; +£12k Act 2 repair budget |
| social_enterprise | +10 social start, −£3k cash; one emergency community grant if bankrupt |

---

## Allies (social milestones → named characters)

- **Yan Rong** (social ≥ 25): _"Yan Rong starts a Tuesday mending class in the studio. You didn’t ask her to."_
- **The geography teacher** (social ≥ 45): _"The geography teacher who once tagged you in a beach photo writes again — this time about her class’s repair project."_
- **The youth ambassadors** (social ≥ 65): _"Six teenagers run your resale pop-up better than your retail team ever did. They call themselves the ambassadors."_
- **The volunteer corps** (social ≥ 85): _"There is a waiting list to volunteer. Forty names. People want to be part of what you’re making."_

---

## Act 2 repairs (8 options)

- **The repair hub** (`repair-hub`): £35k base · heals {"waste":6,"labour":30}
- **Bioremediation** (`bioremediation`): £55k base · heals {"water":1.2}
- **Land rest** (`land-rest`): £8k base · heals {"land":14,"waste":3}
- **The micro-mill** (`micro-mill`): £70k base · heals {"carbon":90,"labour":25,"microplastics":120}
- **Skills transfer** (`skills`): £20k base · heals {"waste":5,"labour":20}
- **Commons ownership** (`commons`): £45k base · heals {"labour":35,"waste":5,"land":5}
- **The youth programme** (`youth_programme`): £12k base · heals {"labour":25,"waste":4} · needs social ≥ 45
- **Volunteer restoration days** (`volunteer_days`): £5k base · heals {"waste":5,"land":8,"labour":10,"water":0.3} · needs social ≥ 65

Repair costs scale with Act 1 damage score and prior repairs chosen.

---

## World states (dilemma outcomes that change the map)

Examples planted by dilemma cards: `mill_town_dies`, `circular_theatre`, `whistleblower_blacklisted`, `someone_worse`.

---

## Editing & telemetry standard (from dilemma doc)

A dilemma card is working when player choices split near 50/50. If 80%+ pick the same option, rewrite — it's a lecture. Supabase view `card_choice_splits` grades this automatically once players exist.

See `docs/card-difficulty-review.md` for hardening notes on the original 30 seeds.

---

## Card categories

materials · manufacturing · volume · funding · marketing · endoflife

Each standard card has: title, body, optional depth (LEARN MORE costs a turn), optional fact (THE RECORD after decision), art prompt, 2–4 choices with surface + hidden effects.
