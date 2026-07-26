import { useState } from 'react'

interface Props {
  onClose: () => void
}

interface Slide {
  art: string
  kicker: string
  title: string
  body: React.ReactNode
}

/** The concept walkthrough — why this game exists, in the game's own voice.
 *  Auto-opens on first visit; always reachable from the start screen.
 *  Distinct from the HOW THIS WORKS intro, which teaches the controls. */
const SLIDES: Slide[] = [
  {
    art: '/assets/editorial/glitch-dress.png',
    kicker: 'THE IDEA',
    title: 'A virus doesn’t ask permission',
    body: (
      <>
        <p className="intro-body">
          Fast fashion behaves like a virus. It spreads through feeds, mutates every season, and its costs land on
          hosts who never chose it — rivers, lungs, hillsides, hands.
        </p>
        <p className="intro-body">
          You play patient zero: a founder with a bedroom label, a good eye, and every intention of being one of the
          good ones.
        </p>
      </>
    ),
  },
  {
    art: '/assets/editorial/landfill-gown.png',
    kicker: 'THE REAL STORY',
    title: 'Fiction, built on the record',
    body: (
      <>
        <p className="intro-body">
          The industry this game plays with is real. Clothing production roughly doubled between 2000 and 2015 while
          the life of a garment shrank by a third. Less than 1% of it is ever recycled into new clothing. The people
          who make it typically receive 2–4% of the price tag.
        </p>
        <p className="intro-body">Nothing in the game is exaggerated for effect. Most of it is toned down.</p>
      </>
    ),
  },
  {
    art: '/assets/editorial/glitch-shroud.png',
    kicker: 'THE SHAPE',
    title: 'Two acts. One ledger.',
    body: (
      <>
        <p className="intro-body">
          <strong>Act 1</strong> — sixteen seasons to build. You see what a founder sees: cash, heat, novelty, trust.
          What you don’t see is the ledger — water, carbon, waste, fibres, hours, land. It fills anyway.
        </p>
        <p className="intro-body">
          <strong>Act 2</strong> — the awards are over, and you walk into the world you built. Five years to repair
          what can still be repaired. Breaking is fast. Mending is slow. That asymmetry is the point.
        </p>
      </>
    ),
  },
  {
    art: '/assets/editorial/mended-gown.png',
    kicker: 'THE OTHER ECONOMY',
    title: 'Money is fast. Trust is slow.',
    body: (
      <>
        <p className="intro-body">
          Alongside the money, the game tracks <strong>social capital</strong> — earned by repairing, paying properly,
          staying local, telling the truth. It cushions quiet seasons, absorbs one crisis, and brings named people
          into your story.
        </p>
        <p className="intro-body">
          It never shows up in the valuation. It decides whether you face the ending alone or held.
        </p>
      </>
    ),
  },
  {
    art: '/assets/editorial/swatch-coat.png',
    kicker: 'THE POINT',
    title: 'A game that leaves a residue',
    body: (
      <>
        <p className="intro-body">
          Everything factual in the game is real and sourced — watch for <strong>THE RECORD</strong> between seasons.
          Your choices are logged anonymously, for research into how people decide when the cost is hidden.
        </p>
        <p className="intro-body">
          The game won’t tell you what to choose. It shows you where choices land. Play it twice — the second run
          deals the same world with the ledger face-up.
        </p>
      </>
    ),
  },
]

export function About({ onClose }: Props) {
  const [step, setStep] = useState(0)
  const slide = SLIDES[step]
  const last = step === SLIDES.length - 1

  return (
    <div className="cardmodal-backdrop intro-backdrop">
      <article className="intro-panel about-panel" key={step}>
        <div className="about-art" style={{ backgroundImage: `url(${slide.art})` }} />
        <div className="about-text">
          <p className="eyebrow intro-kicker">
            {slide.kicker} · {step + 1} OF {SLIDES.length}
          </p>
          <h2 className="intro-title">{slide.title}</h2>
          {slide.body}
          <div className="intro-actions">
            {step > 0 && (
              <button type="button" className="btn-skip" onClick={() => setStep(step - 1)}>
                Back
              </button>
            )}
            <button
              type="button"
              className="btn-primary intro-next"
              onClick={() => (last ? onClose() : setStep(step + 1))}
            >
              {last ? 'To the label' : 'Next'}
            </button>
            {!last && (
              <button type="button" className="btn-skip" onClick={onClose}>
                Skip
              </button>
            )}
          </div>
          <div className="about-dots" aria-hidden>
            {SLIDES.map((s, i) => (
              <span key={s.kicker} className={`about-dot ${i === step ? 'about-dot-now' : ''}`} />
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
