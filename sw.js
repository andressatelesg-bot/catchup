// Service Worker desativado temporariamente
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
// Não interceptar nada — deixar tudo passar direto
