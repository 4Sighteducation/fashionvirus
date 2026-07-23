import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Telemetry is optional: a missing config must never break the game.
// Copy .env.example to .env.local (or set the vars on Vercel) to enable it.
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

if (!supabase) {
  console.warn('Supabase config missing — telemetry disabled. See .env.example.')
}
