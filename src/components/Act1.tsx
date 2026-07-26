import { useEffect, useRef, useState } from 'react'
import { FUSE_LABELS, cardById } from '../game/cards'
import { damageScore } from '../game/act2'
import { ACT1_TURNS, stageForTurn } from '../game/engine'
import { money, LEDGER_LABELS } from '../game/format'
import type { GameState } from '../game/types'
import { CardModal } from './CardModal'
import { Intro, STAT_HELP } from './Intro'

interface Props {
  state: GameState
  showLedger: boolean // New Game+ only
  onLearnMore: () => void
  onChoose: (choiceId: string) => void
}

const STAGE_LABELS: Record<1 | 2 | 3, string> = {
  1: 'BEDROOM LABEL',
  2: 'HIGH STREET',
  3: 'GLOBAL',
}

const STAGE_BLURBS: Record<1 | 2 | 3, string> = {
  1: 'Small runs, hand-finished, every decision yours — and every cost still close enough to see.',
  2: 'Buyers, minimums, deadlines. The decisions get bigger and the consequences move further away.',
  3: 'Four continents, one name. You will never meet most of the people your choices land on.',
}

interface Snapshot {
  turn: number
  cash: number
  heat: number
  novelty: number
  social: number
}

/** Per-season deltas for the stat tiles — what changed since your last decision. */
function useDeltas(state: GameState) {
  const last = useRef<Snapshot>({
    turn: state.turn,
    cash: state.cash,
    heat: state.heat,
    novelty: state.novelty,
    social: state.social,
  })
  const [deltas, setDeltas] = useState({ cash: 0, heat: 0, novelty: 0, social: 0 })

  useEffect(() => {
    if (state.turn !== last.current.turn) {
      setDeltas({
        cash: state.cash - last.current.cash,
        heat: state.heat - last.current.heat,
        novelty: state.novelty - last.current.novelty,
        social: state.social - last.current.social,
      })
      last.current = {
        turn: state.turn,
        cash: state.cash,
        heat: state.heat,
        novelty: state.novelty,
        social: state.social,
      }
    }
  }, [state.turn, state.cash, state.heat, state.novelty, state.social])

  return deltas
}

function Delta({ value, format }: { value: number; format?: (n: number) => string }) {
  if (!value) return null
  const text = format ? format(value) : `${value > 0 ? '+' : '−'}${Math.abs(value)}`
  return <span className={`stat-delta ${value > 0 ? 'delta-up' : 'delta-down'}`}>{text}</span>
}

function StatTile({
  label,
  value,
  delta,
  meter,
  variant,
  deltaFormat,
  sub,
}: {
  label: string
  value: string | number
  delta: number
  meter?: number
  variant?: string
  deltaFormat?: (n: number) => string
  sub?: string
}) {
  return (
    <div className={`tile ${variant ?? ''}`}>
      <span className="eyebrow tile-label">{label}</span>
      <span className="tile-value">
        {value}
        <Delta value={delta} format={deltaFormat} />
      </span>
      {meter !== undefined && (
        <div className="tile-track">
          <div className="tile-fill" style={{ width: `${Math.max(0, Math.min(100, meter))}%` }} />
        </div>
      )}
      {sub && <span className="tile-sub">{sub}</span>}
    </div>
  )
}

