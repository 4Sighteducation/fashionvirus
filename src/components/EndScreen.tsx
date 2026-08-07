import { WORLD_STATES, allyById, damageScore, ending } from '../game/act2'
import { ACT1_TURNS } from '../game/engine'
import { realWorldEquivalents } from '../game/format'
import type { GameState } from '../game/types'
import { AfterGame } from './AfterGame'

interface Props {
  state: GameState
  onRestart: () => void
}

/** Editorial art in the register of the ending — the mended world gets the
 *  mended gown, the broken one gets the glitch. */
const END_ART: Record<string, string> = {
  clean: '/assets/editorial/swatch-coat.png',
  hard: '/assets/editorial/mended-gown.png',
  bleak: '/assets/editorial/landfill-gown.png',
  folded: '/assets/editorial/glitch-shroud.png',
}

export function EndScreen({ state, onRestart }: Props) {
  const damage = damageScore(state.ledger)
  const end = ending(state.cash + state.act2.budget, damage, state.folded, state.social)
  const equivalents = realWorldEquivalents(state.ledger)

  return (
    <main className={`endscreen end-${end.register} ${end.held ? 'end-held' : ''}`}>
      <div className="end-backdrop" style={{ backgroundImage: `url(${END_ART[end.register]})` }} />
      <div className="end-content">
      {state.brand && <p className="eyebrow end-brand">{state.brand.name}</p>}
      <h1 className="end-headline">{end.headline}</h1>
      <p className="end-sub">{end.sub}</p>

      {state.worldStates.length > 0 && (
        <div className="end-worldstates">
          {state.worldStates.map((ws) => (
            <p key={ws}>{WORLD_STATES[ws] ?? ws}</p>
          ))}
        </div>
      )}

      {state.allies.length > 0 && (
        <div className="end-allies">
          <span className="eyebrow end-allies-label">Who stood with you</span>
          <p>{state.allies.map((id) => allyById(id).name).join(' · ')}</p>
        </div>
      )}

      {equivalents.length > 0 && (
        <div className="end-equivalents">
          <span className="eyebrow end-equivalents-label">What sixteen seasons actually cost</span>
          <ul>
            {equivalents.map((e) => (
              <li key={e.label}>
                <span className="eyebrow eq-key">{e.label}</span>
                <span>{e.line}</span>
              </li>
            ))}
          </ul>
          <p className="end-equivalents-note">
            Conversions use published industry figures. Every fact shown during your run is real and sourced.
          </p>
        </div>
      )}

      <div className="end-stats">
        <p>
          You pressed <strong>LEARN MORE</strong>{' '}
          {state.learnMoreCount === 0 ? 'zero times' : `${state.learnMoreCount} time${state.learnMoreCount === 1 ? '' : 's'}`} in{' '}
          {ACT1_TURNS} seasons.
        </p>
        {state.learnMoreCount === 0 && <p className="end-notlooked">You can’t say you didn’t know. Only that you didn’t look.</p>}
        {state.act2.repairsChosen.length > 0 && (
          <p>
            {state.act2.repairsChosen.length} repair{state.act2.repairsChosen.length === 1 ? '' : 's'} funded. They
            outlast you. That was the point.
          </p>
        )}
        {state.allies.length === 0 && state.social < 25 && (
          <p className="end-notlooked">Nobody stood with you at the end. That was also a choice — made slowly, in small pieces.</p>
        )}
      </div>

      <AfterGame runId={state.runId} />

      <p className="end-continues eyebrow">The full game continues here</p>

      <button className="btn-primary" type="button" onClick={onRestart}>
        Play again — with the ledger visible
      </button>
      </div>
    </main>
  )
}
