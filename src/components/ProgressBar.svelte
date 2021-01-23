<script>
	import { seekTime, setTime, progress, lock } from '@/audio-stores';

	const click = e => setTime.set(e.clientX / window.innerWidth);

	$: drag = {
		active: false,
		start: 0,
		end: 0,
		get delta() {
			return this.end - this.start;
		},
	};
	const downHandle = e => {
		e.preventDefault();
		drag.active = true;
		drag.start = e.clientX;
	};
	const downTHandle = () => {
		lock.set(true);
	};
	const upHandle = e => {
		e.preventDefault();
		drag.active = false;
		lock.set(false);
		drag.end = e.clientX;
		seekTime.set(drag.delta);
	};
	const upTHandle = e => {
		lock.set(false);
		setTime.set(e.changedTouches[0].clientX / window.innerWidth);
	};
	const wheelHandle = e => {
		e.preventDefault();
		seekTime.set(-e.deltaY / 60);
	};
	const moveHandle = e => {
		if (drag.active) {
			lock.set(true);
			progress.set((e.clientX / window.innerWidth) * 100);
		}
	};
	const moveTHandle = e => {
		progress.set((e.changedTouches[0].clientX / window.innerWidth) * 100);
	};
</script>

<div
	class="progress"
	on:click={click}
	on:mousedown={downHandle}
	on:mouseup={upHandle}
	on:mousemove={moveHandle}
	on:touchstart={downTHandle}
	on:touchend|passive={upTHandle}
	on:touchmove|passive={moveTHandle}
	on:wheel={wheelHandle}
>
	<div class="progress-bar" style={`width:${$progress}%`} />
</div>

<div class="pinned">
	<div class="scroller">
		<div class="music-info">Boards of Canada - Smokes Quantity</div>
	</div>
</div>

<style>
	.progress {
		cursor: pointer;
		height: 1vw;
		background-color: rgba(250, 250, 250, 0.4);
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: start;
		align-content: flex-start;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
	}

	.pinned {
		display: none;
		position: fixed;
		bottom: 0.1vw;
		left: 14%;
		height: 3vw;
		z-index: -1;
		width: 72%;
		max-width: 42em;
	}

	.scroller {
		overflow: hidden;
		position: relative;
		width: 100%;
		height: 100%;
	}

	.music-info {
		color: rgba(250, 250, 250, 1);
		font-size: 2vw;
		width: 100%;
		height: 100%;
		position: absolute;
		margin: 0;
		line-height: 3vw;
		text-align: center;
		-moz-transform: translateX(100%);
		-webkit-transform: translateX(100%);
		transform: translateX(100%);
		-moz-animation: scroller 20s linear infinite;
		-webkit-animation: scroller 20s linear infinite;
		animation: scroller 20s linear infinite;
	}

	@-moz-keyframes scroller {
		0% {
			-moz-transform: translateX(100%);
		}
		100% {
			-moz-transform: translateX(-100%);
		}
	}
	@-webkit-keyframes scroller {
		0% {
			-webkit-transform: translateX(100%);
		}
		100% {
			-webkit-transform: translateX(-100%);
		}
	}
	@keyframes scroller {
		0% {
			-moz-transform: translateX(100%);
			-webkit-transform: translateX(100%);
			transform: translateX(100%);
		}
		100% {
			-moz-transform: translateX(-100%);
			-webkit-transform: translateX(-100%);
			transform: translateX(-100%);
		}
	}

	.progress-bar {
		background-color: rgba(76, 0, 130, 0.4);
		height: inherit;
	}

	@media (max-width: 900px) {
		.progress {
			height: 3vw;
		}

		.pinned {
			display: block;
		}
	}
</style>
