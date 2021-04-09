const staticCacheName = 's-app-v1'

const assetUrls = [
	'index.html',
	'/js/app.js',
	'/css/styles.css'
]

self.addEventListener('install', (event)=>{
	
	event.waitUntil(
		caches.open(staticCacheName).then(cache => cache.addAll(assetUrls))
	)
	
})

self.addEventListener('activate', ()=>{
	console.log('sw activate')
})