import { useEffect, useRef, useState } from 'react'
import { ALLIES, allyById, damageScore } from '../game/act2'
import { AVATARS, brandCssVars, brandInitials, thesisById } from '../game/brand'
import { FUSE_LABELS, cardById } from '../game/cards'
import {
  ACT1_TURNS,
  CRISIS_SHIELD_AT,
  SOCIAL_BUFFER_AT,
  choiceLockedReason,
  pressureLabel,
  pressureLevel,
  stageForTurn,
} from '../game/engine'
import { LEDGER_LABELS, money } from '../game/format'
import type { DeskActionId, GameState } from '../game/types'
import { CardModal } from './CardModal'
import { InfoTip } from './InfoTip'
import { Intro, STAT_HELP } from './Intro'
import { PhonePing } from './PhonePing'

interface Props {
  state: GameState
  showLedger: boolean
  onLearnMore: () => void
  onChoose: (choiceId: string) => void
  onResolvePing: (optionId: string) => void
  onIgnorePing: () => void
  onDeskAction: (actionId: DeskActionId) => void
}

const STAGE_LABELS: Record<1 | 2 | 3, string> = {
  1: 'BEDROOM LABEL',
  2: 'HIGH STREET',
  3: 'GLOBAL',
}

const STAGE_BLURBS: Record<1 | 2 | 3, string> = {
  1: 'Small runs, hand-finished, every decision yours — and every cost still close enough to see.',
  2: 'Buyers, minimums, deadlines. The decisions get bigger and the consequences move further away.',
  3: 'Four continents, one name. You will never meet most of the people your choices land on.',
}

const DESK_ACTIONS: { id: DeskActionId; label: string; detail: string }[] = [
  { id: 'repair_clinic', label: 'Repair clinic', detail: '−£3k · +social' },
  { id: 'teaser', label: 'Drop a teaser', detail: '+novelty · overuse costs trust' },
  { id: 'overtime', label: 'Pay for rush', detail: '+cash soon · risk' },
  { id: 'sit_tight', label: 'Sit tight', detail: 'Do nothing' },
]

interface Snapshot {
  turn: number
  cash: number
  heat: number
  novelty: number
  social: number
}

function useDeltas(state: GameState) {
  const last = useRef<Snapshot>({
    turn: state.turn,
    cash: state.cash,
    heat: state.heat,
    novelty: state.novelty,
    social: state.social,
  })
  const [deltas, setDeltas] = useState({ cash: 0, heat: 0, novelty: 0, social: 0 })

  useEffect(() => {
    if (state.turn !== last.current.turn) {
      setDeltas({
        cash: state.cash - last.current.cash,
        heat: state.heat - last.current.heat,
        novelty: state.novelty - last.current.novelty,
        social: state.social - last.current.social,
      })
      last.current = {
        turn: state.turn,
        cash: state.cash,
        heat: state.heat,
        novelty: state.novelty,
        social: state.social,
      }
    }
  }, [state.turn, state.cash, state.heat, state.novelty, state.social])

  return deltas
}

function Delta({ value, format }: { value: number; format?: (n: number) => string }) {
  if (!value) return null
  const text = format ? format(value) : `${value > 0 ? '+' : '−'}${Math.abs(value)}`
  return <span className={`stat-delta ${value > 0 ? 'delta-up' : 'delta-down'}`}>{text}</span>
}

function Gauge({
  label,
  value,
  delta,
  band,
  sub,
  variant,
  deltaFormat,
  info,
  infoAlign,
}: {
  label: string
  value: string | number
  delta: number
  band?: number
  sub?: string
  variant?: string
  deltaFormat?: (n: number) => string
  info?: React.ReactNode
  infoAlign?: 'start' | 'end'
}) {
  const bandClass =
    band === undefined ? '' : band < 25 ? 'band-low' : band > 75 ? 'band-hot' : 'band-stable'
  return (
    <div className={`gauge ${variant ?? ''} ${bandClass}`}>
      <span className="eyebrow tile-label">
        {label}
        {info && (
          <InfoTip title={label} align={infoAlign}>
            {info}
          </InfoTip>
        )}
      </span>
      <span className="tile-value">
        {value}
        <Delta value={delta} format={deltaFormat} />
      </span>
      {band !== undefined && (
        <div className="tile-track">
          <div className="tile-fill" style={{ width: `${Math.max(0, Math.min(100, band))}%` }} />
        </div>
      )}
      {sub && <span className="tile-sub">{sub}</span>}
    </div>
  )
}

