// Optional features of a site: `features:` in site.config.yaml switches whole parts of the engine off for a site that
// does not want them (a site without the game Detail dne, without Pinterest, …). Every feature is on unless the
// settings say `false`, so a site without `features:` keeps everything. The messages are Czech: the owner of the site
// reads them in the check of the site folder (npm run check:site).

/** The features, in the order of the documentation: name → what the site loses without it. */
export const FEATURES = {
  game: 'hra Detail dne (stránky /detail-dne/, sekce na úvodní stránce, odkaz v menu, plán dnů, Můj Detail dne)',
  cinema: 'promítání („▶ Promítat“ a odkazy do něj v patičce a v zkratkách aplikace)',
  favorites: 'oblíbené obrazy návštěvníka (srdce, „Moje oblíbené“, stránka Můj výběr)',
  pinterest: 'Pinterest (kanál /pinterest.xml, piny děl, sdílení na Pinterest, profil v patičce)',
  instagram: 'exporty pro Instagram (fotky, příběhy, mřížka, texty příspěvků) a odkaz „Na Instagramu“ u děl',
  fler: 'exporty pro Fler (originály a mockupy s vodoznakem) a odkaz „Fler“ u děl',
};

/** The names of the features. */
export const FEATURE_NAMES = Object.keys(FEATURES);

/**
 * What is wrong with the `features` of a site config: not a mapping, an unknown name (a typo would silently keep the
 * feature on), a value that is not true or false. [] when fine (also without `features`).
 */
export function featureProblems(config) {
  const features = config?.features;
  if (features === undefined || features === null) return [];
  if (typeof features !== 'object' || Array.isArray(features)) return ['features: musí být seznam „funkce: true/false“'];
  const problems = [];
  for (const [name, value] of Object.entries(features)) {
    if (!(name in FEATURES)) problems.push(`features.${name}: tuhle funkci engine nezná (možnosti: ${FEATURE_NAMES.join(', ')})`);
    else if (typeof value !== 'boolean') problems.push(`features.${name}: hodnota musí být true nebo false`);
  }
  return problems;
}

/**
 * The features of a site config as { name: true|false }, every one on unless switched off. Throws (with every
 * problem of featureProblems) on a bad `features`, so a site with a typo never builds half-way.
 */
export function featuresOf(config) {
  const problems = featureProblems(config);
  if (problems.length) throw new Error(problems.join('; '));
  return Object.fromEntries(FEATURE_NAMES.map((name) => [name, config?.features?.[name] !== false]));
}

/** True when the site has the feature `name`; an unknown name is a mistake of the code, not of the site. */
export function featureOn(config, name) {
  if (!(name in FEATURES)) throw new Error(`unknown feature "${name}"`);
  return featuresOf(config)[name];
}
