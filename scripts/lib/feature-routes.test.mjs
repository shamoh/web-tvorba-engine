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

const readdirPageFolders = () => fs.readdirSync(path.join(ROOT, 'src/pages'), { withFileTypes: true }).filter((e) => e.isDirectory() && e.name.startsWith('_')).map((e) => e.name).sort();

test('every route points at an existing file, and every file of a feature folder has its route', () => {
  for (const [name, routes] of Object.entries(FEATURE_ROUTES)) {
    assert.ok(FEATURE_NAMES.includes(name), `${name} is a feature`);
    for (const { entrypoint } of routes) assert.ok(fs.existsSync(path.join(ROOT, entrypoint)), entrypoint);
  }
  const folders = { game: '_detail-dne', favorites: '_favorites' };
  for (const [name, folder] of Object.entries(folders)) {
    assert.deepEqual(FEATURE_ROUTES[name].map((r) => path.relative(`./src/pages/${folder}`, r.entrypoint)).sort(), filesUnder(path.join(ROOT, 'src/pages', folder)), `a page added to ${folder} without a route is never built`);
  }
  assert.deepEqual(readdirPageFolders(), Object.values(folders).sort(), 'every folder with _ in src/pages belongs to a feature');
});

test('the routes of a feature that is on are injected, of one that is off not', () => {
  assert.equal(routesOf(featuresOf({})).length, FEATURE_ROUTES.game.length + FEATURE_ROUTES.favorites.length);
  assert.deepEqual(routesOf(featuresOf({ features: { game: false, favorites: false } })), []);
  assert.deepEqual(routesOf(featuresOf({ features: { game: false } })).map((r) => r.pattern), ['/tvorba/vyber']);
  const injected = [];
  featureRoutesIntegration(featuresOf({})).hooks['astro:config:setup']({ injectRoute: (r) => injected.push(r.pattern) });
  assert.ok(injected.includes('/detail-dne') && injected.includes('/detail-dne/plan/[year].json'));
  const none = [];
  featureRoutesIntegration(featuresOf({ features: { game: false, favorites: false } })).hooks['astro:config:setup']({ injectRoute: (r) => none.push(r) });
  assert.deepEqual(none, []);
});
