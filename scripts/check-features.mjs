#!/usr/bin/env node
// Builds the test site with every optional feature switched off (a copy of .demo/site in .demo/features-off, made by
// npm run demo:build first), checks its images (check-images.mjs) and that it has no page of a switched off feature
// nor a link to one (scripts/lib/features-check.mjs).
// Usage:  npm run demo:build && npm run check:features
// Exit code 1 when something is wrong.

import { spawnSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FEATURE_NAMES } from './lib/features.mjs';
import { linksTo, offAddresses, withFeaturesOff } from './lib/features-check.mjs';
import { readSiteConfig, sitePaths } from './lib/site-dir.mjs';
import { siteBase } from './lib/site-url.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, '.demo', 'site');
const target = path.join(root, '.demo', 'features-off');

const fail = (message) => {
  console.error(`✗ ${message}`);
  process.exit(1);
};
const run = (args) => {
  const { status } = spawnSync(process.execPath, args, { cwd: root, stdio: 'inherit', env: { ...process.env, SITE_DIR: target } });
  if (status !== 0) fail(`"${args.join(' ')}" failed on the test site without its features`);
};

await fs.access(source).catch(() => fail('No test site in .demo/site: run "npm run demo:build" first'));
await fs.rm(target, { recursive: true, force: true });
await fs.cp(source, target, { recursive: true, filter: (from) => from !== sitePaths(source).dist });
const configPath = sitePaths(target).config;
await fs.writeFile(configPath, withFeaturesOff(await fs.readFile(configPath, 'utf8'), FEATURE_NAMES));

run([path.join('node_modules', 'astro', 'bin', 'astro.mjs'), 'build']);
run([path.join('scripts', 'check-images.mjs')]);

const dist = sitePaths(target).dist;
const addresses = offAddresses(FEATURE_NAMES);
const problems = [];
for (const address of addresses) {
  if (await fs.access(path.join(dist, address)).then(() => true, () => false)) problems.push(`built although its feature is off: ${address}`);
}
const base = siteBase(readSiteConfig(target).site.url) ?? '/';
for (const file of (await fs.readdir(dist, { recursive: true })).filter((f) => f.endsWith('.html'))) {
  for (const href of linksTo(await fs.readFile(path.join(dist, file), 'utf8'), addresses, base)) problems.push(`${file}: a link to a switched off page: ${href}`);
}
if (problems.length) fail(`The test site without its features has ${problems.length} problem(s):\n${problems.slice(0, 20).map((p) => `  - ${p}`).join('\n')}`);
console.log(`✓ The test site without its features (${FEATURE_NAMES.join(', ')}): no page of them and no link to one.`);
