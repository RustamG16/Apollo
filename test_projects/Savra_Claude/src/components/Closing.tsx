import Placeholder from './Placeholder'

/**
 * Beat 7 — Essentials, and beat 8 — the footer.
 *
 * Everything the supplied media cannot tell you lives here, marked as unfilled rather than
 * invented. Price register in particular: the brief names it as one of three things a visitor
 * must understand, and an earlier draft of the direction had no representation of it at all.
 */

export function Essentials() {
  return (
    <section className="beat essentials" id="essentials">
      <div className="wrap">
        <p className="eyebrow">Essentials</p>
        <dl style={{ marginTop: 'var(--s4)' }}>
          <div>
            <dt>Where</dt>
            <dd>
              <Placeholder>street address</Placeholder>
              <br />
              <Placeholder>postcode</Placeholder> Vienna
            </dd>
          </div>
          <div>
            <dt>When</dt>
            <dd>
              <Placeholder>days open</Placeholder>
              <br />
              <Placeholder>service times</Placeholder>
            </dd>
          </div>
          <div>
            <dt>How much</dt>
            <dd>
              Six courses, <Placeholder>price per person</Placeholder>
              <br />
              <span className="meta">Wine pairing <Placeholder>price</Placeholder></span>
            </dd>
          </div>
          <div>
            <dt>Contact</dt>
            <dd>
              <Placeholder>telephone</Placeholder>
              <br />
              <Placeholder>email</Placeholder>
            </dd>
          </div>
        </dl>
        <p className="meta" style={{ marginTop: 'var(--s4)', maxWidth: '70ch' }}>
          Bracketed values are unfilled. They are not omissions to be tidied away — they are
          the facts a real launch has to supply, and every one of them is listed as a blocker
          in the project handoff.
        </p>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <p>
            <strong>SAVRA does not exist.</strong> It is a fictional restaurant, used as the
            subject of a design system run. The name, the room, the menu and the cooking are
            invented. Nothing on this page can be booked, bought or visited.
          </p>
          <p style={{ marginTop: 'var(--s3)' }}>
            The photography and the clip are AI-generated and were supplied as the brief's
            reference set. They carry no third-party rights and require no attribution. Each
            image has been cropped to exclude its generation mark; the clip was trimmed,
            cropped, colour-graded and muted. All transformations are recorded in the project's
            asset manifest.
          </p>
        </div>
        <div>
          <p className="eyebrow">Built from</p>
          <p style={{ marginTop: 'var(--s2)' }}>
            30 photographs and one 8-second clip. Sixteen are used. Two were dropped as a
            different building, four as a different art direction.
          </p>
        </div>
        <div>
          <p className="eyebrow">Colophon</p>
          <p style={{ marginTop: 'var(--s2)' }}>
            Bodoni Moda, Archivo and JetBrains Mono, self-hosted under the SIL Open Font
            Licence. Motion by GSAP. No analytics, no cookies, no network calls.
          </p>
        </div>
      </div>
    </footer>
  )
}
