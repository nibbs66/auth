<script lang="ts">
	import { Fingerprint , Mere} from '$lib/icons';
	import { TextInput, LoginInput, LoginComponent, VerificationPin } from './components';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { deserialize } from '$app/forms';
	import {  startRegistration, startAuthentication, platformAuthenticatorIsAvailable } from '@simplewebauthn/browser';

	import { invalidateAll } from '$app/navigation';
	import type { ActionResult } from '@sveltejs/kit';
	import { submit } from '../../formEnhancement';
	import * as Form from '$lib/components/ui/form';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';


	let { data } = $props();

	let form_data: SuperValidated<Infer<FormSchema>> = data.form;
	const form = superForm(form_data, {
		validators: zodClient(formSchema),
		onUpdated: ({ form: f }) => {

			if (f.valid) {
				 invalidateAll();
			}
			fidoCallback({ result: f.message, email: f.data.email });
		}
	});

	const { form: formData, enhance } = form;

	let fidoEmail: string = $state('');
	let fidoEnabled: boolean = $state(true);
	let error: string = $state('');
	let showModal: boolean = $state(false);
	let modalVerify: boolean = $state(false);
		let background = $state(data.background)

	async function fidoCallback(json: { result: Record<string, any>; email }) {
		const result = json.result;
		const email = json.email;

		const { url, intent } = result;

		if (result.type === 'failure') {
			console.log('error', result);
			error = result.data.message || 'No error specified';
			return;
		}

		if (intent === 'register') {

			await register(url, result, email);
		}

		// Not relevant here as we're registering a new account
		if (intent === 'login') {

			return await login(url, result, email);
		}
	}

	async function register(url: string, result: Record<string, any>, user: string) {


		try {
			const registration = await startRegistration(result.opts);

			// This will prompt the OS to walk the user through either giving their fingerprint or touching a key etc...

			const res = await fetch(url, {
				method: 'POST',
				body: JSON.stringify({ ...registration, intent: 'register', username: user }),
				headers: {
					accept: 'application/json',
					'Content-Type': 'application/json'
				}
			});
			if (res.status > 299) {
				const body = await res.json();

				error = body.message;
				return;
			}
				const valid = await res.json()

			//window.localStorage.setItem('email', fidoEmail)
			modalVerify = true;
		} catch (e: any) {
			console.log(e);
		}
	}
	async function login(url: string, result: Record<string, any>, user: string) {

	try {
		const authentication = await startAuthentication(result.opts);

		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({ ...authentication, intent: 'login', username: user }),
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
		const valid =  await res.json()

		window.localStorage.setItem('email', fidoEmail);
		window.location.replace('/');
	} catch (e: any) {
		console.log(e);
		error = 'Login was cancelled';
	}


}
let pin = $state();


let verifyCode = $derived.by(()=>{
	let number = Number(pin?.join(''));


if (!!number  && number.toString().length === 5) {

	window.location.replace(`/login/verify?code=${number}`)
}
})

</script>

<main class="h-full ">

	<div class="flex h-screen flex-col items-center justify-center">


		{#if fidoEnabled}
			{#if modalVerify}
				<VerificationPin oninput={verifyCode} bind:value={pin} />
			{:else}
				<form
					method="POST"

					use:enhance
					action="?/fido"

				>
					<LoginComponent {form} bind:value={$formData.email} />
				</form>
			{/if}
		{/if}
	</div>
	<div class:modal-show={showModal} id="myModal">
		{#if modalVerify}

			<TextInput
				class="w-full bg-transparent"

				name="code"
				title="Verification Code"
				description="Check your email for a confirmation link or paste the code here"
				backgroundColour="transparent"
				style="width: 100%"
			/>

		{/if}
	</div>
</main>

<style>
	main {

		display: grid;
		margin-top: 0;
	}

	h1,
	h2 {
		font-weight: 400;
		color: #ffffffaa;
	}

	p {
		color: #ffffff99;
		font-weight: 300;
		text-align: center;
		font-size: 1.2rem;
		margin-left: 2rem;
		margin-right: 2rem;
	}

	.empty {
		background-color: transparent;
		border: none;
	}

	.text {
		max-width: 800px;
		justify-self: center;
	}
	.error {
		color: #ee5646;
		font-weight: 400;
	}

	.buttons {
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
	}

	.fido {
		background-color: #5395ff;
		border: none;
		color: #ffffff;
		font-family: Quicksand;
		font-weight: 400;
		text-align: center;
		display: inline-grid;
		grid-template-columns: 48px 1fr;
		grid-template-rows: 1fr;
		grid-template-areas: 'icon text';
		align-items: center;
		padding-right: 2rem;
		width: 18rem;
		height: 50px;
		column-gap: 1rem;
		font-size: 1.2rem;
		cursor: pointer;
		padding-top: 6px;
		padding-bottom: 6px;
		padding-left: 12px;
		margin-right: auto;
		margin-left: auto;
	}

	.discord {
		background-color: rgba(88, 101, 242, 1);
		border: none;
		color: #ffffff;
		font-family: Quicksand;
		font-weight: 400;
		text-align: center;
		display: inline-flex;
		align-items: center;
		padding-right: 2rem;
		width: 18rem;
		height: 50px;
		column-gap: 1rem;
		font-size: 1.2rem;
		cursor: pointer;
	}

	.discord:hover {
		background-color: rgba(88, 101, 242, 0.815);
	}

	.discord img {
		padding: 10px;
		height: 30px;
	}

	.google-button {
		display: inline-flex;
		align-items: center;
		padding-right: 2rem;
		font-family: Quicksand;
		font-weight: 400;
		height: 50px;
		border: none;
		border-radius: 2px;
		width: 18rem;
		background-color: #4285f4;
		color: #fff;
		cursor: pointer;
		column-gap: 1rem;
		font-size: 1.2rem;
	}

	.google-button:hover {
		background-color: #1a71fc;
	}

	.google-button img {
		width: 42px;
		height: 42px;
		border-radius: 2px;
	}

	.google-button span {
		width: 100%;
	}

	#myModal.modal-show {
		display: block;
	}

	#myModal {
		display: none;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 9999;
		background-color: white;
		padding: 20px;
		grid-template-columns: 1fr auto auto;
		grid-template-areas: 'text cancel save';
		position: fixed;
		z-index: 99999;
		min-height: 3rem;
		background-color: #222;
		border-radius: 10px;
		border-style: none;
		padding: 0.5rem;
		padding-bottom: 2rem;
		box-shadow: 0 5px 10px 5px rgba(0, 0, 0, 0.5);
		width: 90%;
		max-width: 600px;
	}

	#overlay {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9998;
	}

	#overlay.open {
		display: block !important;
	}
</style>