export function Act1({ state, showLedger, onLearnMore, onChoose }: Props) {
  const card = state.currentCardId ? cardById(state.currentCardId) : null
  const damage = damageScore(state.ledger)
  const stage = stageForTurn(Math.min(state.turn, ACT1_TURNS))
  const deltas = useDeltas(state)

  // The between-seasons beat: consequences land on the dashboard first,
  // then the player deals the next card themselves.
  const [dealt, setDealt] = useState(false)
  useEffect(() => {
    if (!state.looked) setDealt(false)
  }, [state.currentCardId, state.looked])
  const isCrisisWaiting = !!card?.crisis

  // First-run onboarding — once per browser, never on New Game+.
  const [showIntro, setShowIntro] = useState(() => {
    if (state.turn !== 1 || showLedger) return false
    try {
      return !localStorage.getItem('fv-intro-seen')
    } catch {
      return true
    }
  })
  const dismissIntro = () => {
    try {
      localStorage.setItem('fv-intro-seen', '1')
    } catch {
      // private mode — the intro will simply show again next time
    }
    setShowIntro(false)
  }

  const [showHelp, setShowHelp] = useState(false)
  const recurringCash = state.recurring.reduce((sum, r) => sum + (r.cash ?? 0), 0)
  const seasonsToAwards = ACT1_TURNS - Math.min(state.turn, ACT1_TURNS)

  // The interface is complicit: it degrades with the hidden ledger,
  // slowly enough that nobody consciously notices.
  const rot: React.CSSProperties = {
    filter: `sepia(${(damage * 0.45).toFixed(3)}) hue-rotate(${(damage * 14).toFixed(1)}deg) saturate(${(1 - damage * 0.3).toFixed(3)}) contrast(${(1 - damage * 0.08).toFixed(3)})`,
  }

  return (
    <div className={`act1 ${damage > 0.45 ? 'act1-smudged' : ''}`} style={rot}>
      <div className="grain" style={{ opacity: damage * 0.55 }} />

      <header className="act1-top">
        <span className="act1-wordmark">FASHION VIRUS</span>
        <span className="eyebrow act1-stage">{STAGE_LABELS[stage]}</span>
        <span className="eyebrow act1-season">
          Season {Math.min(state.turn, ACT1_TURNS)} / {ACT1_TURNS}
        </span>
      </header>

      <div className="season-track" aria-hidden>
        {Array.from({ length: ACT1_TURNS }, (_, i) => (
          <span
            key={i}
            className={`season-dot ${i + 1 < state.turn ? 'dot-past' : ''} ${i + 1 === state.turn ? 'dot-now' : ''}`}
          />
        ))}
      </div>

      <div className="act1-context">
        <p className="stage-blurb">{STAGE_BLURBS[stage]}</p>
        {seasonsToAwards <= 3 && (
          <p className="eyebrow awards-countdown">
            {seasonsToAwards === 0
              ? 'THE INDUSTRY AWARDS · AFTER THIS SEASON'
              : `THE INDUSTRY AWARDS · ${seasonsToAwards} SEASON${seasonsToAwards === 1 ? '' : 'S'} AWAY`}
          </p>
        )}
        <button type="button" className="btn-help" onClick={() => setShowHelp((v) => !v)}>
          {showHelp ? 'Hide' : 'What do these numbers mean?'}
        </button>
      </div>

      {showHelp && (
        <section className="help-panel">
          {STAT_HELP.map((s) => (
            <p key={s.label}>
              <span className="eyebrow help-label">{s.label}</span>
              {s.label === 'NOVELTY' ? `${s.text} Right now it falls ${state.noveltyDecay} a season.` : s.text}
            </p>
          ))}
          <p className="help-footnote">Some costs never appear up here. That is not a bug.</p>
        </section>
      )}

      <section className="act1-stats">
        <StatTile
          label="Cash"
          value={money(state.cash)}
          delta={deltas.cash}
          variant={state.cash < 0 ? 'tile-negative' : ''}
          deltaFormat={(n) => `${n > 0 ? '+' : '−'}£${Math.abs(n)}k`}
          sub={
            recurringCash !== 0
              ? `${recurringCash > 0 ? '+' : '−'}£${Math.abs(recurringCash)}k/season · ${state.recurring.length} ongoing commitment${state.recurring.length === 1 ? '' : 's'}`
              : undefined
          }
        />
        <StatTile label="Heat" value={Math.round(state.heat)} delta={deltas.heat} meter={state.heat} variant="tile-heat" />
        <StatTile
          label="Novelty"
          value={Math.round(state.novelty)}
          delta={deltas.novelty}
          meter={state.novelty}
          variant="tile-novelty"
          sub={`decays −${state.noveltyDecay}/season`}
        />
        <StatTile
          label="Social capital"
          value={Math.round(state.social)}
          delta={deltas.social}
          meter={state.social}
          variant="tile-social"
        />
      </section>

      {showLedger && (
        <section className="ngplus-ledger">
          <span className="eyebrow meter-label">The ledger</span>
          <div className="ngplus-rows">
            {Object.entries(state.ledger).map(([key, value]) => (
              <span key={key} className="ngplus-row">
                {LEDGER_LABELS[key]} {key === 'water' ? value.toFixed(1) : Math.round(value)}
              </span>
            ))}
          </div>
        </section>
      )}

      {state.fusesRevealed && state.fuses.length > 0 && (
        <section className="ngplus-ledger audit-findings">
          <span className="eyebrow meter-label">Audit findings</span>
          <div className="ngplus-rows">
            {[...new Set(state.fuses)].map((fuse) => (
              <span key={fuse} className="ngplus-row">
                {FUSE_LABELS[fuse] ?? fuse}
              </span>
            ))}
          </div>
        </section>
      )}

      {state.reaction && <p className="reaction">{state.reaction}</p>}
      {state.allyToast && <p className="ally-toast">{state.allyToast}</p>}

      {state.lastFact && !dealt && !showIntro && (
        <aside className="record">
          <span className="eyebrow record-label">The record</span>
          <p>{state.lastFact}</p>
        </aside>
      )}

      {card && !dealt && (
        <button
          type="button"
          className={`btn-deal ${isCrisisWaiting ? 'btn-deal-crisis' : ''}`}
          onClick={() => setDealt(true)}
        >
          {isCrisisWaiting
            ? '⚠ Something is developing'
            : state.turn === 1
              ? 'Open your first decision'
              : 'Open the next decision'}
        </button>
      )}

      {card && (dealt || state.looked) && (
        <CardModal card={card} state={state} onLearnMore={onLearnMore} onChoose={onChoose} />
      )}

      {state.whisper && <p className="whisper">{state.whisper}</p>}

      {showIntro && <Intro onDone={dismissIntro} />}
    </div>
  )
}
