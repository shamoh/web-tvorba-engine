#!/usr/bin/env node
// Moves the workflows of repositories to the newest version of the engine (scripts/lib/engine-version.mjs): reads their
// .github/workflows/*.yml, the tags of the engine (git ls-remote of its public repository, or --tags), changes `@vN`
// and `engine-ref: vN` in place where a newer version exists, and for each changed repository writes the description
// of its pull request to <body-dir>/engine-update-<name>.md and the step output `<name>` = "<from> <to>" (nothing when
// up to date). Different versions within one repository stop it with an error (never guessed).
// Used by the shared workflow .github/workflows/engine-update.yml.
//
// Usage: node scripts/engine-update.mjs --repo <name>=<folder> [--repo …] [--tags v1,v2] [--body-dir <folder>]

import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { ENGINE_REPOSITORY, planUpdate, updateDescription } from './lib/engine-version.mjs';

const args = process.argv.slice(2);
const values = (name) => args.flatMap((a, i) => (a === name ? [args[i + 1]] : []));
const repos = values('--repo').map((r) => {
  const [name, dir] = r.split('=');
  return { name, dir: path.resolve(dir) };
});
if (!repos.length || repos.some((r) => !r.name || !r.dir)) {
  console.error('Usage: node scripts/engine-update.mjs --repo <name>=<folder> [--repo …] [--tags v1,v2] [--body-dir <folder>]');
  process.exit(1);
}
const bodyDir = path.resolve(values('--body-dir')[0] ?? '.');

const tagsOf = async () => {
  const given = values('--tags')[0];
  if (given) return given.split(',');
  const { stdout } = await promisify(execFile)('git', ['ls-remote', '--tags', `https://github.com/${ENGINE_REPOSITORY}.git`]);
  return stdout.split('\n').map((l) => l.split('\t')[1]).filter(Boolean);
};

const workflowsOf = async (dir) => {
  const folder = path.join(dir, '.github', 'workflows');
  const names = (await fs.readdir(folder).catch(() => [])).filter((f) => /\.ya?ml$/.test(f)).sort();
  return Promise.all(names.map(async (f) => ({ path: path.join('.github', 'workflows', f), text: await fs.readFile(path.join(folder, f), 'utf8') })));
};

const plan = planUpdate(await Promise.all(repos.map(async (r) => ({ name: r.name, files: await workflowsOf(r.dir) }))), await tagsOf());
if (plan.problems.length) {
  plan.problems.forEach((p) => console.error(`✗ ${p}`));
  process.exit(1);
}
console.log(`Newest version of the engine: ${plan.latest}`);
for (const update of plan.updates) {
  const { dir } = repos.find((r) => r.name === update.name);
  for (const f of update.files) await fs.writeFile(path.join(dir, f.path), f.text);
  await fs.mkdir(bodyDir, { recursive: true });
  await fs.writeFile(path.join(bodyDir, `engine-update-${update.name}.md`), `${updateDescription(update)}\n`);
  if (process.env.GITHUB_OUTPUT) await fs.appendFile(process.env.GITHUB_OUTPUT, `${update.name}=${update.from} ${update.to}\n`);
  console.log(`${update.name}: ${update.from} → ${update.to} (${update.files.map((f) => f.path).join(', ')})`);
}
for (const r of repos) if (!plan.updates.some((u) => u.name === r.name)) console.log(`${r.name}: up to date`);
