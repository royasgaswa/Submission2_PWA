const CACHE_NAME = 'firstpwa';
var urlsToCache = [
	'/',
	'./nav.html',
	'./index.html',
	'./article.html',
	'./pages/home.html',
	'./pages/about.html',
	'./pages/contact.html',
	'./css/materialize.min.css',
	'./js/materialize.min.js',
	'./js/script.js',
	'./js/api.js',
	'./js/main.js',
	'./js/main-article.js',
	'./images/img-logo.png',
	'./images/img-bg1.jpg',
	'./images/img-bg2.jpg',
	'./images/img-bg3.jpg'
];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){	
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	let base_url= "https://api.football-data.org/";

	if(event.request.url.includes("football-data.org")){
		event.respondWith(async function(){
			const cache=await caches.open(CACHE_NAME);
			const cachedResponse=await cache.match(event.request);
			if(cachedResponse) return cachedResponse;
			const networkResponse= await fetch(event.request);
			event.waitUntil(
				cache.put(event.request,networkResponse.clone())
			);
			return networkResponse;
		}());
	}else{
		event.respondWith(
			caches.match(event.request).then(function(response){
				return response || fetch (event.request);
			})
		)
	}
});

