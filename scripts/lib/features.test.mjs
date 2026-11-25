import { test } from 'node:test';
import assert from 'node:assert/strict';
import { FEATURES, FEATURES_GLOBAL, FEATURE_NAMES, SITE_FEATURES, featureOn, featureProblems, featuresOf } from './features.mjs';

test('every feature is on without `features` and in an empty one', () => {
  for (const config of [undefined, null, {}, { features: null }, { features: {} }]) {
    assert.deepEqual(featuresOf(config), Object.fromEntries(FEATURE_NAMES.map((n) => [n, true])), JSON.stringify(config));
  }
  assert.deepEqual(FEATURE_NAMES, ['game', 'cinema', 'favorites', 'pinterest', 'instagram', 'fler']);
});

test('false switches a feature off, only that one; true and an omitted one stay on', () => {
  const config = { features: { game: false, fler: false, cinema: true } };
  assert.equal(featureOn(config, 'game'), false);
  assert.equal(featureOn(config, 'fler'), false);
  assert.equal(featureOn(config, 'cinema'), true);
  assert.equal(featureOn(config, 'pinterest'), true);
});

test('featureProblems: an unknown name, a non-boolean value, not a mapping; none for a good one', () => {
  assert.deepEqual(featureProblems({ features: { game: false } }), []);
  assert.match(featureProblems({ features: { gane: false } })[0], /^features\.gane: tuhle funkci engine nezná \(možnosti: game, cinema/);
  assert.deepEqual(featureProblems({ features: { game: 'no' } }), ['features.game: hodnota musí být true nebo false']);
  assert.deepEqual(featureProblems({ features: { game: 0 } }), ['features.game: hodnota musí být true nebo false']);
  assert.match(featureProblems({ features: ['game'] })[0], /^features: musí být seznam/);
  assert.equal(featureProblems({ features: { x: 1, game: 2 } }).length, 2, 'every problem is reported');
});

test('featuresOf throws a bad configuration (never half-way), featureOn an unknown feature name', () => {
  assert.throws(() => featuresOf({ features: { gane: false } }), /features\.gane/);
  assert.throws(() => featureOn({}, 'gane'), /unknown feature "gane"/);
});

test('every feature says what a site loses without it', () => {
  for (const [name, doc] of Object.entries(FEATURES)) assert.ok(doc.length > 20, name);
});

test('the build defines the features (astro.config.mjs) under the name the module reads; in Node everything is on', async () => {
  const fs = await import('node:fs');
  const astroConfig = fs.readFileSync(new URL('../../astro.config.mjs', import.meta.url), 'utf8');
  assert.match(astroConfig, /\[FEATURES_GLOBAL\]: JSON\.stringify\(features\)/);
  const source = fs.readFileSync(new URL('./features.mjs', import.meta.url), 'utf8');
  assert.ok(source.includes(`typeof ${FEATURES_GLOBAL} === 'object' ? ${FEATURES_GLOBAL} :`));
  assert.deepEqual(SITE_FEATURES, featuresOf({}));
});
