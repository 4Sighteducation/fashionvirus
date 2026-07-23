import { WORLD_STATES, damageScore, ending } from '../game/act2'
import { ACT1_TURNS } from '../game/engine'
import type { GameState } from '../game/types'

interface Props {
  state: GameState
  onRestart: () => void
}

export function EndScreen({ state, onRestart }: Props) {
  const damage = damageScore(state.ledger)
  const end = ending(state.cash + state.act2.budget, damage, state.folded)

  return (
    <main className={`endscreen end-${end.register}`}>
      <h1 className="end-headline">{end.headline}</h1>
      <p className="end-sub">{end.sub}</p>

      {state.worldStates.length > 0 && (
        <div className="end-worldstates">
          {state.worldStates.map((ws) => (
            <p key={ws}>{WORLD_STATES[ws] ?? ws}</p>
          ))}
        </div>
      )}

      <div className="end-stats">
        <p>
          You pressed <strong>LEARN MORE</strong> {state.learnMoreCount === 0 ? 'zero times' : `${state.learnMoreCount} time${state.learnMoreCount === 1 ? '' : 's'}`} in{' '}
          {ACT1_TURNS} seasons.
        </p>
        {state.learnMoreCount === 0 && <p className="end-notlooked">You can’t say you didn’t know. Only that you didn’t look.</p>}
        {state.act2.repairsChosen.length > 0 && (
          <p>
            {state.act2.repairsChosen.length} repair{state.act2.repairsChosen.length === 1 ? '' : 's'} funded. They
            outlast you. That was the point.
          </p>
        )}
      </div>

      <p className="end-continues eyebrow">The full game continues here</p>

      <button className="btn-primary" type="button" onClick={onRestart}>
        Play again — with the ledger visible
      </button>
    </main>
  )
}
