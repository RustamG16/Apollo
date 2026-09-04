# Open decisions

Things I cannot decide from the files. Ordered by how much they block.

---

## D2 — What counts as "finished" for the Design Agency

`SPEC-02.md` §4 lists the gaps. After the 2026-09-03 scope cut and the 2026-09-04 evidence
they are:

0. **Host parity guard (§4.0)** — new. A routed `defaultOn` skill missing from a host that
   claims to run the pipeline should fail `verify.py`, not sit undetected.
1. Delegation discipline + token guardrails (§4.1–4.2) — *partially delivered*: activation
   blocks landed; `delegates` and the bounded-brief contract have not.
2. Retrieval — Spec 01
3. SOP content for the 31 routed skills (§4.4) — **demoted**, see `SPEC-02` §5
4. The console — Spec 03

**Assumed: all five, in the order in §5, with 0 first.** Confirm or cut.

The pushback below still stands and has strengthened: the workflow lock delivered a
measurable quality improvement for ~300 words of doctrine and one template. Before committing
to ~5,400 words of SOP prose, decide what it buys that a checked condition does not.

The one I would push back on for speed: **§4.4 is ~175 words × 31 skills of honest
writing.** It is not code, it cannot be generated credibly, and it gates the drawer being
worth opening. If you want a working prototype sooner, it lags everything else and the
drawer ships showing "not yet specified" until it catches up.

## D3 — Does the Design Agency keep all 84 skills?

31 routed, 53 unrouted. **Assumed: leave them**, `enabled=0`, indexed but never firing —
costs nothing once retrieval is a query rather than a payload. Revisit after Spec 01 proves
out.

## D4 — Marketing agency scope

Named but undefined. Nothing to decide until Design is done. Recorded so it is not designed
by accident in the meantime.

---

## Resolved

| | Decision | Answer |
|---|---|---|
| ✔ | Shared KB mechanism | A real database — SQLite + FTS5, **queried, not loaded** |
| ✔ | What's in it | Catalog + relations in the DB; markdown bodies stay on disk |
| ✔ | Cross-agency mechanism | `agency` column, filtered `IN ('shared', :current)` |
| ✔ | **Multi-model worker lane** | **Cut.** No Hermes, no GLM, no Ollama, no gateway. Claude + Codex subscriptions only. `SPEC-02` §4.1 |
| ✔ | What survives from his worker pool | The *economics*: bounded brief in, one page out, one-way escalation, stateless subagents |
| ✔ | UI direction (was D1) | **Similar to the reference, simplified and made honest.** Dark technical console, 5 views not 18, the five fixes in `SPEC-03` §4 |
| ✔ | Console's role | A window, never a dependency. Apollo runs headless whether or not it exists. `SPEC-03` §1 |
| ✔ | Usage model | Unchanged — open Claude Code in a project folder, or create it under `test_projects/` |
| ✔ | Build order | **Amended 2026-09-04:** host-parity guard → KB → delegation/guardrails → SOP content → console; agency #2 last |
| ✔ | Which agent roster is real | The **six** in `library/agents/`. Both hosts load them; the five-name pantheon in `apollo-studio/data/` is a console display model and no runtime has ever read it. `slots.json` carries `runtimeOwner` to join the two. |
| ✔ | What `06-build-plan.md` is | **The design document**, not a task list — written in plan mode, implemented from in a fresh session. The largest measured difference between a run that produced award-level work and one that did not. |
| ✔ | Whether intake is unconditional | **No.** Explicit creative freedom cancels it. A refusal in the brief is a rejection to encode, not a request. |
| ✔ | How many verification passes | **Two**, and the second is independent: the agent that reviews is never the agent that built. |
| ✔ | Where the type scale is decided | In `DESIGN.md`, **as a number, before any layout code**, checked against the chosen doctrine's `--display-max`. |

---

## Note on D1

D1 asked whether to build the console in Apollo's own doctrine rather than resembling the
reference. Your answer — "similar ux/ui inspired from the screenshots" — settles it toward
the reference's genre, and `SPEC-03` follows that.

One piece of the argument is still worth keeping: **the console is the best demo Apollo
has.** So §4's five fixes are not optional polish. A console that reproduces his unreadable
type and his fake connection dots is a design system failing in public.
