# Animation Performance

- Category: Motion
- Phase: verify
- Status: active
- Routed: yes
- Skill ID: animation-performance

Checks that implemented motion stays inside the frame budget: composite-only properties, main-thread load, and the cause of dropped frames.

## Runtime instructions

Activate when the build ships motion. Confirm animations use transform/opacity, nothing animates layout properties, and long tasks do not stall scroll-linked motion; report each dropped-frame cause with the fix. Leave GSAP-specific tuning to gsap-performance.
