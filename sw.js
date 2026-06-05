/* UrbanX SW v4.8 — KILL MODE: SW-ul se auto-unregister, șterge tot cache-ul, eliberează platforma */
self.addEventListener('install', e => {
  console.log('[SW v4.8 KILL] Install — skipWaiting');
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', e => {
  console.log('[SW v4.8 KILL] Activate — UNREGISTER SE singur + șterge TOATE cache-urile');
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => {
        console.log('[SW v4.8 KILL] Sterg cache:', k);
        return caches.delete(k);
      })))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll())
      .then(clients => {
        clients.forEach(c => console.log('[SW v4.8 KILL] Eliberat client:', c.url));
      })
  );
});

// Fetch pass-through curat — NU interceptez, network direct
self.addEventListener('fetch', e => {
  // gol intenționat — lasă browserul să facă fetch normal
});
