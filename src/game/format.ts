import type { Ledger } from './types'

/** Format £ thousands: 20 -> "£20k", 1240 -> "£1.24m", -12 -> "-£12k" */
export function money(k: number): string {
  const sign = k < 0 ? '-' : ''
  const abs = Math.abs(k)
  if (abs >= 1000) return `${sign}£${(abs / 1000).toFixed(2).replace(/\.?0+$/, '')}m`
  return `${sign}£${Math.round(abs)}k`
}

/** The ledger keeps real units — this renders them for the reveal. */
export function ledgerUnits(key: string, value: number): string {
  switch (key) {
    case 'water':
      return `${value.toFixed(1)} million litres drawn or fouled`
    case 'carbon':
      return `${Math.round(value).toLocaleString()} tonnes CO₂e`
    case 'waste':
      return `${Math.round(value).toLocaleString()} tonnes burned, buried or exported`
    case 'microplastics':
      return `${Math.round(value).toLocaleString()} kg of fibres shed`
    case 'labour':
      return `${Math.round(value).toLocaleString()},000 underpaid hours`
    case 'land':
      return `${Math.round(value).toLocaleString()} hectares cleared or degraded`
    default:
      return String(Math.round(value))
  }
}

/** Translate the ledger into things a person can picture.
 *  Conversion factors are audited in docs/facts-and-sources.md:
 *  Olympic pool 2.5 ML · London–NY flight ~0.6 tCO₂e/passenger ·
 *  bin lorry ~10 t · carrier bag ~5 g · working life ~80,000 h ·
 *  football pitch ~0.7 ha. */
export function realWorldEquivalents(ledger: Ledger): { label: string; line: string }[] {
  const out: { label: string; line: string }[] = []
  const n = (x: number) => Math.round(x).toLocaleString()

  const pools = ledger.water / 2.5
  if (pools >= 1) out.push({ label: 'WATER', line: `enough to fill ${n(pools)} Olympic swimming pools` })

  const flights = ledger.carbon / 0.6
  if (flights >= 1)
    out.push({ label: 'EMISSIONS', line: `${n(flights)} passenger flights, London to New York` })

  const lorries = ledger.waste / 10
  if (lorries >= 1)
    out.push({ label: 'WASTE', line: `${n(lorries)} bin lorries of textiles, tipped or torched` })

  const bags = (ledger.microplastics * 1000) / 5
  if (bags >= 1)
    out.push({ label: 'MICROPLASTICS', line: `the plastic of ${n(bags)} carrier bags, shed as fibres too small to see` })

  const lives = (ledger.labour * 1000) / 80000
  if (lives >= 0.5)
    out.push({
      label: 'LABOUR',
      line: lives < 1.5 ? 'one full working life of underpaid time' : `${n(lives)} full working lives of underpaid time`,
    })

  const pitches = ledger.land / 0.7
  if (pitches >= 1) out.push({ label: 'LAND', line: `${n(pitches)} football pitches cleared or degraded` })

  return out
}

export const LEDGER_LABELS: Record<string, string> = {
  water: 'WATER',
  carbon: 'EMISSIONS',
  waste: 'WASTE',
  microplastics: 'MICROPLASTICS',
  labour: 'LABOUR',
  land: 'LAND',
}
