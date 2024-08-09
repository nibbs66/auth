import { deserialize } from "$app/forms"

export async function submit(form: HTMLFormElement) {

	const data = new FormData(form)

	const response = await fetch(form.action, {
		method: 'POST',
		body: data,
		headers: {
			'x-sveltekit-action': 'true',
			accept: 'application/json'
		}
	})

	const text = await response.text()

	return deserialize(text)
}
