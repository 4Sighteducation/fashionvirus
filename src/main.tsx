import { StrictMode, Suspense, lazy, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted fonts (Google Fonts via Fontsource, SIL OFL).
// Bodoni Moda: display voice — wght + opsz axes.
// Archivo: workhorse sans — wght + wdth axes (font-stretch ~62.5% = Archivo Narrow).
// Space Mono: ledgers, whispers, telemetry, evidence.
import '@fontsource-variable/bodoni-moda/opsz.css'
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource/space-mono/400.css'
import '@fontsource/space-mono/700.css'

import './index.css'
import App from './App.tsx'

// The world-builder lab lives at #world and is lazy-loaded so the
// card game's bundle doesn't carry Three.js.
const WorldApp = lazy(() => import('./world/WorldApp.tsx'))

function Root() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (hash === '#world') {
    return (
      <Suspense fallback={null}>
        <WorldApp />
      </Suspense>
    )
  }
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
