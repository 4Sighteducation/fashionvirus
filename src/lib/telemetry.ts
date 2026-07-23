import { supabase } from './supabase'

// Anonymous, fire-and-forget decision logging. Never blocks play,
// never throws — a failed insert is silently dropped.

export type TelemetryEvent =
  | 'run_start'
  | 'choice'
  | 'learn_more'
  | 'crisis_fired'
  | 'hinge_reached'
  | 'repair_chosen'
  | 'run_end'

export function startRun(runId: string): void {
  void supabase
    .from('runs')
    .insert({
      id: runId,
      user_agent: navigator.userAgent.slice(0, 200),
      viewport: `${window.innerWidth}x${window.innerHeight}`,
    })
    .then(({ error }) => {
      if (error) console.debug('telemetry: run insert failed', error.message)
    })
}

export function logEvent(
  runId: string,
  event: TelemetryEvent,
  data: {
    turn: number
    act?: 1 | 2
    cardId?: string
    choiceId?: string
    payload?: Record<string, unknown>
  },
): void {
  void supabase
    .from('run_events')
    .insert({
      run_id: runId,
      turn: data.turn,
      act: data.act ?? 1,
      event_type: event,
      card_id: data.cardId ?? null,
      choice_id: data.choiceId ?? null,
      payload: data.payload ?? {},
    })
    .then(({ error }) => {
      if (error) console.debug('telemetry: event insert failed', error.message)
    })
}
