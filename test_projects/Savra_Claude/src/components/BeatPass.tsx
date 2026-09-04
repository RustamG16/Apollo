import { useEffect, useRef, useState } from 'react'
import { courses, defaultCourseIndex } from '../assets'
import { Flip, gsap, sectionEntry, prefersReducedMotion, DUR } from '../lib/motion'
import Placeholder from './Placeholder'

/**
 * Beat 5 — the pass, 17:52.
 *
 * A real listbox. All six course names are permanently visible, and selection works by
 * click, hover, focus and arrow keys. An earlier draft drove this on hover alone with the
 * unselected names hidden, which put the only concrete information about the cooking behind
 * a gesture a visitor may never make.
 *
 * Two things are worth knowing about the plate:
 *
 * 1. **The field follows the photograph.** Each course image's background is measured by
 *    `prepare_media.py` and stored in `assets.ts`; selecting a course transitions the section
 *    background to that value. The photographs are also feathered at the edge, so the plate
 *    reads as resting on the page rather than sitting inside a rectangle. Course 5 is the
 *    default because its measured `#365862` sits RGB-7 from the brand slate — there, the seam
 *    is not merely soft, it is absent.
 *
 * 2. **Flip is used for what only Flip can do.** It preserves the spatial relationship
 *    between the name in the list and the plate in the hero slot. A cross-fade destroys that
 *    relationship. Both states are 4:3 with `object-fit: cover`, so Flip interpolates position
 *    and scale only and never distorts the image.
 *
 *    Note this is *not* justified by the plates being the same physical object. Only four of
 *    the supplied subjects sit on the identical round teal ceramic; the sea bass is an oval
 *    and the quince is a cream bowl. That claim was withdrawn rather than the menu bent to
 *    fit it.
 */
export default function BeatPass() {
  const root = useRef<HTMLElement>(null)
  const plate = useRef<HTMLImageElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(defaultCourseIndex)
  const previous = useRef(defaultCourseIndex)

  const course = courses[index]

  useEffect(() => {
    const el = root.current
    if (!el) return
    return sectionEntry(el)
  }, [])

  // Paint the section in the newly selected photograph's measured background.
  useEffect(() => {
    root.current?.style.setProperty('--pass-field', course.field)
  }, [course.field])

  // Flip the plate between the outgoing and incoming layout.
  useEffect(() => {
    const img = plate.current
    if (!img || previous.current === index) return
    previous.current = index
    if (prefersReducedMotion()) return

    const state = Flip.getState(img)
    Flip.from(state, {
      duration: DUR.move,
      ease: 'power3.out',
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0 }, { opacity: 1, duration: DUR.move }),
    })
  }, [index])

  // One path for every keyboard move, so selection and DOM focus can never disagree. An
  // earlier version focused separately in the Home/End branches and they could desynchronise,
  // leaving aria-selected on one option and the visible focus ring on another.
  const select = (next: number) => {
    setIndex(next)
    const option = list.current?.children[next] as HTMLElement | undefined
    option?.focus()
  }
  const move = (delta: number) => select((index + delta + courses.length) % courses.length)

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault()
        move(1)
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault()
        move(-1)
        break
      case 'Home':
        e.preventDefault()
        select(0)
        break
      case 'End':
        e.preventDefault()
        select(courses.length - 1)
        break
    }
  }

  return (
    <section className="beat pass" id="pass" ref={root}>
      <div className="wrap grid">
        <div className="pass__head" data-enter>
          <p className="eyebrow">17:52 · the pass</p>
          <h2 className="display" style={{ marginBlock: 'var(--s3)' }}>
            Six courses,<br />in the order they are eaten
          </h2>
          <p className="lead">
            One menu each evening, and it changes with what the growers bring. Six courses,
            <Placeholder>price per person</Placeholder>.
          </p>
        </div>

        <div className="pass__list" data-enter>
          <ul
            className="pass__courses"
            ref={list}
            role="listbox"
            aria-label="Menu — six courses"
            onKeyDown={onKeyDown}
          >
            {courses.map((c, i) => (
              <li
                key={c.id}
                className="course"
                role="option"
                aria-selected={i === index}
                tabIndex={i === index ? 0 : -1}
                onClick={() => setIndex(i)}
                onMouseEnter={() => setIndex(i)}
                onFocus={() => setIndex(i)}
              >
                <span className="course__numeral">{c.numeral}</span>
                <span>
                  <span className="course__name">{c.name}</span>
                  <span className="course__detail">{c.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pass__plate" data-enter>
          <figure>
            <img
              ref={plate}
              key={course.id}
              src={course.image}
              width={course.width}
              height={course.height}
              alt={course.alt}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
