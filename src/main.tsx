import { StrictMode } from 'react'
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
