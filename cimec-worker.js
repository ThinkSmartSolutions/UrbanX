/**
 * Cloudflare Worker — Proxy CIMEC WFS/WMS pentru UrbanX TCI
 * Deploy: workers.cloudflare.com → New Worker → paste → Deploy
 * URL rezultat: https://cimec-proxy.YOURNAME.workers.dev
 * 
 * Gratuit: 100.000 req/zi — suficient pentru orice demo
 */

const ALLOWED_HOST = 'map.cimec.ro';

export default {
  async fetch(request) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': '*',
        }
      });
    }

    const url    = new URL(request.url);
    const target = url.searchParams.get('url');

    // Securitate: acceptă DOAR request-uri spre map.cimec.ro
    if (!target || !target.includes(ALLOWED_HOST)) {
      return new Response('{"error":"Allowed only for map.cimec.ro"}',
        { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    try {
      const resp = await fetch(decodeURIComponent(target), {
        headers: { 'User-Agent': 'UrbanX-TCI/1.0 (urbanx.ro)' }
      });

      const body = await resp.text();
      const ct   = resp.headers.get('Content-Type') || 'application/json';

      return new Response(body, {
        status: resp.status,
        headers: {
          'Content-Type': ct,
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=3600',  // 1h cache
          'X-Proxied-By': 'UrbanX-Worker',
        }
      });

    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }),
        { status: 502, headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }});
    }
  }
};
