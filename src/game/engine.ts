import { CARDS, FUSE_LABELS, cardById } from './cards'
import { ALLIES, WHISPERS, damageScore, repairById, repairCost } from './act2'
import type {
  BrandIdentity,
  Card,
  Choice,
  DeskActionId,
  FollowUpOption,
  GameState,
  Ledger,
  SurfaceEffects,
} from './types'

export const ACT1_TURNS = 16
export const ACT2_TURNS = 5
export const SOCIAL_BUFFER_AT = 50
export const CRISIS_SHIELD_AT = 60
const BASE_NOVELTY_DECAY = 7
const STARTING_CASH = 20
const STARTING_SOCIAL = 5

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

export function stageForTurn(turn: number): 1 | 2 | 3 {
  if (turn <= 5) return 1
  if (turn <= 11) return 2
  return 3
}

/** Abstract fuse pressure for the desk gauge — never names the ledger. */
export function pressureLevel(fuses: string[]): 'quiet' | 'uneasy' | 'volatile' {
  const n = fuses.length
  if (n >= 5) return 'volatile'
  if (n >= 2) return 'uneasy'
  return 'quiet'
}

export function pressureLabel(level: 'quiet' | 'uneasy' | 'volatile'): string {
  if (level === 'volatile') return 'Volatile'
  if (level === 'uneasy') return 'Uneasy'
  return 'Quiet'
}

export function newGame(preservedBrand?: BrandIdentity | null): GameState {
  const deck: Record<1 | 2 | 3, string[]> = { 1: [], 2: [], 3: [] }
  for (const card of CARDS) {
    if (!card.crisis) deck[card.stage].push(card.id)
  }
  deck[1] = shuffle(deck[1])
  deck[2] = shuffle(deck[2])
  deck[3] = shuffle(deck[3])

  const first = deck[1].shift() ?? null
  const brand = preservedBrand ?? null

  return {
    phase: 'start',
    runId: crypto.randomUUID(),
    turn: 1,
    cash: STARTING_CASH,
    heat: 10,
    novelty: 50,
    social: STARTING_SOCIAL,
    allies: [],
    allyToast: null,
    crisisShieldUsed: false,
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
    lastFact: null,
    whisper: null,
    firedWhispers: [],
    firedCrises: [],
    folded: false,
    act2: { turn: 1, budget: 0, repairsChosen: [], healed: emptyLedger() },
    brand,
    pendingPing: null,
    history: [{ turn: 1, cash: STARTING_CASH, heat: 10, novelty: 50, social: STARTING_SOCIAL }],
    deskActionUsed: false,
    teaserCount: 0,
    grantUsed: false,
  }
}

function countFuses(state: GameState, tags: string[]): number {
  return state.fuses.filter((f) => tags.includes(f)).length
}

