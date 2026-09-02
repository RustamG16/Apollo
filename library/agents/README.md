# library/agents/ — host-neutral specialists

Six agents: the five bounded specialists converted from `.codex/agents/*.toml`, plus the
`design-director` (written down here as an agent for the first time).

`$name` in a body is the **host-neutral skill marker**. `tools/project.py` translates it:
Codex keeps `$name`; Claude rewrites it as "the *name* skill (Skill tool)".

`access: read-only` agents get no Write/Edit in any host projection.

The only edit made during conversion: the broken token `$emil-design-engineering` in
`design-engineer` was corrected to the canonical id `$emil-design-eng`.
