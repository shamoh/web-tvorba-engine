import { test } from 'node:test';
import assert from 'node:assert/strict';
import YAML from 'yaml';
import { linksTo, offAddresses, withFeaturesOff } from './features-check.mjs';
import { FEATURE_NAMES, featuresOf } from './features.mjs';

test('withFeaturesOff: switches the features off, keeps the other settings and comments', () => {
  const text = withFeaturesOff('# my site\nsite:\n  url: https://x.test # address\n', ['game', 'fler']);
  assert.match(text, /# my site/);
  assert.match(text, /# address/);
  const config = YAML.parse(text);
  assert.equal(config.site.url, 'https://x.test');
  assert.deepEqual(featuresOf(config), { ...featuresOf({}), game: false, fler: false });
  assert.deepEqual(YAML.parse(withFeaturesOff('features:\n  game: true\n  cinema: false\n', ['game'])).features, { game: false, cinema: false });
});

test('offAddresses: the pages known without data of the switched off features', () => {
  const all = offAddresses(FEATURE_NAMES);
  for (const a of ['/detail-dne', '/detail-dne/muj-kviz', '/tvorba/vyber', '/pinterest.xml']) assert.ok(all.includes(a), a);
  assert.ok(!all.some((a) => a.includes('[')));
  assert.deepEqual(offAddresses(['cinema', 'fler']), [], 'features without pages');
});

test('linksTo: links to a page or under it, also whole addresses and a base path; texts and look-alikes are not', () => {
  const html = '<a href="/web/detail-dne/">a</a> <link href="https://x.test/web/pinterest.xml"> <a href="/web/detail-dne/muj/?obraz=a#b">b</a>'
    + ' <a href="/web/detail-dnes/">other</a> <a href="/web/tvorba/">t</a> <p>/web/detail-dne/</p> <div data-href="/web/detail-dne/"></div>';
  assert.deepEqual(linksTo(html, ['/detail-dne', '/pinterest.xml'], '/web/'), ['/web/detail-dne/', 'https://x.test/web/pinterest.xml', '/web/detail-dne/muj/?obraz=a#b']);
  assert.deepEqual(linksTo('<a href="/detail-dne">x</a>', ['/detail-dne']), ['/detail-dne']);
});
