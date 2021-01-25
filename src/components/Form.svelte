<script>
	$: formData = {
		subject: '',
		message: '',
	};

	const encode = data =>
		Object.keys(data)
			.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
			.join('&');

	const handleSubmit = e => {
		e.preventDefault();
		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: encode({ 'form-name': 'contact', ...formData }),
		})
			.then(() => alert('Success!'))
			.catch(error => alert(error));
	};
</script>

<div class="outer">
	<form on:submit={handleSubmit} action="POST" name="contact" data-netlify="true">
		<input type="hidden" name="form-name" value="contact" />
		<label for="subject">Email</label>
		<input name="subject" placeholder="Subject" type="text" bind:value={formData.subject} />
		<label for="message">Message</label>
		<input
			name="message"
			id="t-area"
			placeholder="It works but its hella ugly"
			type="message"
			bind:value={formData.message}
		/>
		<button type="submit"> Submit </button>
	</form>
</div>

<style>
	.outer {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		flex-direction: column;
	}

	form {
		max-width: 600px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		flex-direction: column;
	}

	input {
		width: 60vw;
		font-size: 14px;
	}

	#t-area {
		height: 15vw;
	}

	button {
		padding: 0.5vw;
	}
</style>
