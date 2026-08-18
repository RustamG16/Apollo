import http from 'node:http';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { performance } from 'node:perf_hooks';
import { plugins, tools, presets } from './skills.mjs';
import { addSource, allSkills, createSkill, initializeKnowledge, listKnowledge, updateSkill } from './knowledge.mjs';
import { buildPlan, listAgents, updateAgent } from './agents.mjs';
import { initializeEventStore, listEvents, publishEvent } from './events.mjs';
import { agentTemplates, createSystem, deleteSystem, getOutputPreview, initializeSystems, listSystems, recordSystemOutput, setActiveSystem, updateSystem } from './systems.mjs';

const root = fileURLToPath(new URL('./public/', import.meta.url));
const port = Number(process.env.PORT || 4173);
const apiKey = process.env.OPENAI_API_KEY || '';
const allowedModels = new Set(['gpt-5.6-sol', 'gpt-5.6-terra', 'gpt-5.6-luna']);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml' };
const execFileAsync = promisify(execFile);

const json = (response, status, body) => {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  response.end(JSON.stringify(body));
};

const readJson = async request => {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 500_000) throw new Error('Request body exceeds 500 KB.');
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
};

const outputText = response => response.output_text || response.output?.flatMap(item => item.content || []).find(item => item.type === 'output_text')?.text || 'No text output returned.';

async function composeInstructions(selectedIds) {
  const inventory = await allSkills();
  const selected = selectedIds.map(id => inventory.find(skill => skill.id === id)).filter(skill => skill?.enabled);
  return [
    'You are running one controlled Apollo experiment. Answer the user prompt directly.',
    'Treat the activated capabilities below as one coordinated instruction set, not separate personas.',
    'Do not claim to have inspected files, browsers, analytics, or references unless the prompt includes that evidence.',
    'If a capability is irrelevant, keep it dormant rather than forcing it into the answer.',
    ...selected.map(skill => `CAPABILITY — ${skill.name}: ${skill.runtimePrompt}`)
  ].join('\n\n');
}

async function requestOpenAI({ input, instructions, model, reasoning = 'low', maxOutputTokens = 4000 }) {
  const apiResponse = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({ model, instructions, input, reasoning: { effort: reasoning }, max_output_tokens: maxOutputTokens, store: false })
  });
  const body = await apiResponse.json();
  if (!apiResponse.ok) throw new Error(body.error?.message || `OpenAI request failed with ${apiResponse.status}.`);
  return { id: body.id, text: outputText(body), usage: { inputTokens: body.usage?.input_tokens || 0, outputTokens: body.usage?.output_tokens || 0, totalTokens: body.usage?.total_tokens || 0 } };
}

async function runLive({ prompt, variant, model, reasoning, maxOutputTokens }) {
  const started = performance.now();
  const enabledTools = variant.tools?.includes('web_search') ? [{ type: 'web_search' }] : [];
  const apiResponse = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({ model, instructions: await composeInstructions(variant.skills), input: prompt, reasoning: { effort: reasoning }, max_output_tokens: maxOutputTokens, tools: enabledTools, store: false })
  });
  const body = await apiResponse.json();
  if (!apiResponse.ok) throw new Error(body.error?.message || `OpenAI request failed with ${apiResponse.status}.`);
  return { id: body.id, mode: 'live', text: outputText(body), latencyMs: Math.round(performance.now() - started), usage: { inputTokens: body.usage?.input_tokens || 0, outputTokens: body.usage?.output_tokens || 0, totalTokens: body.usage?.total_tokens || 0 } };
}

async function runDemo({ prompt, variant }) {
  const started = performance.now();
  const inventory = await allSkills();
  const selected = variant.skills.map(id => inventory.find(skill => skill.id === id)).filter(Boolean);
  await new Promise(resolve => setTimeout(resolve, 180 + selected.length * 22));
  const phaseMix = [...new Set(selected.map(skill => skill.phase))].join(' → ');
  return {
    id: `demo_${crypto.randomUUID()}`,
    mode: 'demo',
    text: ['DEMO MODE — no model request was made.', '', `Prompt focus: ${prompt.slice(0, 220)}${prompt.length > 220 ? '…' : ''}`, '', `Activated route: ${phaseMix || 'none'}`, `Capabilities: ${selected.map(skill => skill.name).join(', ') || 'No skills selected'}`, '', selected.some(skill => skill.id === 'ux-evidence-audit') ? 'This route begins with evidence and separates observations from inferences.' : 'No dedicated evidence audit is active.', selected.some(skill => skill.id === 'concept-studio') ? 'It produces three structurally distinct directions before implementation.' : 'It answers without a formal three-concept phase.', selected.some(skill => skill.id === 'visual-qa') ? 'A bounded desktop/mobile verification pass is included.' : 'Release verification is not included.'].join('\n'),
    latencyMs: Math.round(performance.now() - started),
    usage: { inputTokens: 0, outputTokens: 0, totalTokens: 0 }
  };
}

