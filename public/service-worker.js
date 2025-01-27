const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = ['/', '/your-body', '/auth', '/profile', '/manifest.json', '/_next/static/'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Добавление файлов в кэш');
            return cache.addAll(urlsToCache).catch((error) => {
                console.error('Ошибка при добавлении файлов в кэш:', error);
            });
        })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('Запрос:', event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                console.log('Возвращаем кэшированный ответ:', event.request.url);
                return response;
            }
            console.log('Запрашиваем из сети:', event.request.url);
            return fetch(event.request).then((networkResponse) => {
                return caches.open('my-pwa-cache-v1').then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        })
    );
});
