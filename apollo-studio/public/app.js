const state = {
  config: null,
  activeSkills: new Set(),
  variants: [],
  runs: [],
  agents: [],
  knowledge: null,
  knowledgeCategory: 'all',
  selectedSkillId: null,
  oraclePlan: null,
  oracleMessages: [],
  approvedAgents: new Set(),
  integrations: [],
  events: [],
  eventsError: null,
  systems: null,
  selectedSystemId: null,
  view: 'architecture'
};

const storage = {
  read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  write(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }
};

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const views = new Set(['architecture', 'systems', 'knowledge', 'oracle', 'playground', 'runs']);
const viewFromHash = () => {
  const candidate = location.hash.replace(/^#\/?/, '');
  return views.has(candidate) ? candidate : 'architecture';
};

async function api(path, options = {}) {
  const response = await fetch(path, options);
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || 'Request failed.');
  return body;
}

const nodeCopy = {
  intake: ['Evidence', 'Intake & audit', 'Collects real page, source, reference, analytics, accessibility, and responsive evidence before visual direction.'],
  director: ['Orchestrator', 'Apollo Design Director', 'One manager keeps ownership while selected skills contribute bounded judgment.'],
  'gate-a': ['Gate A', 'Brief approved', 'Confirms the problem, audience, constraints, success signal, and missing assets before concepts.'],
  concepts: ['Direction', 'Concept studio', 'Produces three structurally different directions, then freezes them for independent critique.'],
  'gate-b': ['Gate B', 'Direction selected', 'Records one approved direction before media production, motion planning, or implementation.'],
  build: ['Production', 'Assets & implementation', 'Activates only approved media, motion, framework, and engineering capabilities.'],
  qa: ['Gate C', 'Visual QA & handoff', 'Verifies desktop, mobile, interaction states, reduced motion, runtime health, and release evidence.']
};

const edges = [
  { from: 'intake', to: 'director', phase: 'diagnose' },
  { from: 'director', to: 'gate-a', phase: 'diagnose' },
  { from: 'gate-a', to: 'concepts', phase: 'direct', vertical: true },
  { from: 'concepts', to: 'gate-b', phase: 'direct', vertical: true },
  { from: 'gate-b', to: 'build', phase: 'prepare' },
  { from: 'build', to: 'qa', phase: 'verify' },
  { from: 'qa', to: 'director', phase: 'verify', feedback: true }
];

function navigate(view, { updateHash = true, scrollBehavior = 'smooth' } = {}) {
  view = views.has(view) ? view : 'architecture';
  state.view = view;
  $$('.view').forEach(section => section.classList.toggle('is-active', section.id === view));
  $$('.nav-item').forEach(button => {
    const active = button.dataset.viewTarget === view;
    button.classList.toggle('is-active', active);
    if (active) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
  });
  if (view === 'architecture') requestAnimationFrame(drawConnections);
  if (view === 'runs') renderHistory();
  if (view === 'systems') renderSystems();
  if (view === 'agents') renderAgents();
  if (view === 'knowledge') renderKnowledge();
  if (view === 'oracle') { renderOracleMessages(); renderOraclePlan(); }
  if (updateHash && location.hash !== `#/${view}`) location.hash = `/${view}`;
  window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : scrollBehavior });
}

function skillToggle(skill) {
  const label = document.createElement('label');
  label.className = 'skill-row';
  label.dataset.id = skill.id;
  label.dataset.phase = skill.phase;
  label.dataset.search = `${skill.name} ${skill.description} ${skill.group}`.toLowerCase();
  label.innerHTML = `<span class="skill-copy"><strong></strong><small></small><span class="skill-meta"><span class="phase-tag"></span></span></span><span class="switch"><input type="checkbox"><span class="switch-track" aria-hidden="true"></span></span>`;
  label.querySelector('strong').textContent = skill.name;
  label.querySelector('small').textContent = skill.description;
  label.querySelector('.phase-tag').textContent = skill.phase;
  const input = label.querySelector('input');
  input.checked = state.activeSkills.has(skill.id);
  input.setAttribute('aria-label', `Enable ${skill.name}`);
  input.addEventListener('change', () => {
    input.checked ? state.activeSkills.add(skill.id) : state.activeSkills.delete(skill.id);
    persistSkills();
    animatePulse(label);
  });
  return label;
}

function persistSkills() {
  storage.write('apollo-active-skills', [...state.activeSkills]);
  if ($('#active-skill-count')) $('#active-skill-count').textContent = state.activeSkills.size;
}

function renderSkillRegistry() {
  const list = $('#skill-list');
  list.replaceChildren(...state.config.skills.map(skillToggle));
  persistSkills();
}

function renderTools() {
  if ($('#available-tool-count')) $('#available-tool-count').textContent = state.config.mode === 'live' ? state.config.tools.filter(tool => tool.usable).length : 0;
  const rows = state.config.tools.map(tool => {
    const row = document.createElement('article');
    row.className = 'tool-row';
    row.innerHTML = `<div class="tool-row-head"><strong></strong><span class="tool-status"></span></div><p></p>`;
    row.querySelector('strong').textContent = tool.name;
    const status = row.querySelector('.tool-status');
    status.textContent = tool.status;
    status.classList.toggle('is-usable', tool.usable);
    row.querySelector('p').textContent = tool.description;
    return row;
  });
  $('#tool-list').replaceChildren(...rows);
}

function filterSkills() {
  const query = $('#skill-search').value.trim().toLowerCase();
  const phase = $('#skill-phase-filter').value;
  $$('.skill-row').forEach(row => row.classList.toggle('is-filtered', !(row.dataset.search.includes(query) && (phase === 'all' || row.dataset.phase === phase))));
}

const phaseLabels = { always: 'Orchestrate', plan: 'Plan', diagnose: 'Diagnose', direct: 'Direct', prepare: 'Prepare', build: 'Build', verify: 'Verify', synthesize: 'Synthesize' };
const phaseSequence = ['plan', 'diagnose', 'direct', 'prepare', 'build', 'verify', 'synthesize'];

function activeSystem() {
  return state.systems?.systems.find(system => system.id === state.systems.activeSystemId) || state.systems?.systems[0] || null;
}

function selectedSystem() {
  return state.systems?.systems.find(system => system.id === state.selectedSystemId) || activeSystem();
}

async function refreshSystems(selectId = state.selectedSystemId) {
  state.systems = await api('/api/systems');
  state.selectedSystemId = state.systems.systems.some(system => system.id === selectId) ? selectId : state.systems.activeSystemId;
  renderSystems();
  renderArchitectureAgents();
}

function renderArchitectureAgents() {
  const host = $('#architecture-agent-lanes');
  const system = activeSystem();
  if (!host || !system) return;
  $('#architecture-system-name').textContent = system.name;
  $('#architecture-system-count').textContent = `${system.agents.filter(agent => agent.enabled).length} active agents`;
  const phases = ['diagnose', 'direct', 'prepare', 'build', 'verify'];
  host.replaceChildren(...phases.map(phase => {
    const lane = document.createElement('section'); lane.className = 'agent-lane'; lane.dataset.phase = phase;
    const heading = document.createElement('h3'); heading.textContent = phaseLabels[phase];
    const agents = system.agents.filter(agent => agent.phase === phase && agent.enabled);
    const list = document.createElement('div');
    if (!agents.length) { const empty = document.createElement('span'); empty.className = 'lane-empty'; empty.textContent = 'No agent'; list.append(empty); }
    agents.forEach(agent => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'architecture-agent';
      const name = document.createElement('strong'); name.textContent = agent.name;
      const meta = document.createElement('small'); meta.textContent = `${agent.skills.length} skills · ${agent.mcp.length} MCP · ${agent.plugins.length} plugins`;
      button.append(name, meta);
      button.addEventListener('click', () => { state.selectedSystemId = system.id; navigate('systems'); requestAnimationFrame(() => document.querySelector(`[data-system-agent-id="${CSS.escape(agent.id)}"]`)?.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })); });
      list.append(button);
    });
    lane.append(heading, list); return lane;
  }));
}

