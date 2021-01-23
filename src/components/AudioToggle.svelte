<script>
	import { Button } from 'svelte-mui/src';
	import MusicCircleOutline from 'svelte-material-icons/MusicCircleOutline.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { bounceInOut } from 'svelte/easing';

	export let show_tooltip, tip_text;
	const dispatch = createEventDispatcher();
	const click = () => dispatch('click');

	let height = 'min(4.2vw, 40px)',
		width = height;

	const handleOver = () => (show_tooltip = true);
	const handleLeave = () => (show_tooltip = false);

	let radio;
	const toggleMobileRadio = () => {
		radio.style.color = radio.style.color === 'rgb(211, 238, 243)' ? 'inherit' : 'rgb(211, 238, 243)';
	};

	onMount(() => window.setTimeout(() => (show_tooltip = false), 3600));
</script>

<div class="corner">
	{#if show_tooltip}
		<div class="tooltip" in:fade={{ ease: bounceInOut, duration: 120 }} out:fade={{ ease: bounceInOut, duration: 300 }}>
			{tip_text}
		</div>
	{/if}
	<Button
		fab
		icon
		ripple
		raised="false"
		color="rgba(76, 0, 130, 0.4)"
		on:click={click}
		on:mouseover={handleOver}
		on:mouseleave={handleLeave}
		on:touchend={toggleMobileRadio}
		bind:this={radio}
	><MusicCircleOutline {height} {width} /></Button
	>
</div>

<style>
	.corner {
		position: fixed;
		top: 2vw;
		right: 2vw;
		display: flex;
		align-content: flex-end;
		justify-content: flex-end;
		-webkit-tap-highlight-color: transparent;
	}

	@media (min-width: 900px) {
		.corner:hover .tooltip {
			visibility: visible;
			opacity: 1;
		}
	}

	.corner:active {
		transition: 0.05s;
	}

	.tooltip {
		background-color: rgba(0, 0, 0, 0.4);
		color: #fff;
		font-size: max(1vw, 10px);
		font-family: inherit;
		text-align: center;
		border-radius: 6px;
		padding: 3px;
		margin-top: 0.3vw;
		margin-right: 0.2vw;
		z-index: 1;
		height: 1.5vw;
		line-height: 1.5vw;
		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */
	}

	@media (max-width: 899px) {
		.tooltip {
			display: none;
		}
	}
</style>
