import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';
import { CODE_ROOT } from './lib/site-dir.mjs';

const WORKFLOWS = path.join(CODE_ROOT, '.github/workflows');
const workflow = async (name) => YAML.parse(await fs.readFile(path.join(WORKFLOWS, name), 'utf8'));
const stepsOf = (wf) => Object.values(wf.jobs).flatMap((job) => job.steps ?? []);
const allWorkflows = async () => Promise.all((await fs.readdir(WORKFLOWS)).filter((f) => f.endsWith('.yml')).map(async (f) => [f, await workflow(f)]));

/** The shared workflows a site or a content repository calls (workflow_call): they run the engine in the version of the site. */
const SHARED = ['process-content.yml', 'site-check.yml', 'site-deploy.yml', 'health-check.yml'];

test('every artifact of Pages keeps the hidden files of the site (/.well-known/), the action leaves them out by default', async () => {
  const uploads = (await allWorkflows()).flatMap(([name, wf]) => stepsOf(wf)
    .filter((step) => String(step.uses ?? '').startsWith('actions/upload-pages-artifact@')).map((step) => [name, step]));
  assert.deepEqual(uploads.map(([name]) => name).sort(), ['demo-pages.yml', 'site-deploy.yml']);
  for (const [name, step] of uploads) assert.equal(step.with?.['include-hidden-files'], true, name);
  // the hidden page it is for
  await fs.access(path.join(CODE_ROOT, 'src/pages/.well-known/tdmrep.json.ts'));
});

test('the shared workflows are workflow_call with a required engine-ref and check the engine out in that version', async () => {
  for (const name of SHARED) {
    const wf = await workflow(name);
    const call = wf.on?.workflow_call;
    assert.ok(call, `${name}: workflow_call`);
    assert.equal(call.inputs?.['engine-ref']?.required, true, `${name}: engine-ref required`);
    assert.equal(call.inputs?.['engine-repository']?.default, 'shamoh/web-tvorba-engine', `${name}: engine-repository`);
    const engine = stepsOf(wf).filter((step) => String(step.uses ?? '').startsWith('actions/checkout@') && step.with?.repository === '${{ inputs.engine-repository }}');
    assert.ok(engine.length, `${name}: a checkout of the engine`);
    for (const step of engine) assert.equal(step.with.ref, '${{ inputs.engine-ref }}', `${name}: the version of the site, never main`);
  }
});

test('the content update branch of the workflows is the one of the code (CONTENT_UPDATE_BRANCH), never the old name', async () => {
  const { CONTENT_UPDATE_BRANCH } = await import('./lib/binary.mjs');
  for (const [name] of await allWorkflows()) {
    const text = await fs.readFile(path.join(WORKFLOWS, name), 'utf8');
    assert.doesNotMatch(text, /obsah\/aktualizace/, name);
  }
  const pr = stepsOf(await workflow('process-content.yml')).find((step) => String(step.uses ?? '').startsWith('peter-evans/create-pull-request@'));
  assert.equal(pr.with.branch, CONTENT_UPDATE_BRANCH);
});

test('engine-update.yml: the updater runs the engine at main (never a version it would move) with a token that may change workflows', async () => {
  const wf = await workflow('engine-update.yml');
  assert.ok(wf.on?.workflow_call?.secrets?.UPDATE_TOKEN?.required, 'UPDATE_TOKEN: the token of the run may not change workflow files');
  const engine = stepsOf(wf).find((step) => step.with?.repository === '${{ inputs.engine-repository }}');
  assert.equal(engine.with.ref, undefined, 'the engine at its default branch');
  const prs = stepsOf(wf).filter((step) => String(step.uses ?? '').startsWith('peter-evans/create-pull-request@'));
  assert.deepEqual(prs.map((step) => [step.with.path, step.with.token, step.with['add-paths']]), [
    ['site', '${{ secrets.UPDATE_TOKEN }}', '.github/workflows'],
    ['content', '${{ secrets.UPDATE_TOKEN }}', '.github/workflows'],
  ]);
});
