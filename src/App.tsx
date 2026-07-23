import { useRef, useState } from 'react'
import { newGame, reduce, type Action } from './game/engine'
import { cardById } from './game/cards'
import { damageScore, ending } from './game/act2'
import { startRun, logEvent } from './lib/telemetry'
import type { GameState } from './game/types'
import { StartScreen } from './components/StartScreen'
import { Act1 } from './components/Act1'
import { Hinge } from './components/Hinge'
import { Act2 } from './components/Act2'
import { EndScreen } from './components/EndScreen'
import './App.css'

function App() {
  const [state, setState] = useState<GameState>(newGame)
  const [newGamePlus, setNewGamePlus] = useState(false)
  const stateRef = useRef(state)
  stateRef.current = state

  function act(action: Action) {
    const prev = stateRef.current
    const next = reduce(prev, action)
    if (next === prev) return

    // ── telemetry (fire and forget) ──
    if (action.type === 'start') {
      startRun(next.runId)
      logEvent(next.runId, 'run_start', { turn: 0, payload: { newGamePlus } })
    }
    if (action.type === 'learn_more' && prev.currentCardId) {
      logEvent(next.runId, 'learn_more', { turn: prev.turn, cardId: prev.currentCardId })
    }
    if (action.type === 'choose' && prev.currentCardId) {
      logEvent(next.runId, 'choice', {
        turn: prev.turn,
        cardId: prev.currentCardId,
        choiceId: action.choiceId,
        payload: {
          looked: prev.looked,
          cash: next.cash,
          heat: next.heat,
          novelty: next.novelty,
          damage: Number(damageScore(next.ledger).toFixed(3)),
          fuses: next.fuses,
        },
      })
      if (next.currentCardId && cardById(next.currentCardId).crisis) {
        logEvent(next.runId, 'crisis_fired', { turn: next.turn, cardId: next.currentCardId })
      }
      if (next.phase === 'hinge') {
        logEvent(next.runId, 'hinge_reached', {
          turn: next.turn,
          payload: { ledger: next.ledger, damage: Number(damageScore(next.ledger).toFixed(3)) },
        })
      }
    }
    if (action.type === 'repair') {
      logEvent(next.runId, 'repair_chosen', {
        turn: prev.act2.turn,
        act: 2,
        choiceId: action.repairId,
      })
    }
    if (next.phase === 'end' && prev.phase !== 'end') {
      const damage = damageScore(next.ledger)
      logEvent(next.runId, 'run_end', {
        turn: prev.phase === 'act2' ? prev.act2.turn : prev.turn,
        act: prev.phase === 'act2' ? 2 : 1,
        payload: {
          register: ending(next.cash + next.act2.budget, damage, next.folded).register,
          cash: next.cash,
          damage: Number(damage.toFixed(3)),
          learnMoreCount: next.learnMoreCount,
          repairs: next.act2.repairsChosen,
          worldStates: next.worldStates,
          folded: next.folded,
        },
      })
    }

    setState(next)
  }

  switch (state.phase) {
    case 'start':
      return <StartScreen newGamePlus={newGamePlus} onStart={() => act({ type: 'start' })} />
    case 'act1':
      return (
        <Act1
          state={state}
          showLedger={newGamePlus}
          onLearnMore={() => act({ type: 'learn_more' })}
          onChoose={(choiceId) => act({ type: 'choose', choiceId })}
        />
      )
    case 'hinge':
      return <Hinge state={state} onEnterAct2={() => act({ type: 'enter_act2' })} />
    case 'act2':
      return (
        <Act2
          state={state}
          onRepair={(repairId) => act({ type: 'repair', repairId })}
          onSkip={() => act({ type: 'skip_repair' })}
          onFinish={() => act({ type: 'finish' })}
        />
      )
    case 'end':
      return (
        <EndScreen
          state={state}
          onRestart={() => {
            // The reveal only works once. After it, the laboratory opens (§5).
            setNewGamePlus(true)
            act({ type: 'restart' })
          }}
        />
      )
  }
}

export default App