function renderSystemList() {
  const host = $('#system-list');
  if (!host || !state.systems) return;
  host.replaceChildren(...state.systems.systems.map(system => {
    const button = document.createElement('button'); button.type = 'button';
    button.className = `system-list-item${system.id === state.selectedSystemId ? ' is-selected' : ''}${system.id === state.systems.activeSystemId ? ' is-active-system' : ''}`;
    const title = document.createElement('strong'); title.textContent = system.name;
    const meta = document.createElement('span'); meta.textContent = `${system.agents.length} agent${system.agents.length === 1 ? '' : 's'} · ${system.outputs.length} output${system.outputs.length === 1 ? '' : 's'}`;
    const stateLabel = document.createElement('small'); stateLabel.textContent = system.id === state.systems.activeSystemId ? 'Active' : 'Saved';
    button.append(title, meta, stateLabel);
    button.addEventListener('click', () => { state.selectedSystemId = system.id; renderSystems(); });
    return button;
  }));
}

function inventoryPicker(title, items, selected, onChange) {
  const group = document.createElement('fieldset'); group.className = 'inventory-picker';
  const legend = document.createElement('legend'); legend.textContent = title;
  const list = document.createElement('div');
  items.forEach(item => {
    const label = document.createElement('label'); label.className = 'inventory-option';
    const input = document.createElement('input'); input.type = 'checkbox'; input.checked = selected.includes(item.id);
    const copy = document.createElement('span');
    const name = document.createElement('strong'); name.textContent = item.name;
    const detail = document.createElement('small'); detail.textContent = item.status || item.phase || item.group || '';
    copy.append(name, detail); label.append(input, copy);
    input.addEventListener('change', () => onChange(item.id, input.checked));
    list.append(label);
  });
  group.append(legend, list); return group;
}

function replaceAgentFromTemplate(agent, templateId) {
  const template = state.systems.templates.find(item => item.id === templateId);
  if (!template) return;
  const index = selectedSystem().agents.indexOf(agent);
  selectedSystem().agents[index] = { ...structuredClone(template), id: agent.id };
  renderSystems();
}

function renderSystemAgent(agent, index) {
  const details = document.createElement('details'); details.className = 'system-agent-card'; details.dataset.systemAgentId = agent.id;
  const summary = document.createElement('summary');
  const identity = document.createElement('span'); identity.className = 'agent-card-identity';
  const name = document.createElement('strong'); name.textContent = agent.name;
  const role = document.createElement('small'); role.textContent = agent.description;
  identity.append(name, role);
  const phase = document.createElement('span'); phase.className = 'agent-card-phase'; phase.textContent = phaseLabels[agent.phase] || agent.phase;
  const inventory = document.createElement('span'); inventory.className = 'agent-card-inventory'; inventory.textContent = `${agent.skills.length + agent.mcp.length + agent.plugins.length} inventory · ${agent.budget.toLocaleString()} tokens`;
  summary.append(identity, phase, inventory);

  const body = document.createElement('div'); body.className = 'system-agent-body';
  const replace = document.createElement('div'); replace.className = 'agent-replace-row';
  const templateSelect = document.createElement('select'); templateSelect.innerHTML = '<option value="">Choose an agent template…</option>' + state.systems.templates.map(template => `<option value="${template.id}">${template.name}</option>`).join('');
  const replaceButton = document.createElement('button'); replaceButton.type = 'button'; replaceButton.className = 'quiet-action'; replaceButton.textContent = 'Replace agent'; replaceButton.addEventListener('click', () => replaceAgentFromTemplate(agent, templateSelect.value));
  replace.append(templateSelect, replaceButton);

  const fields = document.createElement('div'); fields.className = 'agent-field-grid';
  const field = (labelText, control) => { const label = document.createElement('label'); label.textContent = labelText; label.append(control); return label; };
  const nameInput = document.createElement('input'); nameInput.value = agent.name; nameInput.maxLength = 80; nameInput.addEventListener('input', () => agent.name = nameInput.value);
  const phaseSelect = document.createElement('select'); ['diagnose','direct','prepare','build','verify'].forEach(value => { const option = document.createElement('option'); option.value = value; option.textContent = phaseLabels[value]; option.selected = agent.phase === value; phaseSelect.append(option); }); phaseSelect.addEventListener('change', () => agent.phase = phaseSelect.value);
  const budget = document.createElement('input'); budget.type = 'number'; budget.min = '500'; budget.max = '50000'; budget.step = '500'; budget.value = agent.budget; budget.addEventListener('change', () => agent.budget = Math.min(50000, Math.max(500, Number(budget.value) || 3000)));
  const priority = document.createElement('input'); priority.type = 'number'; priority.min = '0'; priority.max = '100'; priority.value = agent.priority; priority.addEventListener('change', () => agent.priority = Number(priority.value) || 1);
  fields.append(field('Agent name', nameInput), field('Phase', phaseSelect), field('Token budget', budget), field('Priority', priority));

  const description = document.createElement('textarea'); description.rows = 2; description.maxLength = 500; description.value = agent.description; description.addEventListener('input', () => agent.description = description.value);
  const activation = document.createElement('textarea'); activation.rows = 2; activation.maxLength = 500; activation.value = agent.activation; activation.addEventListener('input', () => agent.activation = activation.value);
  const triggers = document.createElement('input'); triggers.value = agent.triggers.join(', '); triggers.placeholder = 'design, build, test'; triggers.addEventListener('change', () => agent.triggers = [...new Set(triggers.value.split(',').map(value => value.trim().toLowerCase()).filter(Boolean))]);
  const instructions = document.createElement('textarea'); instructions.rows = 5; instructions.maxLength = 6000; instructions.value = agent.instructions; instructions.addEventListener('input', () => agent.instructions = instructions.value);
  const longFields = document.createElement('div'); longFields.className = 'agent-long-fields';
  longFields.append(field('Responsibility', description), field('Activation rule', activation), field('Trigger words', triggers), field('Agent instructions', instructions));

  const inventoryGrid = document.createElement('div'); inventoryGrid.className = 'agent-inventory-grid';
  const toggle = key => (id, checked) => { agent[key] = checked ? [...new Set([...agent[key], id])] : agent[key].filter(item => item !== id); };
  inventoryGrid.append(
    inventoryPicker('Skills', state.systems.inventory.skills.filter(item => item.enabled !== false), agent.skills, toggle('skills')),
    inventoryPicker('MCP & tools', state.systems.inventory.mcp, agent.mcp, toggle('mcp')),
    inventoryPicker('Plugins', state.systems.inventory.plugins, agent.plugins, toggle('plugins'))
  );

  const footer = document.createElement('div'); footer.className = 'agent-card-footer';
  const enabled = document.createElement('label'); enabled.className = 'compact-check'; const enabledInput = document.createElement('input'); enabledInput.type = 'checkbox'; enabledInput.checked = agent.enabled; enabledInput.addEventListener('change', () => agent.enabled = enabledInput.checked); enabled.append(enabledInput, document.createTextNode(' Enabled'));
  const approval = document.createElement('label'); approval.className = 'compact-check'; const approvalInput = document.createElement('input'); approvalInput.type = 'checkbox'; approvalInput.checked = agent.approval; approvalInput.addEventListener('change', () => agent.approval = approvalInput.checked); approval.append(approvalInput, document.createTextNode(' Approval required'));
  const controls = document.createElement('div'); controls.className = 'agent-order-actions';
  const move = (label, offset) => { const button = document.createElement('button'); button.type = 'button'; button.className = 'quiet-action'; button.textContent = label; button.disabled = index + offset < 0 || index + offset >= selectedSystem().agents.length; button.addEventListener('click', () => { const list = selectedSystem().agents; [list[index], list[index + offset]] = [list[index + offset], list[index]]; renderSystems(); }); return button; };
  const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'danger-action'; remove.textContent = 'Remove'; remove.addEventListener('click', () => { selectedSystem().agents.splice(index, 1); renderSystems(); });
  controls.append(move('Move up', -1), move('Move down', 1), remove); footer.append(enabled, approval, controls);
  body.append(replace, fields, longFields, inventoryGrid, footer); details.append(summary, body); return details;
}

