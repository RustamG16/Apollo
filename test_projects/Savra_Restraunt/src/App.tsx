import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReservationDialog, type ReservationSource } from './components/ReservationDialog'
import { trackSavraEvent } from './lib/analytics'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type Plate = {
  id: string
  title: string
  phrase: string
  body: string
  wide: string
  wideSmall: string
  portrait?: string
  portraitSmall?: string
  alt: string
  tone: 'slate' | 'vanilla' | 'auburn'
}

const plates: Plate[] = [
  {
    id: 'charred-flatbread',
    title: 'Bread meets the flame first.',
    phrase: 'Charred flatbread · smoked butter · wild herbs',
    body: 'The imagined menu begins with heat you can see: blistered edges, cool butter, and oil catching the table light.',
    wide: '/media/plate-bread-wide-1376.webp',
    wideSmall: '/media/plate-bread-wide-640.webp',
    portrait: '/media/plate-bread-portrait-896.webp',
    portraitSmall: '/media/plate-bread-portrait-448.webp',
    alt: 'Charred flatbread with butter and oil on dark stone.',
    tone: 'vanilla',
  },
  {
    id: 'lamb-sour-cherry',
    title: 'Ember, fruit, restraint.',
    phrase: 'Lamb · sour cherry · roasted allium',
    body: 'Fire gives the centre its depth. Bright acidity and smoke keep the plate moving rather than making it heavy.',
    wide: '/media/plate-lamb-1376.webp',
    wideSmall: '/media/plate-lamb-640.webp',
    alt: 'Lamb with a dark cherry glaze, grains and roasted allium.',
    tone: 'slate',
  },
  {
    id: 'beetroot-labneh',
    title: 'Earth becomes luminous.',
    phrase: 'Salt-baked beetroot · labneh · toasted hazelnut',
    body: 'A cool, bright close to the savoury arc—built in the same fictional language of smoke, mineral sweetness, and patience.',
    wide: '/media/plate-beet-wide-1376.webp',
    wideSmall: '/media/plate-beet-wide-640.webp',
    portrait: '/media/plate-beet-portrait-896.webp',
    portraitSmall: '/media/plate-beet-portrait-448.webp',
    alt: 'Beetroot, herbs and pale labneh on dark slate.',
    tone: 'auburn',
  },
]

function MediaPicture({ plate }: { plate: Plate }) {
  return (
    <picture>
      {plate.portrait && plate.portraitSmall && (
        <source
          media="(max-width: 680px)"
          srcSet={`${plate.portraitSmall} 448w, ${plate.portrait} 896w`}
          sizes="100vw"
        />
      )}
      <img
        src={plate.wide}
        srcSet={`${plate.wideSmall} 640w, ${plate.wide} 1376w`}
        sizes="(max-width: 680px) 100vw, (max-width: 1100px) 86vw, 68vw"
        width={1376}
        height={768}
        alt={plate.alt}
        loading="lazy"
        decoding="async"
      />
    </picture>
  )
}

function PlateChapter({ plate, index }: { plate: Plate; index: number }) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    let tracked = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55 && !tracked) {
          tracked = true
          trackSavraEvent('savra_menu_dish_view', { dish_id: plate.id, source: 'scroll' })
          observer.disconnect()
        }
      },
      { threshold: [0.55] },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [plate.id])

  return (
    <article ref={sectionRef} className={`plate-chapter plate-${plate.tone}`} data-plate>
      <div className="plate-media" data-reveal-media>
        <MediaPicture plate={plate} />
      </div>
      <div className="plate-copy" data-reveal-copy>
        <span className="plate-glyph" aria-hidden="true">{['×', '●', '—'][index]}</span>
        <h3>{plate.title}</h3>
        <p className="plate-phrase">{plate.phrase}</p>
        <p>{plate.body}</p>
        <span className="concept-label">Concept plate · illustrative only</span>
      </div>
    </article>
  )
}

