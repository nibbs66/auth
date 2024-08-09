<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	type $$Props = AlertDialogPrimitive.ActionProps;
	type $$Events = AlertDialogPrimitive.ActionEvents;


	let {children, class: className,  ...props} = $props()
</script>

<AlertDialogPrimitive.Action
	class={cn(buttonVariants(), className)}
	{...props}
	on:click
	on:keydown
	let:builder
>
	{@render children?.(builder)}

</AlertDialogPrimitive.Action>
