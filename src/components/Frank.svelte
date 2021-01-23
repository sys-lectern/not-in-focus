<script>
	import { onMount } from 'svelte';
	import Frank from '@/utils/frank.js';

	let ParticlesComponent, particlesContainer, outer;

	$: scale = 2;
	$: spread = 30;
	$: density = 400;
	$: opacity = 0.5;
	$: particle_opacity = 0.3;
	$: particle_container_height = 0;

	onMount(async () => {
		const module = await import('svelte-particles');
		ParticlesComponent = module.default;
		particle_container_height = outer.getBoundingClientRect().height;
	});

	const onParticlesLoaded = e => (particlesContainer = e.detail.particles);
	const toggleParticles = () => {
		particle_container_height >= window.scrollY ? particlesContainer.play() : particlesContainer.pause();
	};
	const rescale = _ => {
		particle_container_height = outer.getBoundingClientRect().height;
		scale = window.innerWidth / window.innerHeight / 1.15;
		density = scale * 230;
		if (window.innerWidth < 900) {
			spread = 20;
			opacity = 0.6;
			particle_opacity = 0.3;
		} else {
			spread = 30;
			opacity = 0.3;
			particle_opacity = 0.4;
		}
	};
	onMount(rescale);

	$: particlesConfig = {
		detectRetina: false,
		interactivity: {
			events: {
				onHover: {
					enable: true,
					mode: 'bubble',
				},
			},
			modes: {
				bubble: {
					distance: 40,
					duration: 2,
					opacity: 2,
					size: 2,
				},
				grab: {
					distance: 400,
				},
				slow: {
					factor: 1,
					radius: 0,
				},
			},
		},
		particles: {
			color: {
				value: 'rgb(204, 169, 212)',
			},
			links: {
				color: {
					value: 'rgb(124, 192, 248)',
				},
				distance: spread,
				enable: true,
				opacity: particle_opacity,
			},
			move: {
				attract: {
					rotate: {
						x: 600,
						y: 1200,
					},
				},
				enable: true,
				outModes: {
					default: 'bounce',
					bottom: 'bounce',
					left: 'bounce',
					right: 'bounce',
					top: 'bounce',
				},
				speed: 1,
			},
			number: {
				density: {
					area: 2000,
				},
				value: density,
			},
			opacity: {
				value: 0.4,
				animation: {
					enable: true,
					minimumValue: 0.05,
				},
			},
			size: {
				random: {
					enable: true,
				},
				value: 1,
				animation: {
					minimumValue: 0.1,
					speed: 40,
				},
			},
			stroke: {
				color: {
					value: '#ffffff',
					animation: {
						enable: false,
						speed: 1,
						sync: true,
					},
				},
			},
		},
		polygon: {
			draw: {
				enable: true,
				stroke: {
					color: {
						value: 'rgba(60, 93, 159, 1.0)',
					},
					width: 0.75,
					opacity: opacity,
				},
			},
			enable: true,
			inline: {
				arrangement: 'equidistant',
			},
			move: {
				radius: 10,
				type: 'path',
			},
			scale: scale,
			type: 'inline',
			data: Frank,
			position: {
				x: 50,
				y: 50,
			},
		},
	};
</script>

<svelte:window on:resize={rescale} on:scroll={toggleParticles} />

<div class="darko" bind:this={outer}>
	<svelte:component
		this={ParticlesComponent}
		id="tsparticles"
		options={particlesConfig}
		on:particlesLoaded={onParticlesLoaded}
	/>
</div>

<style>
	.darko {
		margin-top: -10vh;
		height: 50vh;
	}

	@media (max-width: 1200px) {
		.darko {
			margin-top: 0;
		}
	}
</style>
