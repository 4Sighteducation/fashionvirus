import { useEffect } from 'react'
import type { PendingPing } from '../game/types'

interface Props {
  ping: PendingPing
  onReply: (optionId: string) => void
  onIgnore: () => void
}

/** In-fiction phone notification — not a real OS push. */
export function PhonePing({ ping, onReply, onIgnore }: Props) {
  useEffect(() => {
    try {
      navigator.vibrate?.(40)
    } catch {
      // desktop / denied
    }
  }, [ping.from, ping.preview])

  return (
    <div className="phone-ping-backdrop">
      <div className="phone-ping" role="dialog" aria-label="Incoming message">
        <div className="phone-ping-notch" aria-hidden />
        <p className="eyebrow phone-ping-app">MESSAGES · NOW</p>
        <p className="phone-ping-from">{ping.from}</p>
        <p className="phone-ping-preview">{ping.preview}</p>
        <p className="phone-ping-body">{ping.body}</p>
        <div className="phone-ping-options">
          {ping.options.map((o) => (
            <button key={o.id} type="button" className="phone-ping-reply" onClick={() => onReply(o.id)}>
              {o.label}
            </button>
          ))}
          <button type="button" className="phone-ping-ignore" onClick={onIgnore}>
            Leave on read
          </button>
        </div>
      </div>
    </div>
  )
}
