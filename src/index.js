export default {
  async fetch(request) {
    const url = new URL(request.url);
    let response = await env.ASSETS.fetch(request);

    // Headers para manifest.json
    if (url.pathname === '/manifest.json') {
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Content-Type', 'application/manifest+json; charset=utf-8');
      newResponse.headers.set('Cache-Control', 'max-age=86400, public');
      return newResponse;
    }

    // Headers para service-worker.js
    if (url.pathname === '/service-worker.js') {
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Content-Type', 'application/javascript; charset=utf-8');
      newResponse.headers.set('Cache-Control', 'max-age=0, no-cache, no-store, must-revalidate');
      newResponse.headers.set('Service-Worker-Allowed', '/');
      return newResponse;
    }

    // Redirigir rutas a index.html (SPA)
    if (response.status === 404) {
      return await env.ASSETS.fetch(new Request(new URL('/index.html', url).toString(), request));
    }

    return response;
  }
};
