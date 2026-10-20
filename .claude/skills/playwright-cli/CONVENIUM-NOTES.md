# convenium.design notes: playwright-cli

Vendored 2026-10-20 from [`microsoft/playwright-cli`](https://github.com/microsoft/playwright-cli) (`skills/playwright-cli`, commit `b1a5903c5b633b8c9f843ad7b629c2a78437040c`), Apache-2.0.
The licence is in `third-party/MICROSOFT-PLAYWRIGHT-CLI-LICENSE.txt`. **Changes made:** a `license: Apache-2.0` frontmatter key (where
missing) and a one-line pointer to this file under the frontmatter. The rest of the upstream text and
every supporting file are unchanged.

## Fit in convenium.design

The browser-evidence layer named in `ux-evidence-audit` and `visual-qa`. Routed to **verify** (and used by diagnose for captures). Prefer CLI snapshots over screenshots when text evidence is enough — they cost far fewer tokens.
