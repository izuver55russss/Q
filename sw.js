// Список всех страниц, которые нужно кэшировать
const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/', // Главная страница
  '/index.html',  // Основной файл, если требуется
  '/page67146687.html',
  '/page67203275.html',
  '/page67203297.html',
  '/page67203303.html',
  '/page67203307.html',
  '/page67203409.html',
  '/page67203423.html',
  '/page67203443.html',
  '/page67203451.html',
  '/page67203457.html',
  '/page67203477.html',
  '/page67203507.html',
  '/page67203515.html',
  '/page67203525.html',
  '/page67203527.html',
  '/page67203537.html',
  '/page67203545.html',
  '/manifest.json', // Манифест
  '/icon-192.png',  // Иконка
  '/icon-512.png',  // Иконка
  '/sw.js',         // Сервис-воркер
];

// Установка кэша
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache); // Кэшируем страницы
      })
  );
});

// Обработка запросов и возврат из кэша
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Возвращаем кэшированный ответ, если он есть, или делаем запрос
        return cachedResponse || fetch(event.request);
      })
  );
});

// Обновление кэша при активации
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Удаляем старые кэши
          }
        })
      );
    })
  );
});