<script>
	import FileDownload from 'svelte-material-icons/FileDownload.svelte';
	let height = '40px',
		width = height;
</script>

<div class="container">
	<a href="files/Road.txt" download="A Strongly Worded Letter for the Road">
		<div class="button">
			<div class="icon">
				<FileDownload {height} {width} />
			</div>
		</div>
	</a>
</div>

<style>
	.container {
		width: 100%;
		color: white;
		display: flex;
		justify-content: center;
		-webkit-tap-highlight-color: transparent;
	}

	.button {
		border: 2px solid white;
		border-radius: 100px;
		height: 60px;
		width: 60px;
		padding: 2%;
		transition: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
		display: flex;
		align-content: center;
		justify-content: center;
	}

	.icon {
		position: relative;
		top: 50%;
		transform: translateY(-35%);
		text-align: center;
	}

	.button:hover {
		box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
		color: rgb(211, 238, 243);
		transition: 0.3s;
	}

	.button:active {
		box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
		transition: 0.05s;
	}
</style>
