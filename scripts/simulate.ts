// Balance simulator: plays full Act 1 runs with scripted player policies
// and reports fold rates and outcome distributions.
// Run: npx tsx scripts/simulate.ts

import { cardById } from '../src/game/cards'
import { damageScore, ending } from '../src/game/act2'
import { newGame, reduce } from '../src/game/engine'
import type { Choice, GameState } from '../src/game/types'

type PolicyName = 'clean' | 'growth' | 'random'

function hiddenLoad(choice: Choice): number {
  if (!choice.hidden) return 0
  return Object.values(choice.hidden).reduce((s, v) => s + (v ?? 0), 0)
}

function pickChoice(state: GameState, policy: PolicyName): Choice {
  const card = cardById(state.currentCardId!)
  const available = card.choices.filter(
    (c) => c.kind !== 'inspect' && (!c.requiresSocial || state.social >= c.requiresSocial),
  )
  const pool = available.length > 0 ? available : card.choices

  if (policy === 'random') {
    return pool[Math.floor(Math.random() * pool.length)]
  }
  if (policy === 'growth') {
    return [...pool].sort(
      (a, b) =>
        (b.surface.cash ?? 0) + (b.surface.novelty ?? 0) + (b.surface.heat ?? 0) -
        ((a.surface.cash ?? 0) + (a.surface.novelty ?? 0) + (a.surface.heat ?? 0)),
    )[0]
  }
  // clean: minimise hidden damage and fuses; tie-break on social then cash.
  // Budget-aware: a real player won't spend into the fold zone if there's any alternative.
  const affordable = pool.filter((c) => state.cash + (c.surface.cash ?? 0) > -25)
  const cleanPool = affordable.length > 0 ? affordable : pool
  return [...cleanPool].sort((a, b) => {
    const loadA = hiddenLoad(a) + (a.fuses?.length ?? 0) * 5 - (a.clearsFuses?.length ?? 0) * 5
    const loadB = hiddenLoad(b) + (b.fuses?.length ?? 0) * 5 - (b.clearsFuses?.length ?? 0) * 5
    if (loadA !== loadB) return loadA - loadB
    const goodA = (a.surface.social ?? 0) * 2 + (a.surface.cash ?? 0)
    const goodB = (b.surface.social ?? 0) * 2 + (b.surface.cash ?? 0)
    return goodB - goodA
  })[0]
}

function resolvePing(state: GameState, policy: PolicyName): GameState {
  if (!state.pendingPing) return state
  const options = state.pendingPing.options
  let option = options[0]
  if (policy === 'clean') {
    option = [...options].sort(
      (a, b) =>
        (a.fuses?.length ?? 0) - (a.clearsFuses?.length ?? 0) -
        ((b.fuses?.length ?? 0) - (b.clearsFuses?.length ?? 0)),
    )[0]
  } else if (policy === 'growth') {
    option = [...options].sort(
      (a, b) => (b.surface?.cash ?? 0) + (b.surface?.novelty ?? 0) - ((a.surface?.cash ?? 0) + (a.surface?.novelty ?? 0)),
    )[0]
  } else {
    option = options[Math.floor(Math.random() * options.length)]
  }
  return reduce(state, { type: 'resolve_ping', optionId: option.id })
}

interface RunResult {
  folded: boolean
  foldTurn: number | null
  cash: number
  social: number
  damage: number
  register: string
  minCash: number
}

function playRun(
  policy: PolicyName,
  useDeskActions: boolean,
  thesisOverride?: 'growth' | 'integrity' | 'craft' | 'social_enterprise',
): RunResult {
  let state = newGame()
  state = reduce(state, { type: 'start' })
  state = reduce(state, {
    type: 'setup_brand',
    brand: {
      name: 'Sim',
      paletteId: 'ink_bone',
      avatarId: 'monogram',
      thesis:
        thesisOverride ?? (policy === 'clean' ? 'integrity' : policy === 'growth' ? 'growth' : 'craft'),
    },
  })

  let minCash = state.cash
  let guard = 0
  while (state.phase === 'act1' && guard++ < 200) {
    state = resolvePing(state, policy)
    if (state.phase !== 'act1') break

    if (useDeskActions && !state.deskActionUsed) {
      if (policy === 'clean' && state.cash >= 12) {
        state = reduce(state, { type: 'desk_action', actionId: 'repair_clinic' })
      } else if (policy === 'growth' && state.novelty < 30) {
        state = reduce(state, { type: 'desk_action', actionId: 'teaser' })
      }
    }
    if (!state.currentCardId) break
    const choice = pickChoice(state, policy)
    const next = reduce(state, { type: 'choose', choiceId: choice.id })
    if (next === state) break // locked or invalid; avoid infinite loop
    state = next
    minCash = Math.min(minCash, state.cash)
  }

  const damage = damageScore(state.ledger)
  const end = ending(state.cash + state.act2.budget, damage, state.folded, state.social)
  return {
    folded: state.folded,
    foldTurn: state.folded ? state.turn : null,
    cash: state.cash,
    social: state.social,
    damage,
    register: end.register,
    minCash,
  }
}

function summarise(name: string, results: RunResult[]): void {
  const folds = results.filter((r) => r.folded)
  const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0)
  const registers = new Map<string, number>()
  for (const r of results) registers.set(r.register, (registers.get(r.register) ?? 0) + 1)
  console.log(`\n=== ${name} (n=${results.length}) ===`)
  console.log(`fold rate: ${((folds.length / results.length) * 100).toFixed(1)}%`)
  if (folds.length) console.log(`avg fold turn: ${avg(folds.map((r) => r.foldTurn!)).toFixed(1)}`)
  console.log(`avg final cash: £${avg(results.map((r) => r.cash)).toFixed(0)}k`)
  console.log(`avg min cash: £${avg(results.map((r) => r.minCash)).toFixed(0)}k`)
  console.log(`avg social: ${avg(results.map((r) => r.social)).toFixed(0)}`)
  console.log(`avg damage: ${avg(results.map((r) => r.damage)).toFixed(2)}`)
  console.log(
    'endings:',
    [...registers.entries()].map(([k, v]) => `${k} ${(100 * v / results.length).toFixed(0)}%`).join(' · '),
  )
}

const N = 1000
for (const policy of ['clean', 'growth', 'random'] as PolicyName[]) {
  for (const desk of [false, true]) {
    const results = Array.from({ length: N }, () => playRun(policy, desk))
    summarise(`${policy}${desk ? ' + desk actions' : ''}`, results)
  }
}
summarise(
  'clean, social enterprise',
  Array.from({ length: N }, () => playRun('clean', false, 'social_enterprise')),
)
summarise(
  'clean, social enterprise + desk actions',
  Array.from({ length: N }, () => playRun('clean', true, 'social_enterprise')),
)
