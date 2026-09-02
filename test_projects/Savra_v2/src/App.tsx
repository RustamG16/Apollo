import { FormEvent, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { media } from './assets'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type ReserveButtonProps = {
  className?: string
  children?: string
  onClick: () => void
}

const dishes = [
  { name: 'Charcoal sea bass', technique: 'Charcoal-fired', detail: 'Fennel · herbs', image: media.seaBass, position: '50% 58%' },
  { name: 'Salt-baked beetroot', technique: 'Salt-baked', detail: 'Labneh · beetroot', image: media.beetroot, position: '50% 58%' },
  { name: 'Lamb backstrap', technique: 'Roasted', detail: 'Cherry glaze', image: media.lamb, position: '50% 48%' },
  { name: 'House flatbread', technique: 'From the oven', detail: 'Smoked butter', image: media.flatbread, position: '50% 55%' },
  { name: 'Poached quince', technique: 'Seasonal dessert', detail: 'Quince · yogurt', image: media.quince, position: '50% 57%' },
  { name: 'The seasonal plate', technique: 'Overhead study', detail: 'Details served at the table', image: media.overhead, position: '50% 50%' },
]

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M5 12h13M13 7l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ReserveButton({ className = '', children = 'Reserve a table', onClick }: ReserveButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button || !window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return
    const xTo = gsap.quickTo(button, 'x', { duration: 0.45, ease: 'power3.out' })
    const yTo = gsap.quickTo(button, 'y', { duration: 0.45, ease: 'power3.out' })
    const move = (event: PointerEvent) => {
      const rect = button.getBoundingClientRect()
      xTo(gsap.utils.clamp(-8, 8, (event.clientX - rect.left - rect.width / 2) * 0.12))
      yTo(gsap.utils.clamp(-8, 8, (event.clientY - rect.top - rect.height / 2) * 0.12))
    }
    const leave = () => { xTo(0); yTo(0) }
    button.addEventListener('pointermove', move)
    button.addEventListener('pointerleave', leave)
    return () => {
      button.removeEventListener('pointermove', move)
      button.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <button ref={buttonRef} className={`reserve-button ${className}`.trim()} type="button" onClick={onClick}>
      <span>{children}</span><ArrowIcon />
    </button>
  )
}

function ReservationDialog({ dialogRef }: { dialogRef: React.RefObject<HTMLDialogElement | null> }) {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sent')
  }

  const close = () => {
    dialogRef.current?.close()
    window.setTimeout(() => setStatus('idle'), 250)
  }

  return (
    <dialog ref={dialogRef} className="reservation-dialog" aria-labelledby="reservation-title">
      <div className="dialog-shell">
        <button className="dialog-close" type="button" onClick={close} aria-label="Close reservation request">
          <span aria-hidden="true">Close</span>
        </button>
        {status === 'idle' ? (
          <>
            <p className="dialog-mark">SAVRA · VIENNA</p>
            <h2 id="reservation-title">Request your table.</h2>
            <p className="dialog-intro">This is a prototype request form. No booking is confirmed until SAVRA’s reservation provider and contact details are connected.</p>
            <form onSubmit={submit}>
              <div className="field-pair">
                <label>Name<input name="name" autoComplete="name" required /></label>
                <label>Email<input name="email" type="email" autoComplete="email" required /></label>
              </div>
              <div className="field-pair">
                <label>Preferred date<input name="date" type="date" required /></label>
                <label>Guests<select name="guests" defaultValue="2"><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option></select></label>
              </div>
              <label>Anything we should know?<textarea name="notes" rows={3} placeholder="Access needs, allergies, or a preferred time" /></label>
              <button className="dialog-submit" type="submit">Send prototype request <ArrowIcon /></button>
            </form>
          </>
        ) : (
          <div className="dialog-success" role="status">
            <p className="dialog-mark">PROTOTYPE COMPLETE</p>
            <h2>Your request was staged.</h2>
            <p>No message has been sent. Connect SAVRA’s booking provider to turn this prototype into a live reservation path.</p>
            <button className="dialog-submit" type="button" onClick={close}>Return to SAVRA <ArrowIcon /></button>
          </div>
        )}
      </div>
    </dialog>
  )
}

