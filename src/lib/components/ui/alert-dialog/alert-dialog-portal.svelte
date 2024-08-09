<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";

	type Props = AlertDialogPrimitive.PortalProps;
	let {children, ...props }:Props = $props()
</script>

<AlertDialogPrimitive.Portal {...props}>
	{@render children?.()}
</AlertDialogPrimitive.Portal>
