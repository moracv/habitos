export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let response = await env.ASSETS.fetch(request);

    // Si no encontró el archivo
    if (response.status === 404 && url.pathname !== '/index.html') {
      response = await env.ASSETS.fetch(new Request(new URL('/index.html', url).toString(), request));
    }

    // Headers para manifest.json
    if (url.pathname === '/manifest.json') {
      const clonedResponse = response.clone();
      const newResponse = new Response(clonedResponse.body, clonedResponse);
      newResponse.headers.set('Content-Type', 'application/manifest+json; charset=utf-8');
      newResponse.headers.set('Cache-Control', 'max-age=86400, public');
      return newResponse;
    }

    // Headers para service-worker.js
    if (url.pathname === '/service-worker.js') {
      const clonedResponse = response.clone();
      const newResponse = new Response(clonedResponse.body, clonedResponse);
      newResponse.headers.set('Content-Type', 'application/javascript; charset=utf-8');
      newResponse.headers.set('Cache-Control', 'max-age=0, no-cache, no-store, must-revalidate');
      newResponse.headers.set('Service-Worker-Allowed', '/');
      return newResponse;
    }

    return response;
  }
};
