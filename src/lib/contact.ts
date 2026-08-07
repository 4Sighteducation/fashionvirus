import { supabase } from './supabase'

export type ContactResult = 'sent' | 'failed' | 'unavailable'

// Write-only, like telemetry: the anon key can INSERT into
// contact_messages and nothing else. Reading happens in the dashboard.
export async function sendContactMessage(input: {
  name: string
  email: string
  message: string
}): Promise<ContactResult> {
  if (!supabase) return 'unavailable'
  const { error } = await supabase.from('contact_messages').insert({
    name: input.name.trim().slice(0, 200),
    email: input.email.trim().slice(0, 320),
    message: input.message.trim().slice(0, 4000),
  })
  if (error) {
    console.debug('contact: insert failed', error.message)
    return 'failed'
  }
  return 'sent'
}
