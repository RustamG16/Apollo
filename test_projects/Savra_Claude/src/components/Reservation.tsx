import { useEffect, useRef, useState } from 'react'
import Placeholder from './Placeholder'

/**
 * The reservation prototype.
 *
 * Native `<dialog>` opened with `showModal()`, so the focus trap, `Escape`, backdrop
 * inertness and focus return are the platform's behaviour rather than something reimplemented
 * here badly. Verified in QA rather than assumed.
 *
 * **Nothing is sent.** There is no transport, no storage and no logging — the submit handler
 * sets a flag. That is stated on screen before submission and again after it, because a form
 * that looks like it books a table and does not is worse than no form at all.
 */

interface Errors {
  date?: string
  party?: string
  name?: string
  email?: string
}

export default function Reservation({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const first = useRef<HTMLInputElement>(null)
  // The element that opened the dialog. `showModal()` restores focus to whatever was focused
  // when it opened, and on this page that is often the last hovered course option rather than
  // the button the visitor actually pressed — the listbox moves its roving tabindex under the
  // pointer. So the invoker is captured explicitly.
  const invoker = useRef<HTMLElement | null>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const confirm = useRef<HTMLDivElement>(null)

  // Submitting unmounts the form, including the focused submit button. Without this the
  // keyboard focus is dropped on the floor and a screen reader is told nothing about the one
  // message on this page that matters most.
  useEffect(() => {
    if (sent) confirm.current?.focus()
  }, [sent])

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open && !d.open) {
      invoker.current = document.activeElement as HTMLElement | null
      d.showModal()
      first.current?.focus()
    } else if (!open && d.open) {
      d.close()
    }
  }, [open])

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const next: Errors = {}

    if (!data.get('date')) next.date = 'Choose a date.'
    const party = Number(data.get('party'))
    if (!party || party < 1 || party > 8) next.party = 'Between one and eight guests.'
    if (!String(data.get('name') ?? '').trim()) next.name = 'We need a name for the table.'
    const email = String(data.get('email') ?? '')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Check the email address.'

    setErrors(next)
    if (Object.keys(next).length === 0) setSent(true)
  }

  const close = () => {
    setSent(false)
    setErrors({})
    onClose()
    // Return focus where the visitor left it, not where the platform happens to put it.
    const back = invoker.current
    invoker.current = null
    if (back && document.contains(back)) back.focus()
  }

  return (
    <dialog className="dialog" ref={dialog} onClose={close} aria-labelledby="res-title">
      <div className="dialog__inner">
        <div className="dialog__head">
          <div>
            <p className="eyebrow">Reserve</p>
            <h2 className="display" id="res-title" style={{ marginTop: 'var(--s2)' }}>
              {sent ? 'Nothing was sent' : 'A table at SAVRA'}
            </h2>
          </div>
          <button type="button" className="dialog__close" onClick={close}>
            Close
          </button>
        </div>

        {sent ? (
          <div className="dialog__confirm" role="status" aria-live="polite" tabIndex={-1} ref={confirm}>
            <p className="lead" style={{ marginTop: 'var(--s4)' }}>
              The form validated, and then stopped. SAVRA is a fictional restaurant built to
              demonstrate a design system, so there is no booking system behind this and no
              table is being held for you.
            </p>
            <p className="meta" style={{ marginTop: 'var(--s3)' }}>
              In a real build this is where a booking provider would be called.
            </p>
            <button type="button" className="cta" onClick={close}>
              Understood
            </button>
          </div>
        ) : (
          <>
            <div
              role="alert"
              className="sr-only"
              aria-live="assertive"
            >
              {Object.keys(errors).length > 0
                ? `${Object.keys(errors).length} field${Object.keys(errors).length > 1 ? 's need' : ' needs'} attention.`
                : ''}
            </div>

            <form className="form" onSubmit={submit} noValidate>
              <div className="field">
                <label htmlFor="res-date">Date</label>
                <input ref={first} id="res-date" name="date" type="date"
                       aria-describedby={errors.date ? 'err-date' : undefined}
                       aria-invalid={errors.date ? true : undefined} />
                {errors.date && <span className="field__error" id="err-date">{errors.date}</span>}
              </div>

              <div className="field">
                <span className="field__label" id="res-time-label">Seating</span>
                <p className="field__unfilled" aria-labelledby="res-time-label">
                  <Placeholder>service times</Placeholder>
                </p>
              </div>

              <div className="field">
                <label htmlFor="res-party">Guests</label>
                <input id="res-party" name="party" type="number" min={1} max={8} defaultValue={2}
                       aria-describedby={errors.party ? 'err-party' : undefined}
                       aria-invalid={errors.party ? true : undefined} />
                {errors.party && <span className="field__error" id="err-party">{errors.party}</span>}
              </div>

              <div className="field">
                <label htmlFor="res-name">Name</label>
                <input id="res-name" name="name" type="text" autoComplete="name"
                       aria-describedby={errors.name ? 'err-name' : undefined}
                       aria-invalid={errors.name ? true : undefined} />
                {errors.name && <span className="field__error" id="err-name">{errors.name}</span>}
              </div>

              <div className="field field--wide">
                <label htmlFor="res-email">Email</label>
                <input id="res-email" name="email" type="email" autoComplete="email"
                       aria-describedby={errors.email ? 'err-email' : undefined}
                       aria-invalid={errors.email ? true : undefined} />
                {errors.email && <span className="field__error" id="err-email">{errors.email}</span>}
              </div>

              <div className="field field--wide">
                <label htmlFor="res-note">Anything we should know</label>
                <textarea id="res-note" name="note" rows={3} />
              </div>

              <p className="disclosure">
                This is a prototype. Submitting validates the form and nothing else — no
                booking is sent, no table is held, and nothing you type is stored or
                transmitted.
              </p>

              <button type="submit" className="cta" style={{ gridColumn: '1 / -1', marginTop: 0 }}>
                Request the table
              </button>
            </form>
          </>
        )}
      </div>
    </dialog>
  )
}
