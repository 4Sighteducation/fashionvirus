// Core type definitions for the Fashion Virus proof of concept.
// Card content comes from docs/fashion-virus-30-cards.md — the engine
// fires on tags, so cards can be swapped freely without touching systems.

/** The hidden ledger, in real units. All values start at 0 and accumulate. */
export interface Ledger {
  /** million litres polluted or drawn */
  water: number
  /** tonnes CO₂e */
  carbon: number
  /** tonnes to landfill, incineration or export */
  waste: number
  /** kg of fibres shed */
  microplastics: number
  /** thousand poverty-wage / excess hours */
  labour: number
  /** hectares cleared or degraded */
  land: number
}

export type LedgerKey = keyof Ledger

export type Category = 'materials' | 'manufacturing' | 'volume' | 'funding' | 'marketing' | 'endoflife'

/** What the player sees change when they choose. */
export interface SurfaceEffects {
  /** £ thousands (revenue and capital folded into one pool for the PoC) */
  cash?: number
  /** 0–100 — brand heat */
  heat?: number
  /** 0–100, decays every turn — the novelty trap */
  novelty?: number
}

export interface Choice {
  id: string
  label: string
  surface: SurfaceEffects
  /** The truth. Accumulates on the hidden ledger. */
  hidden?: Partial<Ledger>
  /** Tags planted. Duplicates raise severity. Consequences fire on tags, not cards. */
  fuses?: string[]
  /** Removes one instance of each listed tag (defusing). */
  clearsFuses?: string[]
  /** Peripheral one-liner shown after choosing — incentivised to ignore. */
  whisper?: string
  /** Small flavour line shown after choosing. */
  reaction?: string
  /** Ongoing per-turn effect (export contract, rental line). Negatives heal.
   *  `turns` limits duration; omit for the rest of the run. */
  recurring?: { cash?: number; hidden?: Partial<Ledger>; turns?: number }
  /** Permanent change to novelty decay (the bank covenant ratchet). */
  decayDelta?: number
  /** World-states: choices that change the map, not just the numbers.
   *  Act 2 and the ending show them (mill_town_dies, someone_worse, ...). */
  worldStates?: string[]
  /** Special engine handling. */
  kind?: 'inspect' | 'audit' | 'documentary_grant' | 'documentary_decline'
}

export interface Card {
  id: string
  category: Category
  /** 1 = bedroom/indie (turns 1–4), 2 = high street (5–8), 3 = global (9–12) */
  stage: 1 | 2 | 3
  title: string
  /** Named character attached to this card, if any. */
  character?: string
  body: string
  /** What LEARN MORE reveals. Looking costs a turn. */
  depth?: string
  /** Flow prompt for the card image (see docs/fashion-virus-30-cards.md). */
  art?: string
  choices: Choice[]
  /** Present = crisis card. Fires when `count` instances of `tags` are planted. */
  crisis?: { tags: string[]; count: number }
}

export interface Whisper {
  id: string
  text: string
  /** Fires once, when the condition first holds. */
  when: (ledger: Ledger, novelty: number) => boolean
}

export interface Repair {
  id: string
  title: string
  body: string
  /** £ thousands, before the damage multiplier. */
  cost: number
  /** Which ledger keys it heals (absolute, in ledger units). */
  heals: Partial<Ledger>
  /** The leading indicator the player is shown. */
  indicator: string
}

export type Phase = 'start' | 'act1' | 'hinge' | 'act2' | 'end'

export interface Act2State {
  turn: number // 1..3
  budget: number // £k — what survived the crash
  repairsChosen: string[]
  healed: Ledger
}

export interface GameState {
  phase: Phase
  runId: string
  turn: number // 1..12
  cash: number // £k
  heat: number // 0..100
  novelty: number // 0..100
  noveltyDecay: number // per-turn decay; the covenant raises it
  ledger: Ledger
  /** Planted tags — duplicates allowed, duplicates are severity. */
  fuses: string[]
  /** The real audit was commissioned: the player can see their fuses. */
  fusesRevealed: boolean
  /** Ongoing per-turn effects. */
  recurring: { cash?: number; hidden?: Partial<Ledger>; turns?: number }[]
  /** Choices that changed the map. Act 2 shows these. */
  worldStates: string[]
  deck: Record<1 | 2 | 3, string[]>
  currentCardId: string | null
  looked: boolean
  learnMoreCount: number
  reaction: string | null
  whisper: string | null
  firedWhispers: string[]
  firedCrises: string[]
  folded: boolean
  act2: Act2State
}
