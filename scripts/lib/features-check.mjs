// The check of a site with its optional features switched off (npm run check:features, in the check of the engine):
// the test site built without them has no page of theirs and no link to one. A build with everything on would not
// notice a page that only compiles, or only breaks, while its feature is off (or on).

import YAML from 'yaml';
import { FEATURE_ROUTES } from './feature-routes.mjs';

/** The text of a site.config.yaml with the features `names` switched off (the other settings and comments stay). */
export function withFeaturesOff(text, names) {
  const doc = YAML.parseDocument(text);
  for (const name of names) doc.setIn(['features', name], false);
  return String(doc);
}

/** The addresses of the pages of the features `names` known without data: their routes without a [parameter]. */
export const offAddresses = (names) => names.flatMap((name) => (FEATURE_ROUTES[name] ?? []).map((r) => r.pattern)).filter((p) => !p.includes('['));

/**
 * The links of the page `html` leading to one of `addresses` or under it ("/detail-dne" also "/detail-dne/muj/?x=1"),
 * of a site under the base path `base` ("/" or "/folder/"). Only href attributes: texts and scripts may name them.
 */
export function linksTo(html, addresses, base = '/') {
  const prefix = base.replace(/\/$/, '');
  return [...html.matchAll(/\shref="([^"]*)"/g)].map((m) => m[1]).filter((href) => {
    const path = href.replace(/^https?:\/\/[^/]+/, '').split(/[?#]/)[0];

    return addresses.some((a) => path === `${prefix}${a}` || path.startsWith(`${prefix}${a}/`));
  });
}
