import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { agentDefinitions } from './agents.mjs';

const dataPath = fileURLToPath(new URL('./data/systems.json', import.meta.url));
const apolloRoot = fileURLToPath(new URL('../', import.meta.url));
const phases = new Set(['always', 'diagnose', 'direct', 'prepare', 'build', 'verify']);
const phaseByAgent = {
  'evidence-analyst': 'diagnose',
  'experience-designer': 'direct',
  'design-engineer': 'build',
  'motion-engineer': 'prepare',
  'spatial-engineer': 'prepare',
  'media-producer': 'prepare',
  'verification-critic': 'verify',
  'measurement-analyst': 'verify'
};

const clean = (value, max = 4000) => String(value || '').trim().slice(0, max);
const slug = value => clean(value, 80).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 64);
const stringList = (value, max = 40) => [...new Set((Array.isArray(value) ? value : []).map(item => clean(item, 100)).filter(Boolean))].slice(0, max);
const now = () => new Date().toISOString();

function defaultAgents() {
  return agentDefinitions.map(agent => ({
    ...agent,
    phase: phaseByAgent[agent.id] || 'prepare',
    mcp: [],
    plugins: [],
    instructions: `Work only within the ${agent.name} responsibility. Return a bounded phase packet to the orchestrator and do not delegate.`,
    enabled: true
  }));
}

function seedSystem() {
  const createdAt = now();
  return {
    id: 'olympus-web-system',
    name: 'Olympus Web System',
    description: 'Evidence-led website design, implementation, and bounded verification.',
    instructions: 'Plan first, activate only relevant specialists, preserve approval gates, and integrate one coherent answer.',
    createdAt,
    updatedAt: createdAt,
    agents: defaultAgents(),
    outputs: [{
      id: 'savra-threshold-ritual',
      name: 'SAVRA — The Threshold Ritual',
      type: 'Responsive website',
      status: 'Gate C pending',
      createdAt: '2026-08-10T23:28:15.190Z',
      runId: 'savra-20260810T225627Z-codex',
      summary: 'Cinematic restaurant concept built from supplied synthetic media.',
      previewPath: 'test_projects/Savra_Restraunt/.olympus/evidence/qa/desktop-1440x900.png'
    }]
  };
}

const emptyStore = () => ({ version: 1, activeSystemId: 'olympus-web-system', systems: [seedSystem()] });

async function loadStore() {
  try {
    const parsed = JSON.parse(await readFile(dataPath, 'utf8'));
    return parsed?.systems?.length ? parsed : emptyStore();
  } catch {
    return emptyStore();
  }
}

