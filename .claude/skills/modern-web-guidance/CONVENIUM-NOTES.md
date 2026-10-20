# convenium.design notes: modern-web-guidance

Vendored 2026-10-20 from [`GoogleChrome/modern-web-guidance`](https://github.com/GoogleChrome/modern-web-guidance) (`skills/modern-web-guidance`, commit `65e7edd67e77420eaf02c5df00fdc0521417d809`), Apache-2.0.
The licence is in `third-party/GOOGLECHROME-MODERN-WEB-GUIDANCE-LICENSE.txt`. **Changes made:** a `license: Apache-2.0` frontmatter key (where
missing) and a one-line pointer to this file under the frontmatter. The rest of the upstream text and
every supporting file are unchanged.

## Fit in convenium.design

Current web-platform patterns (dialog/popover, anchor positioning, container queries, View Transitions, scroll-driven animation, `oklch`, INP). Routed to **build**: search once per new platform pattern, retrieve only the matching guide. Offline: `grep -ril "<term>" guides/` and read only the matching file — the bundled `guides/` is the same catalog the CLI serves.
