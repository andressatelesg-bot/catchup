const CACHE = 'catchup-v5';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const u = e.request.url;
  if(u.includes('googleapis.com')||u.includes('gstatic.com')||u.includes('firebase')||u.includes('anthropic')||e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(cached=>{
    if(cached) return cached;
    return fetch(e.request).then(res=>{
      if(res&&res.status===200&&res.type==='basic'){const cl=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cl));}
      return res;
    });
  }));
});
