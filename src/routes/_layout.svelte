<script context="module">
	export async function preload(page) {
		const { path } = page;
		return { path };
	}
</script>

<script>
	import GlobalNav from '@/components/GlobalNav.svelte';
	export let path;
</script>

<main>
	<GlobalNav {path} />
	<slot />
</main>

<style>
	main {
		margin-left: 0;
		margin-top: 0;
		width: 100%;
		height: 100%;
		overflow-x: hidden;
	}
</style>
