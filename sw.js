// Catchup — Service Worker
// Incrementar CACHE_VERSION a cada deploy para forçar atualização
const CACHE_VERSION = 'catchup-v1';
const CACHE_FILES = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Instalar: cachear arquivos essenciais
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_VERSION).then(function(cache) {
      return cache.addAll(CACHE_FILES);
    }).then(function() {
      return self.skipWaiting(); // ativar imediatamente
    })
  );
});

// Ativar: limpar caches antigos
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) {
          return key !== CACHE_VERSION;
        }).map(function(key) {
          return caches.delete(key);
        })
      );
    }).then(function() {
      return self.clients.claim(); // assumir controle imediato
    })
  );
});

// Fetch: cache-first com fallback para rede
self.addEventListener('fetch', function(e) {
  // Só interceptar GETs do mesmo domínio
  if(e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if(cached) return cached;
      return fetch(e.request).then(function(response) {
        // Cachear respostas válidas
        if(response && response.status === 200) {
          var clone = response.clone();
          caches.open(CACHE_VERSION).then(function(cache) {
            cache.put(e.request, clone);
          });
        }
        return response;
      }).catch(function() {
        // Offline e não tem cache: retornar index.html
        return caches.match('/index.html');
      });
    })
  );
});
