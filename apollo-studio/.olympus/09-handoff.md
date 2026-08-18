# Handoff

## Start

```powershell
cd D:\Analyst_Designer\Apollo\apollo-studio
npm.cmd start
```

Open `http://127.0.0.1:4173`.

## Live mode

Set `OPENAI_API_KEY` in the server process environment, then restart. The key never enters the browser. Live comparisons use the selected OpenAI model, reasoning effort, output ceiling, skill contracts, and optional hosted web search.

## Extend

- Add skills and source notes from the Knowledge UI; runtime-safe custom contracts and category folders persist under `knowledge/`.
- Adjust specialist activation, token budgets, and approval gates from the Agents UI.
- Implement authenticated MCP bridges server-side before marking Figma, PostHog, Higgsfield, Browser Control, or Chrome DevTools as usable.
- Follow `INTEGRATIONS.md`: keep subscription sign-in inside each host and forward only explicit Apollo events. Never import app session cookies.
- Replace browser-local experiment history with a persistent run store when multi-user or resumable execution becomes necessary.
- Consider the OpenAI Agents SDK tracing adapter or Temporal only when production monitoring or crash-resilient long-running workflows justify those dependencies.
