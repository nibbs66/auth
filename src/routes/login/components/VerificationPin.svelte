<script lang="ts">
	import { PinInput } from "bits-ui";
let { value = $bindable(), ...props } = $props()


</script>

<PinInput.Root {...props} bind:value  class="flex items-center gap-2" placeholder="0">
	<PinInput.Input
		class="flex h-input w-10 select-none rounded-md rounded-input border border-foreground bg-background px-2 py-3 text-center font-alt text-[17px] tracking-[0.01em] text-foreground placeholder-shown:border-border-input focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover"
	/>
	<PinInput.Input
		class="flex h-input w-10 select-none rounded-md rounded-input border border-foreground bg-background px-2 py-3 text-center font-alt text-[17px] tracking-[0.01em] text-foreground placeholder-shown:border-border-input focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover"
	/>
	<PinInput.Input
		class="flex h-input w-10 select-none rounded-md rounded-input border border-foreground bg-background px-2 py-3 text-center font-alt text-[17px] tracking-[0.01em] text-foreground placeholder-shown:border-border-input focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover"
	/>
	<PinInput.Input
		class="flex h-input w-10 select-none rounded-md rounded-input border border-foreground bg-background px-2 py-3 text-center font-alt text-[17px] tracking-[0.01em] text-foreground placeholder-shown:border-border-input focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover"
	/>
	<PinInput.Input
		class="flex h-input w-10 select-none rounded-md rounded-input border border-foreground bg-background px-2 py-3 text-center font-alt text-[17px] tracking-[0.01em] text-foreground placeholder-shown:border-border-input focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover"
	/>
	<PinInput.HiddenInput />
</PinInput.Root>
