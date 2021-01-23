<script>
	import ImageCarousel from '@/components/ImageCarousel.svelte';

	import backache_owl from 'images/owls/RP-P-1925-887.jpg';
	import domme_owl from 'images/owls/RP-P-1918-1342.jpg';
	import dude_owl from 'images/owls/RP-P-1991-506.jpg';
	import fml_owl from 'images/owls/RP-P-1974-230.jpg';
	import hiker_owl from 'images/owls/RP-P-1933-609.jpg';
	import watery_eyes_owl from 'images/owls/RP-T-1994-27-78(V).jpg';
	import tipsy_owl from 'images/owls/RP-P-1918-1340.jpg';

	const images = [
		{ src: hiker_owl, alt: 'hiker owl', caption: "Hikin' Diney" },
		{ src: dude_owl, alt: 'dude owl', caption: "Dude Diney just like chillin' man..." },
		{ src: backache_owl, alt: 'backache owl', caption: 'Diney has a Backache' },
		{ src: domme_owl, alt: 'domme owl', caption: 'Vampy Diney Bullies that_sorry' },
		{ src: watery_eyes_owl, alt: 'watery eyes owl', caption: 'Diney Touched by a Sweet Comment' },
		{ src: tipsy_owl, alt: 'tipsy owl', caption: 'Tipsy Diney Tries not to Faceplant into the Apple Pie' },
		{ src: fml_owl, alt: 'fml owl', caption: "not rly Diney, he's just such a mood" },
	];
</script>

<svelte:head><title>Alter Egos</title></svelte:head>

<div class="bg">
	<div class="outer">
		<ImageCarousel {images} />
	</div>
</div>

<style>
	.bg {
		height: 100vh;
		width: 100%;
		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.outer {
		height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media (max-width: 900px) {
		.outer {
			height: 50vh;
		}
	}
</style>