async function saveStore(store) {
  await mkdir(dirname(dataPath), { recursive: true });
  await writeFile(dataPath, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
}

function normalizeAgent(input = {}, index = 0) {
  const name = clean(input.name, 80) || `Agent ${index + 1}`;
  return {
    id: slug(input.id || name) || crypto.randomUUID(),
    name,
    description: clean(input.description, 500) || 'Custom bounded specialist.',
    phase: phases.has(input.phase) ? input.phase : 'prepare',
    activation: clean(input.activation, 500) || 'Activate when the plan requires this specialist.',
    triggers: stringList(input.triggers, 30),
    skills: stringList(input.skills),
    mcp: stringList(input.mcp),
    plugins: stringList(input.plugins),
    instructions: clean(input.instructions, 6000) || `Work only within the ${name} responsibility and return a bounded phase packet.`,
    budget: Math.min(50_000, Math.max(500, Number(input.budget) || 3000)),
    approval: Boolean(input.approval),
    priority: Math.min(100, Math.max(0, Number(input.priority) || 1)),
    enabled: input.enabled !== false
  };
}

function normalizeSystem(input, current = {}) {
  const name = clean(input.name ?? current.name, 100) || 'Untitled system';
  return {
    ...current,
    id: current.id || slug(input.id || name) || crypto.randomUUID(),
    name,
    description: clean(input.description ?? current.description, 700),
    instructions: clean(input.instructions ?? current.instructions, 8000),
    createdAt: current.createdAt || now(),
    updatedAt: now(),
    agents: (Array.isArray(input.agents) ? input.agents : current.agents || []).slice(0, 24).map(normalizeAgent),
    outputs: current.outputs || []
  };
}

function normalizeOutput(input = {}) {
  const runId = clean(input.runId, 160);
  const name = clean(input.name, 120) || (runId ? `Run ${runId}` : 'Untitled output');
  return {
    id: slug(input.id || `${name}-${runId || crypto.randomUUID()}`) || crypto.randomUUID(),
    name,
    type: clean(input.type, 80) || 'Project output',
    status: clean(input.status, 80) || 'Complete',
    createdAt: clean(input.createdAt, 80) || now(),
    runId,
    summary: clean(input.summary, 1000),
    content: clean(input.content, 30_000),
    previewPath: clean(input.previewPath, 1000)
  };
}

export async function initializeSystems() {
  const store = await loadStore();
  await saveStore(store);
  return store;
}

export async function listSystems() {
  const store = await loadStore();
  return { activeSystemId: store.activeSystemId, systems: store.systems };
}

export async function getActiveSystem() {
  const store = await loadStore();
  return store.systems.find(system => system.id === store.activeSystemId) || store.systems[0];
}

export async function createSystem(input = {}) {
  const store = await loadStore();
  const source = input.sourceSystemId ? store.systems.find(system => system.id === input.sourceSystemId) : null;
  const base = source ? { ...structuredClone(source), id: undefined, name: `${source.name} copy`, outputs: [] } : { name: 'Untitled system', description: '', instructions: '', agents: [] };
  const system = normalizeSystem({ ...base, ...input, agents: input.agents || base.agents });
  let candidate = system.id;
  let suffix = 2;
  while (store.systems.some(item => item.id === candidate)) candidate = `${system.id}-${suffix++}`;
  system.id = candidate;
  store.systems.push(system);
  store.activeSystemId = system.id;
  await saveStore(store);
  return { activeSystemId: store.activeSystemId, system };
}

export async function updateSystem(id, input = {}) {
  const store = await loadStore();
  const index = store.systems.findIndex(system => system.id === id);
  if (index < 0) throw new Error('System not found.');
  store.systems[index] = normalizeSystem(input, store.systems[index]);
  await saveStore(store);
  return store.systems[index];
}

export async function setActiveSystem(id) {
  const store = await loadStore();
  if (!store.systems.some(system => system.id === id)) throw new Error('System not found.');
  store.activeSystemId = id;
  await saveStore(store);
  return { activeSystemId: id };
}

export async function deleteSystem(id) {
  const store = await loadStore();
  if (store.systems.length <= 1) throw new Error('Apollo must keep at least one saved system.');
  const index = store.systems.findIndex(system => system.id === id);
  if (index < 0) throw new Error('System not found.');
  store.systems.splice(index, 1);
  if (store.activeSystemId === id) store.activeSystemId = store.systems[0].id;
  await saveStore(store);
  return { activeSystemId: store.activeSystemId };
}

export async function recordSystemOutput(systemId, input = {}) {
  const store = await loadStore();
  const system = store.systems.find(item => item.id === systemId);
  if (!system) throw new Error('System not found.');
  const output = normalizeOutput(input);
  const existing = output.runId && system.outputs.findIndex(item => item.runId === output.runId);
  if (Number.isInteger(existing) && existing >= 0) {
    output.id = system.outputs[existing].id;
    system.outputs.splice(existing, 1, output);
  } else {
    let candidate = output.id;
    let suffix = 2;
    while (system.outputs.some(item => item.id === candidate)) candidate = `${output.id}-${suffix++}`;
    output.id = candidate;
    system.outputs.unshift(output);
  }
  system.outputs = system.outputs.slice(0, 100);
  system.updatedAt = now();
  await saveStore(store);
  return output;
}

export function agentTemplates() {
  return defaultAgents();
}

export async function getOutputPreview(systemId, outputId) {
  const store = await loadStore();
  const output = store.systems.find(system => system.id === systemId)?.outputs.find(item => item.id === outputId);
  if (!output?.previewPath) throw new Error('Preview not found.');
  const path = resolve(apolloRoot, output.previewPath);
  const rel = relative(resolve(apolloRoot), path);
  if (!rel || rel.startsWith('..')) throw new Error('Unsafe preview path.');
  const info = await stat(path);
  if (!info.isFile()) throw new Error('Preview not found.');
  const mime = extname(path).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg';
  return { path, mime };
}
