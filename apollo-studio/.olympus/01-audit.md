# Evidence audit

## Observed defects in the first visualization

- Connector paths used fixed SVG coordinates, so node edges and arrows separated as the canvas width changed.
- The output was a wrapped visualization fragment rather than a repository-local application.
- Switches changed presentation state but did not execute or compare skill configurations.
- “System operational” overstated reality: no orchestration runtime, API adapter, run record, or truthful tool status existed.
- There was no same-prompt experiment surface, usage evidence, persistence strategy, or export.

## Highest-leverage correction

Replace the artifact with a local control-plane application: DOM-measured connectors, a server-owned provider adapter, explicit live/demo status, skill presets, parallel controlled variants, metrics, history, and honest adapter availability.
