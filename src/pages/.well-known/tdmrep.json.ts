// /.well-known/tdmrep.json (W3C TDMRep): the rights of text and data mining of the whole site are reserved, the
// machine-readable opt-out of the EU directive 2019/790 article 4 (scripts/lib/seo.mjs tdmRepJson, also robots.txt).
import { tdmRepJson } from '../../../scripts/lib/seo.mjs';

export function GET() {
  return new Response(tdmRepJson(import.meta.env.BASE_URL), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
