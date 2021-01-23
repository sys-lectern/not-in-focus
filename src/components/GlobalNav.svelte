<script>
	import Backburger from 'svelte-material-icons/Backburger.svelte';
	import { Button, Sidepanel } from 'svelte-mui/src';

	export let path;
	let visible = false;
	let style =
		path !== '/darko'
			? 'color:#313131;background-color:#f5f6f7'
			: 'color:rgba(60, 93, 159, 1.0);background-color:black;';
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
		<nav>
			<br />
			<a href="/"><Button shaped {style} ripple on:click={() => (visible = false)}>Home</Button></a>
			<br />
			<a href="/darko"><Button shaped {style} ripple on:click={() => (visible = false)}>Hello, Frank</Button></a>
			<br />
			<a href="/owls"><Button shaped {style} ripple on:click={() => (visible = false)}>Alter Egos</Button></a>
			<br />
			<a href="/contact"><Button shaped {style} ripple on:click={() => (visible = false)}>Contact</Button></a>
		</nav>
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

	a {
		text-decoration: none;
		color: #313131;
	}

	:root {
		/* --bg-color: #f5f6f7; */
		--button-font-family: 'gentium_basicregular', serif;
	}
</style>
