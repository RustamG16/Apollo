#!/usr/bin/env node
// Screenshots every view at a real desktop viewport, through the same headless Chrome the
// metrics harness drives. The browser pane is not a reliable judge of a 1440px layout; this
// is, and it costs one command.
//
//   node scripts/ui-shots.mjs [--width 1440] [--height 900] [--out metrics/shots]
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch } from './lib/cdp.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const VIEWS = ['work', 'architecture', 'systems', 'playground', 'agents', 'knowledge', 'oracle', 'runs'];

const arg = (name, fallback) => {
  const index = process.argv.indexOf('--' + name);
  return index >= 0 ? process.argv[index + 1] : fallback;
};
const width = Number(arg('width', 1440));
const height = Number(arg('height', 900));
const outDir = resolve(ROOT, arg('out', join('metrics', 'shots')));

async function startServer() {
  const port = 4800 + Math.floor(Math.random() * 190);
  const proc = spawn(process.execPath, [join(ROOT, 'server.mjs')], {
    cwd: ROOT, env: { ...process.env, PORT: String(port) }, stdio: ['ignore', 'pipe', 'pipe'],
  });
  const base = 'http://127.0.0.1:' + port;
  const deadline = Date.now() + 20000;
  for (;;) {
    if (Date.now() > deadline) { proc.kill(); throw new Error('server did not start'); }
    try { if ((await fetch(base + '/', { signal: AbortSignal.timeout(1500) })).ok) break; } catch {}
    await new Promise(r => setTimeout(r, 200));
  }
  return { proc, base };
}

const { proc: server, base } = await startServer();
const browser = await launch();
mkdirSync(outDir, { recursive: true });
try {
  const page = await browser.newPage();
  await page.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
  const loaded = page.once('Page.loadEventFired');
  await page.send('Page.navigate', { url: base + '/#/work' });
  await loaded;
  await new Promise(r => setTimeout(r, 1200));

  for (const view of VIEWS) {
    await page.send('Runtime.evaluate', { expression: "location.hash = '/" + view + "'" });
    await new Promise(r => setTimeout(r, 700));
    const { data } = await page.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    const file = join(outDir, `${view}-${width}x${height}.png`);
    writeFileSync(file, Buffer.from(data, 'base64'));
    console.log('wrote', file);
  }
} finally {
  await browser.close();
  server.kill();
}
