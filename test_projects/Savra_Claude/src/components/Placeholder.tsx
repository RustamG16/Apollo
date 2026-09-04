import type { ReactNode } from 'react'

/**
 * A fact the supplied material does not contain.
 *
 * SAVRA is fictional and the media set carries no address, hours, telephone, prices or
 * names. Rather than invent plausible ones — which would read as real and would be a lie in
 * the one place a visitor is most likely to act on it — every such value renders here:
 * bracketed, in mono, dimmed, with a dashed underline, and announced to assistive technology
 * as unfilled.
 *
 * Every use is also a launch blocker in `.olympus/09-handoff.md`.
 */
export default function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="placeholder">
      [{children}]<span className="sr-only"> — not yet supplied</span>
    </span>
  )
}
