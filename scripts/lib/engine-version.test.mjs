import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ENGINE_REPOSITORY, VERSION_LAG_DAYS, evaluateEngineVersions, latestSafeVersion, latestVersion, planUpdate, tagCommits, updateDescription, usedVersion, versionNumber, withVersion } from './engine-version.mjs';

const check = (v) => `jobs:
  check:
    uses: ${ENGINE_REPOSITORY}/.github/workflows/site-check.yml@${v}
    with:
      engine-ref: ${v}
`;
const publish = (v) => `jobs:
  publish:
    uses: ${ENGINE_REPOSITORY}/.github/workflows/process-content.yml@${v}
    with:
      site-repository: owner/site
      # the version of the engine: the same as after @ above
      engine-ref: ${v}
    secrets:
      SITE_TOKEN: \${{ secrets.TOKEN }}
`;
const updater = `jobs:
  update:
    uses: ${ENGINE_REPOSITORY}/.github/workflows/engine-update.yml@main
`;

test('versionNumber and latestVersion: only tags vN, by number (v10 after v9), refs and peeled tags too', () => {
  assert.equal(versionNumber('v12'), 12);
  assert.equal(versionNumber('v1.2'), null);
  assert.equal(versionNumber('main'), null);
  assert.equal(latestVersion(['v1', 'v9', 'v10', 'v2', 'v10.1', 'test']), 'v10');
  assert.equal(latestVersion(['refs/tags/v1', 'refs/tags/v2^{}', 'refs/tags/v2']), 'v2');
  assert.equal(latestVersion(['main']), null);
});

test('usedVersion: the one version of the uses lines and engine-ref inputs; @main (the updater) does not count', () => {
  assert.deepEqual(usedVersion([{ path: 'check.yml', text: check('v1') }, { path: 'update.yml', text: updater }]), { version: 'v1', problems: [] });
  assert.deepEqual(usedVersion([{ path: 'other.yml', text: 'jobs: {}\n' }]), { version: null, problems: [] }, 'no call of the engine');
});

test('usedVersion: different versions in the workflows (or uses vs engine-ref) are a problem, no version', () => {
  const r = usedVersion([{ path: 'check.yml', text: check('v1') }, { path: 'deploy.yml', text: check('v2') }]);
  assert.equal(r.version, null);
  assert.match(r.problems[0], /různé verze enginu: v1 \(check\.yml\); v2 \(deploy\.yml\)/);
  const mixed = usedVersion([{ path: 'check.yml', text: check('v1').replace('engine-ref: v1', 'engine-ref: v2') }]);
  assert.equal(mixed.version, null, 'uses @v1 with engine-ref v2');
  assert.match(usedVersion([{ path: 'a.yml', text: check('feature-x') }]).problems[0], /„feature-x“ .* není tag vN/);
});

test('withVersion changes the uses lines and the engine-ref input, nothing else (comments, other repositories, @main)', () => {
  const other = 'uses: someone/else/.github/workflows/x.yml@v1\n';
  const text = publish('v1') + other + updater;
  const moved = withVersion(text, 'v1', 'v2');
  assert.equal(moved, publish('v2') + other + updater);
  assert.equal(withVersion(check('v1'), 'v1', 'v2'), check('v2'));
  assert.equal(withVersion(check('v11'), 'v1', 'v2'), check('v11'), 'v1 is not the start of v11');
  assert.equal(withVersion("      engine-ref: 'v1'\n", 'v1', 'v2'), "      engine-ref: 'v2'\n", 'quoted');
});

test('planUpdate: each repository behind the newest tag gets its changed workflows; up to date, newer or without the engine nothing', () => {
  const site = { name: 'site', files: [{ path: '.github/workflows/check.yml', text: check('v1') }, { path: '.github/workflows/deploy.yml', text: check('v1') }, { path: '.github/workflows/x.yml', text: 'jobs: {}\n' }] };
  const content = { name: 'content', files: [{ path: '.github/workflows/publish.yml', text: publish('v1') }, { path: '.github/workflows/engine-update.yml', text: updater }] };
  const r = planUpdate([site, content], ['v1', 'v2']);
  assert.equal(r.latest, 'v2');
  assert.deepEqual(r.problems, []);
  assert.deepEqual(r.updates.map((u) => [u.name, u.from, u.to, u.files.map((f) => f.path)]), [
    ['site', 'v1', 'v2', ['.github/workflows/check.yml', '.github/workflows/deploy.yml']],
    ['content', 'v1', 'v2', ['.github/workflows/publish.yml']],
  ]);
  assert.equal(r.updates[1].files[0].text, publish('v2'));
  assert.deepEqual(planUpdate([site, content], ['v1']).updates, [], 'already on the newest');
  assert.deepEqual(planUpdate([{ name: 'site', files: [{ path: 'c.yml', text: check('v3') }] }], ['v1', 'v2']).updates, [], 'newer than the newest tag: nothing');
  assert.deepEqual(planUpdate([site], []).problems, ['engine nemá žádnou verzi (tag vN)']);
  const broken = planUpdate([{ name: 'site', files: [{ path: 'a.yml', text: check('v1') }, { path: 'b.yml', text: check('v2') }] }], ['v3']);
  assert.deepEqual(broken.updates, [], 'mixed versions are reported, never guessed');
  assert.match(broken.problems[0], /^site: workflow používají různé verze/);
});

