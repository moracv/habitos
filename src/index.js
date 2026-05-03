export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    let response = await env.ASSETS.fetch(request);

    // Si es 404 y no es un archivo específico, servir index.html
    if (response.status === 404 && !pathname.includes('.')) {
      response = await env.ASSETS.fetch(new Request(new URL('/index.html', url)));
    }

    // Crear una nueva respuesta con headers personalizados
    const newResponse = new Response(response.body, response);

    // Headers para manifest.json
    if (pathname.endsWith('manifest.json')) {
      newResponse.headers.set('Content-Type', 'application/manifest+json; charset=utf-8');
    }

    // Headers para service workers
    if (pathname.endsWith('.js') && (pathname.includes('service-worker') || pathname.includes('sw'))) {
      newResponse.headers.set('Content-Type', 'application/javascript; charset=utf-8');
      newResponse.headers.set('Service-Worker-Allowed', '/');
    }

    return newResponse;
  }
};
