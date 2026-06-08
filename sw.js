const CACHE = 'catchup-v4';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Nunca interceptar Firebase, Google APIs, Anthropic, extensões
  if (url.includes('googleapis.com') ||
      url.includes('gstatic.com') ||
      url.includes('firebase') ||
      url.includes('anthropic.com') ||
      url.includes('chrome-extension') ||
      url.includes('vercel') ||
      e.request.method !== 'GET') {
    return;
  }

  // Só cachear arquivos locais do próprio domínio
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
    })
  );
});
