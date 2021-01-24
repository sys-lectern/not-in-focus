<script>
	$: formData = {
		subject: '',
		message: '',
	};

	const encode = data => {
		return Object.keys(data)
			.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
			.join('&');
	};

	function handleSubmit(e) {
		e.preventDefault();
		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: encode({ 'form-name': 'contact', ...formData }),
		})
			.then(() => alert('Success!'))
			.catch(error => alert(error));
	}
</script>

<form on:submit={handleSubmit} action="POST" name="contact" data-netlify="true">
	<input type="hidden" name="form-name" value="contact" />
	<label for="subject">Email</label>
	<input name="subject" placeholder="Subject" type="text" bind:value={formData.subject} />
	<label for="message">Message</label>
	<input name="message" placeholder="It works but its hella ugly" type="message" bind:value={formData.message} />
	<button type="submit"> Submit </button>
</form>