async function handleCompare(request, response) {
  try {
    const body = await readJson(request);
    const prompt = String(body.prompt || '').trim();
    const variants = Array.isArray(body.variants) ? body.variants.slice(0, 3) : [];
    const model = allowedModels.has(body.model) ? body.model : 'gpt-5.6-terra';
    const reasoning = ['none', 'low', 'medium', 'high'].includes(body.reasoning) ? body.reasoning : 'low';
    const maxOutputTokens = Math.min(20_000, Math.max(200, Number(body.maxOutputTokens) || 1000));
    const inventory = await allSkills();
    if (prompt.length < 3 || prompt.length > 20_000) return json(response, 400, { error: 'Prompt must contain 3–20,000 characters.' });
    if (variants.length < 2) return json(response, 400, { error: 'Choose at least two variants.' });
    const normalized = variants.map((variant, index) => ({
      name: String(variant.name || `Variant ${index + 1}`).slice(0, 60),
      skills: [...new Set((variant.skills || []).filter(id => inventory.some(skill => skill.id === id && skill.enabled)))],
      tools: [...new Set((variant.tools || []).filter(id => tools.some(tool => tool.id === id && tool.usable)))]
    }));
    const runner = apiKey && body.mode !== 'demo' ? runLive : runDemo;
    const settled = await Promise.allSettled(normalized.map(variant => runner({ prompt, variant, model, reasoning, maxOutputTokens })));
    const results = settled.map((item, index) => item.status === 'fulfilled' ? { variant: normalized[index], ...item.value } : { variant: normalized[index], mode: apiKey ? 'live' : 'demo', error: item.reason?.message || 'Run failed.' });
    json(response, 200, { runId: crypto.randomUUID(), createdAt: new Date().toISOString(), model, reasoning, prompt, results });
  } catch (error) { json(response, 400, { error: error.message || 'Invalid request.' }); }
}

