import { useEffect, useState } from 'react'
import { onPageProgress } from '../lib/motion'

/**
 * Fixed header. Carries the wordmark, the beat anchors, the clock, and — from the very first
 * frame — the reservation CTA.
 *
 * The persistent CTA is deliberate. An earlier draft put the only reservation affordance at
 * beat 6, roughly 85% of the way down a 7.4-viewport scroll, which routed the entire business
 * goal through completing the narrative. The narrative is still the intended path; it is no
 * longer the only one.
 *
 * The clock is the page's progress indicator. It runs 16:40 → 18:00 across the scroll. It is
 * `aria-hidden`: a timestamp that changes as you scroll is meaningful to look at and noise to
 * hear. The beat thresholds below are proportions of total scroll, so they track the real
 * page rather than the 7.4-viewport layout the build plan originally assumed.
 */

/**
 * Each beat carries the time it states on screen. The clock interpolates between these using
 * the beats' *measured* offsets, so the header and the section headline can never disagree —
 * when beat 6 says "18:00 · they open", the clock says 18:00.
 *
 * An earlier version mapped 16:40 → 18:00 linearly onto total scroll with thresholds hard-
 * coded for a 7.4-viewport layout. The page shipped at 10.9, so 18:00 arrived at the footer
 * and the header read roughly 17:46 beside a headline announcing six o'clock.
 */
const BEATS = [
  { id: 'top', label: null, minutes: 16 * 60 + 40 },
  { id: 'street', label: 'Street', minutes: 16 * 60 + 52 },
  { id: 'room', label: 'Room', minutes: 17 * 60 + 5 },
  { id: 'material', label: 'Made of', minutes: 17 * 60 + 20 },
  { id: 'hands', label: 'Hands', minutes: 17 * 60 + 38 },
  { id: 'pass', label: 'Pass', minutes: 17 * 60 + 52 },
  { id: 'opening', label: 'Open', minutes: 18 * 60 },
]

function hhmm(total: number): string {
  const m = Math.round(total)
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}

export default function Header({ onReserve }: { onReserve: () => void }) {
  const [progress, setProgress] = useState(0)
  const [offsets, setOffsets] = useState<number[]>([])

  useEffect(() => onPageProgress(setProgress), [])

  // Measure where the beats actually are, and re-measure when the layout can have changed.
  useEffect(() => {
    const measure = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      setOffsets(BEATS.map((b) => {
        const el = document.getElementById(b.id)
        return el ? Math.min(1, el.offsetTop / max) : 0
      }))
    }
    measure()
    const t = window.setTimeout(measure, 600)   // after fonts and lazy media settle
    window.addEventListener('resize', measure)
    return () => { window.clearTimeout(t); window.removeEventListener('resize', measure) }
  }, [])

  // The last beat whose measured offset we have passed.
  const activeIndex = offsets.length
    ? offsets.reduce((acc, at, i) => (progress >= at ? i : acc), 0)
    : 0

  // Interpolate the clock between the two beats we are actually between.
  const clock = (() => {
    if (offsets.length < 2) return hhmm(BEATS[0].minutes)
    const i = Math.min(activeIndex, BEATS.length - 2)
    const span = Math.max(1e-6, offsets[i + 1] - offsets[i])
    const t = Math.min(1, Math.max(0, (progress - offsets[i]) / span))
    return hhmm(BEATS[i].minutes + (BEATS[i + 1].minutes - BEATS[i].minutes) * t)
  })()

  return (
    <header className="header">
      <a className="header__mark" href="#top">
        SAVRA
      </a>

      <nav className="header__nav" aria-label="Sections">
        {BEATS.filter((b) => b.label).map((b) => {
          const i = BEATS.indexOf(b)
          return (
            <a
              key={b.id}
              className="header__link"
              href={`#${b.id}`}
              aria-current={i === activeIndex ? 'true' : undefined}
            >
              {b.label}
            </a>
          )
        })}
      </nav>

      <span className="header__clock" aria-hidden="true">
        {clock}
      </span>

      <button type="button" className="header__cta" onClick={onReserve}>
        Reserve
      </button>
    </header>
  )
}
