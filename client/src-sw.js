const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(
  // Match any request that ends with .css, .js, or image file extensions.
  ({url}) => url.pathname.endsWith('.css') || url.pathname.endsWith('.js') || url.pathname.match(/\.(?:png|jpg|jpeg|svg|gif)$/),
  new CacheFirst({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // Cache successful responses and opaque responses.
      }),
      new ExpirationPlugin({
        maxEntries: 60, // Limit the number of entries in the cache.
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache them for 30 Days.
      }),
    ],
  })
);

