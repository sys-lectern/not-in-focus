<script>
	import Backburger from 'svelte-material-icons/Backburger.svelte';
	import { Button, Sidepanel } from 'svelte-mui/src';
	import { goto } from '@sapper/app';

	let visible = false;

	const travel = async route => {
		await goto(route);
		visible = false;
	};
	const sitemap = [
		{ title: 'home', route: '/' },
		{ title: 'hello, frank', route: '/darko' },
		{ title: 'alter egos', route: '/owls' },
		{ title: 'contact', route: '/contact' },
	];
</script>

<div id="main-nav">
	<Button
		fab
		icon
		ripple
		raised
		color="rgba(76, 0, 130, 0.4)"
		style="top: 2vw; left: 2vw;"
		on:click={() => (visible = !visible)}
	>
		<Backburger width="100%" height="100%" color="white" />
	</Button>

	<Sidepanel bind:visible>
		{#each sitemap as page}
			<br />
			<Button shaped color="#313131" ripple on:click={() => travel(page.route)}>{page.title}</Button>
		{/each}
	</Sidepanel>
</div>

<style>
	#main-nav {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		-webkit-tap-highlight-color: transparent;
		z-index: 10;
	}

	:root {
		--bg-color: #f5f6f7;
		--button-font-family: 'gentium_basicregular', serif;
	}
</style>
