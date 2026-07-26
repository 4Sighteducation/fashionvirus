import { useState } from 'react'
import { About } from './About'

interface Props {
  onStart: () => void
  newGamePlus: boolean
}

// No mode select. Everyone plays blind — that's the whole design (§5).
export function StartScreen({ onStart, newGamePlus }: Props) {
  // The concept walkthrough opens itself the first time, then waits to be asked.
  const [showAbout, setShowAbout] = useState(() => {
    if (newGamePlus) return false
    try {
      return !localStorage.getItem('fv-about-seen')
    } catch {
      return true
    }
  })
  const closeAbout = () => {
    try {
      localStorage.setItem('fv-about-seen', '1')
    } catch {
      // private mode — it will simply show again next time
    }
    setShowAbout(false)
  }

  return (
    <main className="start">
      <p className="eyebrow start-kicker">A game in two acts</p>
      <img className="start-logo" src="/assets/brand/fashion-virus-label.png" alt="FASHION VIRUS — a clothing label, dye-stained" />
      <p className="start-tagline">Build a fashion empire. Face the fallout.</p>
      <button className="btn-primary" type="button" onClick={onStart}>
        {newGamePlus ? 'Start again — eyes open' : 'Start your label'}
      </button>
      <button className="btn-about" type="button" onClick={() => setShowAbout(true)}>
        What is this? — about the game
      </button>
      {newGamePlus && (
        <p className="start-ngplus">New Game+: the ledger is visible from turn one.</p>
      )}
      <p className="start-note">25–30 minutes · anonymous decision logging for research</p>

      {showAbout && <About onClose={closeAbout} />}
    </main>
  )
}
