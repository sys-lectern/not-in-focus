<script>
	import Audio from '@/components/Audio.svelte';
	import AudioToggle from '@/components/AudioToggle.svelte';
	import DownloadButton from '@/components/DownloadButton.svelte';
	import FadingText from '@/components/FadingText.svelte';
	import ProgressBar from '@/components/ProgressBar.svelte';

	import BookOpenPageVariant from 'svelte-material-icons/BookOpenPageVariant.svelte';

	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { circInOut } from 'svelte/easing';

	import background from 'images/background.jpg';

	let the_end,
		overlay,
		is_chrome_based,
		progress_bar_container,
		show_tooltip = true,
		audio_active = false,
		muted = false,
		paused = true,
		volume = 1.0;

	onMount(() => {
		is_chrome_based = window && !!window.chrome;
		window.setTimeout(() => (overlay.style.opacity = 1), 600);
	});
	const togglePause = () => {
		paused = !paused;
		if (!audio_active) {
			audio_active = true;
			window.setTimeout(() => (progress_bar_container.style.opacity = 1), 600);
		}
	};

	const handleKeyPress = e => {
		if (audio_active) {
			switch (e.key) {
				case ' ':
					e.preventDefault();
					togglePause();
					break;
				case 'ArrowUp':
					e.preventDefault();
					if (volume < 0.99) volume += 0.1;
					break;
				case 'ArrowDown':
					e.preventDefault();
					if (volume > 0.01) volume -= 0.1;
					break;
				case 'm':
					if (e.ctrlKey) muted = !muted;
					break;
				default:
			}
		}
	};

	const toggleReadMode = () => {
		let bg = overlay.style['background-color'];
		overlay.style['background-color'] = bg === 'rgba(0, 0, 0, 0.5)' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.5)';
	};

	const isThisTheEnd = _ => {
		const discrim = document.documentElement.scrollHeight < window.scrollY + window.innerHeight * (4 / 3);
		the_end.style.opacity = discrim ? 1 : 0;
	};
</script>

<svelte:head>
	<title>A Strongly Worded Letter for the Road</title>
</svelte:head>

<svelte:window on:keydown={handleKeyPress} on:scroll={isThisTheEnd} />

<Audio bind:muted bind:paused bind:volume src="Smokes Quantity.mp3" />

<div class="bg" style="background-image: url({background});">
	<div class="body">
		<AudioToggle on:click={togglePause} {show_tooltip} tip_text="Smokes Quantity" />

		<div class="overlay" bind:this={overlay}>
			<div class="toggle-read">
				<span on:click={toggleReadMode}><BookOpenPageVariant /></span>
			</div>
			<FadingText {is_chrome_based} />
		</div>

		<div class="end" bind:this={the_end}>
			<DownloadButton />
		</div>

		{#if audio_active}
			<span class="progress-bar-container" bind:this={progress_bar_container}>
				<ProgressBar />
			</span>
		{/if}
	</div>
</div>

<style>
	.bg {
		background-position: center center;
		background-size: cover;
		background-attachment: fixed;
	}

	.body {
		width: 86%;
		max-width: 42em;
		padding: 25vh 1em;
		margin: auto;
		background: transparent;
		overflow: hidden;
	}

	.body :last-child {
		margin-bottom: 0;
	}

	.overlay {
		background-color: rgba(0, 0, 0, 0.3);
		height: 100%;
		width: 100%;
		transition: 0.1s linear;
		margin-bottom: 50vh;
		opacity: 0;
		transition: 1.2s opacity;
	}

	.toggle-read {
		position: relative;
		top: 1vw;
		left: 1.5vw;
		color: rgba(255, 255, 255, 0.6);
		-webkit-tap-highlight-color: transparent;
	}

	.toggle-read span {
		width: 40px;
		cursor: pointer;
	}

	.toggle-read span:hover {
		color: rgba(211, 238, 243, 0.6);
	}

	.progress-bar-container {
		opacity: 0;
		transition: 3s opacity;
	}

	.end {
		padding-bottom: 25vh;
		opacity: 0;
		transition: 3s opacity;
	}
</style>
