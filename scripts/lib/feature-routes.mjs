// The pages of a feature that can be switched off (scripts/lib/features.mjs) do not lie in src/pages (Astro builds every
// file there): they are in a folder starting with "_" (Astro leaves it out) and the build injects their routes only
// for a site that has the feature (astro.config.mjs: featureRoutesIntegration).

/** feature → the routes of its pages: the address (Astro pattern) and the file, relative to the code folder. */
export const FEATURE_ROUTES = {
  game: [
    ['/detail-dne', 'index.astro'],
    ['/detail-dne/[file]', '[file].ts'],
    ['/detail-dne/dnes.json', 'dnes.json.ts'],
    ['/detail-dne/data.json', 'data.json.ts'],
    ['/detail-dne/plan/[year].json', 'plan/[year].json.ts'],
    ['/detail-dne/muj', 'muj/index.astro'],
    ['/detail-dne/muj/data.json', 'muj/data.json.ts'],
    ['/detail-dne/muj-kviz', 'muj-kviz.astro'],
  ].map(([pattern, file]) => ({ pattern, entrypoint: `./src/pages/_detail-dne/${file}` })),
};

/** The routes to inject for the site `features` (featuresOf): the pages of every feature that is on. */
export const routesOf = (features) => Object.entries(FEATURE_ROUTES).filter(([name]) => features[name]).flatMap(([, routes]) => routes);

/** An Astro integration injecting `routesOf(features)`. */
export const featureRoutesIntegration = (features) => ({
  name: 'feature-routes',
  hooks: {
    'astro:config:setup': ({ injectRoute }) => {
      for (const route of routesOf(features)) injectRoute(route);
    },
  },
});