test('updateDescription: versions, links to the changelog and the comparison, how it merges', () => {
  const text = updateDescription({ from: 'v1', to: 'v2' });
  assert.match(text, /\*\*v1 → v2\*\*/);
  assert.match(text, /blob\/v2\/CHANGELOG\.md/);
  assert.match(text, /compare\/v1\.\.\.v2/);
  assert.match(text, /sloučí sám/);
});

test('tagCommits: the commit of each version tag, the peeled commit of an annotated tag wins, other tags left out', () => {
  const out = ['aaa\trefs/tags/v1', 'c01\trefs/tags/v1^{}', 'bbb\trefs/tags/v2', 'c02\trefs/tags/v2^{}', 'ddd\trefs/tags/v3', 'eee\trefs/tags/test', ''].join('\n');
  assert.deepEqual(tagCommits(out), { v1: 'c01', v2: 'c02', v3: 'ddd' }, 'v3 lightweight: its own sha is the commit');
});

test('latestSafeVersion: the newest tag whose commit passed the check of the engine; newer ones that did not are skipped', async () => {
  const commits = { v1: 'c1', v2: 'c2', v3: 'c3' };
  const asked = [];
  const passed = async (sha) => { asked.push(sha); return sha !== 'c3'; };
  assert.deepEqual(await latestSafeVersion(commits, passed), { version: 'v2', skipped: ['v3'] });
  assert.deepEqual(asked, ['c3', 'c2'], 'newest first, stops at the first passed');
  assert.deepEqual(await latestSafeVersion(commits, async () => false), { version: null, skipped: ['v3', 'v2', 'v1'] });
  assert.deepEqual(await latestSafeVersion({}, async () => true), { version: null, skipped: [] });
});

const used = (version) => ({ version, problems: [] });
const now = new Date('2026-11-30T12:00:00Z');
const daysAgo = (d) => new Date(now - d * 86_400_000).toISOString();

test('evaluateEngineVersions: both on the newest version is fine', () => {
  assert.deepEqual(evaluateEngineVersions({ site: used('v2'), content: used('v2'), latest: 'v2', now }), { ok: true, message: 'Engine v2 v repu webu i v obsahovém repu (nejnovější).' });
});

test('evaluateEngineVersions: behind while its pull request waits less than the days is fine, longer or without one fails', () => {
  const waiting = evaluateEngineVersions({ site: used('v2'), content: used('v1'), latest: 'v2', pulls: { content: daysAgo(1) }, now });
  assert.equal(waiting.ok, true);
  assert.match(waiting.message, /čeká na sloučení/);
  const late = evaluateEngineVersions({ site: used('v2'), content: used('v1'), latest: 'v2', pulls: { content: daysAgo(VERSION_LAG_DAYS + 1) }, now });
  assert.equal(late.ok, false);
  assert.match(late.message.split('\n')[0], /různé verze enginu \(repo webu v2, obsahové repo v1, nejnovější v2\).*\[engine-verze-ruzne\]$/);
  const both = evaluateEngineVersions({ site: used('v1'), content: used('v1'), latest: 'v2', now });
  assert.equal(both.ok, false, 'both behind, no pull request at all');
  assert.match(both.message, /repo webu je pořád na v1 \(bez pull requestu\).*\[engine-zastaraly\]/);
  const bothLate = evaluateEngineVersions({ site: used('v1'), content: used('v1'), latest: 'v2', pulls: { site: daysAgo(5), content: daysAgo(5) }, now });
  assert.match(bothLate.message, /pull request čeká 5 dní/);
});

test('evaluateEngineVersions: different versions without a newer one to wait for always fail; unknown versions fail', () => {
  assert.equal(evaluateEngineVersions({ site: used('v2'), content: used('v1'), latest: null, now }).ok, false);
  const r = evaluateEngineVersions({ site: { version: null, problems: ['workflow používají různé verze enginu: …'] }, content: used('v2'), latest: 'v2', now });
  assert.equal(r.ok, false);
  assert.match(r.message, /^Verzi enginu nejde určit: repo webu: workflow používají/);
  assert.match(evaluateEngineVersions({ site: used('v2'), content: used('v2'), latest: null, now }).message, /^Engine v2 v repu webu i v obsahovém repu\.$/, 'latest unknown: only the agreement');
});
