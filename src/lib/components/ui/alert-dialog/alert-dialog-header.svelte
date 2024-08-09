<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLAttributes<HTMLDivElement>;


	let {children, class: className,  ...props} = $props()
</script>

<div class={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props}>
	{@render children?.()}
</div>
