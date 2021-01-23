<script>
	import { onMount } from 'svelte';
	import { seekTime, setTime, duration, lock, progress } from '@/utils/audio-stores';

	export let muted, paused, volume, src;
	let audio_player;

	onMount(() => {
		duration.set(audio_player.duration);
		setTime.subscribe(t => {
			if (!Number.isFinite(t * audio_player.duration)) return;
			audio_player.currentTime = t * audio_player.duration;
		});

		seekTime.subscribe(delta => {
			let new_time = audio_player.currentTime + delta;
			if (delta > 0 && new_time < audio_player.duration) audio_player.currentTime = new_time;
			else if (delta < 0 && 0 < new_time) audio_player.currentTime = new_time;
		});

		lock.subscribe(locked => {
			audio_player.ontimeupdate = () => {
				if (!locked) progress.set((audio_player.currentTime / audio_player.duration) * 100);
			};
		});
	});
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<audio bind:muted bind:paused bind:volume loop bind:this={audio_player}>
	<source {src} type="audio/mpeg" />
	Your browser does not support the audio tag.
</audio>
