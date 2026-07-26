import { useMemo, useState } from 'react'
import {
  ISOLATION_LINES,
  LEDGER_CEILING,
  REPAIRS,
  WORLD_STATES,
  act2Scene,
  allyById,
  damageScore,
  repairById,
  repairCost,
} from '../game/act2'
import { ACT2_TURNS } from '../game/engine'
import { money, LEDGER_LABELS } from '../game/format'
import type { GameState } from '../game/types'

interface Props {
  state: GameState
  onRepair: (repairId: string) => void
  onSkip: () => void
  onFinish: () => void
}

// Act 2 is a wound, not a game (PoC scope). Wide, still, quiet.
// Destruction is fast. Repair is slow. And partial.
// Social capital changes one thing: whether you are alone in it.
export function Act2({ state, onRepair, onSkip, onFinish }: Props) {
  const damage = damageScore(state.ledger)
  const scene = useMemo(() => act2Scene(state.ledger, damage, state.social), [state.ledger, damage, state.social])
  const [kingfisherSeen, setKingfisherSeen] = useState(false)
  const [showKingfisher, setShowKingfisher] = useState(false)
  const done = state.act2.turn > ACT2_TURNS

  const lastRepair = state.act2.repairsChosen.length
    ? repairById(state.act2.repairsChosen[state.act2.repairsChosen.length - 1])
    : null

  // One human line per year: an ally if you have them, isolation if you don't.
  const yearIndex = Math.min(state.act2.turn, ACT2_TURNS) - 1
  const vignette =
    state.allies.length > 0
      ? allyById(state.allies[yearIndex % state.allies.length]).act2Line
      : state.social < 25
        ? ISOLATION_LINES[yearIndex % ISOLATION_LINES.length]
        : null

  function choose(repairId: string) {
    const willHealWater = (repairById(repairId).heals.water ?? 0) > 0
    onRepair(repairId)
    // The most emotional moment in the game, spent carefully.
    if (!kingfisherSeen && willHealWater && state.ledger.water >= 1.2) {
      setKingfisherSeen(true)
      setShowKingfisher(true)
    }
  }

  if (showKingfisher) {
    return (
      <main className="kingfisher" onClick={() => setShowKingfisher(false)}>
        <p>A kingfisher was seen on the river today.</p>
        <span className="eyebrow kingfisher-hint">continue</span>
      </main>
    )
  }

  return (
    <main className="act2" style={{ backgroundImage: `url(${scene})` }}>
      <div className="act2-scrim" />
      <div className="act2-content">
        <p className="eyebrow act2-kicker">
          {damage < 0.3 ? 'The working landscape' : 'Wasteworld'} · year {Math.min(state.act2.turn, ACT2_TURNS)} of{' '}
          {ACT2_TURNS}
        </p>

        {state.worldStates.length > 0 && (
          <div className="act2-worldstates">
            {state.worldStates.map((ws) => (
              <p key={ws}>{WORLD_STATES[ws] ?? ws}</p>
            ))}
          </div>
        )}

        <div className="act2-ledger">
          <span className="act2-ledger-title">RESTORATION LEDGER</span>
          {Object.entries(state.ledger).map(([key, value]) => {
            const k = key as keyof typeof LEDGER_CEILING
            const healed = state.act2.healed[k]
            return (
              <div className="act2-row" key={key}>
                <span>{LEDGER_LABELS[key]}</span>
                <span className="act2-bar">
                  <span
                    className="act2-bar-damage"
                    style={{ width: `${Math.min(100, (value / LEDGER_CEILING[k]) * 100)}%` }}
                  />
                </span>
                <span className="act2-healed">
                  {healed > 0 ? `−${k === 'water' ? healed.toFixed(1) : Math.round(healed)}` : ''}
                </span>
              </div>
            )
          })}
          <div className="act2-budget">
            FUNDS <strong>{money(state.act2.budget)}</strong>
            <span className="act2-budget-note"> — the crash took the rest</span>
          </div>
          {state.social >= 25 && (
            <div className="act2-standing">
              COMMUNITY STANDING <strong>{Math.round(state.social)}</strong>
              <span className="act2-budget-note"> — people work for less, or for nothing, alongside you</span>
            </div>
          )}
        </div>

        {vignette && <p className={`act2-vignette ${state.allies.length === 0 ? 'act2-isolation' : ''}`}>{vignette}</p>}
        {lastRepair && <p className="act2-indicator">{lastRepair.indicator}</p>}

        {!done ? (
          <>
            <p className="act2-instruction">Choose one repair this year. Repair is slow. And partial.</p>
            <div className="act2-repairs">
              {REPAIRS.filter((r) => !state.act2.repairsChosen.includes(r.id)).map((repair) => {
                const locked = !!repair.requiresSocial && state.social < repair.requiresSocial
                const cost = repairCost(repair, damage, state.social, state.act2.repairsChosen)
                const fullCost = Math.round(repair.cost * (1 + damage))
                const affordable = cost <= state.act2.budget
                if (locked) {
                  return (
                    <div key={repair.id} className="act2-repair act2-repair-locked">
                      <span className="act2-repair-title">{repair.title}</span>
                      <span className="act2-repair-body">
                        This needed a community you didn’t build.
                      </span>
                      <span className="act2-repair-cost">— not available to you</span>
                    </div>
                  )
                }
                return (
                  <button
                    key={repair.id}
                    type="button"
                    className={`act2-repair ${repair.requiresSocial ? 'act2-repair-community' : ''}`}
                    disabled={!affordable}
                    onClick={() => choose(repair.id)}
                  >
                    <span className="act2-repair-title">{repair.title}</span>
                    <span className="act2-repair-body">{repair.body}</span>
                    <span className="act2-repair-cost">
                      {money(cost)}
                      {cost < fullCost && ' — volunteers cut the price'}
                      {!affordable && ' — you cannot afford this'}
                    </span>
                  </button>
                )
              })}
            </div>
            <button className="btn-ghost act2-skip" type="button" onClick={onSkip}>
              Do nothing this year
            </button>
          </>
        ) : (
          <button className="btn-ghost" type="button" onClick={onFinish}>
            Face it
          </button>
        )}
      </div>
    </main>
  )
}
