# Routing contract

| Phase | Required input | Output | Stop condition |
|---|---|---|---|
| Intake | Project, route, goal, audience, constraints | `00-brief.md`, `run.json` | Gate A decision |
| Audit | Approved scope, page access, references | `01-audit.md` | Evidence is sufficient to define the problem |
| Concepts | Approved brief and audit | `02-concepts.md` | Exactly three distinct directions exist |
| Critique | Frozen concepts and brief | `03-critique.md` | Scores and fatal risks are explained |
| Selection | Concepts and critique | `04-decision.md` | Gate B decision |
| Preparation | Selected concept and available assets | `05-asset-manifest.md`, `06-build-plan.md` | Required approvals recorded |
| Build | Approved plan | Working selected direction | Bounded implementation passes |
| QA | Running implementation | `07-qa.md` | Two cycles maximum |
| Measurement | Goal and analytics scope | `08-metrics.md` | Event/readout contract complete |
| Handoff | Verified implementation | `09-handoff.md` | Gate C decision |