function maybeCrisis(state: GameState): Card | null {
  const candidates = CARDS.filter((c) => {
    if (!c.crisis || state.firedCrises.includes(c.id)) return false
    return countFuses(state, c.crisis.tags) >= c.crisis.count
  })
  if (candidates.length === 0) return null
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

function applySurfaceDelta(state: GameState, surface: SurfaceEffects | undefined): void {
  if (!surface) return
  state.cash += surface.cash ?? 0
  state.heat = Math.min(100, Math.max(0, state.heat + (surface.heat ?? 0)))
  state.novelty = Math.min(100, Math.max(0, state.novelty + (surface.novelty ?? 0)))
  state.social = Math.min(100, Math.max(0, state.social + (surface.social ?? 0)))
}

/** Thesis reshapes how surface deltas land. */
function thesisScale(state: GameState, surface: SurfaceEffects): SurfaceEffects {
  const thesis = state.brand?.thesis
  if (!thesis) return surface
  const out = { ...surface }
  if (thesis === 'growth') {
    if (out.social && out.social > 0) out.social = Math.max(1, Math.round(out.social * 0.6))
  } else if (thesis === 'integrity') {
    if (out.social && out.social > 0) out.social = Math.round(out.social * 1.4)
    if (out.cash && out.cash > 0) out.cash = Math.max(1, Math.round(out.cash * 0.9))
  } else if (thesis === 'craft') {
    if (out.heat && out.heat > 0) out.heat = Math.max(1, Math.round(out.heat * 0.7))
  } else if (thesis === 'social_enterprise') {
    if (out.social && out.social > 0) out.social = Math.round(out.social * 1.4)
    if (out.cash && out.cash > 0) out.cash = Math.max(1, Math.round(out.cash * 0.85))
  }
  return out
}

function applySurface(state: GameState, choice: Choice): void {
  applySurfaceDelta(state, thesisScale(state, choice.surface))
}

function checkAllies(state: GameState): void {
  for (const ally of ALLIES) {
    if (state.social >= ally.threshold && !state.allies.includes(ally.id)) {
      state.allies.push(ally.id)
      state.allyToast = ally.joinLine
      return
    }
  }
}

function pushHistory(state: GameState): void {
  state.history.push({
    turn: state.turn,
    cash: state.cash,
    heat: state.heat,
    novelty: state.novelty,
    social: state.social,
  })
  if (state.history.length > 8) state.history = state.history.slice(-8)
}

function personalise(text: string, brandName: string | undefined): string {
  if (!brandName) return text
  return text.replace(/\{brand\}/g, brandName)
}

function queueFollowUp(state: GameState, choice: Choice): void {
  if (state.pendingPing || !choice.followUp) return
  if (Math.random() > choice.followUp.chance) return
  const name = state.brand?.name
  const from =
    state.social >= 45 && state.allies.length > 0 && Math.random() < 0.35
      ? personalise('Yan Rong — {brand} studio', name)
      : personalise(choice.followUp.from, name)
  state.pendingPing = {
    from,
    preview: personalise(choice.followUp.preview, name),
    body: personalise(choice.followUp.body, name),
    options: choice.followUp.options.map((o) => ({
      ...o,
      label: personalise(o.label, name),
    })),
    ignore: { heat: -2, social: -1 },
  }
}

function tick(state: GameState): void {
  for (const r of state.recurring) {
    state.cash += r.cash ?? 0
    if (r.hidden) applyLedger(state.ledger, r.hidden)
    if (r.turns !== undefined) r.turns -= 1
  }
  state.recurring = state.recurring.filter((r) => r.turns === undefined || r.turns > 0)

  // Steady trade: trust converts to quiet repeat custom.
  // "Sometimes the decent thing pays better — it's just harder to find."
  state.cash += Math.floor(state.social / 20)

  // Word of mouth: a trusted label stays part of the conversation without ads.
  const decay = state.social >= 40 ? Math.max(2, state.noveltyDecay - 2) : state.noveltyDecay
  state.novelty = Math.max(0, state.novelty - decay)
  if (state.novelty <= 0) {
    // A quiet season hurts less the more people trust the label.
    const cashHit = state.social >= SOCIAL_BUFFER_AT ? 3 : state.social >= 30 ? 5 : 8
    const heatHit = state.social >= SOCIAL_BUFFER_AT ? 2 : state.social >= 30 ? 3 : 4
    state.cash -= cashHit
    state.heat = Math.max(0, state.heat - heatHit)
  }
}

function applyFollowOption(state: GameState, option: FollowUpOption): void {
  applySurfaceDelta(state, thesisScale(state, option.surface ?? {}))
  if (option.fuses) state.fuses.push(...option.fuses)
  if (option.clearsFuses) {
    for (const tag of option.clearsFuses) {
      const i = state.fuses.indexOf(tag)
      if (i !== -1) state.fuses.splice(i, 1)
    }
  }
  if (option.reaction) state.reaction = personalise(option.reaction, state.brand?.name)
  checkAllies(state)
}

export type Action =
  | { type: 'start' }
  | { type: 'setup_brand'; brand: BrandIdentity }
  | { type: 'learn_more' }
  | { type: 'choose'; choiceId: string }
  | { type: 'resolve_ping'; optionId: string }
  | { type: 'ignore_ping' }
  | { type: 'desk_action'; actionId: DeskActionId }
  | { type: 'enter_act2' }
  | { type: 'repair'; repairId: string }
  | { type: 'skip_repair' }
  | { type: 'finish' }
  | { type: 'restart' }

export function reduce(prev: GameState, action: Action): GameState {
  const state: GameState = structuredClone(prev)

  // Migrate older saves missing new fields
  if (!state.history) state.history = []
  if (state.deskActionUsed === undefined) state.deskActionUsed = false
  if (state.teaserCount === undefined) state.teaserCount = 0
  if (state.pendingPing === undefined) state.pendingPing = null
  if (state.brand === undefined) state.brand = null
  if (state.grantUsed === undefined) state.grantUsed = false

  switch (action.type) {
    case 'start': {
      // New Game+ keeps the label — skip setup.
      state.phase = state.brand ? 'act1' : 'setup'
      return state
    }

    case 'setup_brand': {
      state.brand = action.brand
      // Thesis sets the opening novelty decay slightly.
      if (action.brand.thesis === 'growth') state.noveltyDecay = BASE_NOVELTY_DECAY - 2
      if (action.brand.thesis === 'integrity') state.noveltyDecay = BASE_NOVELTY_DECAY
      if (action.brand.thesis === 'craft') state.noveltyDecay = BASE_NOVELTY_DECAY + 1
      if (action.brand.thesis === 'social_enterprise') {
        // Mission-led from day one: real community trust, slightly less capital.
        state.social = Math.min(100, state.social + 10)
        state.cash -= 3
      }
      state.phase = 'act1'
      return state
    }

    case 'learn_more': {
      if (state.looked || !state.currentCardId) return prev
      state.looked = true
      state.learnMoreCount += 1
      if (state.turn < ACT1_TURNS) state.turn += 1
      tick(state)
      pushHistory(state)
      state.reaction = null
      state.deskActionUsed = false
      return state
    }

    case 'choose': {
      if (!state.currentCardId || state.pendingPing) return prev
      const card = cardById(state.currentCardId)
      const baseChoice = card.choices.find((c) => c.id === action.choiceId)
      if (!baseChoice) return prev

      if (baseChoice.requiresSocial && state.social < baseChoice.requiresSocial) return prev

      let choice = baseChoice
      state.allyToast = null

      if (choice.kind === 'inspect') {
        applySurface(state, choice)
        state.looked = true
        if (state.turn < ACT1_TURNS) state.turn += 1
        tick(state)
        pushHistory(state)
        state.reaction = null
        state.deskActionUsed = false
        return state
      }

      let shieldFired = false
      if (card.crisis && state.social >= CRISIS_SHIELD_AT && !state.crisisShieldUsed) {
        state.crisisShieldUsed = true
        shieldFired = true
        choice = {
          ...choice,
          surface: {
            ...choice.surface,
            cash: choice.surface.cash && choice.surface.cash < 0 ? Math.round(choice.surface.cash / 2) : choice.surface.cash,
            heat: choice.surface.heat && choice.surface.heat < 0 ? Math.round(choice.surface.heat / 2) : choice.surface.heat,
          },
        }
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
      if (choice.recurring) {
        state.recurring.push({
          ...choice.recurring,
          label: choice.recurring.label ?? choice.label,
        })
      }
      if (choice.decayDelta) state.noveltyDecay += choice.decayDelta
      if (choice.worldStates) {
        for (const ws of choice.worldStates) {
          if (!state.worldStates.includes(ws)) state.worldStates.push(ws)
        }
      }
      state.reaction = choice.reaction ? personalise(choice.reaction, state.brand?.name) : null
      state.lastFact = card.fact ?? null
      if (shieldFired) {
        state.reaction = [state.reaction, 'People who know your work speak up. It matters.']
          .filter(Boolean)
          .join(' ')
      }
      if (choice.whisper) state.whisper = personalise(choice.whisper, state.brand?.name)
      checkAllies(state)
      queueFollowUp(state, choice)

      if (choice.kind === 'audit') {
        state.fusesRevealed = true
        const found = [...new Set(state.fuses)].map((f) => FUSE_LABELS[f] ?? f)
        state.reaction =
          found.length > 0
            ? `The audit finds: ${found.join('; ')}. You now know what you knew.`
            : 'The audit comes back clean. It cost a fortune and it was worth it.'
      }

      if (choice.kind === 'documentary_grant') {
        if (state.fuses.length >= 2) {
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
        state.fuses.push(...new Set(state.fuses))
        state.reaction = 'The film happens anyway. Your logo is in the b-roll, twice.'
      }

      tick(state)

      // The community catches a social enterprise once — and only once.
      if (
        state.cash < 0 &&
        !state.grantUsed &&
        state.brand?.thesis === 'social_enterprise'
      ) {
        state.grantUsed = true
        state.cash += 18
        state.reaction = [
          state.reaction,
          'The community development fund wires an emergency grant, unasked. There will not be a second one.',
        ]
          .filter(Boolean)
          .join(' ')
      }

      if (state.cash <= -40) {
        state.folded = true
        state.phase = 'end'
        return state
      }

      state.turn += 1
      state.looked = false
      state.deskActionUsed = false
      pushHistory(state)

      if (state.turn > ACT1_TURNS) {
        state.currentCardId = null
        state.pendingPing = null
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

    case 'resolve_ping': {
      if (!state.pendingPing) return prev
      const option = state.pendingPing.options.find((o) => o.id === action.optionId)
      if (!option) return prev
      applyFollowOption(state, option)
      state.pendingPing = null
      return state
    }

    case 'ignore_ping': {
      if (!state.pendingPing) return prev
      applySurfaceDelta(state, state.pendingPing.ignore)
      state.reaction = 'You leave it on read. The silence has a cost.'
      state.pendingPing = null
      return state
    }

    case 'desk_action': {
      if (state.deskActionUsed || state.pendingPing || state.phase !== 'act1') return prev
      state.deskActionUsed = true
      state.allyToast = null

      switch (action.actionId) {
        case 'repair_clinic':
          if (state.cash < 6) return prev
          applySurfaceDelta(state, thesisScale(state, { cash: -3, social: 3, novelty: -1 }))
          state.reaction = 'Six people. Two machines. One Tuesday. The class fills next week.'
          break
        case 'teaser': {
          const socialHit = state.teaserCount >= 3 ? -2 : state.teaserCount >= 1 ? -1 : 0
          applySurfaceDelta(state, thesisScale(state, { novelty: 7, social: socialHit, heat: 2 }))
          state.teaserCount += 1
          state.reaction =
            state.teaserCount >= 3
              ? 'The feed bites. Comments call it desperate. Novelty spikes anyway.'
              : 'A thirty-second teaser. The feed wakes up.'
          break
        }
        case 'overtime':
          applySurfaceDelta(state, { cash: 6, social: -2 })
          state.fuses.push('worker_grievance')
          state.recurring.push({ cash: 3, turns: 1, label: 'Rushed delivery premium' })
          state.reaction = 'The order ships. The night shift does not forget.'
          break
        case 'sit_tight':
          state.reaction = 'You do nothing. Sometimes that is the move.'
          break
      }
      checkAllies(state)
      return state
    }

    case 'enter_act2': {
      state.phase = 'act2'
      state.act2.budget = Math.max(15, Math.round(state.cash * 0.25))
      // Craft thesis: a little more repair budget — meaning, not magic.
      if (state.brand?.thesis === 'craft') state.act2.budget += 12
      return state
    }

    case 'repair': {
      const repair = repairById(action.repairId)
      if (repair.requiresSocial && state.social < repair.requiresSocial) return prev
      const damage = damageScore(state.ledger)
      const cost = repairCost(repair, damage, state.social, state.act2.repairsChosen)
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
      return newGame(state.brand)
    }

    default:
      return prev
  }
}

export { damageScore }

/** Soft-lock copy for choices the player can't yet take. */
export function choiceLockedReason(choice: Choice, social: number): string | null {
  if (choice.requiresSocial && social < choice.requiresSocial) {
    return `Needs social ${choice.requiresSocial} — nobody will vouch for this yet`
  }
  return null
}
