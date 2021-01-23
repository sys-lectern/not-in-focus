<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { circInOut } from 'svelte/easing';

	export let alt, src;
	let open = true;

	const dispatch = createEventDispatcher();
	const close = () => {
		open = false;
		dispatch('close');
	};

	const transitionOpts = {
		duration: 600,
		easing: circInOut,
	};
</script>

{#if open}
	<div class="img-overlay" role="dialog" aria-modal="true" in:fade={transitionOpts} on:click={close}>
		<img {alt} {src} />
	</div>
{/if}

<style>
	.img-overlay {
		background-color: rgba(0, 0, 0, 0.8);
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 5;
	}

	.img-overlay img {
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: auto;
		max-width: 80%;
		max-height: 90%;
	}
</style>
