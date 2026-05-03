self.addEventListener('install', e => {
  console.log('SW installed');
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  console.log('SW activated');
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  console.log('SW fetch:', e.request.url);
});
