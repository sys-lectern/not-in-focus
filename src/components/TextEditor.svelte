<script>
	import Editor from 'cl-editor/src/Editor.svelte';
	import { createEventDispatcher, onMount } from 'svelte';

	let text_editor, appWidth;

	const dispatch = createEventDispatcher();
	const dispatchKeydown = () => dispatch('keydown', text_editor.getHtml(true));

	let actions = [
		'undo',
		'redo',
		'b',
		'i',
		'u',
		'strike',
		'sup',
		'sub',
		'h1',
		'h2',
		'p',
		'blockquote',
		'ol',
		'ul',
		'hr',
		'left',
		'right',
		'center',
		'justify',
		'a',
		'forecolor',
		'backcolor',
		'removeFormat',
	];

	const resizeHandler = _ => {
		appWidth = window.innerWidth;
		text_editor.refs.editor.style.height = appWidth > 900 ? '30vw' : '40vw';
	};
	onMount(() => {
		resizeHandler();
		text_editor.$on('change', dispatchKeydown);
		text_editor.refs.editor.style['max-height'] = '30em';
	});
</script>

<svelte:window on:resize={resizeHandler} />

<div id="text-editor">
	<Editor {actions} bind:this={text_editor} />
</div>

<style>
	#text-editor {
		background-color: transparent;
		color: black;
		font-size: 14px;
		text-align: start;
	}
</style>
