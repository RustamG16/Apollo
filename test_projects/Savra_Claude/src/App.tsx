import { useState } from 'react'
import Header from './components/Header'
import { BeatOpen, BeatStreet, BeatRoom, BeatMaterial, BeatHands } from './components/Beats'
import BeatPass from './components/BeatPass'
import BeatOpening from './components/BeatOpening'
import { Essentials, Footer } from './components/Closing'
import Reservation from './components/Reservation'

/**
 * SAVRA — Mise en Place.
 *
 * Eight beats on one page, read as an hour: 16:40 in the street, 18:00 when the doors open.
 * Beat 6 is the hero moment. The doors are an arrival gesture over the first screen only —
 * they were a document-length scrubbed mask in two earlier revisions and are not any more,
 * so nothing on this page is scroll-linked except the header's clock and active-beat state.
 *
 * Section order is the design. See `.olympus/04-decision.md` for why each beat is where it
 * is, and `.olympus/06-build-plan.md` for which component owns which animation.
 */
export default function App() {
  const [reserving, setReserving] = useState(false)
  const open = () => setReserving(true)

  return (
    <>
      <a className="skip" href="#street">
        Skip to content
      </a>

      <Header onReserve={open} />

      <main>
        <BeatOpen />
        <BeatStreet />
        <BeatRoom />
        <BeatMaterial />
        <BeatHands />
        <BeatPass />
        <BeatOpening onReserve={open} />
        <Essentials />
      </main>

      <Footer />

      <Reservation open={reserving} onClose={() => setReserving(false)} />
    </>
  )
}
