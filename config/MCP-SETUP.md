# Optional MCP setup

MCP connections are optional adapters. The workflow works without them. Connect only what the current project can use, and keep credentials outside this repository.

## Recommended order

1. Browser control already available in Codex, or the project’s existing Playwright setup.
2. Figma MCP when the user supplies design files.
3. PostHog MCP when analytics evidence is in scope.
4. Higgsfield MCP only for an approved asset manifest.
5. 21st.dev Magic only for targeted component exploration.
6. Chrome DevTools MCP only for deeper runtime diagnostics.

## Connections

Use the current official documentation when installing because commands and authentication can change.

### Figma

- Endpoint: `https://mcp.figma.com/mcp`
- Codex command: `codex mcp add figma --url https://mcp.figma.com/mcp`
- Use for selected Figma files, component structure, variables, and approved exportable assets.

### 21st.dev Magic

- Documentation: `https://docs.21st.dev/mcp`
- Current Codex-oriented initializer: `npx @21st-dev/cli@latest init --client codex`
- Remote endpoint: `https://21st.dev/api/mcp`
- Use only after concept selection for a specific component problem. It is an exploration source, not the design director.

### Higgsfield

- Endpoint: `https://mcp.higgsfield.ai/mcp`
- Use only after `05-asset-manifest.md` is approved. Record generation inputs, outputs, model/version where available, rights/provenance, and rejected spend.

### PostHog

- Endpoint: `https://mcp.posthog.com/mcp`
- Default to read-only evidence. Any change to production analytics, flags, dashboards, or data requires explicit user approval.

### Chrome DevTools

- Codex command: `codex mcp add chrome-devtools -- npx chrome-devtools-mcp@latest`
- Prefer an isolated browser profile for testing. Use for profiling, network/runtime diagnosis, and evidence—not routine page styling.

## Guardrails

- Never put API keys or cookies in committed files.
- Never call image/video generation before the user approves the manifest and expected spend.
- Never install an MCP merely because a task mentions its category.
- Never treat MCP output as design judgment; route it through the appropriate skill.
- Prefer browser/CLI workflows for repeated deterministic QA because they usually use less context than a general-purpose browser MCP session.

## Sources

- Codex MCP: https://learn.chatgpt.com/docs/mcp
- Figma MCP: https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Dev-Mode-MCP-Server
- 21st.dev Magic: https://github.com/21st-dev/magic-mcp
- Higgsfield MCP: https://mcp.higgsfield.ai/
- PostHog MCP: https://posthog.com/docs/model-context-protocol
- Chrome DevTools MCP: https://github.com/ChromeDevTools/chrome-devtools-mcp

