<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	type Props = AlertDialogPrimitive.TitleProps;


	let {children, class: className, level = 'h3',  ...props}:Props = $props()
</script>

<AlertDialogPrimitive.Title class={cn("text-lg font-semibold", className)} {level} {...props}>
	{@render children?.()}
</AlertDialogPrimitive.Title>