async function handleOracle(request, response, planOnly = false) {
  try {
    const body = await readJson(request);
    const prompt = String(body.prompt || '').trim();
    if (prompt.length < 3 || prompt.length > 30_000) return json(response, 400, { error: 'Prompt must contain 3–30,000 characters.' });
    const budget = Math.min(300_000, Math.max(1000, Number(body.budget) || 30_000));
    const plan = await buildPlan(prompt, budget);
    await publishEvent({ host: 'apollo', kind: 'plan.created', summary: `Oracle created a ${plan.steps.length}-specialist plan.`, data: { systemId: plan.system.id, systemName: plan.system.name, specialists: plan.steps.map(step => step.name), requestedBudget: plan.requestedBudget, allocatedBudget: plan.allocatedBudget, phase: 'plan', agent: 'Apollo Orchestrator', tokens: 0 } });
    if (planOnly) return json(response, 200, { mode: 'plan', plan });
    const approved = new Set(Array.isArray(body.approvedAgentIds) ? body.approvedAgentIds : []);
    const executable = plan.steps.filter(step => !step.approval || approved.has(step.id));
    const waiting = plan.steps.filter(step => step.approval && !approved.has(step.id));
    const runId = crypto.randomUUID();
    await publishEvent({ host: 'apollo', kind: 'run.started', runId, summary: `${apiKey && body.mode !== 'demo' ? 'Live' : 'Demo'} Oracle run started.`, data: { systemId: plan.system.id, systemName: plan.system.name, specialists: executable.map(step => step.name), waiting: waiting.map(step => step.name), phase: 'plan', agent: 'Apollo Orchestrator', tokens: 0 } });
    if (!apiKey || body.mode === 'demo') {
      const route = executable.length ? executable.map(step => `${step.name} [${step.skills.join(', ')}]`).join('\n') : 'No specialist matched this request.';
      const answer = `DEMO MODE — Apollo planned the request but made no model calls.\n\nActivated specialists:\n${route}\n\n${waiting.length ? `Waiting for approval: ${waiting.map(step => step.name).join(', ')}\n\n` : ''}Open this workspace in a supported host or configure OPENAI_API_KEY for live execution.`;
      for (const step of executable) await publishEvent({ host: 'apollo', kind: 'run.progress', runId, summary: `${step.name} simulated in demo mode.`, data: { systemId: plan.system.id, phase: step.phase, agent: step.name, tokens: 0, status: 'simulated' } });
      const output = await recordSystemOutput(plan.system.id, { name: `Oracle · ${prompt.slice(0, 72)}`, type: 'Oracle run', status: 'Demo', runId, summary: 'Planned route preview; no model tokens were consumed.', content: answer });
      await publishEvent({ host: 'apollo', kind: 'run.completed', runId, summary: 'Demo Oracle run completed without model usage.', data: { systemId: plan.system.id, outputId: output.id, phase: 'synthesize', agent: 'Apollo Orchestrator', tokens: 0 } });
      return json(response, 200, { runId, mode: 'demo', plan, waiting, output, trace: executable.map(step => ({ agent: step.name, status: 'simulated', budget: step.budget, skills: step.skills })), answer });
    }
    const model = allowedModels.has(body.model) ? body.model : 'gpt-5.6-terra';
    const specialistResults = [];
    for (let index = 0; index < executable.length; index += plan.concurrency) {
      const batch = executable.slice(index, index + plan.concurrency);
      const settled = await Promise.allSettled(batch.map(async step => {
        const inventory = [`Skills: ${step.skills.join(', ') || 'none'}`, `MCP/tools requested: ${step.mcp.join(', ') || 'none'}`, `Plugins requested: ${step.plugins.join(', ') || 'none'}`].join('\n');
        const result = await requestOpenAI({ input: prompt, instructions: `${await composeInstructions(step.skills)}\n\nSYSTEM ORCHESTRATOR RULES\n${plan.system.instructions}\n\nSYSTEM AGENT INSTRUCTIONS\n${step.instructions}\n\nINVENTORY\n${inventory}\n\nYou are the bounded ${step.name}. Return findings for the Apollo orchestrator; do not delegate.`, model, maxOutputTokens: Math.min(8000, step.budget) });
        return { step, result };
      }));
      for (let offset = 0; offset < settled.length; offset += 1) {
        const item = settled[offset];
        const packet = item.status === 'fulfilled' ? item.value : { step: batch[offset], error: item.reason?.message || 'Specialist failed.' };
        specialistResults.push(packet);
        await publishEvent({ host: 'apollo', kind: packet.error ? 'run.failed' : 'run.progress', runId, summary: packet.error ? `${packet.step.name} failed.` : `${packet.step.name} completed its phase.`, data: { systemId: plan.system.id, phase: packet.step.phase, agent: packet.step.name, tokens: packet.result?.usage.totalTokens || 0, status: packet.error ? 'failed' : 'completed' } });
      }
    }
    const packets = specialistResults.map(item => `## ${item.step.name}\n${item.error || item.result.text}`).join('\n\n');
    const synthesis = await requestOpenAI({ input: `USER REQUEST\n${prompt}\n\nSPECIALIST PACKETS\n${packets || 'No specialist was required.'}`, instructions: `You are Apollo Orchestrator. ${plan.system.instructions}\nProduce one direct, coherent answer. Use only relevant specialist evidence, expose material uncertainties and approvals, and do not claim tools were used beyond the packets.`, model, maxOutputTokens: Math.min(10_000, Math.max(1000, budget - plan.allocatedBudget)) });
    const usage = specialistResults.reduce((sum, item) => sum + (item.result?.usage.totalTokens || 0), synthesis.usage.totalTokens);
    const output = await recordSystemOutput(plan.system.id, { name: `Oracle · ${prompt.slice(0, 72)}`, type: 'Oracle run', status: 'Complete', runId, summary: synthesis.text.slice(0, 500), content: synthesis.text });
    await publishEvent({ host: 'apollo', kind: 'run.completed', runId, summary: 'Live Oracle run completed.', data: { systemId: plan.system.id, outputId: output.id, phase: 'synthesize', agent: 'Apollo Orchestrator', tokens: synthesis.usage.totalTokens, totalRunTokens: usage, specialists: specialistResults.length } });
    json(response, 200, { runId, mode: 'live', plan, waiting, output, answer: synthesis.text, usage, trace: specialistResults.map(item => ({ agent: item.step.name, status: item.error ? 'failed' : 'completed', budget: item.step.budget, skills: item.step.skills, tokens: item.result?.usage.totalTokens || 0, error: item.error })) });
  } catch (error) { json(response, 400, { error: error.message || 'Oracle request failed.' }); }
}

