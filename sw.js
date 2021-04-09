const staticCacheName = 's-app-v3'
const dynamitCacheName = 'd-app-v1'

const assetUrls = [
	'index.html',
	'/js/app.js',
	'/css/styles.css',
	'offline.html'
]

self.addEventListener('install', async (event) => {
	
	const cache = await caches.open(staticCacheName)
	await cache.addAll(assetUrls)
})

self.addEventListener('activate', async (event) => {
	
	const cacheNames = await caches.keys()
	await Promise.all(
		cacheNames
			.filter(name => name != staticCacheName)
			.filter(name => name!=dynamitCacheName)
			.map(name => caches.delete(name))
	)
	
})

self.addEventListener('fetch', event => {
	
	const {request} = event
	
	const url = new URL(request.url)
	if (url.origin === location.origin) {
		
		event.respondWith(cacheFirst(event.request))
		
	} else {
		
		event.respondWith(networkFirst(event.request))
		
	}
	
})


const cacheFirst = async (request) => {
	const cached = await caches.match(request)
	return cached ?? await fetch(request)
}

const networkFirst = async (request) => {
	const cache = await caches.open(dynamitCacheName)
	try {
		
		const response = await fetch(request)
		await cache.put(request, response.clone())
		return response;
		
	} catch (e) {
		
		const cached = await cache.match(request)
		return cached ?? await caches.match('./offline.html')
	}
}
