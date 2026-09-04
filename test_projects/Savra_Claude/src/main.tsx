import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

// The real viewport width, excluding the scrollbar. `100vw` includes it, which makes every
// full-bleed element overhang by the scrollbar width at each edge.
//
// A ResizeObserver rather than a one-shot read: at module scope the document is still empty,
// so there is no scrollbar yet and clientWidth reports the full 100vw — the exact value this
// is meant to correct. The observer fires again once content has laid out.
const setViewportWidth = () =>
  document.documentElement.style.setProperty('--vw', `${document.documentElement.clientWidth}px`)
setViewportWidth()
new ResizeObserver(setViewportWidth).observe(document.documentElement)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
