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

const tagName = (t) => String(t).replace(/^refs\/tags\//, '').replace(/\^\{\}$/, '');

/** The newest version among the tags `tags` (names, e.g. from git ls-remote --tags), null without any. */
export function latestVersion(tags) {
  const versions = tags.map(tagName).filter((t) => versionNumber(t) !== null);

  return versions.sort((a, b) => versionNumber(b) - versionNumber(a))[0] ?? null;
}

/**
 * The commits of the version tags in the output of `git ls-remote --tags` ("<sha>\trefs/tags/v2" and, for an annotated
 * tag, "<sha>\trefs/tags/v2^{}" = its commit, which wins): { v2: <commit sha> }.
 */
export function tagCommits(lsRemote) {
  const commits = {};
  for (const line of String(lsRemote).split('\n')) {
    const [sha, ref] = line.split('\t');
    if (!sha || !ref) continue;
    const name = tagName(ref);
    if (versionNumber(name) === null) continue;
    if (ref.endsWith('^{}') || !(name in commits)) commits[name] = sha;
  }

  return commits;
}

/**
 * The newest safe version: the newest tag vN whose commit passed the check of the engine (`passed(sha)`: async,
 * true when a run of "Kontrola kódu" on that commit succeeded). Returns { version, skipped: [newer tags not passed] }.
 */
export async function latestSafeVersion(commits, passed) {
  const names = Object.keys(commits).sort((a, b) => versionNumber(b) - versionNumber(a));
  const skipped = [];
  for (const name of names) {
    if (await passed(commits[name])) return { version: name, skipped };
    skipped.push(name);
  }

  return { version: null, skipped };
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

/** Days a repository may stay behind the newest safe version (its pull request waiting) before the health check fails. */
export const VERSION_LAG_DAYS = 3;

/**
 * The health check of the versions of the engine (Czech): `site` and `content` = usedVersion of the workflows of the
 * repository of the site and of the content repository, `latest` = the newest safe version (null = unknown),
 * `pulls` = { site, content }: the creation time of an open pull request engine/update there (null = none).
 * Fine when both use the same version and it is the newest; a repository behind is fine for `days` while its pull
 * request waits; otherwise a problem: different versions [engine-verze-ruzne], behind [engine-zastaraly].
 */
export function evaluateEngineVersions({ site, content, latest, pulls = {}, now = new Date(), days = VERSION_LAG_DAYS }) {
  const broken = [['repo webu', site], ['obsahové repo', content]].filter(([, u]) => u.problems.length);
  if (broken.length) {
    return { ok: false, message: `Verzi enginu nejde určit: ${broken.map(([label, u]) => `${label}: ${u.problems.join('; ')}`).join(' · ')} [engine-verze-ruzne]` };
  }
  const repos = [['repo webu', site.version, pulls.site], ['obsahové repo', content.version, pulls.content]];
  const behind = latest ? repos.filter(([, v]) => v && versionNumber(v) < versionNumber(latest)) : [];
  const age = (created) => (created ? (now - new Date(created)) / 86_400_000 : null);
  const late = behind.filter(([, , created]) => age(created) === null || age(created) > days);
  const names = repos.map(([label, v]) => `${label} ${v ?? '–'}`).join(', ');
  if (site.version !== content.version && (!behind.length || late.length)) {
    return { ok: false, message: `Repo webu a obsahové repo používají různé verze enginu (${names}${latest ? `, nejnovější ${latest}` : ''}); mají mít stejnou. [engine-verze-ruzne]\nSluč pull request „Engine: nová verze“ (větev engine/update), nebo spusť „Nová verze enginu“ v obsahovém repu.` };
  }
  if (late.length) {
    return { ok: false, message: `Engine ${latest} je venku, ale ${late.map(([label, v, created]) => `${label} je pořád na ${v}${created ? ` (pull request čeká ${Math.floor(age(created))} dní)` : ' (bez pull requestu)'}`).join(', ')}. [engine-zastaraly]\nZkontroluj běhy „Nová verze enginu“ v obsahovém repu a kontrolu pull requestu „Engine: nová verze“.` };
  }
  if (behind.length) return { ok: true, message: `Engine ${latest} čeká na sloučení (${names}).` };

  return { ok: true, message: `Engine ${site.version ?? '–'} v repu webu i v obsahovém repu${latest ? (site.version === latest ? ' (nejnovější)' : `, nejnovější ${latest}`) : ''}.` };
}
