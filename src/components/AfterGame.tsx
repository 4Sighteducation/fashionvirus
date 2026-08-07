import { useState } from 'react'
import { submitHabitsSurvey } from '../lib/survey'

interface Props {
  runId: string
}

// The follow-up: deliberately non-judgemental. The game just spent half an
// hour proving the system is rigged — this must never scold the player for
// living inside it. No scoring, no red answers, skipping is always allowed.
const QUESTIONS = [
  {
    id: 'acquire',
    q: 'How often does something new come into your wardrobe?',
    options: ['Most weeks', 'Most months', 'A few times a year', 'Hardly ever'],
  },
  {
    id: 'source',
    q: 'Where do your clothes mostly come from?',
    options: [
      'New — high street or online',
      'A mix of new and second-hand',
      'Mostly second-hand',
      'I make, mend or swap',
    ],
  },
  {
    id: 'repair',
    q: 'A seam goes, or a button. What usually happens?',
    options: [
      'I fix it — or know someone who can',
      'It waits in a pile',
      'It quietly gets replaced',
      'Depends how much I love it',
    ],
  },
  {
    id: 'letgo',
    q: 'And the clothes you no longer wear?',
    options: [
      'Charity shop or passed on',
      'Sold on — Vinted, eBay…',
      'Bin, honestly',
      'They stay in the wardrobe',
    ],
  },
  {
    id: 'trigger',
    q: 'What most often starts a purchase?',
    options: [
      'An occasion',
      'A scroll — saw it, wanted it',
      'Replacing something worn out',
      'A bargain too good to skip',
    ],
  },
]

const IDEAS = [
  {
    title: 'The thirty-wears test',
    body: 'Before buying, ask: will I wear this thirty times? If yes, buy it well and enjoy it. If not, it was probably the scroll talking.',
  },
  {
    title: 'Repair first',
    body: 'A mended seam costs less than a replacement and keeps the story going. Most towns have a repair café or an alterations counter — and repairs compound: learn one stitch and you keep a drawerful of clothes alive.',
  },
  {
    title: 'Second-hand first for occasions',
    body: 'One-night outfits are exactly what resale and rental were built for. The dress is still spectacular; it just has more than one life.',
  },
  {
    title: 'Wash less, wash cold',
    body: 'Most clothes are retired by washing, not wearing. Cooler and less often means they last years longer — and shed fewer microplastics along the way.',
  },
  {
    title: 'Count cost per wear, not cost per item',
    body: 'The £80 coat worn two hundred times is cheaper than the £20 one worn five. This is the ledger the game kept for you — kept for yourself, it changes what a bargain looks like.',
  },
]

export function AfterGame({ runId }: Props) {
  const [step, setStep] = useState<'ask' | 'ideas'>('ask')
  const [answers, setAnswers] = useState<Record<string, string>>({})

  if (step === 'ideas') {
    return (
      <section className="aftergame">
        <p className="eyebrow aftergame-kicker">Small ideas that actually work</p>
        <p className="aftergame-intro">
          Nothing here is about buying nothing, or austerity, or guilt. It’s the game’s repair
          vocabulary — small, human-scale, genuinely useful — brought home.
        </p>
        <ul className="aftergame-ideas">
          {IDEAS.map((idea) => (
            <li key={idea.title}>
              <strong>{idea.title}</strong>
              <span>{idea.body}</span>
            </li>
          ))}
        </ul>
        <div className="aftergame-links">
          <a href="https://ketchupclothes.com" target="_blank" rel="noreferrer">
            <strong>Ketchup Clothes</strong>
            <span>
              Dr Karen Dennis’s studio and community hub in Clacton-on-Sea — repairs, workshops,
              and streetwear handcrafted from reclaimed materials. The research behind this game,
              running as a real shop.
            </span>
          </a>
          <a href="https://thecarboncloset.com" target="_blank" rel="noreferrer">
            <strong>The Carbon Closet</strong>
            <span>
              A curated edit of ethical and sustainable brands — for when something new is the
              right call, and you want it made properly.
            </span>
          </a>
        </div>
      </section>
    )
  }

  const complete = QUESTIONS.every((q) => answers[q.id])

  return (
    <section className="aftergame">
      <p className="eyebrow aftergame-kicker">Back in the real world</p>
      <p className="aftergame-intro">
        The game is over and this part isn’t scored. There are no wrong answers here — the game
        was rigged, and real life mostly is too. Five quick questions about how clothes actually
        move through your life, then some ideas people find genuinely useful.
      </p>
      {QUESTIONS.map((q) => (
        <fieldset className="aftergame-q" key={q.id}>
          <legend>{q.q}</legend>
          <div className="aftergame-options">
            {q.options.map((opt) => (
              <button
                key={opt}
                type="button"
                className={answers[q.id] === opt ? 'selected' : ''}
                onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
              >
                {opt}
              </button>
            ))}
          </div>
        </fieldset>
      ))}
      <div className="aftergame-actions">
        <button
          className="btn-primary"
          type="button"
          disabled={!complete}
          onClick={() => {
            submitHabitsSurvey(runId, answers)
            setStep('ideas')
          }}
        >
          {complete ? 'See the ideas' : 'Answer all five to continue'}
        </button>
        <button className="aftergame-skip" type="button" onClick={() => setStep('ideas')}>
          Skip the questions — just show me the ideas
        </button>
      </div>
      <p className="aftergame-note">
        Answers are anonymous and stored with your run for research, like your in-game decisions.
      </p>
    </section>
  )
}
