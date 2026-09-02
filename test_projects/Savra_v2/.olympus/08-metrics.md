# SAVRA measurement note

Analytics implementation was not in scope and no analytics provider or consent model was supplied. No tracking code was added.

If measurement is approved later, the minimum useful contract is:

- `reservation_opened` — source: `hero_nav`, `mobile_bar`, `interlude`, or `footer`
- `reservation_prototype_completed` — source plus guest-count band; never send names, email addresses, notes, or exact preferred dates to analytics
- `menu_dish_focused` — dish identifier and interaction mode: `scroll`, `control`, or `keyboard`
- `story_crossing_completed` — reduced-motion flag and device class

Primary success signal: reservation opens per qualified landing-page session. Guardrails: dialog abandonment, interaction errors, INP, and mobile LCP.