function renderOutputs(system) {
  const host = $('#output-grid');
  $('#output-count').textContent = `${system.outputs.length} output${system.outputs.length === 1 ? '' : 's'}`;
  if (!system.outputs.length) { host.innerHTML = '<div class="empty-state compact"><strong>No outputs yet.</strong><p>Runs produced by this system will collect here with their preview and trace.</p></div>'; return; }
  host.replaceChildren(...system.outputs.map(output => {
    const article = document.createElement('article'); article.className = 'output-item';
    const preview = output.previewPath ? document.createElement('img') : document.createElement('div');
    if (output.previewPath) { preview.src = `/api/systems/${system.id}/outputs/${output.id}/preview`; preview.alt = `${output.name} project preview`; preview.loading = 'lazy'; }
    else { preview.className = 'output-text-preview'; const excerpt = document.createElement('p'); excerpt.textContent = output.content || output.summary || 'Output trace saved without a visual asset.'; preview.append(excerpt); }
    const copy = document.createElement('div');
    const meta = document.createElement('span'); meta.textContent = `${output.type} · ${output.status}`;
    const title = document.createElement('h3'); title.textContent = output.name;
    const summary = document.createElement('p'); summary.textContent = output.summary;
    const run = document.createElement('small'); run.textContent = output.runId;
    copy.append(meta, title, summary, run); article.append(preview, copy); return article;
  }));
}

function renderSystems() {
  if (!state.systems || !$('#system-list')) return;
  renderSystemList();
  const system = selectedSystem();
  if (!system) return;
  const form = $('#system-form'); form.elements.name.value = system.name; form.elements.description.value = system.description; form.elements.instructions.value = system.instructions;
  $('#activate-system').textContent = system.id === state.systems.activeSystemId ? 'Active system' : 'Use this system';
  $('#activate-system').disabled = system.id === state.systems.activeSystemId;
  $('#delete-system').disabled = state.systems.systems.length <= 1;
  const host = $('#system-agent-list');
  if (!system.agents.length) host.innerHTML = '<div class="empty-state compact"><strong>No agents in this system.</strong><p>Add an agent, then assign its phase and inventory.</p></div>';
  else host.replaceChildren(...system.agents.map(renderSystemAgent));
  renderOutputs(system);
}

function drawConnections() {
  const canvas = $('#workflow-canvas');
  const svg = $('#connector-layer');
  if (!canvas || !svg || matchMedia('(max-width: 760px)').matches || !canvas.offsetParent) return;
  const bounds = canvas.getBoundingClientRect();
  svg.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
  svg.querySelectorAll('path.connection').forEach(path => path.remove());
  const phase = $('#phase-filter').value;
  edges.forEach(edge => {
    const from = canvas.querySelector(`[data-node="${edge.from}"]`).getBoundingClientRect();
    const to = canvas.querySelector(`[data-node="${edge.to}"]`).getBoundingClientRect();
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.classList.add('connection');
    if (edge.feedback) path.classList.add('feedback');
    if (phase !== 'all' && edge.phase !== phase) path.classList.add('is-dimmed');
    const local = rect => ({ left: rect.left - bounds.left, right: rect.right - bounds.left, top: rect.top - bounds.top, bottom: rect.bottom - bounds.top, cx: rect.left - bounds.left + rect.width / 2, cy: rect.top - bounds.top + rect.height / 2 });
    const a = local(from); const b = local(to);
    let d;
    if (edge.feedback) {
      const bottom = Math.min(bounds.height - 20, Math.max(a.bottom, b.bottom) + 58);
      d = `M ${a.cx} ${a.bottom} C ${a.cx} ${bottom}, ${b.cx} ${bottom}, ${b.cx} ${b.bottom}`;
    } else if (edge.vertical) {
      const gap = Math.max(24, (b.top - a.bottom) / 2);
      d = `M ${a.cx} ${a.bottom} C ${a.cx} ${a.bottom + gap}, ${b.cx} ${b.top - gap}, ${b.cx} ${b.top}`;
    } else {
      const gap = Math.max(36, Math.abs(b.left - a.right) * .48);
      const startX = a.right; const endX = b.left;
      d = `M ${startX} ${a.cy} C ${startX + gap} ${a.cy}, ${endX - gap} ${b.cy}, ${endX} ${b.cy}`;
    }
    path.setAttribute('d', d);
    path.dataset.phase = edge.phase;
    svg.append(path);
  });
  animateConnections();
}

function animateConnections() {
  if (!window.gsap || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const paths = $$('#connector-layer path.connection:not(.is-dimmed)');
  paths.forEach(path => {
    const length = path.getTotalLength();
    window.gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: .65, ease: 'power3.out', clearProps: 'strokeDasharray,strokeDashoffset' });
  });
}

