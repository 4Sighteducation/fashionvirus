import { FUSE_LABELS, cardById } from '../game/cards'
import { damageScore } from '../game/act2'
import { ACT1_TURNS } from '../game/engine'
import { money, LEDGER_LABELS } from '../game/format'
import type { GameState } from '../game/types'

interface Props {
  state: GameState
  showLedger: boolean // New Game+ only
  onLearnMore: () => void
  onChoose: (choiceId: string) => void
}

const CATEGORY_LABELS: Record<string, string> = {
  materials: 'DECISION · MATERIALS',
  manufacturing: 'DECISION · MANUFACTURING',
  volume: 'DECISION · VOLUME',
  funding: 'DECISION · FUNDING',
  marketing: 'DECISION · MARKETING',
  endoflife: 'DECISION · END OF LIFE',
}

function Meter({ label, value, max = 100 }: { label: string; value: number; max?: number }) {
  return (
    <div className="meter">
      <span className="eyebrow meter-label">{label}</span>
      <div className="meter-track">
        <div className="meter-fill" style={{ width: `${Math.max(0, Math.min(100, (value / max) * 100))}%` }} />
      </div>
    </div>
  )
}

export function Act1({ state, showLedger, onLearnMore, onChoose }: Props) {
  const card = state.currentCardId ? cardById(state.currentCardId) : null
  const damage = damageScore(state.ledger)
  const isCrisis = !!card?.crisis

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
        <span className="eyebrow act1-season">
          Season {Math.min(state.turn, ACT1_TURNS)} / {ACT1_TURNS}
        </span>
      </header>

      <section className="act1-stats">
        <div className="stat">
          <span className="eyebrow meter-label">Cash</span>
          <span className={`stat-value ${state.cash < 0 ? 'stat-negative' : ''}`}>{money(state.cash)}</span>
        </div>
        <Meter label="Heat" value={state.heat} />
        <Meter label="Novelty" value={state.novelty} />
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

      {card && (
        <article className={`card ${isCrisis ? 'card-crisis' : ''}`}>
          <p className="eyebrow card-category">
            {isCrisis ? '⚠ DEVELOPING' : CATEGORY_LABELS[card.category]}
          </p>
          <h2 className="card-title">{card.title}</h2>
          {card.character && <p className="card-character">— {card.character}</p>}
          <p className="card-body">{card.body}</p>

          {state.looked && card.depth && (
            <div className="card-depth">
              <span className="eyebrow depth-label">What you found</span>
              <p>{card.depth}</p>
            </div>
          )}

          <div className="card-choices">
            {card.choices.map((choice) => (
              <button key={choice.id} type="button" className="btn-choice" onClick={() => onChoose(choice.id)}>
                {choice.label}
              </button>
            ))}
          </div>

          {card.depth && !state.looked && (
            <button type="button" className="btn-learn" onClick={onLearnMore}>
              LEARN MORE — costs a turn
            </button>
          )}
        </article>
      )}

      {state.whisper && <p className="whisper">{state.whisper}</p>}
    </div>
  )
}
