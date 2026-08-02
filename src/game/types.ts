// Core type definitions for the Fashion Virus proof of concept.
// Card content comes from docs/fashion-virus-30-cards.md — the engine
// fires on tags, so cards can be swapped freely without touching systems.

import type { AvatarId, PaletteId, ThesisId } from './brand'

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
  /** 0–100 — social capital. Slow, stable, and the thing money can't buy back. */
  social?: number
}

/** A quick phone-style follow-up after a choice. */
export interface FollowUpOption {
  id: string
  label: string
  surface?: SurfaceEffects
  fuses?: string[]
  clearsFuses?: string[]
  reaction?: string
}

export interface FollowUp {
  /** 0–1 chance this fires after the choice */
  chance: number
  from: string
  preview: string
  body: string
  options: FollowUpOption[]
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
  recurring?: { cash?: number; hidden?: Partial<Ledger>; turns?: number; label?: string }
  /** Permanent change to novelty decay (the bank covenant ratchet). */
  decayDelta?: number
  /** World-states: choices that change the map, not just the numbers.
   *  Act 2 and the ending show them (mill_town_dies, someone_worse, ...). */
  worldStates?: string[]
  /** Special engine handling. */
  kind?: 'inspect' | 'audit' | 'documentary_grant' | 'documentary_decline'
  /** Optional phone-style interrupt after this choice. */
  followUp?: FollowUp
  /** Soft-lock when social is below this — nobody will vouch. */
  requiresSocial?: number
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
  /** A real, sourced figure shown after the decision — the learning layer.
   *  Keep the source attribution in the text; docs/facts-and-sources.md audits them. */
  fact?: string
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
  /** Only offered when social capital reached this level in Act 1. */
  requiresSocial?: number
}

/** A named ally, earned at a social-capital milestone. They carry into Act 2. */
export interface Ally {
  id: string
  name: string
  /** Social capital level at which they join. */
  threshold: number
  /** Shown as a quiet toast when they join in Act 1. */
  joinLine: string
  /** One vignette line per Act 2 year. */
  act2Line: string
}

export type Phase = 'start' | 'setup' | 'act1' | 'hinge' | 'act2' | 'end'

export interface BrandIdentity {
  name: string
  paletteId: PaletteId
  avatarId: AvatarId
  thesis: ThesisId
}

export interface PendingPing {
  from: string
  preview: string
  body: string
  options: FollowUpOption[]
  /** Mild cost if the player ignores. */
  ignore: SurfaceEffects
}

export interface Act2State {
  turn: number // 1..5
  budget: number // £k — what survived the crash
  repairsChosen: string[]
  healed: Ledger
}

export interface SeasonSnapshot {
  turn: number
  cash: number
  heat: number
  novelty: number
  social: number
}

export type DeskActionId = 'repair_clinic' | 'teaser' | 'overtime' | 'sit_tight'

export interface GameState {
  phase: Phase
  runId: string
  turn: number // 1..16
  cash: number // £k
  heat: number // 0..100
  novelty: number // 0..100
  /** 0..100 — trust, belonging, ambassadors. Slow to earn, slow to lose. */
  social: number
  /** Named allies earned at social milestones. */
  allies: string[]
  /** One-shot vignette shown when an ally joins. */
  allyToast: string | null
  /** High social absorbs one crisis — used once per run. */
  crisisShieldUsed: boolean
  noveltyDecay: number // per-turn decay; the covenant raises it
  ledger: Ledger
  /** Planted tags — duplicates allowed, duplicates are severity. */
  fuses: string[]
  /** The real audit was commissioned: the player can see their fuses. */
  fusesRevealed: boolean
  /** Ongoing per-turn effects. */
  recurring: { cash?: number; hidden?: Partial<Ledger>; turns?: number; label?: string }[]
  /** Choices that changed the map. Act 2 shows these. */
  worldStates: string[]
  deck: Record<1 | 2 | 3, string[]>
  currentCardId: string | null
  looked: boolean
  learnMoreCount: number
  reaction: string | null
  /** The real-world figure attached to the card just decided. */
  lastFact: string | null
  whisper: string | null
  firedWhispers: string[]
  firedCrises: string[]
  folded: boolean
  act2: Act2State
  /** Player's label identity — null until Brand Setup completes. */
  brand: BrandIdentity | null
  /** Phone-style interrupt waiting between seasons. */
  pendingPing: PendingPing | null
  /** Last-N season snapshots for sparklines. */
  history: SeasonSnapshot[]
  /** Optional desk action already taken this season. */
  deskActionUsed: boolean
  /** How many teaser drops this run — overuse burns social. */
  teaserCount: number
  /** Social enterprise only: the one-time community emergency grant was used. */
  grantUsed: boolean
}
