import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FEATURE_ROUTES, featureRoutesIntegration, routesOf } from './feature-routes.mjs';
import { FEATURE_NAMES, featuresOf } from './features.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');

/** Every page file under `dir` (relative paths). */
const filesUnder = (dir) => fs.readdirSync(dir, { withFileTypes: true, recursive: true }).filter((e) => e.isFile()).map((e) => path.relative(dir, path.join(e.parentPath, e.name))).sort();

test('every route points at an existing file, and every file of a feature folder has its route', () => {
  for (const [name, routes] of Object.entries(FEATURE_ROUTES)) {
    assert.ok(FEATURE_NAMES.includes(name), `${name} is a feature`);
    for (const { entrypoint } of routes) assert.ok(fs.existsSync(path.join(ROOT, entrypoint)), entrypoint);
  }
  const folder = path.join(ROOT, 'src/pages/_detail-dne');
  assert.deepEqual(FEATURE_ROUTES.game.map((r) => path.relative('./src/pages/_detail-dne', r.entrypoint)).sort(), filesUnder(folder), 'a page added to the folder without a route is never built');
});

test('the routes of a feature that is on are injected, of one that is off not', () => {
  assert.equal(routesOf(featuresOf({})).length, FEATURE_ROUTES.game.length);
  assert.deepEqual(routesOf(featuresOf({ features: { game: false } })), []);
  const injected = [];
  featureRoutesIntegration(featuresOf({})).hooks['astro:config:setup']({ injectRoute: (r) => injected.push(r.pattern) });
  assert.ok(injected.includes('/detail-dne') && injected.includes('/detail-dne/plan/[year].json'));
  const none = [];
  featureRoutesIntegration(featuresOf({ features: { game: false } })).hooks['astro:config:setup']({ injectRoute: (r) => none.push(r) });
  assert.deepEqual(none, []);
});
