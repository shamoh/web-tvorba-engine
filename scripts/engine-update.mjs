#!/usr/bin/env node
// Moves the workflows of repositories to the newest safe version of the engine (scripts/lib/engine-version.mjs): reads
// their .github/workflows/*.yml and the tags of the engine (git ls-remote of its public repository, or --tags = given as
// safe), takes the newest tag whose commit passed "Kontrola kódu" of the engine (API of GitHub, GH_TOKEN if set), changes `@vN`
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
import { ENGINE_REPOSITORY, latestSafeVersion, planUpdate, tagCommits, updateDescription } from './lib/engine-version.mjs';

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

/** True when a run of "Kontrola kódu" (check.yml) of the engine succeeded on the commit `sha`. */
const passed = async (sha) => {
  const res = await fetch(`https://api.github.com/repos/${ENGINE_REPOSITORY}/actions/workflows/check.yml/runs?head_sha=${sha}&status=success&per_page=1`, {
    headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'engine-update', ...(process.env.GH_TOKEN && { Authorization: `Bearer ${process.env.GH_TOKEN}` }) },
  });
  if (!res.ok) throw new Error(`the check of the engine on ${sha.slice(0, 7)}: HTTP ${res.status}`);
  return (await res.json()).total_count > 0;
};

/** The tags to move to: the given ones (--tags, taken as safe) or the newest safe tag of the engine. */
const tagsOf = async () => {
  const given = values('--tags')[0];
  if (given) return given.split(',');
  const { stdout } = await promisify(execFile)('git', ['ls-remote', '--tags', `https://github.com/${ENGINE_REPOSITORY}.git`]);
  const safe = await latestSafeVersion(tagCommits(stdout), passed);
  if (safe.skipped.length) console.log(`Not offered (the check of the engine did not pass on their commit): ${safe.skipped.join(', ')}`);
  return safe.version ? [safe.version] : [];
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
