# convenium.design notes: threejs-build

Vendored 2026-10-20 from [`cloudai-x/threejs-skills`](https://github.com/cloudai-x/threejs-skills)
(`skills/threejs-*`, commit `0e181866f095b5f06d005133876e926515390d95`), MIT. The licence is in
`third-party/CLOUDAI-X-THREEJS-SKILLS-LICENSE.txt`.

**Changes made:** the 13 upstream skills are bundled as one skill. Each upstream `SKILL.md` is copied
unchanged to `references/<topic>.md`; the `SKILL.md` here is new — an index with a reading order.

## Fit in convenium.design

Why bundled: thirteen separate skills would put thirteen descriptions into every session's skill
listing for a capability most projects never use. One skill costs one listing line; its references
load only when a 3D build is actually under way. Routed to **build**, conditional on
`webgl-experience` having approved 3D.
