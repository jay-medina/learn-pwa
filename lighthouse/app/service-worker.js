self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('static-cache-v1')
      .then(function (cache) {
        return cache.addAll([
          '.',
          'index.html',
          'css/main.css',
          'http://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
          '../../cache-api/app/images/still_life-1600_large_2x.jpg',
          '../../cache-api/app/images/still_life-800_large_1x.jpg',
          '../../cache-api/app/images/still_life_medium.jpg',
          '../../cache-api/app/images/still_life_small.jpg'
        ]);
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(caches.match(event.request)
    .then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
