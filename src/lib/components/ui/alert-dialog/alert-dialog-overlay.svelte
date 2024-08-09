<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import { fade } from "svelte/transition";
	import { cn } from "$lib/utils.js";

	type Props = AlertDialogPrimitive.OverlayProps;


	let { class: className, transition = fade,  transitionConfig = {duration: 150}, ...props}:Props = $props()
</script>

<AlertDialogPrimitive.Overlay
	{transition}
	{transitionConfig}
	class={cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm ", className)}
	{...props}
/>
