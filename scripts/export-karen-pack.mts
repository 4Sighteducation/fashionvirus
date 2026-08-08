/**
 * Builds a downloadable pack for Karen: live card corpus + game dynamics + source docs.
 * Run: npx tsx scripts/export-karen-pack.mts
 */
import { copyFileSync, cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { CARDS, FUSE_LABELS } from '../src/game/cards.ts'
import { ALLIES, REPAIRS, WHISPERS } from '../src/game/act2.ts'
import type { Card, Choice } from '../src/game/types.ts'

const OUT = join(process.cwd(), 'exports', 'karen-game-pack')

function fmtSurface(s: Choice['surface']): string {
  const parts: string[] = []
  if (s.cash !== undefined) parts.push(`cash ${s.cash >= 0 ? '+' : ''}${s.cash}k`)
  if (s.heat !== undefined) parts.push(`heat ${s.heat >= 0 ? '+' : ''}${s.heat}`)
  if (s.novelty !== undefined) parts.push(`novelty ${s.novelty >= 0 ? '+' : ''}${s.novelty}`)
  if (s.social !== undefined) parts.push(`social ${s.social >= 0 ? '+' : ''}${s.social}`)
  return parts.length ? parts.join(', ') : 'none'
}

function fmtHidden(h: Choice['hidden']): string {
  if (!h) return ''
  return Object.entries(h)
    .map(([k, v]) => `${k} ${v >= 0 ? '+' : ''}${v}`)
    .join('; ')
}

function fmtChoice(c: Choice, i: number): string {
  const letter = String.fromCharCode(65 + i)
  const lines = [`**${letter}) ${c.label}**`]
  lines.push(`- Surface: ${fmtSurface(c.surface)}`)
  if (c.hidden && Object.keys(c.hidden).length) lines.push(`- Hidden: ${fmtHidden(c.hidden)}`)
  if (c.fuses?.length) lines.push(`- Fuses: ${c.fuses.join(', ')}`)
  if (c.clearsFuses?.length) lines.push(`- Clears fuses: ${c.clearsFuses.join(', ')}`)
  if (c.recurring) {
    const r = c.recurring
    lines.push(
      `- Recurring: ${[r.cash ? `cash ${r.cash}k/turn` : null, r.turns ? `${r.turns} turns` : 'rest of run', r.label].filter(Boolean).join(', ')}`,
    )
  }
  if (c.decayDelta) lines.push(`- Novelty decay +${c.decayDelta}/turn (permanent)`)
  if (c.worldStates?.length) lines.push(`- World states: ${c.worldStates.join(', ')}`)
  if (c.whisper) lines.push(`- Whisper: _"${c.whisper}"_`)
  if (c.reaction) lines.push(`- Reaction: _"${c.reaction}"_`)
  if (c.followUp) lines.push(`- Follow-up ping: ${Math.round(c.followUp.chance * 100)}% from ${c.followUp.from}`)
  if (c.kind) lines.push(`- Special: ${c.kind}`)
  if (c.requiresSocial) lines.push(`- Requires social ≥ ${c.requiresSocial}`)
  return lines.join('\n')
}

function cardSection(card: Card, index: number): string {
  const kind = card.crisis ? 'CRISIS' : card.id.startsWith('d_') ? 'DILEMMA' : 'STANDARD'
  const lines = [
    `### ${index}. ${card.title} (\`${card.id}\`) — ${kind}`,
    '',
    `- **Category:** ${card.category} · **Stage:** ${card.stage} (bedroom/indie / high street / global)`,
  ]
  if (card.character) lines.push(`- **Character:** ${card.character}`)
  if (card.crisis) lines.push(`- **Crisis trigger:** ${card.crisis.count}× tags [${card.crisis.tags.join(', ')}]`)
  lines.push('', card.body, '')
  if (card.depth) lines.push(`**LEARN MORE (depth):** ${card.depth}`, '')
  if (card.fact) lines.push(`**THE RECORD (fact):** ${card.fact}`, '')
  if (card.art) lines.push(`**ART prompt:** ${card.art}`, '')
  lines.push('', '**Choices:**', '')
  card.choices.forEach((c, i) => lines.push(fmtChoice(c, i), ''))
  return lines.join('\n')
}

function buildLiveCorpus(): string {
  const standard = CARDS.filter((c) => !c.crisis && !c.id.startsWith('d_'))
  const dilemma = CARDS.filter((c) => c.id.startsWith('d_'))
  const crisis = CARDS.filter((c) => c.crisis)

  const header = `# Fashion Virus — live card corpus (as implemented)

Exported from \`src/game/cards.ts\` on ${new Date().toISOString().slice(0, 10)}.

**Counts:** ${CARDS.length} total · ${standard.length} standard · ${dilemma.length} dilemma · ${crisis.length} crisis

This is what players see in the build today. Karen's original seeds live in \`docs/fashion-virus-30-cards.md\` and \`docs/fashion-virus-dilemma-cards.md\`; numbers and copy may differ slightly where the PoC was tuned.

---

## Standard cards (${standard.length})

`
  let body = header
  standard.forEach((c, i) => {
    body += cardSection(c, i + 1) + '\n---\n\n'
  })
  body += `\n## Dilemma cards (${dilemma.length})\n\n`
  dilemma.forEach((c, i) => {
    body += cardSection(c, i + 1) + '\n---\n\n'
  })
  body += `\n## Crisis cards (${crisis.length})\n\n`
  crisis.forEach((c, i) => {
    body += cardSection(c, i + 1) + '\n---\n\n'
  })
  return body
}

function buildDynamics(): string {
  return `# Fashion Virus — game dynamics (PoC reference)

For Karen: how the card data connects to systems. Source: \`src/game/engine.ts\`, \`src/game/types.ts\`, \`docs/fashion-virus-concept-v0.3.md\`.

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
${Object.entries(FUSE_LABELS)
  .map(([k, v]) => `| \`${k}\` | ${v} |`)
  .join('\n')}

