# Design measurement plan

## Hypothesis

Because the Threshold Ritual makes the reservation action continuously available and turns the supplied arrival-to-table media into a coherent decision journey for design-aware diners, we expect more qualified visitors to open and advance through the reservation demo from an **unknown baseline** toward a higher completion direction during a future observation window, without harming page responsiveness, accessibility, runtime health, or honest concept disclosure.

No numeric target, conversion lift, statistical certainty, or observed event count is claimed because no analytics baseline/account or traffic expectation was supplied.

## Minimal outcomes

- Primary outcome: reservation demo completion rate = unique page views with `savra_reservation_submit_demo` / unique page views, once real consented analytics exists.
- Leading indicators: reservation-open rate and first-to-final demo-step progression.
- Diagnostic: source of reservation open (`header`, `hero`, `sticky_mobile`, `final_table`) and plate engagement source.
- Guardrails: dialog errors, console/runtime errors, failed assets, reduced-motion parity, keyboard completion, Core Web Vitals/performance, and disclosure visibility.

## Event contract

| Event | Exact trigger / duplicate prevention | Required properties | Purpose | Identity and privacy |
|---|---|---|---|---|
| `savra_page_view` | once when the app mounts | none | denominator for future intent funnel | local console only; no identity, cookie, storage, or network |
| `savra_nav_select` | every intentional nav selection | `destination` = `story` / `plates` / `space` / `reserve` | understand chosen wayfinding | no personal data |
| `savra_menu_dish_view` | once per `dish_id` when ≥55% visible | `dish_id`, `source` = `scroll` / `nav` | leading indicator for plate engagement | session-memory Set only; reset on refresh |
| `savra_reservation_open` | every closed→open transition | `source` = `header` / `hero` / `sticky_mobile` / `final_table` | primary CTA source diagnostic | no personal data |
| `savra_reservation_step` | every successful next/back state change | `step` = `party` / `moment` / `review`, `direction` = `forward` / `back` | locate demo friction | selected values are not emitted |
| `savra_reservation_submit_demo` | once per dialog open after demo confirm | `source` | future primary outcome | no booking/contact data; no network |
| `savra_motion_mode` | once after media-query evaluation | `mode` = `full` / `reduced` | verify mode distribution/parity | accessibility preference only, local console; do not persist |

## Local implementation

- Development logger uses `console.info('[SAVRA event]', event)` with allowlisted names/properties.
- It creates no identifier, cookie, localStorage/sessionStorage entry, request, beacon, or external state.
- Production can retain the small logger as a no-op or console-only demonstration; connecting a vendor requires a separate approval, consent review, taxonomy mapping, and privacy policy.

## Comparison plan

- Current controlled test: qualitative task validation plus browser/runtime evidence only. Ask representative testers to identify the concept, find plates/space, open the reservation demo, complete it by keyboard, and explain whether a real booking occurred.
- Future real site with adequate traffic: phased or controlled comparison against the incumbent page, using consented unique sessions; otherwise use a four-week pre/post read with seasonality and campaign caveats.
- Minimum observation window and sample size: undecided until actual traffic variability and booking-quality data exist; do not invent them.
- Decision rule: retain the design only if reservation completion direction improves or qualitative task success is materially clearer, while guardrails remain acceptable and downstream real booking quality does not decline.

## Activation record

`design-analytics` was activated only to define this contract and readout plan. No external analytics service was modified or queried.

