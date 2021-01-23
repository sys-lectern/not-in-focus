<script>
	import ImageViewer from '@/components/ImageViewer.svelte';
	import bravepuppy from 'images/bravepuppy.jpg';
	import gaywave from 'images/gaywave.gif';
	import me from 'images/me.jpg';

	import Eye from 'svelte-material-icons/Eye.svelte';
	import { blur, fade } from 'svelte/transition';
	import { circOut, bounceIn } from 'svelte/easing';

	let puppy;
	$: expandPuppy = false;
	$: puppyvisible = false;

	$: expandMe = false;

	export let win;
	let smiley = ':<br />&nbsp;&nbsp;)';

	$: smile_and_wave = false;
	const timeToWave = _ => {
		if (document.documentElement.scrollHeight < window.scrollY + window.innerHeight * (6 / 3)) smile_and_wave = true;
	};
</script>

<svelte:window on:scroll={timeToWave} />

<div class="text">
	<h1>A Strongly Worded Letter for the Road</h1>

	<p>
		Appreciation is sometimes easy to come by, and other times not. Whichever part of that cycle you find yourself in at
		the moment, I hope you can handle just a few more paragraphs' worth.
	</p>

	<p>
		It would have been very special to have met you during some time when the world didn't feel like it was falling
		apart, and in person. Thanks to your excitement, compassion, conscientiousness, and willingness however, it's hard
		to say I feel like I missed out — if anything I feel very lucky. Lucky to live in a time where such a thing is
		possible from so far apart, and lucky that it felt so reciprocal.
	</p>

	<p>
		Once, you pointed out from a podcast I recommended what a cool thing it is to be able to draw inspiration from what
		others are willing to share, and how consequential that inspiration can be. Listening to the podcast myself, it
		wasn't something I had paid much attention to at the time. However, the fact that it stuck out to you, that you then
		shared it with me, and that it sticks with me to this day asserts how true it is, and I think that's frickin
		awesome. So awesome to me that it immediately made me want to incorporate it into my life, and feel comfortable
		sharing random weird thoughts/scribbles with you.
	</p>

	<p>
		Scribbling and poem-ing is something I'm very indecisive about, as in I'm unsure why I do it, if it's any good, or
		even if I can take any credit for the words that pass through my brain onto a computer screen. Yet despite all that,
		I enjoy your appreciation of them, and am comforted by that passage in dhalgren where Ernest Newboy speaks about
		experiencing pretty much all of those same thoughts himself. So thank you for your appreciation, and for creating
		that mental bond between me and this character. He may be fictional, but is certainly based on something real, and
		this makes me feel less alone.
	</p>

	<p>
		In hindsight, I was also very indecisive about getting one of your Christmas packages. Money was never the
		determining factor, instead it was my internal struggle at whether the fact that I would be buying a gift for myself
		would completely change its nature, to the point where it wouldn't feel like a gift. What gives me some regret, if
		anything, is not that I didn't buy it, but that it feels like I froze up and never admitted to how I felt. A weird
		me thing, if there ever was one, but I'm going to selfishly take up an entire paragraph as an opportunity to own up
		to it because I can.
	</p>

	<div id="smiley">{@html smiley}</div>

	<p>Fortunately and undeservedly, I ended up getting one anyway, so... best of both worlds?</p>

	<p>
		Our odd lasting bond in the time of covid (which you surely already know I mean odd in the best way) has brought so
		many good vibes, such great tunes, and very happy memories. It may or may not be a surprise, then that this bond has
		inspired me to make such bonds more accessible to those who need them most. And I don't doubt for a second, you will
		continue to be a super-spreader of all these soul-hugging gems to the new friends you make along your way. It's been
		very cool to see you find your place and mold it in an online community, all the while gaining confidence,
		overcoming fear, and still being impressively careful.
	</p>

	<p>
		From me, I can think of no thing better to end on than to acknowledge how open you are and maybe also have become. I
		know I said this before, to some extent, in my Thanksgiving message, but since then I feel I've expanded my own view
		of just what I meant by it. There's a lot of overlap between the openness and conscientiousness aspects, as your
		engagement with meaningful topics that others would habitually shy away from demonstrates. Nobody comes into this by
		accident, and I'm not so sure most people are even predisposed to notice it; I am endlessly impressed by it. Also
		previously mentioned in another message was your openness to accepting help, which is a combination of accepting
		others for their strengths and loving yourself even with your weaknesses. Lastly (probably unfairly since openness
		can mean so many more things, but in this context anyway), your openness to sexuality which is simultaneously more
		vulnerable but also more overlapping with everything above.
	</p>

	<p>
		In case it does happen, I want to reassure you that you'll be ok. You'll get through it because you're intelligent
		emotionally and equally resourceful. Because among your other skills is attracting a solid support structure. And
		also because... life is so much larger and has so much more potential for healing than we give it credit for when we
		find ourselves in a dark tunnel.
	</p>

	<p>
		Much like dhalgren, I could probably have condensed this down to a tenth as many words and retained 95% of its
		meaning. Perhaps also like dhalgren, though, that last 5% holds the key to something important, and I hope that's
		the case. While I'm terrified of what's to come for me, if I'll be able to stay out of trouble (without losing
		myself along the way), or if I'm even up to the task I've set for myself, there are always things and moments that
		give me hope. One being this adorable fucking meme:
	</p>

	<figure bind:this={puppy}>
		<div class="img-placeholder">
			{#if puppyvisible}
				<span on:click={() => (expandPuppy = true)}>
					<img src={bravepuppy} alt="Brave Puppy" id="puppy" in:blur={{ duration: 1800, delay: 50, easing: circOut }} />
				</span>

				{#if expandPuppy}
					<ImageViewer src={bravepuppy} alt="Brave Puppy" on:close={() => (expandPuppy = false)} />
				{/if}
			{:else}
				<div class="icon" on:click={() => (puppyvisible = true)}><Eye width="9vw" height="9vw" /></div>
			{/if}
		</div>
	</figure>

	<p>
		And another being the map stored in my brain that holds everything I wrote here about you. Feeling as though I'm
		entering a small death, I'm deeply tempted to map us onto Le Petit Prince in some way, but maybe the best thing
		about that book is that of all the characters in it, we are each comprised of several of them. Just another thing
		(as if showing us the importance of being curious & excited wasn't enough) that makes it beautiful. Instead, I'll
		end with something simple: I love you. I'll miss you.
	</p>

	<div class="david">
		<span on:click={() => (expandMe = true)}
			>David
			{#if smile_and_wave}
				<figure>
					<img src={gaywave} alt="Gaywave" id="gaywave" in:fade={{ duration: 600, easing: bounceIn, delay: 120 }} />
				</figure>
			{/if}
		</span>
		{#if expandMe}
			<ImageViewer src={me} alt="me" on:close={() => (expandMe = false)} />
		{/if}
	</div>

	<div class="end-spacer" />
</div>

{#if win && !!win.chrome}<style>
		.text {
			background-image: linear-gradient(transparent 10%, currentColor 30%, currentColor 70%, transparent 90%);
			-webkit-background-clip: text;
			background-clip: text;
			background-attachment: fixed;
			padding: 3%;
		}

		.text > * {
			color: transparent;
		}
	</style>{/if}

<style>
	h1 {
		text-align: center;
	}

	#puppy {
		width: 100%;
	}

	.img-placeholder {
		width: 100%;
		height: calc(min(86vw, 42em) / 1.8);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.img-placeholder .icon {
		cursor: pointer;
		color: rgba(255, 255, 255, 0.3);
		transition: 0.3s color;
	}

	.img-placeholder .icon:hover {
		color: rgba(211, 238, 243, 0.5);
	}

	.img-placeholder span {
		cursor: pointer;
	}

	.text {
		padding: 3%;
		border-radius: 3px;
	}

	#smiley {
		text-align: center;
		margin-right: 8px;
		font-size: 4.8vw;
	}

	@media (min-width: 800px) {
		#smiley {
			font-size: 38px;
		}
	}

	.david {
		color: white;
		width: 100%;
		height: 10vw;
		display: flex;
		justify-content: center;
		float: left;
		align-items: center;
		-webkit-tap-highlight-color: transparent;
	}
	.david span {
		cursor: pointer;
	}

	#gaywave {
		display: block;
		cursor: pointer;
		width: 1.6em;
		transform: translate(1.2em, -2.3em);
	}

	.end-spacer {
		display: block;
		height: 7vw;
	}
</style>
