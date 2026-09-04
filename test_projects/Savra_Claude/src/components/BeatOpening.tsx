import { useEffect, useRef } from 'react'
import { media } from '../assets'
import { sectionEntry } from '../lib/motion'
import Placeholder from './Placeholder'

/**
 * Beat 6 — they open, 18:00. **The hero moment, and the only one.**
 *
 * Everything before this has been a room getting ready; this is the moment it stops being
 * empty, and the reservation is standing in the opening. The doors themselves are long gone
 * by here — they are an arrival gesture on the first screen, not a spine that lands on this
 * beat, and an earlier docblock claiming otherwise survived the revision that changed it.
 *
 * Vanilla arrives here and nowhere else — as a panel of light raking in from the left edge,
 * not as a full-viewport wash. That is both more faithful to the photograph (light spilling
 * through a door onto a laid table) and kinder: a scrub-driven flood from a near-black ground
 * to `#FFF3B0` would be a ~16:1 whole-screen luminance swing that the visitor can oscillate
 * at whatever rate they scroll.
 */
export default function BeatOpening({ onReserve }: { onReserve: () => void }) {
  const root = useRef<HTMLElement>(null)
  const glow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    // The vanilla panel rakes in via a CSS transition on `.is-in` — see styles.css.
    return sectionEntry(el)
  }, [])

  return (
    <section className="beat opening" id="opening" ref={root}>
      <div className="opening__glow" ref={glow} aria-hidden="true" />
      <div className="wrap grid">
        <figure className="figure opening__figure bleed" data-enter>
          <img src={media.door.src} width={media.door.width} height={media.door.height}
               alt={media.door.alt} loading="lazy" decoding="async" />
          <figcaption>18:00 — the door is unlocked from the inside</figcaption>
        </figure>

        <div className="opening__body">
          <p className="eyebrow" data-enter>
            18:00 · they open
          </p>
          <h2 className="display" data-enter style={{ marginBlock: 'var(--s3)' }}>
            They open<br />at six
          </h2>
          <p className="lead" data-enter>
            The waiting is the part nobody sees. From here it is an ordinary evening: six
            courses, one room, and a table that has been ready since four.
          </p>
          <p className="meta" data-enter style={{ marginTop: 'var(--s3)' }}>
            <Placeholder>service times</Placeholder> · <Placeholder>days open</Placeholder>
          </p>
          <button type="button" className="cta" onClick={onReserve} data-enter>
            Reserve a table
          </button>
        </div>

        <div className="opening__table" data-enter>
          <div className="grid">
            <figure className="figure" style={{ gridColumn: 'span 4' }}>
              <img src={media.table.src} width={media.table.width} height={media.table.height}
                   alt={media.table.alt} loading="lazy" decoding="async" />
            </figure>
            <figure className="figure" style={{ gridColumn: 'span 8' }}>
              <img src={media.roomLit.src} width={media.roomLit.width} height={media.roomLit.height}
                   alt={media.roomLit.alt} loading="lazy" decoding="async" />
              <figcaption>One room. Two of the seats are yours.</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
