// Who made a work and where it lives, written into its web images (XMP: Google Images shows creator and credit, and a
// downloaded picture keeps them) and used by the structured data of its page (ImageObject), from one place so the two
// never disagree. Only the author's own works: their web images, details, mockups and share image.

/** "© 2026 Pavla Kramolišová": the copyright notice of a work of the given year. */
export const copyrightNotice = (author, year) => `© ${[year, author].filter(Boolean).join(' ')}`;

const xml = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);

/** "Všechna práva vyhrazena. Podmínky užití: <address>": the usage terms in the XMP (xmpRights:UsageTerms). */
export const usageTerms = (termsUrl) => `Všechna práva vyhrazena. Podmínky užití: ${termsUrl}`;

/**
 * XMP packet of the web images of a work: creator (dc:creator), title (dc:title), copyright notice (dc:rights),
 * credit line (photoshop:Credit), "copyrighted" (xmpRights:Marked), the page Podmínky užití as the statement of the
 * rights (xmpRights:WebStatement) with the usage terms in words (xmpRights:UsageTerms), and the page of the work
 * (dc:relation). Never a licence: the author sells originals, not rights to use the pictures.
 */
export function rightsXmp({ author, title, year, pageUrl, termsUrl }) {
  const alt = (v) => `<rdf:Alt><rdf:li xml:lang="x-default">${xml(v)}</rdf:li></rdf:Alt>`;
  return [
    '<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>',
    '<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">',
    '<rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"',
    ' xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/">',
    `<dc:creator><rdf:Seq><rdf:li>${xml(author)}</rdf:li></rdf:Seq></dc:creator>`,
    ...(title ? [`<dc:title>${alt(title)}</dc:title>`] : []),
    `<dc:rights>${alt(copyrightNotice(author, year))}</dc:rights>`,
    `<photoshop:Credit>${xml(author)}</photoshop:Credit>`,
    '<xmpRights:Marked>True</xmpRights:Marked>',
    ...(termsUrl ? [`<xmpRights:WebStatement>${xml(termsUrl)}</xmpRights:WebStatement>`, `<xmpRights:UsageTerms>${alt(usageTerms(termsUrl))}</xmpRights:UsageTerms>`] : []),
    ...(pageUrl ? [`<dc:relation><rdf:Bag><rdf:li>${xml(pageUrl)}</rdf:li></rdf:Bag></dc:relation>`] : []),
    '</rdf:Description></rdf:RDF></x:xmpmeta>',
    '<?xpacket end="w"?>',
  ].join('');
}
