// GENERATED-DATA MODULE — do not add literal skill/tool/plugin/preset arrays here.
// The single source of truth is `library/registry/`. This module only re-exports it so
// `knowledge.mjs` (mergeSkill), `server.mjs`, and `mcp-server.mjs` keep the exact symbol
// names and field shapes they always consumed.
//   skills   : { id, name, phase, group, defaultOn, description, runtimePrompt, ... }
//   tools    : { id, name, kind, usable, status, description }
//   plugins  : { id, name, status, description }
//   presets  : { id, name, skills: [id, ...] }
// Rebuild the registry with `python library/tools/project.py` (see library/README.md).

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const reg = name =>
  JSON.parse(readFileSync(fileURLToPath(new URL(`../library/registry/${name}.json`, import.meta.url)), 'utf8'));

export const skills = reg('skills.registry').map(s => ({
  id: s.id,
  name: s.name,
  phase: s.phase,
  group: s.group,
  defaultOn: Boolean(s.defaultOn),
  // `enabled` gates apollo_get_context's inventory: true for pipeline-routed skills,
  // false for the unrouted capability library. Registry is the source of truth; default
  // to (phase !== 'unrouted') for any record written before the field existed.
  enabled: s.enabled ?? (s.phase !== 'unrouted'),
  description: s.description,
  runtimePrompt: s.runtimePrompt || '',
  status: s.status,
  category: s.category,
  hosts: s.hosts,
  ...(s.disableModelInvocation ? { disableModelInvocation: true } : {}),
}));

export const tools = reg('tools');
export const plugins = reg('plugins');
export const presets = reg('presets');
