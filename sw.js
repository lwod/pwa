const staticCacheName = 's-app-v1'

const assetUrls = [
	'index.html',
	'/js/app.js',
	'/css/styles.css'
]

self.addEventListener('install', async (event)=>{
	
	const cache = await caches.open(staticCacheName)
	await cache.addAll(assetUrls)
})

self.addEventListener('activate', ()=>{
	console.log('sw activate')
})

self.addEventListener('fetch', event=>{
	//console.log('Fetch', event.request.url)
	event.respondWith(cacheFirst(event.request))
})


const cacheFirst = async (request)=>{
	const cached = await caches.match(request)
	return  cached ?? await fetch(request)
}