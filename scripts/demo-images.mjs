#!/usr/bin/env node
// The images of the test data (demo-content/), from their recipe demo-content/images.yaml: renders the images that
// are missing, never touches an existing one (its bytes stay the same in git even with another version of sharp).
//
// Usage:  npm run demo:images                      render the missing images
//         npm run demo:images -- <path> [<path>…]  render these again (paths as in the recipe), with their crops
//         npm run demo:images -- --check           only report images missing or not in the recipe (exit code 1)
// npm run demo renders the missing ones too.

import fs from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';
import { demoImageProblems, forcedImages, recipeProblems, renderDemoImages } from './lib/demo-images.mjs';
import { CODE_ROOT } from './lib/site-dir.mjs';

const demoDir = path.join(CODE_ROOT, 'demo-content');
const args = process.argv.slice(2);
const check = args.includes('--check');
const paths = args.filter((a) => !a.startsWith('--')).map((a) => a.replace(/^demo-content\//, ''));

try {
  const recipe = YAML.parse(await fs.readFile(path.join(demoDir, 'images.yaml'), 'utf8')) ?? {};
  const problems = recipeProblems(recipe);
  const { forced, unknown } = forcedImages(recipe, paths);
  problems.push(...unknown.map((p) => `${p}: není v receptu images.yaml`));
  if (!problems.length && !check) {
    const written = await renderDemoImages(recipe, demoDir, { force: forced });
    written.forEach((f) => console.log(`+ demo-content/${f}`));
    console.log(written.length ? `${written.length} images rendered.` : 'Every image of the recipe is there.');
  }
  if (!problems.length) problems.push(...await demoImageProblems(recipe, demoDir, { missing: check }));
  problems.forEach((p) => console.error(`✗ demo-content/${p}`));
  if (problems.length) process.exitCode = 1;
} catch (e) {
  console.error(`✗ ${e.message}`);
  process.exitCode = 1;
}
