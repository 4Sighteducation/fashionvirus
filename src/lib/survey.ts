import { supabase } from './supabase'

// Fire-and-forget, like telemetry: the ideas screen never waits on this,
// and a failed insert is silently dropped.
export function submitHabitsSurvey(runId: string, answers: Record<string, string>): void {
  if (!supabase) return
  void supabase
    .from('survey_responses')
    .insert({ run_id: runId, answers })
    .then(({ error }) => {
      if (error) console.debug('survey: insert failed', error.message)
    })
}