export default function App() {
  const pageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const pageViewTracked = useRef(false)
  const motionModeTracked = useRef(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [reservationSource, setReservationSource] = useState<ReservationSource>('hero')
  const forceReducedMotion = import.meta.env.DEV && new URLSearchParams(window.location.search).get('motion') === 'reduced'

  function openReservation(source: ReservationSource) {
    setReservationSource(source)
    setDialogOpen(true)
    trackSavraEvent('savra_reservation_open', { source })
  }

  function onNav(destination: string) {
    setMenuOpen(false)
    trackSavraEvent('savra_nav_select', { destination })
  }

  useEffect(() => {
    if (!pageViewTracked.current) {
      trackSavraEvent('savra_page_view')
      pageViewTracked.current = true
    }
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileQuery = window.matchMedia('(max-width: 680px)')
    const updateVideo = () => {
      const reduced = reducedQuery.matches || forceReducedMotion
      if (!motionModeTracked.current) {
        trackSavraEvent('savra_motion_mode', { mode: reduced ? 'reduced' : 'full' })
        motionModeTracked.current = true
      }
      if (reduced || mobileQuery.matches) {
        videoRef.current?.pause()
      } else {
        videoRef.current?.play().catch(() => undefined)
      }
    }
    updateVideo()
    reducedQuery.addEventListener('change', updateVideo)
    mobileQuery.addEventListener('change', updateVideo)
    return () => {
      reducedQuery.removeEventListener('change', updateVideo)
      mobileQuery.removeEventListener('change', updateVideo)
    }
  }, [forceReducedMotion])

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      if (forceReducedMotion) {
        gsap.set('[data-hero-meta], [data-hero-title] span, [data-hero-action], [data-threshold-image], [data-plate] [data-reveal-media], [data-plate] [data-reveal-copy], [data-process-card]', {
          clearProps: 'all',
        })
        return () => mm.revert()
      }

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
        intro
          .fromTo('[data-hero-meta]', { yPercent: 30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8 })
          .fromTo('[data-hero-title] span', { yPercent: 35 }, { yPercent: 0, duration: 1.05, stagger: 0.08 }, '<0.08')
          .fromTo('[data-hero-action]', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '<0.35')

        gsap.fromTo(
          '[data-threshold-image]',
          { clipPath: 'inset(12% 28% 12% 28%)', scale: 1.08 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              id: 'threshold-open',
              trigger: '#story',
              start: 'top 80%',
              end: 'bottom 45%',
              scrub: 0.6,
            },
          },
        )

        gsap.utils.toArray<HTMLElement>('[data-plate]').forEach((chapter, index) => {
          const media = chapter.querySelector('[data-reveal-media]')
          const copy = chapter.querySelector('[data-reveal-copy]')
          gsap.fromTo(
            [media, copy],
            { y: index % 2 === 0 ? 54 : 38, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                id: `plate-${index}`,
                trigger: chapter,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            },
          )
        })

        gsap.fromTo(
          '[data-process-card]',
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              id: 'craft-sequence',
              trigger: '#craft',
              start: 'top 72%',
              toggleActions: 'play none none none',
            },
          },
        )
      })

      mm.add('(min-width: 960px) and (prefers-reduced-motion: no-preference)', () => {
        const roomTimeline = gsap.timeline({
          scrollTrigger: {
            id: 'room-reveal',
            trigger: '.room-stage',
            start: 'top top',
            end: '+=110%',
            pin: true,
            scrub: 0.8,
          },
        })
        roomTimeline
          .fromTo('.material-panel', { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 100% 0%)', ease: 'none' })
          .fromTo('.room-panel img', { scale: 1.08 }, { scale: 1, ease: 'none' }, '<')
          .fromTo('.room-caption', { y: 32, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.25 }, 0.68)
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-hero-meta], [data-hero-title] span, [data-hero-action], [data-threshold-image], [data-plate] [data-reveal-media], [data-plate] [data-reveal-copy], [data-process-card]', {
          clearProps: 'all',
        })
      })

      const refresh = () => ScrollTrigger.refresh()
      window.addEventListener('load', refresh, { once: true })
      return () => {
        window.removeEventListener('load', refresh)
        mm.revert()
      }
    },
    { scope: pageRef, dependencies: [forceReducedMotion], revertOnUpdate: true },
  )

  return (
    <div ref={pageRef} className={forceReducedMotion ? 'site-shell qa-reduced-motion' : 'site-shell'}>
      <a className="skip-link" href="#main">Skip to main content</a>

      <header className="site-header">
        <a className="wordmark" href="#top" onClick={() => onNav('story')} aria-label="SAVRA, back to top">
          SAVRA
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="menu-icon" aria-hidden="true"><i /><i /></span>
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
        </button>
        <nav id="primary-navigation" className={menuOpen ? 'primary-nav is-open' : 'primary-nav'} aria-label="Primary navigation">
          <a href="#story" onClick={() => onNav('story')}>Story</a>
          <a href="#plates" onClick={() => onNav('plates')}>Plates</a>
          <a href="#space" onClick={() => onNav('space')}>Space</a>
          <a href="#reserve" onClick={() => onNav('reserve')}>Reserve</a>
        </nav>
        <button className="header-reserve" type="button" onClick={() => openReservation('header')}>
          Reserve a Table
        </button>
      </header>

      <main id="main">
        <section id="top" className="hero" aria-labelledby="hero-title">
          <picture className="hero-poster">
            <source
              media="(max-width: 680px)"
              srcSet="/media/table-destination-384.webp 384w, /media/table-destination-768.webp 768w"
              sizes="100vw"
            />
            <img
              src="/media/hero-entrance-1376.webp"
              srcSet="/media/hero-entrance-640.webp 640w, /media/hero-entrance-1376.webp 1376w"
              sizes="100vw"
              width="1376"
              height="768"
              alt="A single table glimpsed through an auburn doorway."
              fetchPriority="high"
            />
          </picture>
          <video
            ref={videoRef}
            className="hero-video"
            muted
            playsInline
            loop
            preload="metadata"
            poster="/media/hero-entrance-1376.webp"
            aria-hidden="true"
          >
            <source src="/media/hero-arrival.mp4" type="video/mp4" />
          </video>
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-grid">
            <div className="hero-meta" data-hero-meta>
              <p>Vienna · after dark</p>
              <p>Fire-led Eastern Mediterranean</p>
            </div>
            <h1 id="hero-title" data-hero-title>
              <span>SAV</span><span>RA</span>
            </h1>
            <div className="hero-action" data-hero-action>
              <p>Cross the threshold. Let the evening gather around one table.</p>
              <button className="button button-fire" type="button" onClick={() => openReservation('hero')}>
                Reserve a Table
              </button>
            </div>
            <a className="scroll-cue" href="#story" onClick={() => onNav('story')}>
              <span>Enter</span><i aria-hidden="true" />
            </a>
          </div>
        </section>

        <section id="story" className="threshold-section" aria-labelledby="story-title">
          <div className="threshold-copy">
            <p className="section-name">SAVRA, in one breath</p>
            <h2 id="story-title">A contemporary table shaped by flame, smoke, and the long memory of the Eastern Mediterranean.</h2>
            <p>
              This fictional concept imagines dinner as a passage: bread blistered over heat, fruit sharpened against smoke, vegetables held close to the ember, and a room quiet enough to notice.
            </p>
          </div>
          <figure className="threshold-image" data-threshold-image>
            <img
              src="/media/threshold-crossing-1376.webp"
              srcSet="/media/threshold-crossing-640.webp 640w, /media/threshold-crossing-1376.webp 1376w"
              sizes="(max-width: 760px) 100vw, 62vw"
              width="1376"
              height="768"
              alt="A dark threshold opening toward a softly lit stone table."
              loading="lazy"
              decoding="async"
            />
            <figcaption>An imagined arrival, built from supplied synthetic media.</figcaption>
          </figure>
          <div className="threshold-mark" aria-hidden="true"><span /></div>
        </section>

        <section id="plates" className="plates-section" aria-labelledby="plates-title">
          <header className="section-intro">
            <p className="section-name">Concept menu</p>
            <h2 id="plates-title">Three movements around the fire.</h2>
            <p>Not a published menu. A visual point of view—bread, ember, earth—told with the supplied synthetic plates.</p>
          </header>
          <div className="plate-list">
            {plates.map((plate, index) => <PlateChapter key={plate.id} plate={plate} index={index} />)}
          </div>
        </section>

        <section id="space" className="room-section" aria-labelledby="space-title">
          <div className="room-stage">
            <div className="room-panel">
              <img
                src="/media/room-before-service-1376.webp"
                srcSet="/media/room-before-service-640.webp 640w, /media/room-before-service-1376.webp 1376w"
                sizes="100vw"
                width="1376"
                height="768"
                alt="A low-lit dining room arranged before the imagined service."
                loading="lazy"
                decoding="async"
              />
              <div className="room-caption">
                <p className="section-name">The room</p>
                <h2 id="space-title">Stone, linen, lacquer, low light.</h2>
                <p>Material is kept close to the hand. The room stays quiet so the table can hold the evening.</p>
              </div>
            </div>
            <div className="material-panel" aria-hidden="true">
              <img
                src="/media/material-linen-1376.webp"
                srcSet="/media/material-linen-640.webp 640w, /media/material-linen-1376.webp 1376w"
                sizes="100vw"
                width="1376"
                height="768"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <p>Texture before spectacle.</p>
            </div>
          </div>
        </section>

        <section id="craft" className="craft-section" aria-labelledby="craft-title">
          <header>
            <p className="section-name">Anonymous craft</p>
            <h2 id="craft-title">The final distance is measured by hand.</h2>
            <p>Gestures from a synthetic kitchen study: place, turn, finish. No chef identity or real service is implied.</p>
          </header>
          <div className="craft-grid">
            <figure className="craft-card craft-card-tall" data-process-card>
              <img
                src="/media/process-pass-896.webp"
                srcSet="/media/process-pass-448.webp 448w, /media/process-pass-896.webp 896w"
                sizes="(max-width: 760px) 100vw, 32vw"
                width="896"
                height="1200"
                alt="An anonymous cook finishing a plate at the pass."
                loading="lazy"
                decoding="async"
              />
              <figcaption>Hold the shadow. Find the edge.</figcaption>
            </figure>
            <figure className="craft-card" data-process-card>
              <img
                src="/media/process-plating-1376.webp"
                srcSet="/media/process-plating-640.webp 640w, /media/process-plating-1376.webp 1376w"
                sizes="(max-width: 760px) 100vw, 58vw"
                width="1376"
                height="768"
                alt="Hands arranging a plate beneath a warm pass light."
                loading="lazy"
                decoding="async"
              />
              <figcaption>Build the centre.</figcaption>
            </figure>
            <figure className="craft-card" data-process-card>
              <img
                src="/media/process-tweezers-1376.webp"
                srcSet="/media/process-tweezers-640.webp 640w, /media/process-tweezers-1376.webp 1376w"
                sizes="(max-width: 760px) 100vw, 58vw"
                width="1376"
                height="768"
                alt="A final garnish placed with tweezers."
                loading="lazy"
                decoding="async"
              />
              <figcaption>Leave only what belongs.</figcaption>
            </figure>
          </div>
        </section>

        <section id="reserve" className="reserve-section" aria-labelledby="reserve-title">
          <picture>
            <source
              media="(max-width: 680px)"
              srcSet="/media/table-destination-384.webp 384w, /media/table-destination-768.webp 768w"
              sizes="100vw"
            />
            <img
              src="/media/table-reserve-1376.webp"
              srcSet="/media/table-reserve-640.webp 640w, /media/table-reserve-1376.webp 1376w"
              sizes="100vw"
              width="1376"
              height="768"
              alt="A softly lit table prepared for two in the fictional SAVRA room."
              loading="lazy"
              decoding="async"
            />
          </picture>
          <div className="reserve-shade" aria-hidden="true" />
          <div className="reserve-copy">
            <p className="section-name">The table waits</p>
            <h2 id="reserve-title">Begin the evening before it begins.</h2>
            <p>Step into a polished reservation demo. No live availability is shown and no booking is sent.</p>
            <button className="button button-fire" type="button" onClick={() => openReservation('final_table')}>
              Begin a Reservation
            </button>
          </div>
        </section>
      </main>

      <button className="mobile-reserve" type="button" onClick={() => openReservation('sticky_mobile')}>
        Reserve a Table
      </button>

      <footer className="site-footer">
        <a className="wordmark footer-wordmark" href="#top" onClick={() => onNav('story')}>SAVRA</a>
        <p>Fire-led Eastern Mediterranean · Vienna, imagined.</p>
        <p className="concept-disclosure">SAVRA is a fictional restaurant concept created for a design demonstration. Supplied imagery is synthetic concept material.</p>
        <a href="#top" onClick={() => onNav('story')}>Back to the threshold</a>
      </footer>

      <ReservationDialog open={dialogOpen} source={reservationSource} onClose={() => setDialogOpen(false)} />
    </div>
  )
}
