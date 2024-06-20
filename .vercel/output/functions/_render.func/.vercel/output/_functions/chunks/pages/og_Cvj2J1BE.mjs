import { g as generateOgImageForSite } from './index_qrca3Gov.mjs';

const GET = async () => new Response(await generateOgImageForSite(), {
  headers: { "Content-Type": "image/png" }
});

export { GET };
