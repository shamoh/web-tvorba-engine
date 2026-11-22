import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { blobSvg, contentImages, demoImageProblems, forcedImages, recipeProblems, renderDemoImages, seeded } from './demo-images.mjs';

let dir;
beforeEach(async () => { dir = await fs.mkdtemp(path.join(os.tmpdir(), 'pavla-demo-images-')); });
afterEach(() => fs.rm(dir, { recursive: true, force: true }));

const recipe = {
  palettes: { voda: ['#6f94b3', '#9cc0cf'] },
  images: {
    'tvorba/2026/demo-rano.jpg': { size: [120, 80], palette: 'voda', seed: 7 },
    'tvorba/2026/demo-rano/detail.jpg': { from: 'tvorba/2026/demo-rano.jpg', crop: [10, 10, 60, 30], width: 90 },
  },
};

test('seeded and blobSvg are deterministic: the same seed gives the same picture', () => {
  const a = seeded(42), b = seeded(42);
  assert.deepEqual([a(), a(), a()], [b(), b(), b()]);
  assert.equal(blobSvg([100, 50], ['#000'], 5), blobSvg([100, 50], ['#000'], 5));
  assert.notEqual(blobSvg([100, 50], ['#000'], 5), blobSvg([100, 50], ['#000'], 6));
  assert.equal((blobSvg([100, 50], ['#000'], 5).match(/<path /g) ?? []).length, 12, 'crisp strokes over the blobs');
  assert.equal((blobSvg([100, 50], ['#000'], 5, 14, 0).match(/<path /g) ?? []).length, 0);
});

test('renderDemoImages paints images and crops details, byte for byte the same on every run', async () => {
  assert.deepEqual(await renderDemoImages(recipe, dir), ['tvorba/2026/demo-rano.jpg', 'tvorba/2026/demo-rano/detail.jpg']);
  const meta = async (f) => sharp(await fs.readFile(path.join(dir, f))).metadata();
  assert.deepEqual([(await meta('tvorba/2026/demo-rano.jpg')).width, (await meta('tvorba/2026/demo-rano.jpg')).height], [120, 80]);
  assert.deepEqual([(await meta('tvorba/2026/demo-rano/detail.jpg')).width, (await meta('tvorba/2026/demo-rano/detail.jpg')).height], [90, 45]);
  const first = await fs.readFile(path.join(dir, 'tvorba/2026/demo-rano.jpg'));
  await renderDemoImages(recipe, dir);
  assert.ok(first.equals(await fs.readFile(path.join(dir, 'tvorba/2026/demo-rano.jpg'))));
});

test('recipeProblems reports unknown palettes, bad sizes and seeds, broken crops', () => {
  assert.deepEqual(recipeProblems(recipe), []);
  const bad = {
    palettes: {},
    images: {
      'a.jpg': { size: [10, 10], palette: 'nic', seed: 1 },
      'b.jpg': { size: [10], palette: 'nic', seed: 1.5 },
      'c.jpg': { from: 'chybi.jpg', crop: [0, 0, 1, 1] },
      'd.jpg': { from: 'a.jpg', crop: [5, 5, 10, 10] },
    },
  };
  const p = recipeProblems(bad).join('\n');
  assert.match(p, /a\.jpg: unknown palette "nic"/);
  assert.match(p, /b\.jpg: size must be/);
  assert.match(p, /b\.jpg: seed must be a whole number/);
  assert.match(p, /c\.jpg: "from" must be a painted image/);
  assert.match(p, /d\.jpg: crop is outside a\.jpg/);
});

test('renderDemoImages renders only missing images, never an existing one, except the forced ones', async () => {
  await fs.mkdir(path.join(dir, 'tvorba/2026'), { recursive: true });
  const kept = Buffer.from('not rendered again');
  await fs.writeFile(path.join(dir, 'tvorba/2026/demo-rano.jpg'), await sharp(Buffer.from(blobSvg([120, 80], ['#6f94b3'], 3))).jpeg().toBuffer());
  const before = await fs.readFile(path.join(dir, 'tvorba/2026/demo-rano.jpg'));
  assert.deepEqual(await renderDemoImages(recipe, dir), ['tvorba/2026/demo-rano/detail.jpg'], 'only the missing crop, from the existing source');
  assert.ok(before.equals(await fs.readFile(path.join(dir, 'tvorba/2026/demo-rano.jpg'))), 'the existing image untouched');
  assert.deepEqual(await renderDemoImages(recipe, dir), [], 'nothing missing = nothing written');
  await fs.writeFile(path.join(dir, 'tvorba/2026/demo-rano/detail.jpg'), kept);
  const { forced } = forcedImages(recipe, ['tvorba/2026/demo-rano.jpg']);
  assert.deepEqual(await renderDemoImages(recipe, dir, { force: forced }), ['tvorba/2026/demo-rano.jpg', 'tvorba/2026/demo-rano/detail.jpg']);
  assert.ok(!kept.equals(await fs.readFile(path.join(dir, 'tvorba/2026/demo-rano/detail.jpg'))), 'the crop follows its new source');
});

test('forcedImages: the asked paths with all their crops (also crops of crops), unknown paths apart', () => {
  const chain = { images: { 'a.jpg': { size: [10, 10] }, 'b.jpg': { from: 'a.jpg', crop: [0, 0, 5, 5] }, 'c.jpg': { from: 'b.jpg', crop: [0, 0, 2, 2] }, 'd.jpg': { size: [10, 10] } } };
  assert.deepEqual(forcedImages(chain, ['a.jpg', 'nic.jpg']), { forced: ['a.jpg', 'b.jpg', 'c.jpg'], unknown: ['nic.jpg'] });
  assert.deepEqual(forcedImages(chain, ['b.jpg']).forced, ['b.jpg', 'c.jpg']);
  assert.deepEqual(forcedImages(chain, []), { forced: [], unknown: [] });
});

test('demoImageProblems: an image outside the recipe always, a missing one only when asked', async () => {
  await renderDemoImages(recipe, dir);
  assert.deepEqual(await demoImageProblems(recipe, dir, { missing: true }), []);
  await fs.writeFile(path.join(dir, 'tvorba/2026/navic.jpg'), 'x');
  await fs.mkdir(path.join(dir, 'export'), { recursive: true });
  await fs.writeFile(path.join(dir, 'export/ignored.jpg'), 'x');
  await fs.rm(path.join(dir, 'tvorba/2026/demo-rano/detail.jpg'));
  assert.deepEqual(await contentImages(dir), ['tvorba/2026/demo-rano.jpg', 'tvorba/2026/navic.jpg'], 'export/ is no content');
  assert.deepEqual(await demoImageProblems(recipe, dir), ['tvorba/2026/navic.jpg: obrázek není v receptu images.yaml (přidej ho tam, nebo ho smaž)']);
  assert.deepEqual((await demoImageProblems(recipe, dir, { missing: true }))[1], 'tvorba/2026/demo-rano/detail.jpg: chybí, vyrob ho: npm run demo:images');
});
