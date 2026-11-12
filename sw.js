const CACHE = 'image-manager-shell-v1'
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg']
self.addEventListener('install', (event) => event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL))))
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== location.origin) return
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request).then((value) => value || caches.match('./index.html'))))
})
