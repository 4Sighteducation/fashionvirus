import { useRef, useState } from 'react'
import { newGame, reduce, type Action } from './game/engine'
import { cardById } from './game/cards'
import { damageScore, ending } from './game/act2'
import { startRun, logEvent } from './lib/telemetry'
import type { GameState } from './game/types'
import { StartScreen } from './components/StartScreen'
import { BrandSetup } from './components/BrandSetup'
import { Act1 } from './components/Act1'
import { Hinge } from './components/Hinge'
import { Act2 } from './components/Act2'
import { EndScreen } from './components/EndScreen'
import './App.css'

const SAVE_KEY = 'fv-run-v3'

function migrateState(raw: GameState): GameState {
  return {
    ...raw,
    brand: raw.brand ?? null,
    pendingPing: raw.pendingPing ?? null,
    history: raw.history ?? [],
    deskActionUsed: raw.deskActionUsed ?? false,
    teaserCount: raw.teaserCount ?? 0,
  }
}

function loadSave(): { state: GameState; newGamePlus: boolean } | null {
  try {
    const raw = sessionStorage.getItem(SAVE_KEY) ?? sessionStorage.getItem('fv-run-v2')
    if (!raw) return null
    const saved = JSON.parse(raw)
    if (saved?.state?.phase && saved.state.runId) {
      return { state: migrateState(saved.state), newGamePlus: !!saved.newGamePlus }
    }
  } catch {
    // corrupted or stale save — start fresh
  }
  return null
}

function App() {
  const saved = useRef(loadSave()).current
  const [state, setState] = useState<GameState>(() =>
    saved && saved.state.phase !== 'start' ? saved.state : newGame(),
  )
  const [newGamePlus, setNewGamePlus] = useState(saved?.newGamePlus ?? false)
  const stateRef = useRef(state)
  stateRef.current = state

  function act(action: Action) {
    const prev = stateRef.current
    const next = reduce(prev, action)
    if (next === prev) return

    if (action.type === 'start' || action.type === 'setup_brand') {
      if (action.type === 'setup_brand' || (action.type === 'start' && next.phase === 'act1')) {
        startRun(next.runId)
        logEvent(next.runId, 'run_start', {
          turn: 0,
          payload: {
            newGamePlus,
            brand: next.brand?.name,
            thesis: next.brand?.thesis,
          },
        })
      }
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
          social: next.social,
          damage: Number(damageScore(next.ledger).toFixed(3)),
          fuses: next.fuses,
          pingQueued: !!next.pendingPing,
        },
      })
      if (next.allies.length > prev.allies.length) {
        logEvent(next.runId, 'ally_joined', {
          turn: prev.turn,
          payload: { ally: next.allies[next.allies.length - 1], social: next.social },
        })
      }
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
    if (action.type === 'resolve_ping' || action.type === 'ignore_ping') {
      logEvent(next.runId, 'choice', {
        turn: prev.turn,
        choiceId: action.type === 'resolve_ping' ? action.optionId : 'ignore_ping',
        payload: { kind: 'phone_ping' },
      })
    }
    if (action.type === 'desk_action') {
      logEvent(next.runId, 'choice', {
        turn: prev.turn,
        choiceId: action.actionId,
        payload: { kind: 'desk_action' },
      })
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
      const end = ending(next.cash + next.act2.budget, damage, next.folded, next.social)
      logEvent(next.runId, 'run_end', {
        turn: prev.phase === 'act2' ? prev.act2.turn : prev.turn,
        act: prev.phase === 'act2' ? 2 : 1,
        payload: {
          register: end.register,
          held: end.held,
          cash: next.cash,
          social: next.social,
          allies: next.allies,
          brand: next.brand?.name,
          thesis: next.brand?.thesis,
          damage: Number(damage.toFixed(3)),
          learnMoreCount: next.learnMoreCount,
          repairs: next.act2.repairsChosen,
          worldStates: next.worldStates,
          folded: next.folded,
        },
      })
    }

    setState(next)
    try {
      const ngPlus = next.phase === 'end' || newGamePlus
      sessionStorage.setItem(SAVE_KEY, JSON.stringify({ state: next, newGamePlus: ngPlus }))
    } catch {
      // storage full or unavailable — play continues unsaved
    }
  }

  switch (state.phase) {
    case 'start':
      return <StartScreen newGamePlus={newGamePlus} onStart={() => act({ type: 'start' })} />
    case 'setup':
      return <BrandSetup onComplete={(brand) => act({ type: 'setup_brand', brand })} />
    case 'act1':
      return (
        <Act1
          state={state}
          showLedger={newGamePlus}
          onLearnMore={() => act({ type: 'learn_more' })}
          onChoose={(choiceId) => act({ type: 'choose', choiceId })}
          onResolvePing={(optionId) => act({ type: 'resolve_ping', optionId })}
          onIgnorePing={() => act({ type: 'ignore_ping' })}
          onDeskAction={(actionId) => act({ type: 'desk_action', actionId })}
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
            setNewGamePlus(true)
            act({ type: 'restart' })
          }}
        />
      )
  }
}

export default App
