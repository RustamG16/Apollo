import { useEffect, useRef, useState } from 'react'
import { trackSavraEvent } from '../lib/analytics'

export type ReservationSource = 'header' | 'hero' | 'sticky_mobile' | 'final_table'

type ReservationDialogProps = {
  open: boolean
  source: ReservationSource
  onClose: () => void
}

const steps = ['party', 'moment', 'review'] as const
type Step = (typeof steps)[number]

export function ReservationDialog({ open, source, onClose }: ReservationDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [party, setParty] = useState<string>('')
  const [moment, setMoment] = useState<string>('')
  const [submitted, setSubmitted] = useState(false)

  const step: Step = steps[stepIndex]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      setStepIndex(0)
      setParty('')
      setMoment('')
      setSubmitted(false)
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      dialogRef.current?.close()
      onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose, open])

  function closeDialog() {
    dialogRef.current?.close()
    onClose()
  }

  function move(direction: 'forward' | 'back') {
    const nextIndex = direction === 'forward' ? stepIndex + 1 : stepIndex - 1
    const bounded = Math.max(0, Math.min(steps.length - 1, nextIndex))
    setStepIndex(bounded)
    trackSavraEvent('savra_reservation_step', {
      step: steps[bounded],
      direction,
    })
  }

  function submitDemo() {
    setSubmitted(true)
    trackSavraEvent('savra_reservation_submit_demo', { source })
  }

  const canContinue = step === 'party' ? Boolean(party) : step === 'moment' ? Boolean(moment) : true

  return (
    <dialog
      ref={dialogRef}
      className="reservation-dialog"
      aria-labelledby="reservation-title"
      aria-describedby="reservation-description"
      onCancel={(event) => {
        event.preventDefault()
        closeDialog()
      }}
      onClose={onClose}
    >
      <div className="dialog-shell">
        <header className="dialog-header">
          <p className="dialog-wordmark" aria-hidden="true">SAVRA</p>
          <button className="text-button" type="button" onClick={closeDialog}>
            Close
          </button>
        </header>

        {submitted ? (
          <div className="dialog-confirmation" aria-live="polite">
            <span className="fire-disc" aria-hidden="true" />
            <h2 id="reservation-title">The table is only imagined—for now.</h2>
            <p id="reservation-description">
              This is a concept demo. No reservation was sent, and no personal information was collected.
            </p>
            <button className="button button-solid" type="button" onClick={closeDialog}>
              Return to SAVRA
            </button>
          </div>
        ) : (
          <>
            <div className="dialog-progress" aria-label={`Step ${stepIndex + 1} of ${steps.length}`}>
              {steps.map((item, index) => (
                <span key={item} className={index <= stepIndex ? 'is-active' : ''} />
              ))}
            </div>

            <div className="dialog-copy">
              <h2 id="reservation-title">Begin a table request</h2>
              <p id="reservation-description">
                Explore the shape of a reservation. This demo does not show real dates or availability.
              </p>
            </div>

            {step === 'party' && (
              <fieldset className="choice-fieldset">
                <legend>How many places?</legend>
                <div className="choice-grid choice-grid-party">
                  {['2', '4', '6'].map((value) => (
                    <label key={value} className={party === value ? 'choice is-selected' : 'choice'}>
                      <input
                        type="radio"
                        name="party"
                        value={value}
                        checked={party === value}
                        onChange={() => setParty(value)}
                      />
                      <strong>{value}</strong>
                      <span>guests</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 'moment' && (
              <fieldset className="choice-fieldset">
                <legend>What kind of evening?</legend>
                <div className="choice-grid">
                  {[
                    ['early', 'Early evening', 'A future evening, before the room deepens.'],
                    ['after-dark', 'After dark', 'A future evening at SAVRA’s imagined centre.'],
                    ['flexible', 'I’m flexible', 'No preference; this is illustrative only.'],
                  ].map(([value, title, description]) => (
                    <label key={value} className={moment === value ? 'choice choice-wide is-selected' : 'choice choice-wide'}>
                      <input
                        type="radio"
                        name="moment"
                        value={value}
                        checked={moment === value}
                        onChange={() => setMoment(value)}
                      />
                      <strong>{title}</strong>
                      <span>{description}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 'review' && (
              <div className="reservation-review">
                <div>
                  <span>Places</span>
                  <strong>{party}</strong>
                </div>
                <div>
                  <span>Evening</span>
                  <strong>{moment === 'early' ? 'Early evening' : moment === 'after-dark' ? 'After dark' : 'Flexible'}</strong>
                </div>
                <p>No date, availability, or booking is represented by these choices.</p>
              </div>
            )}

            <footer className="dialog-actions">
              {stepIndex > 0 ? (
                <button className="button button-ghost" type="button" onClick={() => move('back')}>
                  Back
                </button>
              ) : (
                <span />
              )}
              {step === 'review' ? (
                <button className="button button-solid" type="button" onClick={submitDemo}>
                  Complete demo
                </button>
              ) : (
                <button className="button button-solid" type="button" disabled={!canContinue} onClick={() => move('forward')}>
                  Continue
                </button>
              )}
            </footer>
          </>
        )}
      </div>
    </dialog>
  )
}
