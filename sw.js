const CACHE_NAME = 'my-cache-v1';  // Название кэша
const urlsToCache = [
  '/', // Главная страница
  '/index.html',
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
  '/style.css', // Если у тебя есть отдельный CSS
  '/script.js',  // Если у тебя есть отдельный JS
  'https://raw.githubusercontent.com/izuver55russss/Q/main/icon-192.png', // Иконки
  'https://raw.githubusercontent.com/izuver55russss/Q/main/icon-512.png', // Иконки
];

// Установка кэша
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Кэширование ресурсов');
        return cache.addAll(urlsToCache);  // Кэшируем все страницы и ресурсы
      })
  );
});

// Обработка запросов (поиск в кэше и в сети)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)  // Пытаемся найти ответ в кэше
      .then((cachedResponse) => {
        return cachedResponse || fetch(event.request); // Если нет в кэше, то загружаем из сети
      })
  );
});

// Очистка старого кэша
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
