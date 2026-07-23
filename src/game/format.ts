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

export const LEDGER_LABELS: Record<string, string> = {
  water: 'WATER',
  carbon: 'EMISSIONS',
  waste: 'WASTE',
  microplastics: 'MICROPLASTICS',
  labour: 'LABOUR',
  land: 'LAND',
}
