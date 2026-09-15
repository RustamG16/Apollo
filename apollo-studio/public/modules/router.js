/** Route ownership is independent of the retained legacy view roots. */
export const ROUTES = Object.freeze([
  ['home', 'Home', 'home'], ['projects', 'Projects', 'projects'], ['plan', 'Plan', 'plan'],
  ['playground', 'Playground', 'playground'], ['results', 'Results', 'results'],
  ['knowledge', 'Knowledge', 'knowledge'], ['system', 'System', 'architecture'],
  ['agents', 'Agents', 'agents'], ['settings', 'Settings', 'settings'],
].map(([id, label, root]) => Object.freeze({ id, label, root })));
const labels = Object.fromEntries(ROUTES.map(route => [route.id, route.label]));
const projectViews = new Set(['home', 'overview', 'intake', 'brief', 'references', 'work', 'outputs', 'activity', 'plan', 'playground', 'results', 'knowledge', 'system']);
const aliases = { work: 'work', architecture: 'system', systems: 'plan/configure', runs: 'results/history', oracle: 'intake' };
const title = value => labels[value] || ({ overview: 'Overview', intake: 'Intake', brief: 'Brief', references: 'References', work: 'Work', outputs: 'Outputs', activity: 'Activity', configure: 'Configure', history: 'History', connections: 'Connections' })[value] || value;
export function routeHref(view, projectId) {
  return '#/' + (projectId ? `projects/${encodeURIComponent(projectId)}/` : '') + view;
}
export function resolveRoute(hash = '', context = {}) {
  let path = hash.replace(/^#\/?/, '').replace(/\/$/, '') || 'home';
  if (Object.hasOwn(aliases, path)) {
    const alias = aliases[path];
    path = ['work', 'intake'].includes(alias) ? routeHref(alias, context.projectId).slice(2) : alias;
  }
  let pieces;
  try { pieces = path.split('/').map(decodeURIComponent); } catch { return unavailable(path); }
  let projectId = null;
  if (pieces[0] === 'projects' && pieces.length > 1) {
    projectId = pieces[1]; pieces = pieces.slice(2);
    if (!projectId) return unavailable(path);
    if (!pieces.length) pieces = ['overview'];
    if (!projectViews.has(pieces[0])) return unavailable(path, projectId);
  }
  const [view, detail, ...rest] = pieces;
  const global = ROUTES.find(route => route.id === view);
  if (!global && !['work', 'intake'].includes(view) && !projectId) return unavailable(path);
  if (rest.length || (detail && !(['work', 'results', 'system'].includes(view) || (view === 'plan' && detail === 'configure') || (view === 'knowledge' && detail === 'connections')))) return unavailable(path, projectId);
  const owner = ['overview', 'intake', 'brief', 'references', 'work', 'outputs', 'activity'].includes(view) ? 'projects' : view;
  const root = view === 'work' ? 'work' : view === 'intake' ? 'oracle' : view === 'plan' && detail === 'configure' ? 'systems' : view === 'results' && detail === 'history' ? 'runs' : ['brief', 'references', 'outputs', 'activity', 'overview'].includes(view) ? 'project-detail' : global?.root || 'projects';
  return { path, owner, root, projectId, runId: ['work', 'results', 'system'].includes(view) && detail !== 'history' ? detail || null : null, trail: pieces.map(title), unavailable: false };
}
function unavailable(path, projectId = null) {
  return { path, owner: 'projects', root: 'route-unavailable', projectId, trail: ['Unavailable view'], unavailable: true };
}

export function createRouter({ context, render }) {
  let current = null;
  const focusByRoute = new Map();
  document.addEventListener('focusin', event => {
    if (current && event.target.closest('.view')) focusByRoute.set(current.path, event.target);
  });
  function navigate(target, { replace = false, focus = true, fromHistory = false } = {}) {
    const route = resolveRoute(target, context());
    const changed = current?.path !== route.path;
    const active = document.activeElement;
    if (current && active?.closest('.view')) focusByRoute.set(current.path, active);
    current = route;
    if (location.hash !== '#/' + route.path) history[replace || fromHistory ? 'replaceState' : 'pushState'](null, '', '#/' + route.path);
    document.querySelectorAll('.view').forEach(section => {
      const visible = section.id === route.root;
      section.classList.toggle('is-active', visible); section.hidden = !visible; section.inert = !visible;
    });
    document.querySelectorAll('[data-global-route]').forEach(link => {
      const active = link.dataset.globalRoute === route.owner;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
    });
    document.title = `${route.trail.join(' / ')} · Apollo Studio`;
    render(route);
    if (changed) document.querySelector('main').scrollTop = 0;
    if (focus) {
      const remembered = fromHistory && focusByRoute.get(route.path);
      const heading = document.querySelector('.view.is-active')?.querySelector('h1');
      const destination = remembered?.isConnected && !remembered.closest('[hidden]') ? remembered : heading;
      if (destination) { if (destination === heading) destination.tabIndex = -1; destination.focus({ preventScroll: true }); }
    }
    return route;
  }
  const restore = () => navigate(location.hash, { fromHistory: true });
  window.addEventListener('hashchange', restore);
  window.addEventListener('popstate', restore);
  return { navigate, current: () => current, refresh: () => current && render(current) };
}
