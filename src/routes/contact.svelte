<script context="module">
	export async function preload(page) {
		const { query } = page;
		let visible = Reflect.has(query, 'content');
		return { visible };
	}
</script>

<script>
	import TextEditor from '@/components/TextEditor.svelte';
	import { Button, Snackbar, Textfield } from 'svelte-mui/src';
	import { onMount } from 'svelte';

	export let visible;
	let message = 'subject';
	$: text_area = '';
	onMount(() => {
		if (visible) {
			window.setTimeout(() => (window.location.search = ''), 3100);
		}
	});

	const handleError = e => console.error(e);
	const handleTextInput = ({ detail }) => {
		text_area = detail;
	};
</script>

<svelte:head>
	<title>Contact</title>
</svelte:head>

<Snackbar bottom bind:visible bg="rgba(76, 0, 130, 0.9)">Success!<span slot="action" timeout={3000} /></Snackbar>

<div class="body">
	<div class="bg">
		<h1>Contact</h1>
		<form on:error={handleError} name="contact" data-netlify="true">
			<span class="text-field">
				<Textfield {message} messagePersist type="text" name="subject" />
				<br />
				<textarea name="content" type="text" style="display:none">{text_area}</textarea>
				<TextEditor on:keydown={handleTextInput} />
			</span>
			<br />
			<Button ripple shaped raised color="rgba(76, 0, 130, 0.4)" type="submit">Submit</Button>
		</form>
	</div>
</div>

<style>
	.body {
		height: 100vh;
		width: 100%;
		margin: 0 auto;
		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.bg {
		height: 100%;
		width: 86%;
		max-width: 42em;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: #313131;
	}

	.text-field {
		width: 60vw;
	}
</style>
