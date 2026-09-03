# apollo-loadout-sync

- Category: Meta
- Phase: unrouted
- Status: active
- Routed: no
- Skill ID: apollo-loadout-sync

The single write path for a per-agent skill loadout. Activating, saving, or clearing a named setup goes through this skill rather than hand-editing agent files or .apollo/loadouts/ — it is what keeps the dashboard's "Save" button, this skill, and scripts/apply-loadout.ps1 producing byte-identical output. Trigger phrases - "activate the awwwards-launch loadout", "apply this setup", "clear the active loadout", "sync the loadout to the agent files". Usually invoked as part of dashboard work, not directly by the user.
