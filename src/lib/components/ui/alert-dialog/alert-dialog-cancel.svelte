<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	type $$Props = AlertDialogPrimitive.CancelProps;
	type $$Events = AlertDialogPrimitive.CancelEvents;


	let {children, class: className,  ...props} = $props()
</script>

<AlertDialogPrimitive.Cancel
	class={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
	{...props}
	on:click
	on:keydown
	let:builder
>
	{@render children?.(builder)}
</AlertDialogPrimitive.Cancel>
