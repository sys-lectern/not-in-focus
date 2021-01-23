<script>
	import { onMount } from 'svelte';
	import { Swipe, SwipeItem } from 'svelte-swipe';
	import ImageViewer from '@/components/ImageViewer.svelte';

	export let images;
	let SwipeComp,
		Viewer,
		expanded = false,
		active_item = 0;
	$: thumb_size = 0;

	const changeSlide = i => SwipeComp.goTo(i);
	const narrowViewport = () => (thumb_size = window.innerWidth <= 900 ? 6 : 2);
	onMount(narrowViewport);

	let src, alt;
	const toggleViewer = data => {
		src = data.src;
		alt = data.alt;
		expanded = true;
	};

	$: slideDelta = {
		active: false,
		start: 0,
		end: 0,
		get delta() {
			return this.end - this.start;
		},
		get direction() {
			return this.delta > 0;
		},
	};

	const incSlide = d => {
		let new_index = active_item;
		new_index += d ? -1 : 1;
		if (new_index < 0) new_index = images.length - 1;
		new_index %= images.length;
		SwipeComp.goTo(new_index);
	};
	const touchStart = e => (slideDelta.start = e.changedTouches[0].clientY);
	const touchEnd = e => {
		slideDelta.end = e.changedTouches[0].clientY;
		if (slideDelta.delta) incSlide(slideDelta.direction);
	};
</script>

<svelte:window on:resize={narrowViewport} />

<div class="swipe-holder">
	<Swipe bind:active_item bind:this={SwipeComp} is_vertical>
		{#each images as owl}
			<SwipeItem>
				<div
					class="zoom-trigger"
					on:click={() => toggleViewer(owl)}
					on:touchstart|passive={touchStart}
					on:touchend|passive={touchEnd}
				>
					<img src={owl.src} alt={owl.alt} />
				</div>
			</SwipeItem>
		{/each}
	</Swipe>
	<div class="caption">{images[active_item].caption}</div>
</div>
<div class="thumbnails">
	{#each images as owl, i}
		<img
			on:click={() => changeSlide(i)}
			style="height:{thumb_size}vw; width:{thumb_size}vw; cursor:pointer; border-radius: {active_item !== i
				? '100px'
				: '6px'};"
			src={owl.src}
			alt={owl.alt}
		/>
	{/each}
</div>

{#if expanded}
	<ImageViewer {src} {alt} bind:this={Viewer} on:close={() => (expanded = false)} />
{/if}

<style>
	.caption {
		width: 100%;
		height: 5%;
		color: gray;
		text-align: center;
		line-height: 4vh;
		font-weight: bold;
	}

	:root {
		--sv-swipe-panel-height: 100%;
		--sv-swipe-panel-width: 100%;
		--sv-swipe-panel-wrapper-index: 2;
		--sv-swipe-indicator-active-color: gray;
	}

	.swipe-holder {
		height: 90%;
		width: 35%;
		padding-right: 0.5vw;
		-webkit-tap-highlight-color: transparent;
	}

	.zoom-trigger {
		background-color: transparent;
		cursor: pointer;
		pointer-events: fill;
	}

	.thumbnails {
		line-height: 2vw;
		width: 2vw;
		flex-direction: column;
		-webkit-tap-highlight-color: transparent;
	}

	@media (max-width: 900px) {
		.swipe-holder {
			width: 60%;
		}

		.thumbnails {
			line-height: 6vw;
			width: 6vw;
		}
	}

	img {
		max-width: 100%;
		height: auto;
	}
</style>