**Crisis cards (6):** expose, fishkill, fire, boycott, fund_story, silicosis — each needs specific tag counts.

**Special choice kinds:** \`inspect\` (visit factory, costs a turn), \`audit\` (reveals all fuses), \`documentary_grant\` / \`documentary_decline\`.

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

${ALLIES.map((a) => `- **${a.name}** (social ≥ ${a.threshold}): _"${a.joinLine}"_`).join('\n')}

---

## Act 2 repairs (${REPAIRS.length} options)

${REPAIRS.map((r) => `- **${r.title}** (\`${r.id}\`): £${r.cost}k base · heals ${JSON.stringify(r.heals)}${r.requiresSocial ? ` · needs social ≥ ${r.requiresSocial}` : ''}`).join('\n')}

Repair costs scale with Act 1 damage score and prior repairs chosen.

---

## World states (dilemma outcomes that change the map)

Examples planted by dilemma cards: \`mill_town_dies\`, \`circular_theatre\`, \`whistleblower_blacklisted\`, \`someone_worse\`.

---

## Editing & telemetry standard (from dilemma doc)

A dilemma card is working when player choices split near 50/50. If 80%+ pick the same option, rewrite — it's a lecture. Supabase view \`card_choice_splits\` grades this automatically once players exist.

See \`docs/card-difficulty-review.md\` for hardening notes on the original 30 seeds.

---

## Card categories

materials · manufacturing · volume · funding · marketing · endoflife

Each standard card has: title, body, optional depth (LEARN MORE costs a turn), optional fact (THE RECORD after decision), art prompt, 2–4 choices with surface + hidden effects.
`
}

function buildReadme(): string {
  return `# Karen — Fashion Virus game content pack

Prepared for oversight, rewrite, and replacement of AI-generated material.

## What's in this folder

| File | Purpose |
|---|---|
| \`LIVE-CARD-CORPUS.md\` | **All ${CARDS.length} cards as implemented today** — copy, choices, effects, fuses, whispers |
| \`GAME-DYNAMICS.md\` | How cards connect to stats, ledger, fuses, crises, Act 2 |
| \`fashion-virus-30-cards.md\` | Your original 30-card seed document |
| \`fashion-virus-dilemma-cards.md\` | Your dilemma addendum (D1–D8) + editing principles |
| \`card-difficulty-review.md\` | Review of which seeds need hardening + new dilemma ideas |
| \`fashion-virus-concept-v0.3.md\` | Full game concept (Wiener, Schumacher, Piercy, Burtynsky framing) |
| \`facts-and-sources.md\` | Audited in-game facts and conversion factors |

## Suggested workflow for Karen

1. Read **GAME-DYNAMICS.md** first — understand what each field on a card *does*.
2. Review **LIVE-CARD-CORPUS.md** — this is what players currently see.
3. Compare against your **30-cards** and **dilemma** seeds — flag copy to keep, rewrite, or replace.
4. Use **card-difficulty-review.md** telemetry standard: aim for ~50/50 splits on dilemma cards.
5. Return revised cards in the same structure (or edit the markdown seeds; dev converts to \`cards.ts\`).

## Live build status (at export)

- Repo: \`4Sighteducation/fashionvirus\`, branch \`main\`
- Latest commit: Rebalance — clean path survivable (Aug 2026)
- Stack: React + TypeScript + Vite, Supabase telemetry, Vercel hosting
- Production build: passes (\`npm run build\`)

Questions: Tony / dev team.
`
}

function main(): void {
  mkdirSync(OUT, { recursive: true })

  writeFileSync(join(OUT, 'README-FOR-KAREN.md'), buildReadme())
  writeFileSync(join(OUT, 'LIVE-CARD-CORPUS.md'), buildLiveCorpus())
  writeFileSync(join(OUT, 'GAME-DYNAMICS.md'), buildDynamics())

  const docs = [
    'fashion-virus-30-cards.md',
    'fashion-virus-dilemma-cards.md',
    'card-difficulty-review.md',
    'fashion-virus-concept-v0.3.md',
    'facts-and-sources.md',
  ]
  for (const doc of docs) {
    const src = join(process.cwd(), 'docs', doc)
    if (existsSync(src)) copyFileSync(src, join(OUT, doc))
  }

  console.log(`Karen pack written to ${OUT}`)
  console.log(`Cards exported: ${CARDS.length}`)
}

main()