async function detectCommand(command) {
  try { const { stdout } = await execFileAsync('where.exe', [command], { timeout: 2500, windowsHide: true }); return stdout.trim().split(/\r?\n/)[0] || null; } catch { return null; }
}

async function commandStatus(commands) {
  for (const command of commands) {
    const path = await detectCommand(command);
    if (!path) continue;
    try {
      const { stdout, stderr } = await execFileAsync(path, ['--version'], { timeout: 3500, windowsHide: true });
      return { command, path, runnable: true, version: `${stdout || stderr}`.trim().split(/\r?\n/)[0] || null };
    } catch (error) {
      return { command, path, runnable: false, version: null, error: error.code === 'EACCES' ? 'access-denied' : 'launch-failed' };
    }
  }
  return { command: commands[0], path: null, runnable: false, version: null, error: 'not-found' };
}

async function integrations() {
  const [codex, cursor, claude] = await Promise.all([commandStatus(['codex']), commandStatus(['cursor-agent', 'agent']), commandStatus(['claude'])]);
  return [
    { id: 'openai-api', name: 'OpenAI API', detected: Boolean(apiKey), mode: apiKey ? 'ready' : 'configuration-required', detail: apiKey ? 'Server-side API key detected. Requests are not stored by Apollo.' : 'Set OPENAI_API_KEY. API usage is billed separately from ChatGPT subscriptions.' },
    { id: 'codex-host', host: 'codex', name: 'Codex', detected: Boolean(codex.path), runnable: codex.runnable, mcpConfigured: true, mode: codex.runnable ? 'mcp-configured-cli-ready' : codex.path ? 'mcp-configured-host-only' : 'mcp-ready-host-missing', path: codex.path, version: codex.version, detail: codex.runnable ? 'Project MCP config is present and the CLI is runnable. Restart Codex in this folder, then use /mcp to verify Apollo.' : 'Project MCP config is present. The desktop-bundled executable was detected but is not callable as a standalone CLI from this server process.' },
    { id: 'cursor-cli', host: 'cursor', name: 'Cursor', detected: Boolean(cursor.path), runnable: cursor.runnable, mcpConfigured: true, mode: cursor.runnable ? 'mcp-configured-cli-ready' : 'mcp-ready-cli-missing', path: cursor.path, version: cursor.version, detail: cursor.runnable ? 'Project .cursor/mcp.json is present and Cursor Agent CLI is runnable.' : 'Project .cursor/mcp.json is present. Cursor IDE can use it even when Cursor Agent CLI is not installed.' },
    { id: 'claude-cli', host: 'claude', name: 'Claude Code', detected: Boolean(claude.path), runnable: claude.runnable, mcpConfigured: true, mode: claude.runnable ? 'mcp-configured-cli-ready' : 'mcp-ready-cli-missing', path: claude.path, version: claude.version, detail: claude.runnable ? 'Project .mcp.json is present and Claude Code CLI is runnable.' : 'Project .mcp.json is present. Claude Code will request trust before using a project MCP server.' }
  ];
}

async function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const requested = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname.slice(1));
  const resolved = normalize(join(root, requested));
  if (!resolved.startsWith(normalize(root))) return json(response, 403, { error: 'Forbidden.' });
  try {
    const info = await stat(resolved);
    if (!info.isFile()) throw new Error('Not a file');
    const data = await readFile(resolved);
    response.writeHead(200, { 'content-type': mime[extname(resolved)] || 'application/octet-stream', 'cache-control': 'no-cache' });
    response.end(data);
  } catch { json(response, 404, { error: 'Not found.' }); }
}

