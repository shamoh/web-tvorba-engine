import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';
import { CODE_ROOT } from './lib/site-dir.mjs';

const workflow = async (name) => YAML.parse(await fs.readFile(path.join(CODE_ROOT, '.github/workflows', name), 'utf8'));

test('deploy.yml: the artifact of Pages keeps the hidden files of the site (/.well-known/), the action leaves them out by default', async () => {
  const steps = Object.values((await workflow('deploy.yml')).jobs).flatMap((job) => job.steps ?? []);
  const upload = steps.filter((step) => String(step.uses ?? '').startsWith('actions/upload-pages-artifact@'));
  assert.equal(upload.length, 1);
  assert.equal(upload[0].with?.['include-hidden-files'], true);
  // the hidden page it is for
  await fs.access(path.join(CODE_ROOT, 'src/pages/.well-known/tdmrep.json.ts'));
});
