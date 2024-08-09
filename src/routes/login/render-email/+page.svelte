<script context="module">
	import Mail from '$lib/components/emails/mail_template.svelte';

	export async function get({ query }) {
		const name = query.get('name');
		const html = `
        <html lang="en">
        <head></head>
        <body>
        <p>Hello, ${name}!</p>
        <hr />
        <a href="https://svelte.dev">Visit Svelte</a>
        </body>
        </html>
    `;
		return { body: html };
	}
</script>