await Promise.all([initializeKnowledge(), initializeEventStore(), initializeSystems()]);

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const path = url.pathname;
  try {
    if (request.method === 'GET' && path === '/api/config') return json(response, 200, { mode: apiKey ? 'live' : 'demo', models: [...allowedModels], skills: await allSkills(), tools, plugins, presets });
    if (request.method === 'GET' && path === '/api/knowledge') return json(response, 200, await listKnowledge());
    if (request.method === 'POST' && path === '/api/knowledge/skills') return json(response, 201, await createSkill(await readJson(request)));
    const skillMatch = path.match(/^\/api\/knowledge\/skills\/([a-z0-9-]+)$/);
    if (request.method === 'PATCH' && skillMatch) return json(response, 200, await updateSkill(skillMatch[1], await readJson(request)));
    const sourceMatch = path.match(/^\/api\/knowledge\/skills\/([a-z0-9-]+)\/sources$/);
    if (request.method === 'POST' && sourceMatch) return json(response, 201, await addSource(sourceMatch[1], await readJson(request)));
    if (request.method === 'GET' && path === '/api/agents') return json(response, 200, { agents: await listAgents() });
    const agentMatch = path.match(/^\/api\/agents\/([a-z0-9-]+)$/);
    if (request.method === 'PATCH' && agentMatch) return json(response, 200, await updateAgent(agentMatch[1], await readJson(request)));
    if (request.method === 'GET' && path === '/api/systems') return json(response, 200, { ...(await listSystems()), templates: agentTemplates(), inventory: { skills: await allSkills(), mcp: tools, plugins } });
    if (request.method === 'POST' && path === '/api/systems') return json(response, 201, await createSystem(await readJson(request)));
    if (request.method === 'PATCH' && path === '/api/systems/active') return json(response, 200, await setActiveSystem((await readJson(request)).id));
    const systemMatch = path.match(/^\/api\/systems\/([a-z0-9-]+)$/);
    if (request.method === 'PATCH' && systemMatch) return json(response, 200, await updateSystem(systemMatch[1], await readJson(request)));
    if (request.method === 'DELETE' && systemMatch) return json(response, 200, await deleteSystem(systemMatch[1]));
    const outputMatch = path.match(/^\/api\/systems\/([a-z0-9-]+)\/outputs$/);
    if (request.method === 'POST' && outputMatch) return json(response, 201, await recordSystemOutput(outputMatch[1], await readJson(request)));
    const previewMatch = path.match(/^\/api\/systems\/([a-z0-9-]+)\/outputs\/([a-z0-9-]+)\/preview$/);
    if (request.method === 'GET' && previewMatch) {
      const preview = await getOutputPreview(previewMatch[1], previewMatch[2]);
      response.writeHead(200, { 'content-type': preview.mime, 'cache-control': 'no-cache' });
      response.end(await readFile(preview.path));
      return;
    }
    if (request.method === 'POST' && path === '/api/oracle/plan') return handleOracle(request, response, true);
    if (request.method === 'POST' && path === '/api/oracle/chat') return handleOracle(request, response, false);
    if (request.method === 'GET' && path === '/api/events') return json(response, 200, { events: await listEvents({ limit: url.searchParams.get('limit') || 100, after: url.searchParams.get('after') || undefined }) });
    if (request.method === 'POST' && path === '/api/events') {
      const input = await readJson(request);
      const event = await publishEvent(input);
      if (input.data?.systemId && input.data?.output && ['artifact.created', 'run.completed'].includes(input.kind)) {
        const output = await recordSystemOutput(input.data.systemId, { ...input.data.output, runId: input.data.output.runId || input.runId });
        event.outputId = output.id;
      }
      return json(response, 201, event);
    }
    if (request.method === 'GET' && path === '/api/integrations') return json(response, 200, { integrations: await integrations(), recommendation: 'Use Apollo as a shared MCP/workspace control plane. Let each host keep its own supported subscription login; share explicit plans, artifacts, and traces—not private session tokens.' });
    if (request.method === 'POST' && path === '/api/compare') return handleCompare(request, response);
    if (request.method === 'GET' && path === '/api/health') {
      const inventory = await allSkills();
      return json(response, 200, { ok: true, mode: apiKey ? 'live' : 'demo', knowledge: true, skillCount: inventory.length, enabledSkillCount: inventory.filter(skill => skill.enabled).length, oracle: true });
    }
    if (request.method === 'GET') return serveStatic(request, response);
    json(response, 405, { error: 'Method not allowed.' });
  } catch (error) { json(response, 400, { error: error.message || 'Request failed.' }); }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Apollo Studio running at http://127.0.0.1:${port}`);
  console.log(apiKey ? 'Live OpenAI mode enabled.' : 'Demo mode enabled. Set OPENAI_API_KEY for live comparisons.');
});
