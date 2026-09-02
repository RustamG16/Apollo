# apollo-dashboard-sync

- Category: Meta
- Phase: unrouted
- Status: active
- Skill ID: apollo-dashboard-sync

The single write path into a project's dashboard state.json. Any agent that starts, updates, blocks, or completes a task calls this skill rather than editing state.json directly - this is what keeps writes from racing across agents. Trigger phrases - this is invoked by other agents/skills as part of normal work, not typically by the user directly.
