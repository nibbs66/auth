<script>
	import { Fingerprint } from '$lib/icons';

	import { goto } from '$app/navigation';
import {avatar_names} from './data'
	let { data } = $props()
	//$inspect(data)

let screen = $derived.by(()=>{
	let background = 'pink'
	if (!!data.user[0]?.accentColour) {
		background = `${data.locals.user.accentColour}`
	}
	return background
})


	let image = $derived.by(()=>{
		const randomIndex = Math.floor(Math.random() * avatar_names.length);
		return avatar_names[randomIndex];
	})


</script>

<main class="min-h-screen flex flex-col space-y-4 items-center justify-center bg-white
">

	<h1>Home Page</h1>

	<button onclick={()=>goto('/logout')}  class="px-4 py-3 rounded-md bg-red-400 hover:bg-red-500 shadow-2xl hover:shadow-red-700 text-white transition duration-700 hover:duration-500" >Logout</button>
	<div >

		<Fingerprint class="fill-blue-500 h-20"/>
	</div>

</main>
https://api.dicebear.com/9.x/rings/svg?seed=Abby