function animatePulse(target) {
  if (!window.gsap || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  window.gsap.fromTo(target, { scale: .985 }, { scale: 1, duration: .32, ease: 'back.out(1.7)', overwrite: 'auto' });
}

function selectNode(button) {
  $$('.workflow-node').forEach(node => node.setAttribute('aria-pressed', String(node === button)));
  const [phase, title, copy] = nodeCopy[button.dataset.node];
  $('#inspector-phase').textContent = phase;
  $('#inspector-title').textContent = title;
  $('#inspector-copy').textContent = copy;
  animatePulse(button);
}

function presetOptions(select) {
  select.innerHTML = '<option value="current">Current architecture selection</option>' + state.config.presets.map(preset => `<option value="${preset.id}">${preset.name}</option>`).join('') + '<option value="custom">Custom</option>';
}

function createVariant(name, presetId, skillIds) {
  const id = crypto.randomUUID();
  const preset = state.config.presets.find(item => item.id === presetId);
  return { id, name, presetId, skills: new Set(skillIds || preset?.skills || [...state.activeSkills]), tools: new Set() };
}

function renderVariants() {
  const grid = $('#variant-grid');
  grid.classList.toggle('has-three', state.variants.length === 3);
  grid.replaceChildren(...state.variants.map(variant => {
    const card = $('#variant-template').content.firstElementChild.cloneNode(true);
    card.dataset.id = variant.id;
    const name = card.querySelector('.variant-name');
    name.value = variant.name;
    name.addEventListener('input', () => variant.name = name.value);
    const remove = card.querySelector('.remove-variant');
    remove.hidden = state.variants.length <= 2;
    remove.addEventListener('click', () => { state.variants = state.variants.filter(item => item.id !== variant.id); renderVariants(); });
    const preset = card.querySelector('.variant-preset');
    presetOptions(preset);
    preset.value = variant.presetId;
    const skillsHost = card.querySelector('.variant-skills');
    state.config.skills.forEach(skill => {
      const label = document.createElement('label');
      label.className = 'variant-skill';
      label.innerHTML = '<input type="checkbox"><span></span>';
      const input = label.querySelector('input');
      input.checked = variant.skills.has(skill.id);
      label.querySelector('span').textContent = `${skill.name} · ${skill.phase}`;
      input.addEventListener('change', () => {
        input.checked ? variant.skills.add(skill.id) : variant.skills.delete(skill.id);
        variant.presetId = 'custom'; preset.value = 'custom'; updateVariantSummary(card, variant);
      });
      skillsHost.append(label);
    });
    preset.addEventListener('change', () => {
      variant.presetId = preset.value;
      const chosen = state.config.presets.find(item => item.id === preset.value);
      variant.skills = new Set(preset.value === 'current' ? [...state.activeSkills] : chosen?.skills || variant.skills);
      renderVariants();
    });
    const webSearch = card.querySelector('.variant-web-search');
    webSearch.checked = variant.tools.has('web_search');
    webSearch.disabled = state.config.mode !== 'live';
    webSearch.addEventListener('change', () => webSearch.checked ? variant.tools.add('web_search') : variant.tools.delete('web_search'));
    updateVariantSummary(card, variant);
    return card;
  }));
  $('#add-variant').hidden = state.variants.length === 3;
}

function updateVariantSummary(card, variant) {
  card.querySelector('.variant-count').textContent = `${variant.skills.size} skill${variant.skills.size === 1 ? '' : 's'}`;
  const groups = [...new Set([...variant.skills].map(id => state.config.skills.find(skill => skill.id === id)?.group).filter(Boolean))];
  card.querySelector('.variant-groups').textContent = groups.join(' · ');
}

function renderResults(run) {
  const grid = $('#results-grid');
  grid.classList.toggle('has-three', run.results.length === 3);
  const cards = run.results.map(result => {
    const card = document.createElement('article');
    card.className = 'result-card';
    const head = document.createElement('div');
    head.className = 'result-head';
    const title = document.createElement('strong'); title.textContent = result.variant.name;
    const meta = document.createElement('div'); meta.className = 'result-meta';
    const mode = document.createElement('span'); mode.className = `result-mode ${result.mode === 'live' ? 'live' : ''}`; mode.textContent = result.mode;
    meta.append(mode);
    if (!result.error) {
      meta.append(document.createTextNode(`${result.latencyMs} ms`), document.createTextNode(`${result.usage.totalTokens} tokens`), document.createTextNode(`${result.variant.skills.length} skills`));
    }
    head.append(title, meta);
    const body = document.createElement('pre'); body.className = `result-body${result.error ? ' result-error' : ''}`; body.textContent = result.error || result.text;
    card.append(head, body);
    return card;
  });
  grid.replaceChildren(...cards);
  if (window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches) window.gsap.from(cards, { y: 10, autoAlpha: 0, duration: .42, stagger: .06, ease: 'power3.out' });
}

async function runComparison() {
  const prompt = $('#experiment-prompt').value.trim();
  if (prompt.length < 3) { $('#run-message').textContent = 'Enter a prompt with at least three characters.'; $('#experiment-prompt').focus(); return; }
  const button = $('#run-comparison'); button.disabled = true; button.textContent = 'Running…';
  $('#run-message').textContent = `Running ${state.variants.length} configurations in parallel…`;
  try {
    const response = await fetch('/api/compare', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        prompt,
        model: $('#model-select').value,
        reasoning: $('#reasoning-select').value,
        maxOutputTokens: Number($('#max-output').value),
        mode: state.config.mode,
        variants: state.variants.map(variant => ({ name: variant.name, skills: [...variant.skills], tools: [...variant.tools] }))
      })
    });
    const run = await response.json();
    if (!response.ok) throw new Error(run.error || 'Comparison failed.');
    state.runs.unshift(run); state.runs = state.runs.slice(0, 20); storage.write('apollo-runs', state.runs);
    $('#run-count').textContent = state.runs.length;
    $('#run-message').textContent = `${run.results.length} results ready · ${run.model} · ${run.reasoning} reasoning`;
    renderResults(run);
  } catch (error) {
    $('#run-message').textContent = error.message;
  } finally {
    button.disabled = false; button.textContent = 'Run comparison';
  }
}

function renderHistory() {
  renderConnectedHistory();
  const host = $('#run-history');
  if (!state.runs.length) { host.innerHTML = '<div class="empty-state compact"><strong>No browser experiments yet.</strong><p>Use Playground to compare two or three skill combinations with the same prompt.</p></div>'; updateRunCount(); return; }
  host.replaceChildren(...state.runs.map(run => {
    const row = document.createElement('article'); row.className = 'history-row';
    const identity = document.createElement('div'); identity.innerHTML = '<time></time><strong></strong><small></small>';
    identity.querySelector('time').textContent = new Date(run.createdAt).toLocaleString();
    identity.querySelector('strong').textContent = run.model;
    identity.querySelector('small').textContent = `${run.results.length} variants · ${run.reasoning} reasoning`;
    const prompt = document.createElement('div'); prompt.className = 'history-prompt'; prompt.textContent = run.prompt;
    const open = document.createElement('button'); open.className = 'quiet-action'; open.textContent = 'Open results'; open.addEventListener('click', () => { renderResults(run); navigate('playground'); });
    row.append(identity, prompt, open); return row;
  }));
  updateRunCount();
}

function exportRuns() {
  const payload = { exportedAt: new Date().toISOString(), connectedRuns: connectedRunsFromEvents(), browserExperiments: state.runs };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = `apollo-runs-${new Date().toISOString().slice(0,10)}.json`; link.click(); URL.revokeObjectURL(link.href);
}

function inferEventPhase(event) {
  const declared = String(event.data?.phase || '').toLowerCase();
  if (phaseSequence.includes(declared)) return declared;
  if (event.data?.gate === 'A') return 'diagnose';
  if (event.data?.gate === 'B') return 'direct';
  if (event.data?.gate === 'C') return 'verify';
  if (event.kind === 'run.started') return 'build';
  if (event.kind === 'run.completed') return 'synthesize';
  const text = `${event.kind} ${event.summary}`.toLowerCase();
  if (event.kind === 'plan.created' || /brief|intake plan/.test(text)) return 'plan';
  if (/implement|build|production/.test(text)) return 'build';
  if (/qa|review|verify|handoff|gate c/.test(text)) return 'verify';
  if (/audit|evidence|research|inventory/.test(text)) return 'diagnose';
  if (/concept|direction|critique|gate b/.test(text)) return 'direct';
  if (/asset manifest|prepar|dependency|media mapping/.test(text)) return 'prepare';
  if (event.kind === 'artifact.created') return 'build';
  return 'plan';
}