function LocalTime() {
  const [time, setTime] = useState('—:—')
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Vienna',
    }).format(new Date()))
    update()
    const timer = window.setInterval(update, 30_000)
    return () => window.clearInterval(timer)
  }, [])
  return <span>{time}</span>
}

function App() {
  const appRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const menuTrackRef = useRef<HTMLDivElement>(null)
  const craftCaptionRef = useRef<HTMLDivElement>(null)

  const openReservation = () => {
    const dialog = dialogRef.current
    if (!dialog) return
    if ('startViewTransition' in document) {
      ;(document as Document & { startViewTransition: (callback: () => void) => void }).startViewTransition(() => dialog.showModal())
    } else dialog.showModal()
  }

  const moveMenu = (direction: number) => {
    menuTrackRef.current?.scrollBy({ left: direction * Math.min(window.innerWidth * 0.78, 520), behavior: 'smooth' })
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.preload = 'metadata'
        void video.play().catch(() => undefined)
      } else video.pause()
    }, { rootMargin: '35% 0px' })
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const region = craftCaptionRef.current?.parentElement
    const caption = craftCaptionRef.current
    if (!region || !caption || !window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return
    const xTo = gsap.quickTo(caption, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(caption, 'y', { duration: 0.6, ease: 'power3.out' })
    const move = (event: PointerEvent) => {
      const rect = region.getBoundingClientRect()
      xTo(gsap.utils.clamp(-28, 28, (event.clientX - rect.left - rect.width / 2) * 0.08))
      yTo(gsap.utils.clamp(-18, 18, (event.clientY - rect.top - rect.height / 2) * 0.06))
    }
    region.addEventListener('pointermove', move)
    return () => region.removeEventListener('pointermove', move)
  }, [])

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const intro = gsap.timeline({ defaults: { ease: 'power4.inOut' } })
      intro
        .fromTo('.hero-media', { clipPath: 'inset(0 45% 0 45%)' }, { clipPath: 'inset(0 0% 0 0%)', duration: 1.65 })
        .from('.hero-word span', { yPercent: 115, duration: 1.1, stagger: 0.08 }, 0.38)
        .from('.site-header, .hero-detail, .hero-scroll', { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.1, ease: 'power3.out' }, 1.05)

      mm.add('(min-width: 900px)', () => {
        gsap.timeline({
        scrollTrigger: { trigger: '.crossing', start: 'top top', end: '+=170%', scrub: 0.8, pin: '.crossing-stage', anticipatePin: 1 },
      })
        .fromTo('.crossing-mask', { clipPath: 'inset(0 41% 0 41%)' }, { clipPath: 'inset(0 0% 0 0%)', duration: .34, ease: 'none' }, 0)
        .to('.crossing-still--threshold', { clipPath: 'inset(0 0 0 100%)', duration: .15, ease: 'none' }, 0.28)
        .to('.crossing-still--a', { clipPath: 'inset(0 0 0 100%)', duration: .15, ease: 'none' }, 0.46)
        .to('.crossing-still--b', { clipPath: 'inset(0 0 0 100%)', duration: .15, ease: 'none' }, 0.64)
        .fromTo('.crossing-copy', { y: 38, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .22, ease: 'power2.out' }, 0.68)

      gsap.from('.room-float', {
        y: 90,
        stagger: 0.12,
        ease: 'none',
        scrollTrigger: { trigger: '.room-grid', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })

      gsap.timeline({
        scrollTrigger: { trigger: '.craft', start: 'top top', end: '+=180%', scrub: 0.7, pin: '.craft-stage', anticipatePin: 1 },
      })
        .fromTo('.craft-panel--2', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'none' }, 0.18)
        .fromTo('.craft-panel--3', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'none' }, 0.5)
        .to('.craft-index span', { yPercent: -200, ease: 'none' }, 0)

        const track = menuTrackRef.current
        if (!track) return
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 64),
          ease: 'none',
          scrollTrigger: {
            trigger: '.menu-pin',
            start: 'top top',
            end: () => `+=${Math.max(track.scrollWidth - window.innerWidth, window.innerHeight * 2)}`,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 44,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        })
      })
    })

    return () => mm.revert()
  }, { scope: appRef })

  return (
    <div className="site" ref={appRef}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="ambient-halo" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="SAVRA home">SAVRA</a>
        <span className="nav-place">Vienna</span>
        <nav aria-label="Primary navigation">
          <a href="#menu">Menu</a>
          <a href="#story">Story</a>
        </nav>
        <ReserveButton className="header-reserve" onClick={openReservation} />
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <h1 className="hero-word" id="hero-title" aria-label="SAVRA"><span>SA</span><span>VRA</span></h1>
          <div className="hero-media">
            <img src={media.hero} alt="Blue SAVRA doors opening onto a warmly lit table for two" width="1376" height="768" fetchPriority="high" />
            <div className="hero-vignette" aria-hidden="true" />
          </div>
          <p className="hero-detail">An intimate dining room<br />shaped by fire, stone &amp; season.</p>
          <a className="hero-scroll" href="#story"><span>Cross the threshold</span><span className="scroll-line" /></a>
        </section>

        <section className="crossing" id="story" aria-labelledby="crossing-title">
          <div className="crossing-stage">
            <div className="crossing-mask">
              <video ref={videoRef} className="crossing-video" muted loop playsInline poster={media.threshold} preload="none" aria-label="A moving passage into SAVRA’s dining room">
                <source src={media.crossingVideo} type="video/mp4" />
              </video>
              <img className="crossing-still crossing-still--b" src={media.crossingB} alt="" width="1376" height="768" loading="lazy" decoding="async" />
              <img className="crossing-still crossing-still--a" src={media.crossingA} alt="" width="1376" height="768" loading="lazy" decoding="async" />
              <img className="crossing-still crossing-still--threshold" src={media.threshold} alt="A narrow opening in deep blue doors revealing the restaurant" width="1376" height="768" />
            </div>
            <div className="crossing-copy">
              <h2 id="crossing-title">A room between<br /><em>fire, stone</em> and season.</h2>
              <p>Beyond the blue door, warm light falls on stone, linen and a table set with intention. The room slows the evening before the first plate arrives.</p>
            </div>
            <span className="crossing-note">Move inward · Vienna</span>
          </div>
        </section>

        <section className="room section-pad" aria-labelledby="room-title">
          <div className="section-heading" data-reveal>
            <h2 id="room-title">The room holds<br />the evening.</h2>
            <p>Intimate by design. Architectural in rhythm. Every table keeps a clear line to the ritual unfolding around it.</p>
          </div>
          <div className="room-grid">
            <figure className="room-anchor">
              <img src={media.roomPortrait} alt="An arched passage framing a table set for two" width="768" height="1376" loading="lazy" decoding="async" />
              <figcaption>Through the arch · a table for two</figcaption>
            </figure>
            <div className="room-flow">
              <figure className="room-float room-float--wide"><img src={media.roomBefore} alt="SAVRA dining room before service" width="1376" height="768" loading="lazy" decoding="async" /><figcaption>Before service · the room waits</figcaption></figure>
              <dl className="room-facts" data-reveal>
                <div><dt>Place</dt><dd>Vienna, Austria<br /><span>Exact address forthcoming</span></dd></div>
                <div><dt>Service</dt><dd>Dinner<br /><span>Schedule forthcoming</span></dd></div>
                <div><dt>Seating</dt><dd>Intimate tables<br /><span>Reservation recommended</span></dd></div>
              </dl>
              <figure className="room-float room-float--offset"><img src={media.roomEmpty} alt="The empty dining room interior" width="1376" height="768" loading="lazy" decoding="async" /><figcaption>Cool architecture · warm center</figcaption></figure>
              <figure className="room-float room-float--small"><img src={media.roomTable} alt="A SAVRA table prepared for two guests" width="1376" height="768" loading="lazy" decoding="async" /><figcaption>The table · prepared with restraint</figcaption></figure>
            </div>
          </div>
        </section>

        <section className="craft" aria-labelledby="craft-title">
          <div className="craft-stage">
            <div className="craft-heading"><h2 id="craft-title">Gesture<br />becomes plate.</h2><p>Three movements. One finished intention.</p></div>
            <div className="craft-panels">
              <figure className="craft-panel craft-panel--1"><img src={media.chefPortrait} alt="A chef working beneath the pass light" width="896" height="1200" loading="lazy" decoding="async" /></figure>
              <figure className="craft-panel craft-panel--2"><img src={media.chefPlate} alt="A chef plating a dish at SAVRA" width="1376" height="768" loading="lazy" decoding="async" /></figure>
              <figure className="craft-panel craft-panel--3"><img src={media.chefTweezers} alt="A chef finishing a plate with tweezers" width="1376" height="768" loading="lazy" decoding="async" /></figure>
            </div>
            <div className="craft-caption" ref={craftCaptionRef} tabIndex={0}><span>Hand</span><i /><span>Plate</span><i /><span>Finish</span></div>
            <div className="craft-index" aria-hidden="true"><span>01<br />02<br />03</span></div>
          </div>
        </section>

        <section className="menu" id="menu" aria-labelledby="menu-title">
          <div className="menu-pin">
            <div className="menu-heading">
              <h2 id="menu-title">The season,<br /><em>held on a plate.</em></h2>
              <p>Selected dishes from the SAVRA visual archive. Menu details and pricing are confirmed at the table.</p>
              <div className="menu-controls" aria-label="Menu carousel controls">
                <button type="button" onClick={() => moveMenu(-1)} aria-label="Previous dish">←</button>
                <button type="button" onClick={() => moveMenu(1)} aria-label="Next dish">→</button>
              </div>
            </div>
            <div className="menu-track" ref={menuTrackRef}>
              {dishes.map((dish, index) => (
                <article className="dish" key={dish.name}>
                  <div className="dish-image"><img src={dish.image} alt={dish.name} width={index === 2 || index === 5 ? 1376 : 896} height={index === 2 ? 768 : index === 5 ? 896 : 1200} loading="lazy" decoding="async" style={{ objectPosition: dish.position }} /></div>
                  <div className="dish-meta"><span>{String(index + 1).padStart(2, '0')}</span><h3>{dish.name}</h3><p>{dish.technique}<br />{dish.detail}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="invitation" aria-labelledby="invitation-title">
          <div className="invitation-texture" style={{ backgroundImage: `url(${media.linen})` }} aria-hidden="true" />
          <figure className="invitation-image invitation-image--left"><img src={media.tableTwo} alt="An intimate table set for two" width="896" height="1200" loading="lazy" decoding="async" /></figure>
          <div className="invitation-center" data-reveal>
            <h2 id="invitation-title">Your table is waiting<br /><em>beyond the blue door.</em></h2>
            <ReserveButton className="invitation-reserve" onClick={openReservation} />
            <p>Prototype reservation · confirmation path to be connected</p>
          </div>
          <figure className="invitation-image invitation-image--right"><img src={media.tableLinen} alt="Table settings with a linen runner" width="896" height="1200" loading="lazy" decoding="async" /></figure>
        </section>

        <footer className="footer" aria-labelledby="footer-title">
          <div className="footer-media"><img src={media.entrance} alt="The entrance to SAVRA in Vienna" width="1376" height="768" loading="lazy" decoding="async" /><div aria-hidden="true" /></div>
          <div className="footer-content">
            <h2 id="footer-title">SAVRA</h2>
            <div className="footer-time"><span>Vienna now</span><LocalTime /></div>
            <div className="footer-grid">
              <div><h3>Visit</h3><p>Vienna, Austria<br /><span>Exact address forthcoming</span></p></div>
              <div><h3>Service</h3><p>Dinner<br /><span>Days &amp; hours forthcoming</span></p></div>
              <div><h3>Contact</h3><p>Booking provider and direct contact<br /><span>To be connected</span></p></div>
              <div className="footer-action"><ReserveButton onClick={openReservation} /></div>
            </div>
            <div className="footer-base"><span>© {new Date().getFullYear()} SAVRA</span><span>Restaurant preview · Vienna</span><a href="#top">Back to threshold ↑</a></div>
          </div>
        </footer>
      </main>

      <button className="mobile-reserve" type="button" onClick={openReservation}>Reserve a table <ArrowIcon /></button>
      <ReservationDialog dialogRef={dialogRef} />
    </div>
  )
}

export default App
