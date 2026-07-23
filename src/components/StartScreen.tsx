interface Props {
  onStart: () => void
  newGamePlus: boolean
}

// No mode select. Everyone plays blind — that's the whole design (§5).
export function StartScreen({ onStart, newGamePlus }: Props) {
  return (
    <main className="start">
      <p className="eyebrow start-kicker">A game in two acts</p>
      <img className="start-logo" src="/assets/brand/fashion-virus-label.png" alt="FASHION VIRUS — a clothing label, dye-stained" />
      <p className="start-tagline">Build a fashion empire. Face the fallout.</p>
      <button className="btn-primary" type="button" onClick={onStart}>
        {newGamePlus ? 'Start again — eyes open' : 'Start your label'}
      </button>
      {newGamePlus && (
        <p className="start-ngplus">New Game+: the ledger is visible from turn one.</p>
      )}
      <p className="start-note">15–20 minutes · anonymous decision logging for research</p>
    </main>
  )
}