function runPhaseTraces(events) {
  const groups = new Map(phaseSequence.map(phase => [phase, []]));
  events.forEach(event => groups.get(inferEventPhase(event)).push(event));
  const declaredSystemId = events.find(event => event.data?.systemId)?.data.systemId;
  const system = state.systems?.systems.find(item => item.id === declaredSystemId) || activeSystem();
  return phaseSequence.flatMap(phase => {
    const phaseEvents = groups.get(phase);
    if (!phaseEvents.length) return [];
    const declaredAgents = phaseEvents.map(event => event.data?.agent).filter(Boolean);
    const fallbackAgents = phase === 'plan' || phase === 'synthesize' ? ['Apollo Orchestrator'] : system?.agents.filter(agent => agent.phase === phase && agent.enabled).map(agent => agent.name) || [];
    const agents = [...new Set(declaredAgents.length ? declaredAgents : fallbackAgents)];
    const tokenEvents = phaseEvents.filter(event => Number.isFinite(Number(event.data?.tokens)));
    const tokens = tokenEvents.reduce((sum, event) => sum + Number(event.data.tokens), 0);
    return [{ phase, label: phaseLabels[phase], events: phaseEvents, agents, tokens, tokensReported: tokenEvents.length > 0 }];
  });
}

function connectedRunsFromEvents() {
  const groups = new Map();
  state.events.filter(event => event.runId).forEach(event => {
    if (!groups.has(event.runId)) groups.set(event.runId, []);
    groups.get(event.runId).push(event);
  });
  return [...groups.entries()].map(([runId, events]) => {
    const ordered = [...events].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    const latest = ordered.at(-1);
    const failed = [...ordered].reverse().find(event => event.kind === 'run.failed');
    const completed = [...ordered].reverse().find(event => event.kind === 'run.completed');
    const started = ordered.find(event => event.kind === 'run.started');
    const status = failed ? 'failed' : completed ? 'completed' : started ? 'in-progress' : 'activity';
    return { runId, host: started?.host || latest.host, status, createdAt: started?.createdAt || ordered[0].createdAt, updatedAt: latest.createdAt, summary: failed?.summary || completed?.summary || latest.summary, events: ordered, phases: runPhaseTraces(ordered) };
  }).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

function updateRunCount() {
  $('#run-count').textContent = connectedRunsFromEvents().length + state.runs.length;
}

function renderConnectedHistory() {
  const host = $('#connected-run-history');
  if (!host) return;
  if (state.eventsError) {
    const error = document.createElement('div'); error.className = 'empty-state compact history-error';
    const title = document.createElement('strong'); title.textContent = 'MCP run history is unavailable.';
    const detail = document.createElement('p'); detail.textContent = state.eventsError;
    const retry = document.createElement('button'); retry.className = 'quiet-action'; retry.type = 'button'; retry.textContent = 'Try again'; retry.addEventListener('click', refreshEvents);
    error.append(title, detail, retry); host.replaceChildren(error); updateRunCount(); return;
  }
  const runs = connectedRunsFromEvents();
  if (!runs.length) { host.innerHTML = '<div class="empty-state compact"><strong>No connected runs yet.</strong><p>Open this workspace in a configured host and publish a run lifecycle through Apollo MCP.</p></div>'; updateRunCount(); return; }
  host.replaceChildren(...runs.map(run => {
    const row = document.createElement('article'); row.className = 'phase-run';
    const header = document.createElement('header'); header.className = 'phase-run-header';
    const identity = document.createElement('div'); identity.className = 'connected-run-identity';
    const time = document.createElement('time'); time.dateTime = run.updatedAt; time.textContent = new Date(run.updatedAt).toLocaleString();
    const name = document.createElement('strong'); name.textContent = run.host;
    const status = document.createElement('span'); status.className = `run-status status-${run.status}`; status.textContent = run.status.replace('-', ' ');
    const runId = document.createElement('small'); runId.textContent = run.runId;
    const line = document.createElement('div'); line.className = 'connected-run-line'; line.append(time, name, status);
    identity.append(line, runId);
    const summary = document.createElement('div'); summary.className = 'history-prompt connected-summary'; summary.textContent = run.summary;
    const eventCount = document.createElement('span'); eventCount.className = 'run-event-count'; eventCount.textContent = `${run.events.length} events`;
    header.append(identity, summary, eventCount);
    const timeline = document.createElement('div'); timeline.className = 'phase-timeline';
    run.phases.forEach(trace => {
      const phase = document.createElement('details'); phase.className = 'phase-trace';
      const phaseSummary = document.createElement('summary');
      const phaseName = document.createElement('span'); phaseName.className = 'phase-trace-name'; phaseName.textContent = trace.label;
      const phaseAgent = document.createElement('strong'); phaseAgent.textContent = trace.agents.join(', ') || 'Agent not reported';
      const token = document.createElement('span'); token.className = 'phase-token'; token.textContent = trace.tokensReported ? `${trace.tokens.toLocaleString()} tokens` : 'Tokens not reported';
      const count = document.createElement('small'); count.textContent = `${trace.events.length} event${trace.events.length === 1 ? '' : 's'}`;
      phaseSummary.append(phaseName, phaseAgent, token, count);
      const list = document.createElement('ol');
      trace.events.forEach(event => {
        const item = document.createElement('li');
        const kind = document.createElement('strong'); kind.textContent = event.kind.replaceAll('.', ' ');
        const copy = document.createElement('span'); copy.textContent = event.summary;
        item.append(kind, copy); list.append(item);
      });
      phase.append(phaseSummary, list); timeline.append(phase);
    });
    row.append(header, timeline); return row;
  }));
  updateRunCount();
}

function renderAgents() {
  const host = $('#agent-registry');
  if (!host || !state.agents.length) return;
  host.replaceChildren(...state.agents.map(agent => {
    const article = document.createElement('article');
    article.className = `agent-row${agent.enabled ? '' : ' is-dormant'}`;
    article.innerHTML = `<div class="agent-identity"><span class="agent-state"></span><div><strong></strong><p></p></div></div><div class="agent-activation"><span>Activation rule</span><p></p></div><div class="agent-skills"></div><div class="agent-controls"><label>Token budget<input type="number" min="500" max="50000" step="500"></label><label class="compact-check"><input class="approval-toggle" type="checkbox"> Approval required</label><label class="switch"><input class="agent-toggle" type="checkbox"><span class="switch-track" aria-hidden="true"></span></label></div>`;
    article.querySelector('.agent-state').textContent = agent.enabled ? 'Ready' : 'Dormant';
    article.querySelector('.agent-identity strong').textContent = agent.name;
    article.querySelector('.agent-identity p').textContent = agent.description;
    article.querySelector('.agent-activation p').textContent = agent.activation;
    const skillHost = article.querySelector('.agent-skills');
    agent.skills.forEach(id => { const span = document.createElement('span'); span.textContent = state.config.skills.find(skill => skill.id === id)?.name || id; skillHost.append(span); });
    const budget = article.querySelector('input[type="number"]'); budget.value = agent.budget;
    const approval = article.querySelector('.approval-toggle'); approval.checked = agent.approval;
    const enabled = article.querySelector('.agent-toggle'); enabled.checked = agent.enabled; enabled.setAttribute('aria-label', `Enable ${agent.name}`);
    const save = async () => {
      try {
        const updated = await api(`/api/agents/${agent.id}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ budget: Number(budget.value), approval: approval.checked, enabled: enabled.checked }) });
        const index = state.agents.findIndex(item => item.id === agent.id); state.agents[index] = updated; renderAgents();
      } catch (error) { alert(error.message); }
    };
    budget.addEventListener('change', save); approval.addEventListener('change', save); enabled.addEventListener('change', save);
    return article;
  }));
}

async function refreshKnowledge(selectId = state.selectedSkillId) {
  state.knowledge = await api('/api/knowledge');
  state.config.skills = state.knowledge.skills;
  if (state.systems) state.systems.inventory.skills = state.knowledge.skills;
  state.selectedSkillId = selectId && state.knowledge.skills.some(skill => skill.id === selectId) ? selectId : state.knowledge.skills[0]?.id;
  renderSkillRegistry(); renderKnowledge(); renderVariants();
}

function renderKnowledge() {
  if (!state.knowledge || !$('#knowledge-skill-list')) return;
  $('#knowledge-root').textContent = state.knowledge.root;
  $('#category-options').innerHTML = state.knowledge.categories.map(category => `<option value="${category.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"></option>`).join('');
  const categoryHost = $('#category-list');
  const categoryButtons = ['all', ...state.knowledge.categories].map(category => {
    const button = document.createElement('button'); button.type = 'button'; button.className = `category-button${state.knowledgeCategory === category ? ' is-active' : ''}`;
    const count = category === 'all' ? state.knowledge.skills.length : state.knowledge.skills.filter(skill => skill.group === category).length;
    button.innerHTML = '<span></span><strong></strong>'; button.querySelector('span').textContent = category === 'all' ? 'All categories' : category; button.querySelector('strong').textContent = count;
    button.addEventListener('click', () => { state.knowledgeCategory = category; renderKnowledge(); }); return button;
  });
  categoryHost.replaceChildren(...categoryButtons);
  const query = $('#knowledge-search').value.trim().toLowerCase();
  const filtered = state.knowledge.skills.filter(skill => (state.knowledgeCategory === 'all' || skill.group === state.knowledgeCategory) && `${skill.name} ${skill.group} ${skill.description} ${skill.sources.map(source => source.title).join(' ')}`.toLowerCase().includes(query));
  const skillHost = $('#knowledge-skill-list');
  if (!filtered.length) skillHost.innerHTML = '<div class="empty-state">No skills match this category and search.</div>';
  else skillHost.replaceChildren(...filtered.map(skill => {
    const button = document.createElement('button'); button.type = 'button'; button.className = `knowledge-skill${skill.id === state.selectedSkillId ? ' is-active' : ''}${skill.enabled ? '' : ' is-disabled'}`;
    button.innerHTML = '<div><strong></strong><p></p></div><span class="knowledge-count"></span>';
    button.querySelector('strong').textContent = skill.name; button.querySelector('p').textContent = `${skill.group} · ${skill.phase} · ${skill.builtin ? 'built-in' : 'custom'}`; button.querySelector('.knowledge-count').textContent = `${skill.sourceCount} source${skill.sourceCount === 1 ? '' : 's'}`;
    button.addEventListener('click', () => { state.selectedSkillId = skill.id; renderKnowledge(); }); return button;
  }));
  renderKnowledgeInspector();
}

function renderKnowledgeInspector() {
  const host = $('#knowledge-inspector');
  const skill = state.knowledge.skills.find(item => item.id === state.selectedSkillId);
  if (!skill) { host.innerHTML = '<div class="empty-state">Select a skill to inspect it.</div>'; return; }
  host.innerHTML = `<form id="skill-editor"><div class="inspector-title"><div><h2></h2><p class="skill-folder"></p></div><label class="switch"><input name="enabled" type="checkbox"><span class="switch-track" aria-hidden="true"></span></label></div><div class="editor-grid compact"><label>Category<input name="category" list="category-options" maxlength="50"></label><label>Phase<select name="phase"><option value="always">Always</option><option value="diagnose">Diagnose</option><option value="direct">Direct</option><option value="prepare">Prepare</option><option value="build">Build</option><option value="verify">Verify</option></select></label></div><label>Description<textarea name="description" rows="3" maxlength="500"></textarea></label><label>Runtime instructions<textarea name="runtimePrompt" rows="6" maxlength="4000"></textarea></label><div class="form-status"><span class="editor-status" role="status"></span><button class="run-action" type="submit">Save skill</button></div></form><section class="source-section"><div class="panel-heading"><div><h2>Source notes</h2><p>Local Markdown evidence attached to this skill.</p></div></div><div class="source-list"></div><form class="source-form"><div class="editor-grid compact"><label>Title<input name="title" required maxlength="100" placeholder="Reference or operating note"></label><label>Type<select name="type"><option value="note">Note</option><option value="url">URL</option></select></label></div><label>Content or URL<textarea name="content" required rows="3" maxlength="20000"></textarea></label><div class="form-status"><span class="source-status" role="status"></span><button class="quiet-action" type="submit">Add source</button></div></form></section>`;
  host.querySelector('h2').textContent = skill.name; host.querySelector('.skill-folder').textContent = skill.folder;
  const form = host.querySelector('#skill-editor'); form.elements.enabled.checked = skill.enabled; form.elements.category.value = skill.group; form.elements.phase.value = skill.phase; form.elements.description.value = skill.description; form.elements.runtimePrompt.value = skill.runtimePrompt;
  form.addEventListener('submit', async event => {
    event.preventDefault(); const status = form.querySelector('.editor-status'); status.textContent = 'Saving…';
    try { await api(`/api/knowledge/skills/${skill.id}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ enabled: form.elements.enabled.checked, category: form.elements.category.value, phase: form.elements.phase.value, description: form.elements.description.value, runtimePrompt: form.elements.runtimePrompt.value }) }); await refreshKnowledge(skill.id); }
    catch (error) { status.textContent = error.message; }
  });
  const sourceList = host.querySelector('.source-list');
  if (!skill.sources.length) sourceList.innerHTML = '<p class="source-empty">No source notes yet.</p>';
  else skill.sources.forEach(source => { const row = document.createElement('article'); row.innerHTML = '<div><strong></strong><small></small></div><code></code>'; row.querySelector('strong').textContent = source.title; row.querySelector('small').textContent = `${source.type} · ${new Date(source.createdAt).toLocaleDateString()}`; row.querySelector('code').textContent = source.file; sourceList.append(row); });
  const sourceForm = host.querySelector('.source-form'); sourceForm.addEventListener('submit', async event => {
    event.preventDefault(); const status = sourceForm.querySelector('.source-status'); status.textContent = 'Adding…';
    try { await api(`/api/knowledge/skills/${skill.id}/sources`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ title: sourceForm.elements.title.value, type: sourceForm.elements.type.value, content: sourceForm.elements.content.value }) }); await refreshKnowledge(skill.id); }
    catch (error) { status.textContent = error.message; }
  });
}

