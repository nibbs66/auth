<script lang="ts">
	import { Button, Hr, Html, Text, Head } from 'svelte-email-tailwind';
	let {name = 'World'} = $props()
</script>

<Html lang="en">
<Head>
	<title>My email</title>
	<meta name="description" content="My email description" />

</Head>
<Text class="md:text-[18px] text-[24px]">
	Hello, {name}!
</Text>
<Hr />
<Button href="https://svelte.dev">Visit Svelte</Button>
</Html>
