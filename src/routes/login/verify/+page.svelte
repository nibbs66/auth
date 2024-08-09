<script lang="ts">
	import { fade } from 'svelte/transition'
	import type { PageData } from './$types'
	import * as inspector from 'node:inspector';
	let { data }:PageData = $props()
	let successPrompts: string[] = $state([])
	let viewPrompts: string[] = $state([])
	let redirect: string = $state('/')
$inspect(data)
	function createPrompts() {
	if (data.isNewUser) {
			successPrompts.push('Welcome aboard!')
			successPrompts.push('Finished setting up your account')
			successPrompts.push('Redirecting to profile...')
			redirect = '/new'
		} else {
			successPrompts.push('Awesome Job!')
			successPrompts.push("You'll be able to use this fingerprint to login in the future")
			successPrompts.push('Redirecting to home...')
		}
	}

	createPrompts()
	$effect(()=>{
		setTimeout(() => {
			const doThing = () => {
				const prompt = successPrompts[viewPrompts.length]
				if (!prompt) {
					setTimeout(() => window.location.href = redirect, 1000)
					return
				}
				viewPrompts.push(prompt)
				viewPrompts = viewPrompts
				setTimeout(doThing, prompt === '...' ? 2000 : 1000)
			}
			doThing()
		}, 200)

	})
	const donger1 = $state(' ( ಠ‿ಠ) ')
	const donger2 = $state(' (ಠ‿ಠ ) ')
	let donger = $state(donger1)
	function danceyBoi() {
		let speed = 750
		let inner: NodeJS.Timer
		setIntervalAndExecute(() => {
			if (inner) {
				speed = speed > 50 ? speed - 50 : speed
				clearInterval(inner)
			}

			inner = setInterval(() => {
				if (donger === donger1) {
					donger = donger2
				} else {
					donger = donger1
				}
			}, speed)
		}, 60 * 1000)
	}

	function setIntervalAndExecute(fn: () => any, ms: number) {
		fn()
		setInterval(fn, ms)
	}

	danceyBoi()

</script>

{#if data.message}
	<h1>{data.message}</h1>
{:else if data.user}
	<h1 class="flex h-screen items-center justify-center">Success!!</h1>
	{#each viewPrompts as prompt}
		<h1 style="color: {data.user.accentColour}" transition:fade>{prompt}</h1>
	{/each}
{/if}

<style>
    h1 {
        color: #ee5646;
    }

    @media(max-width: 500px) {
        .mascot {
            --font-size: 15vw !important;
        }
    }

    .mascot {
        --color-background: #1b1b1b;
        --stroke-width: calc(1em / 16);
        --font-size: 5rem;
        --font-weight: 700;
        --letter-spacing: calc(1em / 8);

        -webkit-background-clip: text;
        background-clip: text;
        background-image: -webkit-gradient(
                linear,
                left top,
                right top,
                from(#09f1b8),
                color-stop(#00a2ff),
                color-stop(#ff00d2),
                to(#fed90f)
        );
        background-image: -o-linear-gradient(left, #09f1b8, #00a2ff, #ff00d2, #fed90f);
        background-image: linear-gradient(to right, #09f1b8, #00a2ff, #ff00d2, #fed90f);
        color: #000119;
        color: var(--color-background);
        font-size: var(--font-size);
        font-weight: 700;
        font-weight: var(--font-weight);
        letter-spacing: calc(1em / 8);
        letter-spacing: var(--letter-spacing);
        padding: calc(--stroke-width / 2);
        -webkit-text-stroke-color: transparent;
        -webkit-text-stroke-width: calc(1em / 16);
        -webkit-text-stroke-width: var(--stroke-width);
    }
</style>


