export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // Servir archivos estáticos normalmente
  let response = await context.env.ASSETS.fetch(request);

  // Si no se encuentra y no es una API, servir index.html (SPA)
  if (response.status === 404 && !url.pathname.startsWith('/api/')) {
    response = await context.env.ASSETS.fetch(new Request(new URL('/index.html', url).toString(), request));
  }

  // Headers para PWA
  const headers = new Headers(response.headers);
  headers.set('Content-Type', 'application/javascript; charset=utf-8');

  // Headers de seguridad
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'SAMEORIGIN');

  // Service Worker headers
  if (url.pathname === '/service-worker.js') {
    headers.set('Cache-Control', 'max-age=0, no-cache, no-store, must-revalidate');
    headers.set('Service-Worker-Allowed', '/');
  }

  // Manifest headers
  if (url.pathname === '/manifest.json') {
    headers.set('Content-Type', 'application/manifest+json; charset=utf-8');
    headers.set('Cache-Control', 'max-age=86400, public');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers
  });
}