function renderOracleMessages() {
  const host = $('#oracle-messages'); if (!host) return;
  if (!state.oracleMessages.length) { host.innerHTML = '<div class="oracle-empty"><strong>Oracle is ready.</strong><p>Describe a task. Planning is local and free; execution uses the configured runtime only after you ask.</p></div>'; return; }
  host.replaceChildren(...state.oracleMessages.map(message => {
    const article = document.createElement('article'); article.className = `oracle-message ${message.role}`;
    const label = document.createElement('span'); label.textContent = message.role === 'user' ? 'You' : 'Oracle';
    const body = document.createElement('pre'); body.textContent = message.text; article.append(label, body); return article;
  })); host.scrollTop = host.scrollHeight;
}

function renderOraclePlan() {
  const host = $('#oracle-plan-view'); if (!host) return;
  if (!state.oraclePlan) { host.innerHTML = '<div class="empty-state">Write a prompt to inspect its route.</div>'; return; }
  const plan = state.oraclePlan;
  const summary = document.createElement('div'); summary.className = 'plan-summary'; summary.innerHTML = '<strong></strong><span></span>'; summary.querySelector('strong').textContent = `${plan.system?.name || 'Active system'} · ${plan.steps.length} specialist${plan.steps.length === 1 ? '' : 's'}`; summary.querySelector('span').textContent = `${plan.allocatedBudget.toLocaleString()} / ${plan.requestedBudget.toLocaleString()} tokens allocated`;
  const steps = plan.steps.map((step, index) => {
    const article = document.createElement('article'); article.className = 'plan-step';
    article.innerHTML = '<div class="plan-index"></div><div class="plan-copy"><strong></strong><p></p><div class="plan-skills"></div></div><div class="plan-budget"></div>';
    article.querySelector('.plan-index').textContent = String(index + 1).padStart(2, '0'); article.querySelector('.plan-copy strong').textContent = `${step.name} · ${phaseLabels[step.phase] || step.phase}`; article.querySelector('.plan-copy p').textContent = step.reason; article.querySelector('.plan-budget').textContent = `${step.budget.toLocaleString()} tokens`;
    const skills = article.querySelector('.plan-skills');
    [...step.skills, ...(step.mcp || []).map(id => `MCP: ${id}`), ...(step.plugins || []).map(id => `Plugin: ${id}`)].forEach(id => { const span = document.createElement('span'); span.textContent = state.config.skills.find(skill => skill.id === id)?.name || id; skills.append(span); });
    if (step.approval) { const label = document.createElement('label'); label.className = 'approval-check'; const input = document.createElement('input'); input.type = 'checkbox'; input.checked = state.approvedAgents.has(step.id); input.addEventListener('change', () => input.checked ? state.approvedAgents.add(step.id) : state.approvedAgents.delete(step.id)); label.append(input, document.createTextNode(' Approve this agent')); article.querySelector('.plan-copy').append(label); }
    return article;
  });
  const dormant = document.createElement('p'); dormant.className = 'dormant-note'; dormant.textContent = `${plan.dormant.length} dormant: ${plan.dormant.join(', ') || 'none'}`;
  host.replaceChildren(summary, ...steps, dormant);
}

