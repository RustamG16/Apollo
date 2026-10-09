# Vendored skill versions

These upstream skill folders are copied into `.agents/skills/` so `system1` remains portable when attached without running an installer.

| Package | Source | Commit |
|---|---|---|
| Impeccable | https://github.com/pbakaus/impeccable | `1cbee026c319af4b8afc95bbf3cd2f736aeab484` |
| GSAP skills | https://github.com/greensock/gsap-skills | `aed9cfd3277740755f6bfc1155c7aa645403b760` |

| Higgsfield skills (8: brandkit, generate, marketplace-cards, product-photoshoot, soul-id, video-explainer, websites, youtube-thumbnail) | https://github.com/higgsfield-ai/skills | not recorded; installed 2026-08-13 via a skills installer whose `skills-lock.json` (per-skill SHA-256 hashes) is kept at `unused/root-docs/skills-lock.json` |
| `product-marketing` 2.1.0, `competitor-profiling` 2.0.0 | Vendored 2026-10-08 from the operator's personal `~/.claude/skills`. Upstream is believed to be a public marketing-skills pack (the version metadata matches) but was **not verified**; confirm source and licence before redistributing. | — |
| `ui-ux` support files (`references/`, `scripts/`, `templates/`, `evals/`) | Vendored 2026-10-08 from the operator's personal `~/.codex/skills/ui-ux`; only its `SKILL.md` had been copied before. Upstream not recorded. | — |
| `open-sourcing` (Trail of Bits, plugin 0.1.2) | https://github.com/trailofbits/skills (`plugins/open-sourcing`) — CC BY-SA 4.0, vendored 2026-10-09 into `library/skills/06-ops-security/` | `82fe8226252622fa807643bdca1710901198553a` |
| `implementing-secret-scanning-with-gitleaks` | https://github.com/mukul975/Anthropic-Cybersecurity-Skills (not affiliated with Anthropic) — Apache-2.0, vendored 2026-10-09, `.py` scripts excluded, corrections in `APOLLO-NOTES.md` | `54a798831d2266a3ca61ce68a7acb80b81160d57` |

Vendored on 2026-08-09 (Impeccable, GSAP). Review upstream releases, diffs, and licenses before updating. Do not auto-update during a client project.

Compatibility note: the vendored Impeccable `SKILL.md` omits upstream’s top-level `version` frontmatter key because the current Codex skill validator accepts version data only through supported metadata. The pinned upstream commit and package version remain recorded here.
