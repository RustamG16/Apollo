import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const settingsPath = fileURLToPath(new URL('./knowledge/agents.json', import.meta.url));

export const agentDefinitions = [
  { id: 'evidence-analyst', name: 'Evidence Analyst', description: 'Inspects current-state evidence before recommendations.', skills: ['ux-evidence-audit', 'reference-deconstruction'], budget: 4500, approval: false, priority: 8, triggers: ['audit','existing','reference','research','evidence','analytics','diagnose','redesign'], activation: 'Current page, research, references, or diagnostic evidence is requested.' },
  { id: 'experience-designer', name: 'Experience Designer', description: 'Shapes hierarchy, interaction, and distinct product directions.', skills: ['concept-studio', 'impeccable'], budget: 5500, approval: false, priority: 7, triggers: ['design','redesign','concept','ux','ui','layout','website','interface','dashboard'], activation: 'A visual or interaction direction must be designed.' },
  { id: 'design-engineer', name: 'Design Engineer', description: 'Turns an approved direction into working interface code.', skills: ['impeccable', 'awwwards-web-design'], budget: 6500, approval: false, priority: 6, triggers: ['build','implement','code','frontend','react','vue','svelte','html','css','component'], activation: 'The plan requires implementation or frontend code.' },
  { id: 'motion-engineer', name: 'Motion Engineer', description: 'Owns purposeful motion and framework-safe GSAP execution.', skills: ['gsap-core','gsap-timeline','gsap-scrolltrigger','gsap-react','gsap-frameworks','gsap-plugins','gsap-performance'], budget: 4500, approval: false, priority: 5, triggers: ['motion','animate','animation','gsap','scroll','parallax','timeline','draggable','transition'], activation: 'Motion communicates state, sequence, or spatial continuity.' },
  { id: 'spatial-engineer', name: 'Spatial Engineer', description: 'Bounds 3D/WebGL value, lifecycle, fallbacks, and performance.', skills: ['webgl-experience','three-js-implementation'], budget: 5000, approval: true, priority: 4, triggers: ['3d','three.js','threejs','webgl','spatial','shader','glsl'], activation: 'A concrete 3D communication purpose appears in the plan.' },
  { id: 'media-producer', name: 'Media Producer', description: 'Plans images, video, renders, provenance, and generation handoff.', skills: ['asset-director'], budget: 4500, approval: true, priority: 3, triggers: ['image','video','asset','photo','illustration','render','generate','media'], activation: 'Missing visual media is required by the approved concept.' },
  { id: 'verification-critic', name: 'Verification Critic', description: 'Runs bounded visual, responsive, accessibility, and runtime checks.', skills: ['visual-qa','award-rubric','gsap-performance'], budget: 4000, approval: false, priority: 2, triggers: ['test','qa','verify','accessibility','responsive','performance','ship','production','review'], activation: 'The plan includes implementation review or delivery evidence.' },
  { id: 'measurement-analyst', name: 'Measurement Analyst', description: 'Connects design hypotheses to events and readouts.', skills: ['design-analytics'], budget: 3500, approval: false, priority: 1, triggers: ['analytics','conversion','experiment','metric','funnel','event','a/b','measure'], activation: 'A business outcome or experiment must be measured.' }
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
