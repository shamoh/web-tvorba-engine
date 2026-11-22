import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CODE_ROOT, SITE_CONFIG_FILE, SITE_DIR_MISSING, isDemoSite, readSiteConfig, siteDirectory, sitePaths } from './site-dir.mjs';

test('CODE_ROOT is the root of this repository (the one with package.json and scripts/)', () => {
  assert.equal(CODE_ROOT, path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..'));
  assert.ok(fs.existsSync(path.join(CODE_ROOT, 'package.json')));
});

test('siteDirectory: SITE_DIR relative to the working directory or absolute; without it an error (the engine has no site)', () => {
  assert.throws(() => siteDirectory({ env: {}, cwd: '/work' }), { message: SITE_DIR_MISSING });
  assert.throws(() => siteDirectory({ env: { SITE_DIR: '' }, cwd: '/work' }), { message: SITE_DIR_MISSING }, 'empty = not set');
  assert.equal(siteDirectory({ env: { SITE_DIR: '.demo/site' }, cwd: '/work' }), '/work/.demo/site');
  assert.equal(siteDirectory({ env: { SITE_DIR: '.' }, cwd: '/work' }), '/work');
  assert.equal(siteDirectory({ env: { SITE_DIR: '/sites/pavla' }, cwd: '/work' }), '/sites/pavla');
});

test('sitePaths: everything of a site inside its folder', () => {
  assert.deepEqual(sitePaths('/s'), {
    root: '/s',
    config: '/s/site.config.yaml',
    fonts: '/s/fonts',
    mockups: '/s/mockups',
    instagramScenes: '/s/mockups/instagram',
    homeScreenIcon: '/s/home-screen-icon.svg',
    public: '/s/public',
    dist: '/s/dist',
    previews: '/s/.previews',
  });
});

test('readSiteConfig: site.config.yaml of the folder', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'site-dir-'));
  fs.writeFileSync(path.join(dir, SITE_CONFIG_FILE), 'site:\n  title: Ukázka\n');
  assert.deepEqual(readSiteConfig(dir), { site: { title: 'Ukázka' } });
  assert.throws(() => readSiteConfig(path.join(dir, 'missing')), /ENOENT/);
});

test('isDemoSite: only an explicit demo: true', () => {
  assert.equal(isDemoSite({ demo: true }), true);
  for (const config of [{}, { demo: false }, { demo: 'true' }, null, undefined]) assert.equal(isDemoSite(config), false);
});
