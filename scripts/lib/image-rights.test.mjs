import { test } from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { copyrightNotice, rightsXmp, usageTerms } from './image-rights.mjs';

const rights = { author: 'Pavla Kramolišová', title: 'Bobří hráz', year: '2026', pageUrl: 'https://pavla.kramolis.cz/tvorba/2026/bobri-hraz-jujn2/', termsUrl: 'https://pavla.kramolis.cz/podminky-uziti/' };

test('copyrightNotice: © year author', () => {
  assert.equal(copyrightNotice('Pavla Kramolišová', 2026), '© 2026 Pavla Kramolišová');
  assert.equal(copyrightNotice('Pavla Kramolišová', ''), '© Pavla Kramolišová');
});

test('rightsXmp: creator, title, copyright, credit, terms of use and the page of the work; never a licence', () => {
  const xmp = rightsXmp(rights);
  assert.ok(xmp.startsWith('<?xpacket begin=') && xmp.endsWith('<?xpacket end="w"?>'));
  for (const part of [
    '<dc:creator><rdf:Seq><rdf:li>Pavla Kramolišová</rdf:li></rdf:Seq></dc:creator>',
    '<dc:title><rdf:Alt><rdf:li xml:lang="x-default">Bobří hráz</rdf:li></rdf:Alt></dc:title>',
    '<dc:rights><rdf:Alt><rdf:li xml:lang="x-default">© 2026 Pavla Kramolišová</rdf:li></rdf:Alt></dc:rights>',
    '<photoshop:Credit>Pavla Kramolišová</photoshop:Credit>',
    '<xmpRights:Marked>True</xmpRights:Marked>',
    '<xmpRights:WebStatement>https://pavla.kramolis.cz/podminky-uziti/</xmpRights:WebStatement>',
    '<xmpRights:UsageTerms><rdf:Alt><rdf:li xml:lang="x-default">Všechna práva vyhrazena. Podmínky užití: https://pavla.kramolis.cz/podminky-uziti/</rdf:li></rdf:Alt></xmpRights:UsageTerms>',
    '<dc:relation><rdf:Bag><rdf:li>https://pavla.kramolis.cz/tvorba/2026/bobri-hraz-jujn2/</rdf:li></rdf:Bag></dc:relation>',
  ]) assert.ok(xmp.includes(part), part);
  assert.ok(!/licen[cs]/i.test(xmp), 'no licence');
});

test('rightsXmp: special characters are escaped, missing title, page and terms are left out', () => {
  const xmp = rightsXmp({ ...rights, title: 'Ráno <a> & "mlha"', pageUrl: '', termsUrl: '' });
  assert.ok(xmp.includes('Ráno &lt;a&gt; &amp; &quot;mlha&quot;'));
  assert.ok(!rightsXmp({ ...rights, title: '' }).includes('dc:title'));
  assert.ok(!xmp.includes('WebStatement') && !xmp.includes('UsageTerms') && !xmp.includes('dc:relation'));
  assert.equal(usageTerms('https://x.example/p/'), 'Všechna práva vyhrazena. Podmínky užití: https://x.example/p/');
});

test('rightsXmp survives in JPEG, WebP and AVIF', async () => {
  const base = sharp({ create: { width: 40, height: 30, channels: 3, background: '#88aacc' } }).withXmp(rightsXmp(rights));
  for (const buf of [await base.clone().jpeg().toBuffer(), await base.clone().webp().toBuffer(), await base.clone().avif().toBuffer()]) {
    const xmp = String((await sharp(buf).metadata()).xmp);
    assert.ok(xmp.includes('© 2026 Pavla Kramolišová') && xmp.includes('bobri-hraz-jujn2'));
  }
});
