import { CARDS, FUSE_LABELS, cardById } from './cards'
import { WHISPERS, damageScore, repairById } from './act2'
import type { Card, Choice, GameState, Ledger } from './types'

export const ACT1_TURNS = 12
export const ACT2_TURNS = 3
const BASE_NOVELTY_DECAY = 7
const STARTING_CASH = 20

const emptyLedger = (): Ledger => ({
  water: 0,
  carbon: 0,
  waste: 0,
  microplastics: 0,
  labour: 0,
  land: 0,
})

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function stageForTurn(turn: number): 1 | 2 | 3 {
  if (turn <= 4) return 1
  if (turn <= 8) return 2
  return 3
}

export function newGame(): GameState {
  const deck: Record<1 | 2 | 3, string[]> = { 1: [], 2: [], 3: [] }
  for (const card of CARDS) {
    if (!card.crisis) deck[card.stage].push(card.id)
  }
  deck[1] = shuffle(deck[1])
  deck[2] = shuffle(deck[2])
  deck[3] = shuffle(deck[3])

  const first = deck[1].shift() ?? null

  return {
    phase: 'start',
    runId: crypto.randomUUID(),
    turn: 1,
    cash: STARTING_CASH,
    heat: 10,
    novelty: 50,
    noveltyDecay: BASE_NOVELTY_DECAY,
    ledger: emptyLedger(),
    fuses: [],
    fusesRevealed: false,
    recurring: [],
    worldStates: [],
    deck,
    currentCardId: first,
    looked: false,
    learnMoreCount: 0,
    reaction: null,
    whisper: null,
    firedWhispers: [],
    firedCrises: [],
    folded: false,
    act2: { turn: 1, budget: 0, repairsChosen: [], healed: emptyLedger() },
  }
}

function countFuses(state: GameState, tags: string[]): number {
  return state.fuses.filter((f) => tags.includes(f)).length
}

/** Crisis check: any unfired crisis card whose tag threshold is met may fire. */
function maybeCrisis(state: GameState): Card | null {
  const candidates = CARDS.filter((c) => {
    if (!c.crisis || state.firedCrises.includes(c.id)) return false
    return countFuses(state, c.crisis.tags) >= c.crisis.count
  })
  if (candidates.length === 0) return null
  // Consequences are probabilistic — a fuse is a fuse, not a timer.
  if (Math.random() > 0.55) return null
  return candidates[Math.floor(Math.random() * candidates.length)]
}

function drawNext(state: GameState): string | null {
  const crisis = maybeCrisis(state)
  if (crisis) {
    state.firedCrises.push(crisis.id)
    return crisis.id
  }
  const stage = stageForTurn(state.turn)
  for (const s of [stage, 3, 2, 1] as const) {
    const id = state.deck[s].shift()
    if (id) return id
  }
  return null
}

function checkWhispers(state: GameState): void {
  for (const w of WHISPERS) {
    if (state.firedWhispers.includes(w.id)) continue
    if (w.when(state.ledger, state.novelty)) {
      state.firedWhispers.push(w.id)
      state.whisper = w.text
      return
    }
  }
  state.whisper = null
}

function applyLedger(ledger: Ledger, delta: Partial<Ledger>): void {
  for (const [key, value] of Object.entries(delta)) {
    const k = key as keyof Ledger
    ledger[k] = Math.max(0, ledger[k] + value)
  }
}

function applySurface(state: GameState, choice: Choice): void {
  state.cash += choice.surface.cash ?? 0
  state.heat = Math.min(100, Math.max(0, state.heat + (choice.surface.heat ?? 0)))
  state.novelty = Math.min(100, Math.max(0, state.novelty + (choice.surface.novelty ?? 0)))
}

/** Advance the market clock one tick: recurring effects, then novelty decay. */
function tick(state: GameState): void {
  for (const r of state.recurring) {
    state.cash += r.cash ?? 0
    if (r.hidden) applyLedger(state.ledger, r.hidden)
    if (r.turns !== undefined) r.turns -= 1
  }
  state.recurring = state.recurring.filter((r) => r.turns === undefined || r.turns > 0)
  state.novelty = Math.max(0, state.novelty - state.noveltyDecay)
  if (state.novelty <= 0) {
    // Unsold stock, unpaid invoices. The trap has teeth.
    state.cash -= 8
    state.heat = Math.max(0, state.heat - 4)
  }
}

export type Action =
  | { type: 'start' }
  | { type: 'learn_more' }
  | { type: 'choose'; choiceId: string }
  | { type: 'enter_act2' }
  | { type: 'repair'; repairId: string }
  | { type: 'skip_repair' }
  | { type: 'finish' }
  | { type: 'restart' }

