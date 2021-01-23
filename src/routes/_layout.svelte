<script>
	import GlobalNav from '@/components/GlobalNav.svelte';
</script>

<main>
	<GlobalNav />
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
