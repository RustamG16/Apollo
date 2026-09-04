import { useEffect } from 'react'
import { gsap, settle, prefersReducedMotion } from '../lib/motion'

/**
 * The doors: two ground-coloured panels that open across the hero on arrival.
 *
 * This is an **arrival gesture, not a scroll mechanic**, and it took two attempts to get
 * there. First it was a document-length mask, which narrowed every section below it to pay
 * for one idea. Then it was a hero-length scrubbed mask, which meant the hero photograph —
 * the strongest asset this brand has — sat 62% covered for as long as the visitor stayed at
 * the top of the page.
 *
 * Now it opens once, on load, over 1.6 seconds, and is gone. The page's first movement is
 * the doors opening onto the room, and after that nothing is hidden. It also rhymes with the
 * hero moment at beat 6, where the restaurant itself opens at 18:00 — the same gesture, the
 * first time as a prologue and the second time as the resolution.
 *
 * `transform: scaleX` only, so this is compositor work rather than a per-frame paint of a
 * full 1920×1080 surface. The panels default to `scaleX(0)` in CSS and are only ever *closed*
 * by this component, so a visitor without JavaScript gets the photograph unmasked rather than
 * a blank screen.
 */
export default function Doors() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(document.documentElement, { '--doors': 0 })
      return
    }

    // Only stage the closed state if the visitor is actually at the top. Arriving deep into
    // the page — a reload at an anchor, a restored scroll position — should not play an
    // entrance for a section that is nowhere near the viewport.
    if (window.scrollY > window.innerHeight * 0.4) {
      gsap.set(document.documentElement, { '--doors': 0 })
      return
    }

    const intro = gsap.fromTo(
      document.documentElement,
      { '--doors': 0.62 },
      { '--doors': 0, duration: 1.6, ease: 'power3.inOut', delay: 0.15 },
    )
    const stop = settle(intro, 2400)

    return () => {
      stop()
      intro.kill()
    }
  }, [])

  return (
    <div className="doors" aria-hidden="true">
      <div className="door-panel door-panel--l" />
      <div className="door-panel door-panel--r" />
    </div>
  )
}
