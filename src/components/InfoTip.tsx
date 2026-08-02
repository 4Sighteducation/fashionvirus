import { useEffect, useRef, useState } from 'react'

interface Props {
  /** Short name shown as the popover heading. */
  title: string
  /** Explainer copy. */
  children: React.ReactNode
  /** Which edge the popover hugs, to stay on screen. */
  align?: 'start' | 'end'
}

/** Small ⓘ trigger with a tap/hover popover. Hover opens it on pointer
 *  devices (CSS); tap toggles it everywhere; tapping outside closes. */
export function InfoTip({ title, children, align = 'start' }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])

  return (
    <span className={`infotip ${open ? 'infotip-open' : ''}`} ref={ref}>
      <button
        type="button"
        className="infotip-btn"
        aria-label={`What does ${title} mean?`}
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((v) => !v)
        }}
      >
        i
      </button>
      <span className={`infotip-pop infotip-align-${align}`} role="tooltip">
        <span className="eyebrow infotip-title">{title}</span>
        <span className="infotip-body">{children}</span>
      </span>
    </span>
  )
}
