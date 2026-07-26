import { useState } from 'react'

/** One source of truth for what the four numbers mean — the intro and the
 *  dashboard help panel both read from here. */
export const STAT_HELP: { label: string; text: string }[] = [
  {
    label: 'CASH',
    text: 'Your runway, in thousands. Below zero, the bank starts making your decisions for you.',
  },
  {
    label: 'HEAT',
    text: 'How much the industry talks about you. It opens doors — and it attracts journalists.',
  },
  {
    label: 'NOVELTY',
    text: 'The market’s hunger for your next drop. It decays every single season. Feed it, or the feed forgets you.',
  },
  {
    label: 'SOCIAL CAPITAL',
    text: 'Trust — workers, customers, community. Slow to earn, impossible to buy, priceless later. High trust cushions a quiet season and can absorb one crisis.',
  },
]

interface Props {
  onDone: () => void
}

/** Three beats of onboarding before Season 1. The tone is the game's tone:
 *  no tutorial-speak, but nobody starts blind. */
export function Intro({ onDone }: Props) {
  const [step, setStep] = useState(0)

  const slides = [
    <>
      <p className="eyebrow intro-kicker">HOW THIS WORKS · 1 OF 3</p>
      <h2 className="intro-title">The label is yours</h2>
      <p className="intro-body">
        Sixteen seasons. One decision each — fabrics, factories, funding, what you do when a journalist calls.
      </p>
      <p className="intro-body">
        There are no right answers. Only trade-offs, and the question of where they land.
      </p>
    </>,
    <>
      <p className="eyebrow intro-kicker">HOW THIS WORKS · 2 OF 3</p>
      <h2 className="intro-title">Four numbers</h2>
      <ul className="intro-stats">
        {STAT_HELP.map((s) => (
          <li key={s.label}>
            <span className="eyebrow intro-stat-label">{s.label}</span>
            <span>{s.text}</span>
          </li>
        ))}
      </ul>
    </>,
    <>
      <p className="eyebrow intro-kicker">HOW THIS WORKS · 3 OF 3</p>
      <h2 className="intro-title">What you don’t see</h2>
      <p className="intro-body">
        Every decision also lands somewhere off your dashboard — a river, a lung, a pair of hands, a hillside. The
        world keeps its own ledger. You’ll meet it eventually.
      </p>
      <p className="intro-body">
        <strong>LEARN MORE</strong> lets you look before you choose — but looking costs a season. Most people never
        look.
      </p>
      <p className="intro-body intro-record-note">
        Everything in this game is drawn from the real industry. Watch for <strong>THE RECORD</strong> — real,
        sourced figures that appear between seasons.
      </p>
    </>,
  ]

  const last = step === slides.length - 1

  return (
    <div className="cardmodal-backdrop intro-backdrop">
      <article className="intro-panel" key={step}>
        {slides[step]}
        <div className="intro-actions">
          <button
            type="button"
            className="btn-primary intro-next"
            onClick={() => (last ? onDone() : setStep(step + 1))}
          >
            {last ? 'Begin Season 1' : 'Next'}
          </button>
          {!last && (
            <button type="button" className="btn-skip" onClick={onDone}>
              Skip — I’ve played before
            </button>
          )}
        </div>
      </article>
    </div>
  )
}
