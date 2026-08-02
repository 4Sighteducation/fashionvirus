/** Curated brand identity — name, palette, avatar, thesis. */

export type PaletteId = 'ink_bone' | 'signal_red' | 'warehouse_green' | 'midnight_gloss'
export type AvatarId = 'monogram' | 'needle' | 'bolt' | 'circle' | 'slash' | 'seal'
export type ThesisId = 'growth' | 'integrity' | 'craft' | 'social_enterprise'

export interface BrandPalette {
  id: PaletteId
  name: string
  ink: string
  accent: string
  paper: string
  muted: string
}

export interface BrandAvatar {
  id: AvatarId
  name: string
  /** Simple SVG path / glyph for the monogram mark */
  glyph: string
}

export interface BrandThesis {
  id: ThesisId
  name: string
  blurb: string
}

export const PALETTES: BrandPalette[] = [
  {
    id: 'ink_bone',
    name: 'Ink & Bone',
    ink: '#1a1916',
    accent: '#8a7a5c',
    paper: '#f6f5ef',
    muted: '#9a9588',
  },
  {
    id: 'signal_red',
    name: 'Signal Red',
    ink: '#1c1212',
    accent: '#a02020',
    paper: '#f7f2ef',
    muted: '#9a8480',
  },
  {
    id: 'warehouse_green',
    name: 'Warehouse Green',
    ink: '#141c16',
    accent: '#5a7a52',
    paper: '#f3f6f1',
    muted: '#849088',
  },
  {
    id: 'midnight_gloss',
    name: 'Midnight Gloss',
    ink: '#0e1016',
    accent: '#6a6a9a',
    paper: '#f2f2f6',
    muted: '#88889a',
  },
]

export const AVATARS: BrandAvatar[] = [
  { id: 'monogram', name: 'Monogram', glyph: 'Aa' },
  { id: 'needle', name: 'Needle', glyph: '⟋' },
  { id: 'bolt', name: 'Bolt', glyph: '⚡' },
  { id: 'circle', name: 'Circle', glyph: '○' },
  { id: 'slash', name: 'Slash', glyph: '/' },
  { id: 'seal', name: 'Seal', glyph: '◈' },
]

export const THESES: BrandThesis[] = [
  {
    id: 'growth',
    name: 'Growth',
    blurb: 'Stay visible. Novelty decays slower early on — trust is harder to earn.',
  },
  {
    id: 'integrity',
    name: 'Integrity',
    blurb: 'Trust compounds. Social gains land harder — cash is tighter.',
  },
  {
    id: 'craft',
    name: 'Craft',
    blurb: 'Make it well. Heat rises slower — Act 2 repair lands with more meaning.',
  },
  {
    id: 'social_enterprise',
    name: 'Social enterprise',
    blurb: 'Mission locked, profits capped. You start with real community trust — and the community catches you, once, if you fall.',
  },
]

export function paletteById(id: PaletteId): BrandPalette {
  return PALETTES.find((p) => p.id === id) ?? PALETTES[0]
}

export function avatarById(id: AvatarId): BrandAvatar {
  return AVATARS.find((a) => a.id === id) ?? AVATARS[0]
}

export function thesisById(id: ThesisId): BrandThesis {
  return THESES.find((t) => t.id === id) ?? THESES[0]
}

export function brandInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

/** CSS custom properties for tinting the desk. */
export function brandCssVars(paletteId: PaletteId): Record<string, string> {
  const p = paletteById(paletteId)
  return {
    '--brand-ink': p.ink,
    '--brand-accent': p.accent,
    '--brand-paper': p.paper,
    '--brand-muted': p.muted,
  }
}