export function reduce(prev: GameState, action: Action): GameState {
  const state: GameState = structuredClone(prev)

  switch (action.type) {
    case 'start': {
      state.phase = 'act1'
      return state
    }

    case 'learn_more': {
      if (state.looked || !state.currentCardId) return prev
      // Looking costs a turn: the clock advances, the market cools, the card waits.
      state.looked = true
      state.learnMoreCount += 1
      if (state.turn < ACT1_TURNS) state.turn += 1
      tick(state)
      state.reaction = null
      return state
    }

    case 'choose': {
      if (!state.currentCardId) return prev
      const card = cardById(state.currentCardId)
      const choice = card.choices.find((c) => c.id === action.choiceId)
      if (!choice) return prev

      // ── special kinds ──
      if (choice.kind === 'inspect') {
        // Costs the turn, reveals the depth for free. The card waits.
        applySurface(state, choice)
        state.looked = true
        if (state.turn < ACT1_TURNS) state.turn += 1
        tick(state)
        state.reaction = null
        return state
      }

      applySurface(state, choice)
      if (choice.hidden) applyLedger(state.ledger, choice.hidden)
      if (choice.fuses) state.fuses.push(...choice.fuses)
      if (choice.clearsFuses) {
        for (const tag of choice.clearsFuses) {
          const i = state.fuses.indexOf(tag)
          if (i !== -1) state.fuses.splice(i, 1)
        }
      }
      if (choice.recurring) state.recurring.push({ ...choice.recurring })
      if (choice.decayDelta) state.noveltyDecay += choice.decayDelta
      if (choice.worldStates) {
        for (const ws of choice.worldStates) {
          if (!state.worldStates.includes(ws)) state.worldStates.push(ws)
        }
      }
      state.reaction = choice.reaction ?? null
      if (choice.whisper) state.whisper = choice.whisper

      if (choice.kind === 'audit') {
        // The real audit: the hidden machinery, itemised.
        state.fusesRevealed = true
        const found = [...new Set(state.fuses)].map((f) => FUSE_LABELS[f] ?? f)
        state.reaction =
          found.length > 0
            ? `The audit finds: ${found.join('; ')}. You now know what you knew.`
            : 'The audit comes back clean. It cost a fortune and it was worth it.'
      }

      if (choice.kind === 'documentary_grant') {
        if (state.fuses.length >= 2) {
          // Everything comes out, early, on your terms — at a price.
          state.cash -= 30
          state.heat = Math.max(0, state.heat - 8)
          state.firedCrises = CARDS.filter((c) => c.crisis).map((c) => c.id)
          state.reaction = 'The film is fair. That is the problem. The worst of it is out — early, and on your terms.'
        } else {
          state.heat = Math.min(100, state.heat + 12)
          state.reaction = 'The film finds a business trying. It says so. It is the best campaign you never commissioned.'
        }
      }
      if (choice.kind === 'documentary_decline') {
        // Every active fuse burns a little hotter.
        state.fuses.push(...new Set(state.fuses))
        state.reaction = 'The film happens anyway. Your logo is in the b-roll, twice.'
      }

      tick(state)

      // Ruin check — the systems, not the author.
      if (state.cash <= -40) {
        state.folded = true
        state.phase = 'end'
        return state
      }

      state.turn += 1
      state.looked = false

      if (state.turn > ACT1_TURNS) {
        state.currentCardId = null
        state.phase = 'hinge'
        return state
      }

      state.currentCardId = drawNext(state)
      if (!state.currentCardId) {
        state.phase = 'hinge'
        return state
      }
      if (!choice.whisper) checkWhispers(state)
      return state
    }

    case 'enter_act2': {
      state.phase = 'act2'
      // The crash takes most of it. You arrive poor.
      state.act2.budget = Math.max(15, Math.round(state.cash * 0.25))
      return state
    }

    case 'repair': {
      const repair = repairById(action.repairId)
      const damage = damageScore(state.ledger)
      // Repair costs scale with how broken the world is.
      const cost = Math.round(repair.cost * (1 + damage))
      if (cost > state.act2.budget) return prev
      state.act2.budget -= cost
      state.act2.repairsChosen.push(repair.id)
      for (const [key, value] of Object.entries(repair.heals)) {
        const k = key as keyof Ledger
        const healed = Math.min(state.ledger[k], value)
        state.ledger[k] -= healed
        state.act2.healed[k] += healed
      }
      state.act2.turn += 1
      if (state.act2.turn > ACT2_TURNS) state.phase = 'end'
      return state
    }

    case 'skip_repair': {
      state.act2.turn += 1
      if (state.act2.turn > ACT2_TURNS) state.phase = 'end'
      return state
    }

    case 'finish': {
      state.phase = 'end'
      return state
    }

    case 'restart': {
      return newGame()
    }

    default:
      return prev
  }
}

export { damageScore }