function Sparkline({ values }: { values: number[] }) {
  if (values.length < 2) return null
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = Math.max(1, max - min)
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * 48
      const y = 16 - ((v - min) / span) * 14
      return `${x},${y}`
    })
    .join(' ')
  return (
    <svg className="sparkline" viewBox="0 0 48 18" aria-hidden>
      <polyline fill="none" stroke="currentColor" strokeWidth="1.5" points={pts} />
    </svg>
  )
}

function BrandMark({ state }: { state: GameState }) {
  const brand = state.brand
  if (!brand) return <span className="act1-wordmark">FASHION VIRUS</span>
  const avatar = AVATARS.find((a) => a.id === brand.avatarId) ?? AVATARS[0]
  const initials = brandInitials(brand.name)
  return (
    <div className="brand-mark">
      <span className="avatar-face avatar-face-sm" data-style={brand.avatarId}>
        {brand.avatarId === 'monogram' ? initials : avatar.glyph}
      </span>
      <div>
        <span className="brand-mark-name">{brand.name}</span>
        <span className="eyebrow brand-mark-thesis">{thesisById(brand.thesis).name}</span>
      </div>
    </div>
  )
}

export function Act1({
  state,
  showLedger,
  onLearnMore,
  onChoose,
  onResolvePing,
  onIgnorePing,
  onDeskAction,
}: Props) {
  const card = state.currentCardId ? cardById(state.currentCardId) : null
  const damage = damageScore(state.ledger)
  const stage = stageForTurn(Math.min(state.turn, ACT1_TURNS))
  const deltas = useDeltas(state)
  const pressure = pressureLevel(state.fuses)
  const recurringCash = state.recurring.reduce((sum, r) => sum + (r.cash ?? 0), 0)
  const seasonsToAwards = ACT1_TURNS - Math.min(state.turn, ACT1_TURNS)
  const runway =
    recurringCash < 0 ? Math.max(0, Math.floor(state.cash / Math.abs(recurringCash))) : null
  const socialHistory = state.history.map((h) => h.social)
  const noveltyHistory = state.history.map((h) => h.novelty)

  const [dealt, setDealt] = useState(false)
  useEffect(() => {
    if (!state.looked) setDealt(false)
  }, [state.currentCardId, state.looked])
  const isCrisisWaiting = !!card?.crisis

  const [showIntro, setShowIntro] = useState(() => {
    if (state.turn !== 1 || showLedger) return false
    try {
      return !localStorage.getItem('fv-intro-seen')
    } catch {
      return true
    }
  })
  const dismissIntro = () => {
    try {
      localStorage.setItem('fv-intro-seen', '1')
    } catch {
      /* private mode */
    }
    setShowIntro(false)
  }

  const [showHelp, setShowHelp] = useState(false)
  const showPing = !!state.pendingPing && !dealt && !showIntro
  const betweenSeasons = !dealt && !showIntro && !showPing

  const brandVars = state.brand ? brandCssVars(state.brand.paletteId) : {}
  const rot: React.CSSProperties = {
    ...brandVars,
    filter: `sepia(${(damage * 0.45).toFixed(3)}) hue-rotate(${(damage * 14).toFixed(1)}deg) saturate(${(1 - damage * 0.3).toFixed(3)}) contrast(${(1 - damage * 0.08).toFixed(3)})`,
  }

  return (
    <div className={`act1 desk ${damage > 0.45 ? 'act1-smudged' : ''}`} style={rot}>
      <div className="grain" style={{ opacity: damage * 0.55 }} />

      <header className="desk-pulse">
        <BrandMark state={state} />
        <div className="pulse-gauges">
          <Gauge
            label="Cash"
            value={money(state.cash)}
            delta={deltas.cash}
            variant={state.cash < 0 ? 'tile-negative' : ''}
            deltaFormat={(n) => `${n > 0 ? '+' : '−'}£${Math.abs(n)}k`}
            info="Your money, in thousands. Every decision costs or earns it. Below zero, the bank starts making your decisions for you."
            sub={
              runway !== null
                ? `~${runway} season${runway === 1 ? '' : 's'} runway`
                : recurringCash > 0
                  ? `+£${recurringCash}k/season in`
                  : undefined
            }
          />
          <Gauge
            label="Heat"
            value={Math.round(state.heat)}
            delta={deltas.heat}
            band={state.heat}
            variant="tile-heat"
            info="How much the industry talks about you (0–100). Heat opens doors, lifts sales — and attracts journalists. Cold means nobody's looking. Hot means everybody is."
            sub={state.heat > 75 ? 'hot' : state.heat < 25 ? 'cold' : 'stable'}
          />
          <Gauge
            label="Novelty"
            value={Math.round(state.novelty)}
            delta={deltas.novelty}
            band={state.novelty}
            variant="tile-novelty"
            info={`The market's hunger for your next drop (0–100). It falls ${state.noveltyDecay} every season no matter what you do. If it hits zero, a quiet season costs you cash and heat. This is the treadmill.`}
            sub={`decays −${state.noveltyDecay}/season`}
          />
          <div className="gauge gauge-pressure">
            <span className="eyebrow tile-label">
              Pressure
              <InfoTip title="Pressure" align="end">
                A gut feeling, not a number. It rises as you make choices that could come back on you —
                and it never says which ones, or when. Quiet → Uneasy → Volatile.
              </InfoTip>
            </span>
            <span className={`tile-value pressure-${pressure}`}>{pressureLabel(pressure)}</span>
            <span className="tile-sub">what you can feel</span>
          </div>
        </div>
        <div className="pulse-meta">
          <span className="eyebrow act1-stage">
            {STAGE_LABELS[stage]}
            <InfoTip title="Your stage" align="end">
              How big the label is. Bedroom label → high street → global. The decisions grow with
              you — and their consequences land further from your desk.
            </InfoTip>
          </span>
          <span className="eyebrow act1-season">
            Season {Math.min(state.turn, ACT1_TURNS)} / {ACT1_TURNS}
            <InfoTip title="Seasons" align="end">
              One decision per season, sixteen seasons — about five years of running the label.
              At season sixteen: the Industry Awards.
            </InfoTip>
          </span>
        </div>
      </header>

      <div className="desk-body">
        <aside className="desk-standing">
          <div className="standing-head">
            <span className="eyebrow">
              Social capital
              <InfoTip title="Social capital">
                Trust — workers, customers, community (0–100). It grows when you treat people
                well and shrinks when you don't. It can't be bought, and it quietly pays:
                every season, trust brings repeat custom (about £1k per 20), at 40 word of
                mouth slows the novelty treadmill, at {SOCIAL_BUFFER_AT} it cushions quiet
                seasons, at {CRISIS_SHIELD_AT} it can absorb one crisis — and as it climbs,
                real people join your side.
              </InfoTip>
            </span>
            <span className="standing-value">
              {Math.round(state.social)}
              <Delta value={deltas.social} />
              <span className="standing-spark">
                <Sparkline values={socialHistory} />
              </span>
            </span>
            <span className="tile-sub">trust in your name — slow to earn</span>
          </div>
          <div className="social-track">
            <div
              className="social-fill"
              style={
                {
                  height: `${Math.max(0, Math.min(100, state.social))}%`,
                  '--social-w': `${Math.max(0, Math.min(100, state.social))}%`,
                } as React.CSSProperties
              }
            />
            {ALLIES.map((a) => (
              <span
                key={a.id}
                className={`social-milestone ${state.social >= a.threshold ? 'ms-hit' : ''} ${state.allies.includes(a.id) ? 'ms-ally' : ''}`}
                style={{ '--ms': `${a.threshold}%` } as React.CSSProperties}
              />
            ))}
          </div>
          <div className="ally-head">
            <span className="eyebrow">
              Allies
              <InfoTip title="Allies">
                Real people who join you at trust milestones — {ALLIES.map((a) => a.threshold).join(', ')}.
                They arrive on their own when your social capital reaches their level, and they
                stay with you for whatever comes after the awards.
              </InfoTip>
            </span>
          </div>
          <ul className="ally-roster">
            {ALLIES.map((a) => {
              const joined = state.allies.includes(a.id)
              return (
                <li key={a.id} className={joined ? 'ally-filled' : 'ally-empty'}>
                  <span className="eyebrow">
                    {joined ? allyById(a.id).name : `Joins at ${a.threshold} trust`}
                  </span>
                  <span>{joined ? 'with you' : 'not yet'}</span>
                </li>
              )
            })}
          </ul>
          <div className="standing-chips">
            {state.social >= SOCIAL_BUFFER_AT && (
              <span className="chip-status chip-on">
                Novelty buffer active
                <InfoTip title="Novelty buffer">
                  Social capital {SOCIAL_BUFFER_AT}+: when novelty runs dry, your community
                  carries you — a quiet season costs a fraction of what it would otherwise.
                </InfoTip>
              </span>
            )}
            {state.social >= CRISIS_SHIELD_AT && !state.crisisShieldUsed && (
              <span className="chip-status chip-on">
                Crisis shield ready
                <InfoTip title="Crisis shield">
                  Social capital {CRISIS_SHIELD_AT}+: the people who trust you will absorb the
                  worst of one crisis. Once per run.
                </InfoTip>
              </span>
            )}
            {state.crisisShieldUsed && (
              <span className="chip-status">
                Crisis shield spent
                <InfoTip title="Crisis shield">
                  Your community absorbed one crisis for you. That only happens once.
                </InfoTip>
              </span>
            )}
          </div>
          <div className="novelty-mini">
            <span className="eyebrow">
              Novelty trend
              <InfoTip title="Novelty trend">
                Your novelty over recent seasons — the treadmill you're running on. Falling line
                means the market is losing interest.
              </InfoTip>
            </span>
            <Sparkline values={noveltyHistory} />
          </div>
        </aside>

        <section className="desk-situation">
          <div className="season-track" aria-hidden>
            {Array.from({ length: ACT1_TURNS }, (_, i) => (
              <span
                key={i}
                className={`season-dot ${i + 1 < state.turn ? 'dot-past' : ''} ${i + 1 === state.turn ? 'dot-now' : ''}`}
              />
            ))}
          </div>

          <div className="act1-context">
            <p className="stage-blurb">{STAGE_BLURBS[stage]}</p>
            {seasonsToAwards <= 3 && (
              <p className="eyebrow awards-countdown">
                {seasonsToAwards === 0
                  ? 'THE INDUSTRY AWARDS · AFTER THIS SEASON'
                  : `THE INDUSTRY AWARDS · ${seasonsToAwards} SEASON${seasonsToAwards === 1 ? '' : 'S'} AWAY`}
              </p>
            )}
            <button type="button" className="btn-help" onClick={() => setShowHelp((v) => !v)}>
              {showHelp ? 'Hide' : 'What do these numbers mean?'}
            </button>
          </div>

          {showHelp && (
            <section className="help-panel">
              {STAT_HELP.map((s) => (
                <p key={s.label}>
                  <span className="eyebrow help-label">{s.label}</span>
                  {s.label === 'NOVELTY' ? `${s.text} Right now it falls ${state.noveltyDecay} a season.` : s.text}
                </p>
              ))}
              <p className="help-footnote">Some costs never appear up here. That is not a bug.</p>
            </section>
          )}

          {showLedger && (
            <section className="ngplus-ledger">
              <span className="eyebrow meter-label">The ledger</span>
              <div className="ngplus-rows">
                {Object.entries(state.ledger).map(([key, value]) => (
                  <span key={key} className="ngplus-row">
                    {LEDGER_LABELS[key]} {key === 'water' ? value.toFixed(1) : Math.round(value)}
                  </span>
                ))}
              </div>
            </section>
          )}

          {state.fusesRevealed && state.fuses.length > 0 && (
            <section className="ngplus-ledger audit-findings">
              <span className="eyebrow meter-label">Audit findings</span>
              <div className="ngplus-rows">
                {[...new Set(state.fuses)].map((fuse) => (
                  <span key={fuse} className="ngplus-row">
                    {FUSE_LABELS[fuse] ?? fuse}
                  </span>
                ))}
              </div>
            </section>
          )}

          {betweenSeasons && state.turn > 1 && (
            <section className="season-report">
              <span className="eyebrow report-label">Season report</span>
              <ul className="report-deltas">
                {deltas.cash !== 0 && (
                  <li>
                    Cash{' '}
                    <strong>
                      {deltas.cash > 0 ? '+' : '−'}£{Math.abs(deltas.cash)}k
                    </strong>
                  </li>
                )}
                {deltas.heat !== 0 && (
                  <li>
                    Heat <strong>{deltas.heat > 0 ? '+' : '−'}{Math.abs(deltas.heat)}</strong>
                  </li>
                )}
                {deltas.novelty !== 0 && (
                  <li>
                    Novelty <strong>{deltas.novelty > 0 ? '+' : '−'}{Math.abs(deltas.novelty)}</strong>
                  </li>
                )}
                {deltas.social !== 0 && (
                  <li>
                    Social <strong>{deltas.social > 0 ? '+' : '−'}{Math.abs(deltas.social)}</strong>
                  </li>
                )}
                {deltas.cash === 0 && deltas.heat === 0 && deltas.novelty === 0 && deltas.social === 0 && (
                  <li>No surface change this season — the quiet ones count too.</li>
                )}
              </ul>
              {state.reaction && <p className="report-reaction">{state.reaction}</p>}
              {state.allyToast && <p className="ally-toast">{state.allyToast}</p>}
              {state.recurring.length > 0 && (
                <div className="report-commitments">
                  <span className="eyebrow">Ongoing commitments</span>
                  <ul>
                    {state.recurring.map((r, i) => (
                      <li key={i}>
                        {r.label ?? 'Commitment'}
                        {r.cash ? ` · ${r.cash > 0 ? '+' : '−'}£${Math.abs(r.cash)}k/season` : ''}
                        {r.turns !== undefined ? ` · ${r.turns} left` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p className={`report-pressure pressure-${pressure}`}>
                Pressure: {pressureLabel(pressure)}
                {pressure === 'quiet'
                  ? ' — nothing you can name yet.'
                  : pressure === 'uneasy'
                    ? ' — something could break.'
                    : ' — several things could break.'}
              </p>
              {state.lastFact && (
                <aside className="record">
                  <span className="eyebrow record-label">The record</span>
                  <p>{state.lastFact}</p>
                </aside>
              )}
            </section>
          )}

          {betweenSeasons && state.turn === 1 && state.reaction === null && (
            <p className="desk-welcome">
              {state.brand
                ? `${state.brand.name} is open. Sixteen seasons. The desk is yours.`
                : 'Sixteen seasons. The desk is yours.'}
            </p>
          )}

          {betweenSeasons && !state.deskActionUsed && state.turn > 1 && (
            <div className="desk-actions">
              <span className="eyebrow">Desk action — once this season</span>
              <div className="desk-action-row">
                {DESK_ACTIONS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    className="desk-action-btn"
                    disabled={a.id === 'repair_clinic' && state.cash < 6}
                    onClick={() => onDeskAction(a.id)}
                  >
                    <span>{a.label}</span>
                    <span className="eyebrow">{a.detail}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {card && betweenSeasons && (
            <button
              type="button"
              className={`btn-deal ${isCrisisWaiting ? 'btn-deal-crisis' : ''}`}
              onClick={() => setDealt(true)}
            >
              {isCrisisWaiting
                ? '⚠ Something is developing'
                : state.turn === 1
                  ? 'Open your first decision'
                  : 'Open the next decision'}
            </button>
          )}

          {state.whisper && betweenSeasons && <p className="whisper">{state.whisper}</p>}
        </section>
      </div>

      {card && (dealt || state.looked) && !showPing && (
        <CardModal
          card={card}
          state={state}
          onLearnMore={onLearnMore}
          onChoose={onChoose}
          lockedReason={(choice) => choiceLockedReason(choice, state.social)}
        />
      )}

      {showPing && state.pendingPing && (
        <PhonePing ping={state.pendingPing} onReply={onResolvePing} onIgnore={onIgnorePing} />
      )}

      {showIntro && <Intro onDone={dismissIntro} />}
    </div>
  )
}
