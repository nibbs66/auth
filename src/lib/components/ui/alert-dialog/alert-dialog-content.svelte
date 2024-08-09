<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import * as AlertDialog from "./index.js";
	import { cn, flyAndScale } from "$lib/utils.js";
	import { fly } from 'svelte/transition';

	type Props = AlertDialogPrimitive.ContentProps;


	let {children, class: className, transition = flyAndScale, transitionConfig,  ...props}:Props = $props()
</script>

<AlertDialog.Portal>
	<AlertDialog.Overlay />
	<AlertDialogPrimitive.Content
		{transition}
		{transitionConfig}
		class={cn(
			"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full",
			className
		)}
		{...props}
	>
		{@render children?.()}
	</AlertDialogPrimitive.Content>
</AlertDialog.Portal>
