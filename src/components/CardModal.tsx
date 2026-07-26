import { cardArt } from '../game/cards'
import { ACT1_TURNS } from '../game/engine'
import type { Card, Choice, GameState } from '../game/types'

interface Props {
  card: Card
  state: GameState
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

/** Surface effects, shown honestly. The hidden ledger stays hidden —
 *  informed on the surface, blind underneath. */
function Chips({ choice }: { choice: Choice }) {
  const { cash, heat, novelty, social } = choice.surface
  const chips: { key: string; text: string; cls: string }[] = []
  const sign = (n: number) => (n > 0 ? `+${n}` : `${n}`)
  if (cash) chips.push({ key: 'cash', text: `${cash > 0 ? '+' : '−'}£${Math.abs(cash)}k`, cls: 'chip-cash' })
  if (heat) chips.push({ key: 'heat', text: `${sign(heat)} HEAT`, cls: 'chip-heat' })
  if (novelty) chips.push({ key: 'novelty', text: `${sign(novelty)} NOVELTY`, cls: 'chip-novelty' })
  if (social) chips.push({ key: 'social', text: `${sign(social)} SOCIAL`, cls: 'chip-social' })
  if (chips.length === 0) return null
  return (
    <span className="chips">
      {chips.map((c) => (
        <span key={c.key} className={`chip ${c.cls} ${c.text.startsWith('−') || c.text.startsWith('-') ? 'chip-neg' : ''}`}>
          {c.text}
        </span>
      ))}
    </span>
  )
}

export function CardModal({ card, state, onLearnMore, onChoose }: Props) {
  const isCrisis = !!card.crisis
  const art = isCrisis ? null : cardArt(card.id)

  return (
    <div className="cardmodal-backdrop">
      <article className={`cardmodal ${isCrisis ? 'cardmodal-crisis' : ''}`} key={card.id}>
        <div className="cardmodal-inner">
          {isCrisis ? (
            <div className="cardmodal-bulletin">
              <span className="cardmodal-stamp">DEVELOPING</span>
            </div>
          ) : (
            art && (
              <div className="cardmodal-art">
                <img src={art} alt="" loading="eager" draggable={false} />
              </div>
            )
          )}

          <div className="cardmodal-text">
            <p className="eyebrow cardmodal-category">
              {isCrisis ? `SEASON ${state.turn} · BREAKING` : CATEGORY_LABELS[card.category]}
            </p>
            <h2 className="cardmodal-title">{card.title}</h2>
            {card.character && <p className="cardmodal-character">— {card.character}</p>}
            <p className="cardmodal-body">{card.body}</p>

            {state.looked && card.depth && (
              <div className="cardmodal-depth">
                <span className="eyebrow depth-label">What you found</span>
                <p>{card.depth}</p>
              </div>
            )}

            <div className="cardmodal-choices">
              {card.choices.map((choice) => (
                <button key={choice.id} type="button" className="cardmodal-choice" onClick={() => onChoose(choice.id)}>
                  <span className="cardmodal-choice-label">{choice.label}</span>
                  <Chips choice={choice} />
                </button>
              ))}
            </div>

            {card.depth && !state.looked && (
              <button type="button" className="btn-learn" onClick={onLearnMore}>
                LEARN MORE — costs a season
              </button>
            )}
          </div>

          <footer className="cardmodal-footer">
            <span>FASHION VIRUS</span>
            <span>
              SEASON {Math.min(state.turn, ACT1_TURNS)} · {isCrisis ? 'UNSCHEDULED' : card.category.toUpperCase()}
            </span>
          </footer>
        </div>
      </article>
    </div>
  )
}
