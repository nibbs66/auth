<script>
	import { Button, Hr, Html, Text, Head, Link } from 'svelty-email';


	let { origin, code, expires } = $props()

</script>

<Html lang="en">
<Head/>

<Text style={{color: 'blue'}}>
Thank you for signing up.
</Text>
<Text style={{color: 'blue'}}>
	Your verification code is:
</Text>
<Text style={{fontWeight: 'bold'}}>{code}</Text>
<Text>
	Please note: This code will expire in 1 hour ({expires})
</Text>
<Hr />
<Link href="{origin}/login/verify?code={code}">Visit Svelte</Link>


</Html>