async function askOracle(planOnly) {
  const prompt = $('#oracle-prompt').value.trim(); if (prompt.length < 3) { $('#oracle-prompt').focus(); return; }
  const button = planOnly ? $('#oracle-plan') : $('#oracle-run'); button.disabled = true; const original = button.textContent; button.textContent = planOnly ? 'Planning…' : 'Running…';
  if (!planOnly) { state.oracleMessages.push({ role: 'user', text: prompt }); renderOracleMessages(); }
  try {
    const body = { prompt, budget: Number($('#oracle-budget').value), model: $('#oracle-model').value, mode: state.config.mode, approvedAgentIds: [...state.approvedAgents] };
    const result = await api(planOnly ? '/api/oracle/plan' : '/api/oracle/chat', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    state.oraclePlan = result.plan; storage.write('apollo-oracle-plan', state.oraclePlan); renderOraclePlan();
    if (!planOnly) { state.oracleMessages.push({ role: 'assistant', text: result.answer }); storage.write('apollo-oracle-messages', state.oracleMessages.slice(-40)); renderOracleMessages(); }
    await refreshEvents();
  } catch (error) { if (!planOnly) { state.oracleMessages.push({ role: 'assistant', text: `Oracle could not complete the run: ${error.message}` }); renderOracleMessages(); } else alert(error.message); }
  finally { button.disabled = false; button.textContent = original; }
}

function renderIntegrations() {
  const host = $('#integration-list'); if (!host) return;
  host.replaceChildren(...state.integrations.map(item => {
    const article = document.createElement('article'); article.className = `integration-row ${item.detected || item.mcpConfigured ? 'is-detected' : ''}`; article.innerHTML = '<div><strong></strong><span></span></div><p></p>'; article.querySelector('strong').textContent = item.name; article.querySelector('span').textContent = item.mode.replaceAll('-', ' '); article.querySelector('p').textContent = item.detail; return article;
  }));
}

function renderHostEvents() {
  const host = $('#host-event-list'); if (!host) return;
  if (!state.events.length) { host.innerHTML = '<div class="empty-state">No shared events yet. Ask a connected host to publish an Apollo event.</div>'; return; }
  host.replaceChildren(...state.events.map(event => {
    const article = document.createElement('article'); article.className = `host-event host-${event.host}`;
    article.innerHTML = '<div><strong></strong><span></span></div><p></p><time></time>';
    article.querySelector('strong').textContent = event.host;
    article.querySelector('span').textContent = event.kind.replaceAll('.', ' ');
    article.querySelector('p').textContent = event.summary;
    const time = article.querySelector('time'); time.dateTime = event.createdAt; time.textContent = new Date(event.createdAt).toLocaleString();
    return article;
  }));
}

async function refreshEvents() {
  try {
    state.events = (await api('/api/events?limit=200')).events;
    state.eventsError = null;
  } catch (error) {
    state.eventsError = error.message || 'The local event endpoint did not respond.';
  }
  renderHostEvents();
  renderHistory();
}

function setRuntime(mode) {
  const stateEl = $('.runtime-state'); stateEl.classList.remove('is-live', 'is-demo', 'is-error'); stateEl.classList.add(mode === 'live' ? 'is-live' : 'is-demo');
  $('#runtime-label').textContent = mode === 'live' ? 'Live API ready' : 'Demo mode';
  $('#playground-mode').textContent = mode === 'live' ? 'Live OpenAI Responses mode. Runs may incur API usage.' : 'Demo mode validates routing without sending data or consuming API tokens.';
  $('#oracle-mode').textContent = mode === 'live' ? 'Live OpenAI API execution. Plan-only remains local.' : 'Demo execution. Plan-only is fully functional and consumes zero tokens.';
}

async function saveSelectedSystem(event) {
  event.preventDefault();
  const system = selectedSystem();
  const form = $('#system-form');
  const feedback = $('#system-feedback');
  feedback.textContent = 'Saving system…';
  try {
    await api(`/api/systems/${system.id}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: form.elements.name.value, description: form.elements.description.value, instructions: form.elements.instructions.value, agents: system.agents }) });
    await refreshSystems(system.id);
    $('#system-feedback').textContent = 'Saved. New Oracle plans now use this configuration when it is active.';
  } catch (error) { feedback.textContent = error.message; }
}

async function createNewSystem(sourceSystemId) {
  try {
    const result = await api('/api/systems', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(sourceSystemId ? { sourceSystemId } : {}) });
    await refreshSystems(result.system.id);
    navigate('systems');
    $('#system-form').elements.name.focus();
    $('#system-form').elements.name.select();
  } catch (error) { $('#system-feedback').textContent = error.message; }
}

function bindEvents() {
  $$('[data-view-target]').forEach(button => button.addEventListener('click', () => navigate(button.dataset.viewTarget)));
  $$('.workflow-node').forEach(button => button.addEventListener('click', () => selectNode(button)));
  $('#phase-filter').addEventListener('change', () => {
    const phase = $('#phase-filter').value;
    $$('.workflow-node').forEach(node => node.style.opacity = phase === 'all' || node.dataset.phase === phase || node.dataset.phase === 'all' ? '1' : '.3');
    $$('.agent-lane').forEach(lane => lane.style.opacity = phase === 'all' || lane.dataset.phase === phase ? '1' : '.28');
    drawConnections();
  });
  $('#skill-search').addEventListener('input', filterSkills);
  $('#skill-phase-filter').addEventListener('change', filterSkills);
  $('#knowledge-search').addEventListener('input', renderKnowledge);
  $('#show-add-skill').addEventListener('click', () => { $('#add-skill-form').classList.remove('is-hidden'); $('#add-skill-form').elements.name.focus(); });
  $('#cancel-add-skill').addEventListener('click', () => $('#add-skill-form').classList.add('is-hidden'));
  $('#add-skill-form').addEventListener('submit', async event => {
    event.preventDefault(); const form = event.currentTarget; const status = $('#add-skill-status'); status.textContent = 'Creating folder…';
    try {
      const created = await api('/api/knowledge/skills', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: form.elements.name.value, category: form.elements.category.value, phase: form.elements.phase.value, description: form.elements.description.value, runtimePrompt: form.elements.runtimePrompt.value }) });
      form.reset(); form.classList.add('is-hidden'); state.knowledgeCategory = created.group; await refreshKnowledge(created.id);
    } catch (error) { status.textContent = error.message; }
  });
  $('#oracle-plan').addEventListener('click', () => askOracle(true));
  $('#oracle-form').addEventListener('submit', event => { event.preventDefault(); askOracle(false); });
  $('#oracle-clear').addEventListener('click', () => { state.oracleMessages = []; state.oraclePlan = null; state.approvedAgents.clear(); storage.write('apollo-oracle-messages', []); storage.write('apollo-oracle-plan', null); renderOracleMessages(); renderOraclePlan(); });
  $('#refresh-events').addEventListener('click', refreshEvents);
  $('#refresh-runs').addEventListener('click', refreshEvents);
  $('#reset-skills').addEventListener('click', () => { state.activeSkills = new Set(state.config.skills.filter(skill => skill.defaultOn).map(skill => skill.id)); renderSkillRegistry(); });
  $('#add-variant').addEventListener('click', () => { if (state.variants.length < 3) { state.variants.push(createVariant('Variant C', 'delivery-qa')); renderVariants(); } });
  $('#run-comparison').addEventListener('click', runComparison);
  $('#experiment-prompt').addEventListener('input', () => $('#prompt-length').textContent = `${$('#experiment-prompt').value.length.toLocaleString()} / 20,000`);
  $('#clear-prompt').addEventListener('click', () => { $('#experiment-prompt').value = ''; $('#experiment-prompt').dispatchEvent(new Event('input')); $('#experiment-prompt').focus(); });
  $('#export-runs').addEventListener('click', exportRuns);
  $('#clear-runs').addEventListener('click', () => { if (confirm('Clear browser-only experiment history? Connected MCP runs will remain available.')) { state.runs = []; storage.write('apollo-runs', []); renderHistory(); } });
  $('#system-form').addEventListener('submit', saveSelectedSystem);
  $('#new-system').addEventListener('click', () => createNewSystem());
  $('#duplicate-system').addEventListener('click', () => createNewSystem(state.systems.activeSystemId));
  $('#activate-system').addEventListener('click', async () => {
    const system = selectedSystem();
    try { await api('/api/systems/active', { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: system.id }) }); await refreshSystems(system.id); }
    catch (error) { $('#system-feedback').textContent = error.message; }
  });
  $('#delete-system').addEventListener('click', async () => {
    const system = selectedSystem();
    if (!confirm(`Delete the saved system “${system.name}”? Its historical run events will remain.`)) return;
    try { const result = await api(`/api/systems/${system.id}`, { method: 'DELETE' }); await refreshSystems(result.activeSystemId); }
    catch (error) { $('#system-feedback').textContent = error.message; }
  });
  $('#add-system-agent').addEventListener('click', () => {
    selectedSystem().agents.push({ id: `agent-${crypto.randomUUID()}`, name: 'New agent', description: 'Custom bounded specialist.', phase: 'prepare', activation: 'Activate when the plan requires this specialist.', triggers: [], skills: [], mcp: [], plugins: [], instructions: 'Work only within this responsibility and return a bounded phase packet.', budget: 3000, approval: false, priority: 1, enabled: true });
    renderSystems();
    requestAnimationFrame(() => $('#system-agent-list details:last-child')?.setAttribute('open', ''));
  });
  const observer = new ResizeObserver(() => requestAnimationFrame(drawConnections)); observer.observe($('#workflow-canvas'));
  window.addEventListener('resize', drawConnections, { passive: true });
  window.addEventListener('hashchange', () => navigate(viewFromHash(), { updateHash: false, scrollBehavior: 'auto' }));
}

async function init() {
  try {
    const response = await fetch('/api/config');
    if (!response.ok) throw new Error('Configuration endpoint unavailable.');
    state.config = await response.json();
    const [knowledge, agents, integrationData, eventData, systemsData] = await Promise.all([api('/api/knowledge'), api('/api/agents'), api('/api/integrations'), api('/api/events?limit=200'), api('/api/systems')]);
    state.knowledge = knowledge; state.agents = agents.agents; state.integrations = integrationData.integrations;
    state.events = eventData.events;
    state.systems = systemsData; state.selectedSystemId = systemsData.activeSystemId;
    state.selectedSkillId = knowledge.skills[0]?.id || null;
    state.oracleMessages = storage.read('apollo-oracle-messages', []);
    state.oraclePlan = storage.read('apollo-oracle-plan', null);
    const stored = storage.read('apollo-active-skills', null);
    state.activeSkills = new Set(stored || state.config.skills.filter(skill => skill.defaultOn).map(skill => skill.id));
    state.runs = storage.read('apollo-runs', []);
    state.variants = [createVariant('Variant A', 'lean-audit'), createVariant('Variant B', 'concept-lab')];
    $('#model-select').innerHTML = state.config.models.map(model => `<option value="${model}"${model === 'gpt-5.6-terra' ? ' selected' : ''}>${model}</option>`).join('');
    $('#oracle-model').innerHTML = state.config.models.map(model => `<option value="${model}"${model === 'gpt-5.6-terra' ? ' selected' : ''}>${model}</option>`).join('');
    $('#integration-recommendation').textContent = integrationData.recommendation;
    renderSkillRegistry(); renderTools(); renderVariants(); renderAgents(); renderSystems(); renderArchitectureAgents(); renderKnowledge(); renderOracleMessages(); renderIntegrations(); renderHostEvents(); setRuntime(state.config.mode); bindEvents();
    updateRunCount();
    $('#experiment-prompt').dispatchEvent(new Event('input'));
    navigate(viewFromHash());
    requestAnimationFrame(drawConnections);
    window.setInterval(() => { if (state.view === 'oracle' || state.view === 'runs') refreshEvents(); }, 5000);
  } catch (error) {
    $('.runtime-state').classList.add('is-error'); $('#runtime-label').textContent = 'Runtime unavailable';
    document.querySelector('main').innerHTML = `<div class="empty-state"><h1>Apollo Studio could not start.</h1><p>${error.message}</p><p>Run the local server, then reload this page.</p></div>`;
  }
}

init();
