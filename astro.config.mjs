import { defineConfig } from 'astro/config';
import { readSiteConfig, siteDirectory, sitePaths } from './scripts/lib/site-dir.mjs';
import { STORAGE_PREFIX_GLOBAL, storagePrefixOf } from './scripts/lib/storage-prefix.mjs';
import { siteBase } from './scripts/lib/site-url.mjs';
import { FEATURES_GLOBAL, featuresOf } from './scripts/lib/features.mjs';
import { featureRoutesIntegration } from './scripts/lib/feature-routes.mjs';

// The folder of the site (SITE_DIR, scripts/lib/site-dir.mjs): its settings, static files and the built site.
// `npm run demo` builds the test site from its folder .demo/site (SITE_DIR=.demo/site).
const siteDir = siteDirectory();
const config = readSiteConfig(siteDir);
const paths = sitePaths(siteDir);

const features = featuresOf(config);

export default defineConfig({
  site: config.site.url,
  // a site in a folder of its host (site.url with a path, the test site on GitHub Pages): every page under it
  base: siteBase(config.site.url),
  publicDir: paths.public,
  outDir: paths.dist,
  output: 'static',
  // the pages of the features the site switched off are not built (scripts/lib/feature-routes.mjs)
  integrations: [featureRoutesIntegration(features)],
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // the prefix of what the browser of a visitor remembers (site.storagePrefix, scripts/lib/storage-prefix.mjs)
  // and the features of the site (scripts/lib/features.mjs), for the scripts of the browser
  vite: { define: { [STORAGE_PREFIX_GLOBAL]: JSON.stringify(storagePrefixOf(config)), [FEATURES_GLOBAL]: JSON.stringify(features) } },
});
