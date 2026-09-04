import { useEffect, useRef, useState } from 'react'
import { media } from '../assets'
import { gsap, ScrollTrigger, SplitText, sectionEntry, settle, prefersReducedMotion } from '../lib/motion'
import Placeholder from './Placeholder'
import Doors from './Doors'

/* =========================================================================================
   Beat 0 — cold open, 16:40
   ========================================================================================= */

export function BeatOpen() {
  const mark = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = mark.current
    if (!el || prefersReducedMotion()) return

    // Wait for the display face. SplitText on a fallback font animates the wrong shapes and
    // then reflows when the real face lands — the one thing you cannot un-see on load.
    //
    // The tween is killed alongside the split. Reverting the split without killing the tween
    // leaves GSAP animating detached character spans, which under StrictMode's double-invoke
    // renders the wordmark twice, once of them stranded mid-flight.
    let split: SplitText | undefined
    let tween: gsap.core.Tween | undefined
    let stopSettle: (() => void) | undefined
    let cancelled = false

    document.fonts.ready.then(() => {
      if (cancelled) return
      split = new SplitText(el, { type: 'chars', charsClass: 'ch' })
      tween = gsap.from(split.chars, {
        yPercent: 115,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.055,
      })
      stopSettle = settle(tween, 1800)
    })

    return () => {
      cancelled = true
      stopSettle?.()
      tween?.kill()
      split?.revert()
    }
  }, [])

  return (
    <section className="open" id="top">
      <Doors />
      <div className="open__media">
        <img
          src={media.street.src}
          width={media.street.width}
          height={media.street.height}
          alt=""
          fetchPriority="high"
        />
      </div>
      <div className="open__inner">
        <p className="eyebrow">Vienna I · the hour before service</p>
        <h1 className="wordmark" ref={mark}>
          SAVRA
        </h1>
        <p className="lead" style={{ marginInline: 'auto', marginTop: 'var(--s4)' }}>
          The room is laid. The lamps are on. Nobody has arrived yet.
        </p>
      </div>
      <p className="open__cue" aria-hidden="true">
        <span>16:40 — eighty minutes to service</span>
      </p>
    </section>
  )
}

/* =========================================================================================
   Beat 1 — the street, 16:52
   ========================================================================================= */

export function BeatStreet() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    return sectionEntry(el)
  }, [])

  return (
    <section className="beat" id="street" ref={root}>
      <div className="wrap grid">
        <figure className="figure street__figure bleed" data-enter>
          <img
            src={media.street.src}
            width={media.street.width}
            height={media.street.height}
            alt={media.street.alt}
            loading="lazy"
            decoding="async"
          />
          <figcaption>16:52 — the lamps go on before the sign does</figcaption>
        </figure>
        <div className="street__body">
          <p className="eyebrow" data-enter>
            16:52 · the street
          </p>
          <h2 className="display" data-enter style={{ marginBlock: 'var(--s3)' }}>
            A door on a street<br />that does not announce itself
          </h2>
          <p className="lead" data-enter>
            SAVRA is one room off a cobbled lane. There is no menu in the window and no board
            on the pavement. From outside you can see three tables and the colour of the
            light, which is the whole of the invitation.
          </p>
          <p className="meta" data-enter style={{ marginTop: 'var(--s3)' }}>
            <Placeholder>street address</Placeholder> · <Placeholder>opening hours</Placeholder>
          </p>
        </div>
      </div>
    </section>
  )
}

/* =========================================================================================
   Beat 2 — the room, 17:05. A passage, not a hero.
   ========================================================================================= */

export function BeatRoom() {
  const root = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [ended, setEnded] = useState(false)
  const [still] = useState(() => prefersReducedMotion())

  useEffect(() => {
    const el = root.current
    const v = video.current
    if (!el) return
    const cleanup = sectionEntry(el)
    if (!v || prefersReducedMotion()) return cleanup

    // Plays ONCE on entry and stops. It never loops: WCAG 2.2.2 asks for a mechanism to
    // pause moving content over five seconds, and "it stops on its own" plus a visible
    // control is a better answer than a loop with a pause button.
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 60%',
      once: true,
      onEnter: () => {
        v.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
      },
    })
    return () => {
      st.kill()
      cleanup()
    }
  }, [])

  const toggle = () => {
    const v = video.current
    if (!v) return
    if (v.paused) {
      v.play().then(() => { setPlaying(true); setEnded(false) }).catch(() => {})
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <section className="beat" id="room" ref={root}>
      <div className="wrap grid">
        <div className="room__media bleed" data-enter>
          {still ? (
            // Reduced motion replaces the clip outright, per the fallback matrix in
            // 06-build-plan.md — not merely a video that declines to autoplay.
            <img
              src={media.roomPoster.src}
              width={media.roomPoster.width}
              height={media.roomPoster.height}
              alt={media.roomPoster.alt}
              loading="lazy"
              decoding="async"
            />
          ) : (
          <video
            ref={video}
            src={media.clip.src}
            poster={media.clip.poster}
            width={media.clip.width}
            height={media.clip.height}
            muted
            playsInline
            preload="none"
            onEnded={() => { setPlaying(false); setEnded(true) }}
            aria-label={media.clip.alt}
          />
          )}
          {!still && (
            <button type="button" className="videoctl" onClick={toggle}>
              {playing ? 'Pause' : ended ? 'Replay' : 'Play'}
            </button>
          )}
        </div>
        <div className="room__body" data-enter>
          <p className="eyebrow">17:05 · the room</p>
          <h2 className="display" style={{ marginBlock: 'var(--s3)' }}>
            One room,<br />lit one table at a time
          </h2>
          <p className="lead">
            Lacquered panelling, a brass line at eye height, slate tops on black oak. Nothing in
            the room is bright except the table you are sitting at. It is a room built to be
            half-dark, which is why it is photographed empty — the light is doing the work, and
            it is easier to see when nobody is in the way.
          </p>
        </div>
      </div>
    </section>
  )
}

