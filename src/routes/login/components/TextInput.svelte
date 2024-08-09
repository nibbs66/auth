<script lang="ts">
	import { Input } from "$lib/components/ui/input";

	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()



	let textElement: HTMLInputElement
let {backgroundColour = 'rgba(0,0,0,0.25)', title = 'Title', placeholder, value = $bindable(), type,
	error, description, name, style, ...props } = $props()
	const numericValidation = (e: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }) => {
		const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight']
		if (allowed.indexOf(e.key) > -1) return

		const regex = /^[0-9]*\.?[0-9]*$/
		const newText = `${e.currentTarget.innerText}${e.key}`
		if (!newText.match(regex)) {
			return e.preventDefault()
		}
	}

	function focusMe(e: MouseEvent & { currentTarget: EventTarget & HTMLInputElement }) {
		textElement.focus()
	}

	function onKeyDown(e: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }) {
		if (e.code === 'Tab') return
		if (type === 'numeric') return numericValidation(e)
	}

	function onInput(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		value = e.currentTarget.value
		dispatch('text', { text: value })
	}

</script>

<div id="box" class:error {...props}>
	<h3><label for={name}>{title}</label></h3>
	{#if description}
		<h4>{description}</h4>
	{/if}

	<input
		disabled={type === 'readonly'}
		{name}
		id={name}
		spellcheck="false"
		bind:this={textElement}
		style="grid-area: entry;"
		inputmode={type === 'numeric' ? 'numeric' : 'text'}
		{value}
		type={type === 'date' ? 'date' : ''}
		onkeydown={onKeyDown}
		oninput={(e)=> value = e.target.value}
		onclick={focusMe}

	/>
</div>

<style>
    #boll {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
        grid-template-areas: 'title' 'description' 'entry';
        background-color: var(--bgColour);
        border-radius: 5px;
        margin-top: 5px;
        margin-bottom: 1rem;
        margin-left: 1rem;
        margin-right: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-bottom: 1rem;
    }

    #boll.error {
        border-color: #99221111;
        border-width: 1px;
        border-style: solid;
        box-shadow: inset 0 0 4px #ee564699, 0 -2px 2px #ee564699, -2px 2px 2px #ee564699, 2px 0 2px #ee564699;
    }

    h3 {
        margin-top: 1rem;
        grid-area: title;
        text-align: left;
        color: #cbcbcb;
        font-size: 1em;
    }

    h4 {
        grid-area: description;
        margin-top: 0px;
        color: #656565;
        text-align: left;
        font-size: 0.9em;
    }

    input {
        background-color: white;
        border: none;
        color: var(--accentColour);
        font-size: 0.9em;
        font-weight: 500;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: #494949;
        color: #bbbbbb;
        text-align: left;
        padding-bottom: 10px;
        padding-left: 5px;
        word-break: break-word;
    }

    input:-internal-autofill-selected {
        background-color: red;
        appearance: none !important;
        background-color: #1b1b1b !important;
        color: red !important;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        box-shadow: 0 0 0 30px #222 inset !important;
        color: #bbbbbb;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: #494949;
        -webkit-text-fill-color: #bbbbbb;
    }

    input:disabled {
        color: #888;
    }

    input:empty::before {
        content: var(--content);
        color: #bbbbbb55;
    }

    input:focus {
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: var(--accentColour);
        outline: none;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>

