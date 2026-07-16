const CACHE_NAME = 'v1'

const ASSETS = [
  '/',
  '/Logo.png',
  '/LogoWhite.png',
  '/web-app-manifest-192x192.png',
  '/web-app-manifest-512x512.png',
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .catch(err => console.log('Cache Fehler:', err))
  )
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    })
  )
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  // Logout NIE aus dem Cache bedienen!
  if (event.request.url.includes('/logout') || 
      event.request.url.includes('/api/auth/signout')) {
    event.respondWith(fetch(event.request))
    return
  }
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  )
})