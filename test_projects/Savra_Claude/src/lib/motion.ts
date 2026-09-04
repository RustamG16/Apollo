/**
 * The only place in the application that reads a motion media query.
 *
 * A component that calls `matchMedia('(prefers-reduced-motion: reduce)')` on its own is a
 * bug: the reduced-motion guarantee in `ARCHITECTURE-ESSENTIALS.md` can only be verified if
 * the decision is single-sourced. Ask this module instead.
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, Flip, SplitText)

export { gsap, ScrollTrigger, Flip, SplitText }

/** Durations, in seconds. From the apollo-kinetic token set: 150 / 400 / 800ms. */
export const DUR = {
  micro: 0.15, // state feedback
  move: 0.4, // element transitions
  scene: 0.8, // section handoffs
} as const

export const EASE = {
  out: 'cubic-bezier(.16,1,.3,1)',
  inOut: 'cubic-bezier(.65,0,.35,1)',
  /** GSAP's named equivalents, for tweens rather than CSS. */
  gsapOut: 'power3.out',
  gsapInOut: 'power2.inOut',
} as const

/** Stagger, capped at 8 elements — beyond that a stagger reads as a delay, not a rhythm. */
export const STAGGER = 0.06
export const STAGGER_CAP = 8

/** Never 0. A scrub of 0 pins the animation to the raw scroll position and stutters. */
export const SCRUB = 1

const REDUCE = '(prefers-reduced-motion: reduce)'

/**
 * Whether motion should run. Read once per effect — not cached at module scope, because the
 * setting can change while the page is open and QA toggles it deliberately.
 */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(REDUCE).matches
}

/**
 * Run `full` only when motion is allowed, and `reduced` when it is not.
 *
 * Both branches must leave the page in the *same end state*. The reduced branch is not
 * "do nothing" — it is "arrive immediately". Anything left invisible or mid-transition when
 * motion is off is a defect, not a simplification.
 */
export function motionGate(full: () => void, reduced: () => void): () => void {
  const mm = gsap.matchMedia()
  mm.add(
    { motion: `(prefers-reduced-motion: no-preference)`, still: REDUCE },
    (ctx) => {
      const { motion } = ctx.conditions as { motion: boolean; still: boolean }
      if (motion) full()
      else reduced()
    },
  )
  return () => mm.revert()
}

/**
 * Guarantee a tween reaches its end state.
 *
 * `gsap.from(..., { opacity: 0 })` is a hide-then-reveal: if the ticker never advances, the
 * content stays hidden. GSAP drives on requestAnimationFrame, which browsers suspend in
 * background tabs and some embedded views. GSAP normally catches up on resume, but "normally"
 * is not a guarantee worth betting legibility on, so every entrance carries a timer that
 * forces completion if the animation has not finished on its own.
 *
 * Content is never invisible for longer than it takes to animate it.
 */
export function settle(tween: gsap.core.Tween | undefined, afterMs: number): () => void {
  if (!tween) return () => {}
  const id = window.setTimeout(() => {
    if (tween.progress() < 1) tween.progress(1).kill()
  }, afterMs)
  return () => window.clearTimeout(id)
}

/**
 * Subscribe to the page's single global scroll progress, 0 at the top of the document and 1
 * at the bottom.
 *
 * Exactly one ScrollTrigger drives this, and it is the only scroll-linked value the page
 * has. The doors read it; the header's clock and active-beat state read it. Nothing else
 * may create a document-spanning trigger — see the ownership map in
 * `.olympus/06-build-plan.md`.
 */
export function onPageProgress(fn: (p: number) => void): () => void {
  if (prefersReducedMotion()) {
    // Reduced motion means "arrive immediately", not "report the end of the page". Reporting
    // progress 1 pinned aria-current to the last section from the first frame and froze the
    // clock at 18:00 — a false navigation state announced to assistive technology, and the
    // narrative device removed for exactly the cohort that cannot see the motion carry it.
    // A scroll listener is not motion; it is position, and it stays accurate.
    const read = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      fn(Math.min(1, Math.max(0, window.scrollY / max)))
    }
    read()
    window.addEventListener('scroll', read, { passive: true })
    return () => window.removeEventListener('scroll', read)
  }
  const st = ScrollTrigger.create({
    trigger: document.documentElement,
    start: 'top top',
    end: 'bottom bottom',
    scrub: SCRUB,
    onUpdate: (self) => fn(self.progress),
  })
  return () => st.kill()
}

/**
 * A one-shot entry for a section: fade and rise, once, on first arrival.
 *
 * **This is deliberately not a GSAP tween.** An entrance built on `gsap.from(…, {opacity:0})`
 * is a hide-then-reveal, and it strands content whenever the animation does not run to
 * completion — a suspended ticker, a re-fired trigger after a forced settle, a torn-down
 * context. The failure mode is invisible text, which is the worst one available.
 *
 * A class toggle plus a CSS transition cannot fail that way: once `.is-in` is on, the end
 * state is the stylesheet's default whether the transition ran or not. IntersectionObserver
 * needs no animation frames, and `prefers-reduced-motion` is handled entirely in CSS.
 *
 * GSAP is kept for what only GSAP does here: the scrubbed doors, and Flip on the menu.
 */
export function sectionEntry(el: Element, stagger = true): () => void {
  if (stagger) {
    el.querySelectorAll<HTMLElement>('[data-enter]').forEach((child, i) => {
      child.style.setProperty('--i', String(Math.min(i, STAGGER_CAP)))
    })
  }

  // Content is visible by default in CSS. The hidden start state is applied by JS, and only
  // to sections that are actually below the fold — a section already on screen when this
  // runs is shown at once rather than hidden and faded back in. That is better behaviour
  // (nothing animates in that the visitor is already looking at), and it means a page opened
  // at an anchor renders its target section immediately instead of blank.
  const onScreen = el.getBoundingClientRect().top < window.innerHeight
  if (onScreen || prefersReducedMotion()) {
    el.classList.add('is-in')
    return () => {}
  }

  el.classList.add('will-enter')

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          io.disconnect()
        }
      }
    },
    { rootMargin: '0px 0px -22% 0px' },
  )
  io.observe(el)

  // If the observer never reports — an edge case in embedded views — show the content anyway.
  const safety = window.setTimeout(() => el.classList.add('is-in'), 2500)

  return () => {
    io.disconnect()
    window.clearTimeout(safety)
  }
}
