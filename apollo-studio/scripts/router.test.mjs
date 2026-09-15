import test from 'node:test';
import assert from 'node:assert/strict';
import { ROUTES, resolveRoute, routeHref } from '../public/modules/router.js';
import { selectShellState } from '../public/modules/store.js';

test('global routes have the contracted order and one owner', () => {
  assert.deepEqual(ROUTES.map(route => route.label), ['Home', 'Projects', 'Plan', 'Playground', 'Results', 'Knowledge', 'System', 'Agents', 'Settings']);
  for (const route of ROUTES) assert.equal(resolveRoute(`#/${route.id}`).owner, route.id);
});
test('project deep links retain project and run identity and nested ownership', () => {
  const configured = resolveRoute('#/projects/north%20star/plan/configure');
  assert.equal(configured.projectId, 'north star');
  assert.equal(configured.owner, 'plan');
  assert.equal(configured.root, 'systems');
  assert.deepEqual(configured.trail, ['Plan', 'Configure']);
  const work = resolveRoute('#/projects/p1/work/run-24');
  assert.equal(work.owner, 'projects');
  assert.equal(work.runId, 'run-24');
  assert.equal(work.root, 'work');
  assert.equal(resolveRoute('#/projects/p1/knowledge/connections').owner, 'knowledge');
});
test('all historical routes redirect without dropping their working surface', () => {
  for (const [alias, root, owner] of [['work', 'work', 'projects'], ['architecture', 'architecture', 'system'], ['systems', 'systems', 'plan'], ['runs', 'runs', 'results'], ['oracle', 'oracle', 'projects']]) {
    const route = resolveRoute(`#${alias}`, { projectId: 'p1' });
    assert.equal(route.root, root);
    assert.equal(route.owner, owner);
    assert.notEqual(route.path, alias);
    assert.equal(resolveRoute('#/' + route.path).root, root);
  }
});
test('invalid paths, malformed encoding and unsupported nested views recover explicitly', () => {
  for (const hash of ['#/nonsense', '#/projects/%E0%A4%A/work', '#/projects/p1/invented', '#/home/extra']) {
    assert.equal(resolveRoute(hash).unavailable, true);
  }
  assert.equal(resolveRoute('').owner, 'home');
  assert.equal(routeHref('plan/configure', 'a/b'), '#/projects/a%2Fb/plan/configure');
});
test('projection never fabricates a stage, project, or verified live capability', () => {
  const route = resolveRoute('#/home');
  assert.equal(selectShellState({}, route).status, 'loading');
  const ready = { status: 'ready', projects: [{ id: 'p1', name: 'Northstar' }], activeProjectId: 'p1', config: { mode: 'live-unverified' } };
  assert.equal(selectShellState(ready, route).environment, 'unverified');
  assert.equal(selectShellState(ready, route).stage, 'Unknown');
  assert.equal(selectShellState({ ...ready, config: { hasApiKey: true } }, route).environment, 'unknown');
  assert.equal(selectShellState({ ...ready, projects: [] }, route).status, 'empty');
  assert.equal(selectShellState(ready, resolveRoute('#/projects/missing/work')).status, 'unavailable');
  assert.equal(selectShellState({ ...ready, online: false }, route).status, 'offline');
  assert.equal(selectShellState({ ...ready, status: 'unavailable' }, route).status, 'unavailable');
});
