import { useState } from 'react'
import {
  AVATARS,
  PALETTES,
  THESES,
  brandCssVars,
  brandInitials,
  type AvatarId,
  type PaletteId,
  type ThesisId,
} from '../game/brand'
import type { BrandIdentity } from '../game/types'

interface Props {
  onComplete: (brand: BrandIdentity) => void
}

export function BrandSetup({ onComplete }: Props) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [paletteId, setPaletteId] = useState<PaletteId>('ink_bone')
  const [avatarId, setAvatarId] = useState<AvatarId>('monogram')
  const [thesis, setThesis] = useState<ThesisId>('integrity')

  const trimmed = name.trim()
  const nameOk = trimmed.length >= 2 && trimmed.length <= 24
  const vars = brandCssVars(paletteId)
  const initials = brandInitials(trimmed || 'Label')

  const finish = () => {
    if (!nameOk) return
    onComplete({ name: trimmed, paletteId, avatarId, thesis })
  }

  return (
    <main className="brand-setup" style={vars}>
      <p className="eyebrow brand-setup-kicker">BUILD YOUR LABEL · {step + 1} OF 4</p>

      {step === 0 && (
        <>
          <h1 className="brand-setup-title">Name the brand</h1>
          <p className="brand-setup-body">It will sit on the desk, the cards, the awards night. Make it yours.</p>
          <input
            className="brand-name-input"
            type="text"
            maxLength={24}
            placeholder="e.g. Atelier North"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <p className="brand-setup-hint">{trimmed.length}/24</p>
          <button type="button" className="btn-primary" disabled={!nameOk} onClick={() => setStep(1)}>
            Next — colours
          </button>
        </>
      )}

      {step === 1 && (
        <>
          <h1 className="brand-setup-title">Choose a colour story</h1>
          <p className="brand-setup-body">Four curated palettes. The desk will wear them.</p>
          <div className="palette-grid">
            {PALETTES.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`palette-swatch ${paletteId === p.id ? 'palette-selected' : ''}`}
                onClick={() => setPaletteId(p.id)}
                style={{ ['--swatch-ink' as string]: p.ink, ['--swatch-accent' as string]: p.accent, ['--swatch-paper' as string]: p.paper }}
              >
                <span className="palette-chips" aria-hidden>
                  <i style={{ background: p.ink }} />
                  <i style={{ background: p.accent }} />
                  <i style={{ background: p.paper }} />
                </span>
                <span className="eyebrow">{p.name}</span>
              </button>
            ))}
          </div>
          <div className="brand-setup-actions">
            <button type="button" className="btn-skip" onClick={() => setStep(0)}>
              Back
            </button>
            <button type="button" className="btn-primary" onClick={() => setStep(2)}>
              Next — mark
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className="brand-setup-title">Your mark</h1>
          <p className="brand-setup-body">A simple avatar for the desk. Initials from {trimmed}.</p>
          <div className="avatar-grid">
            {AVATARS.map((a) => (
              <button
                key={a.id}
                type="button"
                className={`avatar-pick ${avatarId === a.id ? 'avatar-selected' : ''}`}
                onClick={() => setAvatarId(a.id)}
              >
                <span className="avatar-face" data-style={a.id}>
                  {a.id === 'monogram' ? initials : a.glyph}
                </span>
                <span className="eyebrow">{a.name}</span>
              </button>
            ))}
          </div>
          <div className="brand-setup-actions">
            <button type="button" className="btn-skip" onClick={() => setStep(1)}>
              Back
            </button>
            <button type="button" className="btn-primary" onClick={() => setStep(3)}>
              Next — thesis
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h1 className="brand-setup-title">How do you want to grow?</h1>
          <p className="brand-setup-body">One lasting posture. It quietly reshapes every season.</p>
          <div className="thesis-list">
            {THESES.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`thesis-pick ${thesis === t.id ? 'thesis-selected' : ''}`}
                onClick={() => setThesis(t.id)}
              >
                <span className="eyebrow">{t.name}</span>
                <span>{t.blurb}</span>
              </button>
            ))}
          </div>
          <div className="brand-preview">
            <span className="avatar-face" data-style={avatarId}>
              {avatarId === 'monogram' ? initials : AVATARS.find((a) => a.id === avatarId)?.glyph}
            </span>
            <div>
              <p className="eyebrow">Your label</p>
              <p className="brand-preview-name">{trimmed}</p>
            </div>
          </div>
          <div className="brand-setup-actions">
            <button type="button" className="btn-skip" onClick={() => setStep(2)}>
              Back
            </button>
            <button type="button" className="btn-primary" onClick={finish}>
              Open the desk
            </button>
          </div>
        </>
      )}
    </main>
  )
}
