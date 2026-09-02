import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const settingsPath = fileURLToPath(new URL('./knowledge/agents.json', import.meta.url));

export const agentDefinitions = [
  { id: 'apollo-director', name: 'Apollo', description: 'Keeps the brief, approval gates, and integrated outcome coherent.', skills: ['olympus-design-director', 'taste-first-experience-design'], budget: 6000, approval: false, priority: 10, triggers: ['project','brief','plan','orchestrate','system','design'], activation: 'A mission needs a single accountable direction and clear approval boundaries.' },
  { id: 'athena-evidence', name: 'Athena', description: 'Turns evidence, constraints, and references into decision-ready strategy.', skills: ['ux-evidence-audit', 'reference-deconstruction', 'design-analytics'], budget: 4800, approval: false, priority: 8, triggers: ['audit','existing','reference','research','evidence','analytics','diagnose','strategy'], activation: 'Current-state evidence or a defensible design decision is needed.' },
  { id: 'calliope-experience', name: 'Calliope', description: 'Shapes narrative, hierarchy, and an expressive but usable interface direction.', skills: ['concept-studio', 'impeccable'], budget: 5600, approval: false, priority: 7, triggers: ['design','redesign','concept','ux','ui','layout','story','interface'], activation: 'A product or page needs a distinct, human-readable experience direction.' },
  { id: 'hephaestus-build', name: 'Hephaestus', description: 'Builds the approved experience with durable frontend craft and technical restraint.', skills: ['impeccable', 'awwwards-web-design', 'gsap-core', 'gsap-performance'], budget: 6500, approval: false, priority: 6, triggers: ['build','implement','code','frontend','html','css','component','motion'], activation: 'An approved direction is ready to become working interface code.' },
  { id: 'hermes-delivery', name: 'Hermes', description: 'Coordinates assets, purposeful motion, verification, and a clear handoff.', skills: ['asset-director', 'visual-qa', 'gsap-performance'], budget: 4800, approval: true, priority: 5, triggers: ['asset','media','video','animate','motion','qa','verify','accessibility','ship'], activation: 'The work needs local media, motion planning, verification, or delivery evidence.' }
];

async function settings() {
  try { return JSON.parse(await readFile(settingsPath, 'utf8')); } catch { return {}; }
}

export async function listAgents() {
  const saved = await settings();
  return agentDefinitions.map(agent => ({ ...agent, enabled: saved[agent.id]?.enabled ?? true, budget: saved[agent.id]?.budget ?? agent.budget, approval: saved[agent.id]?.approval ?? agent.approval }));
}

export async function updateAgent(id, input) {
  if (!agentDefinitions.some(agent => agent.id === id)) throw new Error('Agent not found.');
  const saved = await settings();
  saved[id] = {
    ...(saved[id] || {}),
    ...('enabled' in input ? { enabled: Boolean(input.enabled) } : {}),
    ...('approval' in input ? { approval: Boolean(input.approval) } : {}),
    ...('budget' in input ? { budget: Math.min(50_000, Math.max(500, Number(input.budget) || 1000)) } : {})
  };
  await writeFile(settingsPath, `${JSON.stringify(saved, null, 2)}\n`, 'utf8');
  return (await listAgents()).find(agent => agent.id === id);
}

function specializedSkills(agent, prompt) {
  if (agent.id !== 'motion-engineer') return agent.skills;
  const selected = ['gsap-core'];
  if (/timeline|sequence|choreograph/.test(prompt)) selected.push('gsap-timeline');
  if (/scroll|parallax|pin/.test(prompt)) selected.push('gsap-scrolltrigger');
  if (/react|next/.test(prompt)) selected.push('gsap-react');
  if (/vue|nuxt|svelte/.test(prompt)) selected.push('gsap-frameworks');
  if (/draggable|splittext|flip|plugin/.test(prompt)) selected.push('gsap-plugins');
  selected.push('gsap-performance');
  return selected;
}

export async function buildPlan(prompt, totalBudget = 30_000) {
  const normalized = String(prompt || '').toLowerCase();
  const { getActiveSystem } = await import('./systems.mjs');
  const system = await getActiveSystem();
  const agents = system.agents;
  const matches = trigger => new RegExp(`(^|[^a-z0-9])${trigger.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^a-z0-9])`, 'i').test(normalized);
  const matched = agents
    .filter(agent => agent.enabled && agent.triggers.some(matches))
    .sort((a, b) => b.priority - a.priority);
  const requestedBudget = Math.min(300_000, Math.max(1000, Number(totalBudget) || 30_000));
  const desiredBudget = matched.reduce((sum, agent) => sum + agent.budget, 0);
  const scale = desiredBudget > requestedBudget ? requestedBudget / desiredBudget : 1;
  const steps = matched.map(agent => ({ id: agent.id, name: agent.name, description: agent.description, phase: agent.phase, reason: agent.activation, skills: specializedSkills(agent, normalized), mcp: agent.mcp || [], plugins: agent.plugins || [], instructions: agent.instructions || '', budget: Math.max(500, Math.floor(agent.budget * scale / 100) * 100), approval: agent.approval, status: agent.approval ? 'approval-required' : 'ready' }));
  while (steps.reduce((sum, step) => sum + step.budget, 0) > requestedBudget && steps.some(step => step.budget > 500)) {
    const largest = steps.filter(step => step.budget > 500).sort((a, b) => b.budget - a.budget)[0];
    largest.budget -= 100;
  }
  return {
    system: { id: system.id, name: system.name, instructions: system.instructions },
    orchestrator: { name: 'Apollo Orchestrator', skill: 'olympus-design-director', role: 'Plans, invokes only matched specialists, integrates the answer, and prevents nested delegation.' },
    prompt: String(prompt || '').trim(),
    requestedBudget,
    allocatedBudget: steps.reduce((sum, step) => sum + step.budget, 0),
    concurrency: 2,
    steps,
    dormant: agents.filter(agent => !steps.some(step => step.id === agent.id)).map(agent => agent.name)
  };
}
