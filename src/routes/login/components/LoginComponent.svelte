<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Form from "$lib/components/ui/form";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Fingerprint } from '$lib/icons';
	let { form, value = $bindable(), type,
		error, description, name, style, ...props } = $props()
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login/Register</Card.Title>
		<Card.Description>Enter your email below to login to your account.</Card.Description>
		<Card.Description>If this is your first time signing in, you will receive a verification code.</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-4">
		<div class="grid gap-2">
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input {...attrs} bind:value type="email" placeholder="m@example.com"/>
				</Form.Control>
				<Form.Description>This is your public display name.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

		</div>

	</Card.Content>
	<Card.Footer>
		<Form.Button class="w-full h-full grid grid-cols-3  items-center hover:bg-sky-600 bg-sky-700">
			<Fingerprint class="size-[38px] fill-white" />
			<span>Sign in</span>
		</Form.Button>

	</Card.Footer>
</Card.Root>
