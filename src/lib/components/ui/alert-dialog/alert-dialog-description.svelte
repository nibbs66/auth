<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	type $$Props = AlertDialogPrimitive.DescriptionProps;


	let {children, class: className,  ...props} = $props()
</script>

<AlertDialogPrimitive.Description
	class={cn("text-sm text-muted-foreground", className)}
	{...props}
>
	{@render children?.()}
</AlertDialogPrimitive.Description>
