import { useState } from 'react'
import { damageScore, dominantDamage } from '../game/act2'
import { money, ledgerUnits, LEDGER_LABELS } from '../game/format'
import type { GameState } from '../game/types'

interface Props {
  state: GameState
  onEnterAct2: () => void
}

// The hinge. Take the celebration seriously — it must feel genuinely good.
// Then the interface falls away.
export function Hinge({ state, onEnterAct2 }: Props) {
  const [step, setStep] = useState<'fanfare' | 'reveal'>('fanfare')
  const valuation = Math.max(100, Math.round(state.cash * 3 + state.heat * 12))
  const damage = damageScore(state.ledger)

  if (step === 'fanfare') {
    return (
      <main className="fanfare">
        <p className="eyebrow fanfare-kicker">The industry awards</p>
        <h1 className="fanfare-title">
          DISRUPTOR
          <br />
          OF THE YEAR
        </h1>
        <p className="fanfare-line">Valuation: {money(valuation)}</p>
        <p className="fanfare-line">Twelve seasons. Four continents. One name.</p>
        <p className="fanfare-line fanfare-ovation">A standing ovation.</p>
        <button className="btn-gold" type="button" onClick={() => setStep('reveal')}>
          Take the stage
        </button>
      </main>
    )
  }

  // The world you walk into matches the damage you led with.
  const dominant = dominantDamage(state.ledger)
  const video =
    dominant === 'labour'
      ? '/assets/hinge/a7-company-town-hinge.mp4'
      : '/assets/hinge/a4-bale-port-hinge.mp4'

  return (
    <main className="reveal">
      <video className="reveal-video" src={video} autoPlay muted loop playsInline />
      <div className="reveal-scrim" />
      <div className="reveal-content">
        <p className="reveal-intro">While you were on stage, the ledger balanced itself.</p>
        <dl className="reveal-ledger">
          {Object.entries(state.ledger).map(([key, value], i) => (
            <div className="reveal-row" style={{ animationDelay: `${1 + i * 0.9}s` }} key={key}>
              <dt>{LEDGER_LABELS[key]}</dt>
              <dd>{ledgerUnits(key, value)}</dd>
            </div>
          ))}
        </dl>
        <p
          className="reveal-outro"
          style={{ animationDelay: `${1 + 6 * 0.9 + 0.8}s` }}
        >
          {damage < 0.3
            ? 'You were careful. The world remembers that too.'
            : 'The world you built is waiting.'}
        </p>
        {state.allies.length > 0 && (
          <p className="reveal-social" style={{ animationDelay: `${1 + 6 * 0.9 + 1.4}s` }}>
            The market never priced what you built. {state.allies.length === 1 ? 'One group of people' : `${['Two', 'Three', 'Four'][state.allies.length - 2] ?? state.allies.length} groups of people`} did. They are still here.
          </p>
        )}
        <button
          className="btn-ghost reveal-cta"
          style={{ animationDelay: `${1 + 6 * 0.9 + 2.2}s` }}
          type="button"
          onClick={onEnterAct2}
        >
          Walk into it
        </button>
      </div>
    </main>
  )
}
