window.addEventListener('load', async () => {
	await loadPosts()
})

const loadPosts = async () => {
	const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=11')
	const data = await res.json()
	
	const container = document.querySelector('#posts')
	container.innerHTML = data.map(toCard).join('\n')
}

const toCard = (post) => {
	return `
<div class="card">
<div class="card-title">
${post.title}
</div>

<div class="card-body">
${post.body}
</div>

</div>`
}
