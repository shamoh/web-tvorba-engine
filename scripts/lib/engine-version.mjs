// The version of the engine a repository uses: the tag after @ in the `uses:` lines of its workflows that call the
// shared workflows of the engine, and the same tag in their `engine-ref:` input (both always alike). A new version of the
// engine is a new tag "v<number>" (v1, v2…); scripts/engine-update.mjs moves the workflows of a site and of its content
// repository to the newest one (the shared workflow .github/workflows/engine-update.yml, a pull request in each).
// A `uses:` line with @main (the updater itself) is no version and is never changed.

/** The repository of the engine as the `uses:` lines name it. */
export const ENGINE_REPOSITORY = 'shamoh/web-tvorba-engine';

const VERSION = /^v(\d+)$/;

/** The number of a version tag ("v12" -> 12), null for anything else (v1.2, main, a commit). */
export const versionNumber = (tag) => {
  const m = VERSION.exec(String(tag ?? '').trim());
  return m ? Number(m[1]) : null;
};

/** The newest version among the tags `tags` (names, e.g. from git ls-remote --tags), null without any. */
export function latestVersion(tags) {
  const versions = tags.map((t) => String(t).replace(/^refs\/tags\//, '').replace(/\^\{\}$/, '')).filter((t) => versionNumber(t) !== null);

  return versions.sort((a, b) => versionNumber(b) - versionNumber(a))[0] ?? null;
}

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** `uses: <engine>/.github/workflows/<file>@<ref>` lines of a workflow text: [{ ref, line }]. */
function usesRefs(text, repository) {
  const re = new RegExp(`uses:\\s*${escape(repository)}/\\.github/workflows/[\\w.-]+@([\\w.-]+)`, 'g');

  return [...text.matchAll(re)].map((m) => m[1]);
}

/** `engine-ref: <ref>` inputs of a workflow text. */
const engineRefs = (text) => [...text.matchAll(/^\s*engine-ref:\s*['"]?([\w.-]+)['"]?\s*$/gm)].map((m) => m[1]);

/**
 * The version of the engine the workflows `files` ([{ path, text }]) use: { version (null = none of them calls the
 * engine), problems (Czech) }. Every `uses:` of the engine (but @main) and every `engine-ref:` must name the same version.
 */
export function usedVersion(files, { repository = ENGINE_REPOSITORY } = {}) {
  const seen = new Map();
  for (const { path, text } of files) {
    for (const ref of [...usesRefs(text, repository), ...engineRefs(text)]) {
      if (ref === 'main') continue;
      if (!seen.has(ref)) seen.set(ref, new Set());
      seen.get(ref).add(path);
    }
  }
  const versions = [...seen.keys()];
  const problems = [];
  for (const v of versions) if (versionNumber(v) === null) problems.push(`verze enginu „${v}“ (${[...seen.get(v)].join(', ')}) není tag vN`);
  if (versions.length > 1) {
    problems.push(`workflow používají různé verze enginu: ${versions.map((v) => `${v} (${[...seen.get(v)].join(', ')})`).join('; ')}; mají mít všude stejnou`);
  }

  return { version: versions.length === 1 && !problems.length ? versions[0] : null, problems };
}

/** The workflow text `text` with the version `from` of the engine changed to `to` (`uses:` lines and `engine-ref:`). */
export function withVersion(text, from, to, { repository = ENGINE_REPOSITORY } = {}) {
  const uses = new RegExp(`(uses:\\s*${escape(repository)}/\\.github/workflows/[\\w.-]+@)${escape(from)}\\b`, 'g');
  const ref = new RegExp(`^(\\s*engine-ref:\\s*['"]?)${escape(from)}(['"]?\\s*)$`, 'gm');

  return text.replace(uses, `$1${to}`).replace(ref, `$1${to}$2`);
}

/**
 * What to do with the workflows of the repositories `repos` ([{ name, files: [{ path, text }] }]) given the tags of the
 * engine: { latest, updates: [{ name, from, to, files: [{ path, text }] (only the changed ones) }], problems }. A repository
 * already on the newest version (or newer), or without a call of the engine, needs nothing.
 */
export function planUpdate(repos, tags, { repository = ENGINE_REPOSITORY } = {}) {
  const latest = latestVersion(tags);
  const updates = [];
  const problems = [];
  if (!latest) return { latest, updates, problems: ['engine nemá žádnou verzi (tag vN)'] };
  for (const { name, files } of repos) {
    const used = usedVersion(files, { repository });
    problems.push(...used.problems.map((p) => `${name}: ${p}`));
    if (!used.version || versionNumber(used.version) >= versionNumber(latest)) continue;
    const changed = files.map((f) => ({ path: f.path, text: withVersion(f.text, used.version, latest, { repository }) }))
      .filter((f, i) => f.text !== files[i].text);
    updates.push({ name, from: used.version, to: latest, files: changed });
  }

  return { latest, updates, problems };
}

/** The Czech description of the pull request moving a repository from `from` to `to`. */
export function updateDescription({ from, to }, { repository = ENGINE_REPOSITORY } = {}) {
  return [
    `Nová verze enginu: **${from} → ${to}** (\`uses: …@${to}\` a \`engine-ref: ${to}\` ve všech workflow, které engine volají).`,
    '',
    `Co se změnilo: [CHANGELOG.md](https://github.com/${repository}/blob/${to}/CHANGELOG.md), rozdíl kódu `
      + `[${from}…${to}](https://github.com/${repository}/compare/${from}...${to}).`,
    '',
    'V repu webu se pull request sloučí sám, jakmile projde „Kontrola kódu“ (už s novou verzí enginu); v obsahovém repu ho'
      + ' sluč ručně. Obě repa mají mít stejnou verzi.',
    '',
    'Založeno automaticky (sdílené workflow `engine-update.yml` enginu).',
  ].join('\n');
}
