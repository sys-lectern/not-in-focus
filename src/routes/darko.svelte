<script>
	import Audio from '@/components/Audio.svelte';
	import AudioToggle from '@/components/AudioToggle.svelte';
	import Frank from '@/components/Frank.svelte';
	import { Button, ExpansionPanel, Textfield } from 'svelte-mui/src';
	import CheckboxMultipleMarkedCircleOutline from 'svelte-material-icons/CheckboxMultipleMarkedCircleOutline.svelte';
	import { fade, slide } from 'svelte/transition';
	import { circInOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let value,
		muted = false,
		paused = true,
		volume = 1.0,
		group = '',
		loaded = false,
		show_tooltip = true;
	let sol, aerials, tierra, meerkeweil, ardor, inheritance, death, afterword, soul;

	const evenDate = () => new Date().getDate() % 2 === 0;
	const suffix = ` - 𝙩𝙤𝙙𝙖𝙮'𝙨 𝙢𝙤𝙤𝙙 𝙛𝙚𝙚𝙡𝙨 ${evenDate() ? '𝙚𝙫𝙚𝙣' : '𝙤𝙙𝙙'}...𝙥𝙚𝙧𝙝𝙖𝙥𝙨 𝙩𝙤𝙢𝙤𝙧𝙧𝙤𝙬 𝙖 𝙢𝙤𝙧𝙚 ${
		evenDate() ? '𝙤𝙙𝙙' : '𝙚𝙫𝙚𝙣'
	} 𝙙𝙚𝙣𝙤𝙪𝙚𝙢𝙚𝙣𝙩`;
	const endings = {
		even: {
			el: soul,
			name: 'Soul' + suffix,
			content:
				"Along the scorched riverside, our lonely android found its purpose for the coming 3 centuries. A soupy boiling pool (of what could once have been compared to a pearlescent puddle of gasoline in aesthetic) spilled over into a patch of barren dirt. It swallowed a full third of the pool's contents, and in doing so got high off the metallic fumes blossoming from its thoraxial cavity.<br /><br />\
			M crawled along the craggy landscape, crossing the novel marsh-like biome littered with green leafy scraps. Chemical analysis showed these were green from a high concentration of irradiated metallic compounds, rather than photosynthesis.<br /><br />\
			Returning to their makeshift enclave, M and Ao slid down to the watery cavern to cache their findings beneath the artificial UV light. Sheltered from the acid downpour falling above, the two huddled around the broken screen, playing back the same 3 corrupted files on repeat:<br /><br />\
			 - Intermittent bits of a ballet performance of Revel's Bolero from the 2010's.<br />\
			 - A narrated temporal triptych depicting the Hong Kong rebellion of 2019.<br />\
			 - Noisy snippets of a happy family vacation at the beach and an open-air market nearby, originally from the 1980's and later digitally transcribed",
		},
		odd: {
			el: soul,
			name: 'Lunar Quiet' + suffix,
			content:
				"Facing certain annihilation, the last significant chunk of moon cooled increasingly as Sol's spinning flares lashed out, searing the Mercurian surface from existence. The last remaining hope for the perseverence of life within the Oort cloud lie dormant within the icy veins of this hurtling dusty comet.<br /><br />\
				Jupiter's atmosphere was more than decimated by the quasar burst - its gases dispersing quickly among the outer rim of the system. At the moment of impact, the boulder had lost 30% of its mass in the burnout, scaling up to 65% in the subsequent collision. The remaining 35% was comprised of 3 solid ounces of microbial ice, 42 billion microbes (approx. 24 tardigrades), and 72 trillion particles that had in another time comprised a steel door in a bricked doorway.<br /><br />\
				Sol's new elliptical flare patterns began to stabilize, yielding a new Goldilocks zone centered near the equator of Europa.",
		},
		get todays() {
			return evenDate() ? this.even : this.odd;
		},
	};

	const pars = [
		{
			el: sol,
			name: 'Sol',
			content:
				'Catching a glimpse of the floating moon in the daytime sky, {{given_name}} crossed the invisible boundary between the in and outside; marked by an old brick-laid door frame; impregnated with an unpleasant-sounding metal door. A symbol of what she intended to leave behind by running away; by seeking a new adventure in some foreign place where the streets would have different smells; where the people would not have known her, and so could appreciate only the person she wished to become.',
		},
		{
			el: aerials,
			name: 'Aerials',
			content:
				"Down the aisle and to her left, she saw an impressive figure. Just the thought of him, as she turned to the back to wheel the cart through, she could feel herself growing warm and wet. The sun's warmth bouncing inside the cabin excited her, filling her with energy, and she had every intention of converting it into feverish sexual fervor if she could only get him and herself inside the lavatory behind him. Not wasting her breath on so much as a single word, she snatched the cigarette from between his index and middle fingers as she wheeled the cart back to its original position, and she flung it into the restroom on her way there, so there could be no mistaking her intentions. Having secured the brakes, she made her way once more through the cabin absorbing more radiating energy, and together with her growing anticipation made her burst into sweat. She turned left toward the entrance to find him sitting on the sink looking straight at her, as their gaze became a reciprocal lustful smile. As they fucked with disregard, the former twin giants shrunk to a blinding incandescence. They moaned sporadically; grinded increasingly chaotically.",
		},
		{
			el: tierra,
			name: 'Tierra Nuestra',
			content:
				'Holding her son in hand had grown to be unbearably inconvenient in the back seat of the Jeep. Even with all the windows down, the sweltering heat bonded with the dead air to bring her misery. By the time they came up to the checkpoint, she had already exceeded the limits of her tolerance merely sitting there, so when the poorly camouflaged man intruding on her personal space leaning into the window asked her for her bag, she snapped immediately back with a look of desperate frustration. Not wanting to find out to what extent this exasperated mother could turn a gaze into a brutal mauling, he thought better of it, figuring it would not be worth the trouble of being made fun of by his peers only to find a hidden stash of snacks, vapor-rub, and spare clothes. She thanked him in kind, by not yelling at or demolishing him right then and there.',
		},
		{
			el: meerkeweil,
			name: 'Meerkeweil',
			content:
				"For a moment, the vibe seemed to suggest that the twins had settled and come together in some sort of harmony. As the jeep jumped and crashed over another ridiculously sisyphean speed hump, the AK's clapped against one another, gagged slightly by the slim canvas exterior of the bag. They bonded briefly before exploding into a noisy, soundless, gaseous nova; the bullet casings nested inside the wheels came loose to make a yet more unbearable jangling; {{given_name}} wiped the sweat off her opposing forearm as she held in an otherwise trauma-inducing scream.",
		},
		{
			el: ardor,
			name: 'Ardor and Plume',
			content:
				"As the space around them began to cool, another ring went off in the background. He yelled at her to pick it up, and swiftly she deflected this ire towards one of the employees. Responding to an inquiry over the phone, the seamstress shoo'ed away the scurrying children. They circled around the active work area, one yelling after the other with accusatory remarks. The girl in front sought out towards her mother, wanting to demand the other girl's head be rightly smacked. Instead they were engulfed by cool shadow as their father stepped out from the kitchen and looked down at them, not meeting either in the eye. <br /><br />\
				Dragging them both by the ear towards the staircase, he yelled back at an unhappy {{given_name}} who was berating him for his abuse and aggression. It was obvious to the seamstress as she hung up the call he did not release the children for their discomfort, since the force with which he did left both eartips a fluorescent red. She took the children by the hand and up the stairs to their room, reminding them of the consequences of dicking around near the living room during work hours. Downstairs accusations of wasting too much time renovating the second house were met with retorts of selling what was allotted to be inheritance, and continued on to the ninth mention of divorce that week. <br /><br />\
				Rays of unadulterated entropic energy smashed through, leaving not cracks but dust. She screamed at him for refusing to so much as touch her outside the two times they made love and subsequent offspring. Then she told him to get the fuck out, to leave the smashed mess and just go. Energy-laden blood bubbled in his temple, and had it not been for the phone ringing once more, he might just have done the irreversible.",
		},
		{
			el: inheritance,
			name: 'Inheritance',
			content:
				"Curious in an existentially desperate way to find out the truth about papa, she inched nervously up the stairs to speak for the first time since her persistent memory had even developed with the one person that might be willing to give up some answers. Uncaringly, her nervousness went unrewarded, as she was fed the same rehearsed tales she had heard so many other times. He and her mom had been bold, fearless, and wildly successful. From the day they had met, their shared interest had been work, work, and basking in the light fantastique of the class they punched up towards. His mannerisms, their squabbles were of little importance now. <br /><br />\
				That night, she dreamt of what the funeral must have been like. Would she, if she could travel back to that point from now, have the courage to ask him? Perhaps her siblings were hellbent on keeping her confused, but he would have a responsibility to be honest... \
				Loud moans from the other room awoke her, and she went over to her mother's bedside. {{given_name}} was there and restless, and as she came to to the shoves of her daughter, she panted. The light, she said, was coming.",
		},
		{
			el: death,
			name: 'Death Process',
			content:
				'Wheezy and hoarse, she sat up to reach for the spoon. Shuffling slightly backwards to make herself as comfortable as possible sitting in her own piss, {{given_name}} smiled thinking of his face. A gap in years to her felt like nothing, whereas the gap he had filled in her with his love, even in this condition made her gleeful once again. Both daughters were off working for the day, but she had gotten the chance at least to admonish them for not looking after her. The son, on the other hand, dutifully tending to her needs and stupid whims, she thought had earned some answers. <br /><br />\
				Despite the family legacy being shrouded in mystery, personally she had only ever contributed to it out of apathy. She had no meek, nor bashful motive for withholding information. Her life was her own damn business, and any part she chose to share with others was a privilege they should be grateful for, because not now and not ever had she responded to weak groveling. Anyone so full of life as she understood the cost of realness, and if she could pay it so could they. \
				Far off and distant now, consciousness became a luxury she could no longer afford. Far off, the twins had spent the last of their energy, radiating all but the last remains of their life force to foreign lands. As a brown dwarf, they lingered now awaiting death, and as she wheezed one last time, they empathized between the three of them.',
		},
		{
			el: afterword,
			name: 'Afterword',
			content:
				"Years had passed and only now had she accepted {{given_name}}'s love for what it was. Her mother may not have been perfect, but she had remained a truer constant than her dad. All this time of uncertainty and anxiety had frozen her; kept her from appreciating what her mother once had - the reason why she endlessly sought new adventure. \
				Now, mom's spirit reached out as a beam of light, commuting boundless chaos into hope and resolution. The rays of a billion suns bounced in and around her.",
		},

		{ ...endings.todays },
	];

	let frank, frank_pos;
	$: frank_pos;
	const repositionFrank = () => (frank_pos = frank.getBoundingClientRect().y);

	$: is_darko = false;
	const isDarko = () => document.location.pathname.endsWith('darko');
	onMount(() => {
		repositionFrank();
		is_darko = isDarko();
	});

	const togglePause = () => (paused = !paused);
	const onchange = e => {
		const { name, expanded } = e.detail;
		if (expanded) {
			for (const p of pars) {
				if (p.name === name) {
					p.el.style.opacity = 1;
				} else p.el.style.opacity = 0.5;
			}
			window.setTimeout(() => {
				window.scrollTo({ top: frank_pos - 40, behavior: 'smooth' });
			}, 150);
		}
	};
	const setName = () => {
		if (paused) paused = false;
		loaded = true;
		value = value
			.split(' ')
			.map(v => v[0].toUpperCase() + v.slice(1).toLowerCase())
			.join(' ');
	};
	const submitHandler = e => {
		if (e.key === 'Enter') setName();
	};
	$: its_the_end = false;
	const isThisTheEnd = _ => {
		if (document.documentElement.scrollHeight < window.scrollY + window.innerHeight * (4 / 3)) its_the_end = true;
	};
</script>

<svelte:head>
	<title>Death of Luna</title>
</svelte:head>

<svelte:window on:scroll={isThisTheEnd} on:resize={repositionFrank} />

<Audio bind:muted bind:paused bind:volume src="The Instar Emergence.mp3" />

<div class="bg">
	<AudioToggle on:click={togglePause} tip_text="The Instar Emergence" {show_tooltip} />
	<Frank />
	<div class="body" bind:this={frank}>
		{#if !loaded}
			<div class="name-input">
				<Textfield type="text" message="A woman's name?" bind:value on:keyup={submitHandler} />

				{#if value && value.length}
					<Button fab outlined icon style="float:right;" on:click={setName}>
						<CheckboxMultipleMarkedCircleOutline />
					</Button>
				{/if}
			</div>
		{:else}
			<div class="overlay" in:slide={{ easing: circInOut, duration: 1200, delay: 300 }}>
				{#each pars as par}
					<div class="par-hover" bind:this={par.el}>
						<ExpansionPanel name={par.name} bind:group dense style="box-shadow:none;" on:change={onchange}>
							<span slot="icon" />
							<p>{@html par.content.replace('{{given_name}}', value)}</p>
						</ExpansionPanel>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	{#if its_the_end}
		<h1 in:fade={{ duration: 2400, delay: 300, easing: circInOut }}>Death of Luna</h1>
	{/if}
</div>

{#if is_darko}<style>
		:root {
			--color: white;
			--label: white;
			--primary: rgba(60, 93, 159, 0.8);
			--bg-color: black;
			--focus-color: black;
			--divider: black;
		}
	</style>{/if}

<style>
	h1 {
		color: rgba(255, 255, 255, 0.7);
		text-align: center;
		width: 100%;
		margin-bottom: 50vh;
		margin-top: 10vh;
	}

	.bg {
		background-color: black;
	}

	.body {
		margin-top: 45vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		-webkit-tap-highlight-color: transparent;
	}

	.overlay {
		background-color: transparent;
		color: rgba(255, 255, 255, 0.75);
		height: 100%;
		width: 72%;
		max-width: 42em;
		transition: 0.1s linear;
		margin-bottom: 50vh;
	}

	.name-input {
		width: 40%;
	}

	.par-hover {
		opacity: 0.5;
		transition: 0.3s opacity;
	}

	.par-hover:hover,
	.par-hover:active {
		opacity: 0.7;
	}

	@media (max-width: 1200px) {
		.body {
			margin-top: 0;
		}
	}
</style>