/* =========================================================================================
   Beat 3 — what it is made of, 17:20. Auburn arrives here, and only here.
   ========================================================================================= */

const MATERIALS = [
  ['Linen', 'Undyed, washed, replaced not pressed. It is the only soft thing in the room.'],
  ['Slate', 'Every table top is one piece. Cold to the hand for the first ten minutes.'],
  ['Brass', 'A single line at eye height, unlacquered, so it darkens along the wall it is touched on.'],
  ['Lacquer', 'Oxblood on oak, built up until it holds a reflection. Under the lamps it reads almost black.'],
]

export function BeatMaterial() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    // Auburn arrives via a CSS transition on `.is-in` — see styles.css. Nothing to animate here.
    return sectionEntry(el)
  }, [])

  return (
    <section className="beat material" id="material" ref={root}>
      <div className="wrap grid">
        <div className="material__head">
          <p className="eyebrow" data-enter>
            17:20 · what it is made of
          </p>
          <h2 className="display" data-enter style={{ marginBlock: 'var(--s3)' }}>
            Four materials,<br />and no fifth
          </h2>
          <p className="lead" data-enter>
            The room was specified once and has not been added to. The cutlery is engraved
            because it is meant to stay long enough to be worth engraving.
          </p>
          <ul className="material__list" data-enter>
            {MATERIALS.map(([name, note]) => (
              <li key={name}>
                <b>{name}</b>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="material__tiles" data-enter>
          <figure className="figure">
            <img src={media.materialWeave.src} width={media.materialWeave.width}
                 height={media.materialWeave.height} alt={media.materialWeave.alt}
                 loading="lazy" decoding="async" />
          </figure>
          <figure className="figure">
            <img src={media.materialWeaveDetail.src} width={media.materialWeaveDetail.width}
                 height={media.materialWeaveDetail.height} alt="" loading="lazy" decoding="async" />
          </figure>
          <figure className="figure">
            <img src={media.materialSettingDetail.src} width={media.materialSettingDetail.width}
                 height={media.materialSettingDetail.height} alt="" loading="lazy" decoding="async" />
          </figure>
          <figure className="figure">
            <img src={media.materialSetting.src} width={media.materialSetting.width}
                 height={media.materialSetting.height} alt={media.materialSetting.alt}
                 loading="lazy" decoding="async" />
          </figure>
        </div>
      </div>
    </section>
  )
}

/* =========================================================================================
   Beat 4 — one pair of hands, 17:38. Hunyadi arrives as a lamp, not a field.
   ========================================================================================= */

export function BeatHands() {
  const root = useRef<HTMLElement>(null)
  const pool = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    // The hunyadi pool fades up via a CSS transition on `.is-in` — see styles.css.
    return sectionEntry(el)
  }, [])

  return (
    <section className="beat hands" id="hands" ref={root}>
      <div className="hands__pool" ref={pool} aria-hidden="true" />
      <div className="wrap grid">
        <figure className="figure hands__figure" data-enter>
          <img src={media.hands.src} width={media.hands.width} height={media.hands.height}
               alt={media.hands.alt} loading="lazy" decoding="async" />
          <figcaption>17:38 — the first plate of the evening is a rehearsal</figcaption>
        </figure>
        <div className="hands__body">
          <p className="eyebrow" data-enter>
            17:38 · the pass
          </p>
          <h2 className="display" data-enter style={{ marginBlock: 'var(--s3)' }}>
            One cook,<br />an hour early
          </h2>
          <p className="lead" data-enter>
            Everything on the menu is finished by hand at the pass, under one lamp, in the order
            it will be eaten. The first plate of the night is made before service and eaten by
            nobody — it is how the kitchen finds out what the evening is going to be like.
          </p>
          <p className="meta" data-enter style={{ marginTop: 'var(--s3)' }}>
            Kitchen led by <Placeholder>chef name</Placeholder>
          </p>
        </div>
      </div>
    </section>
  )
}
