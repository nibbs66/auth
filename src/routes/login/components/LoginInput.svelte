<script lang="ts">
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import { Input } from "$lib/components/ui/input";
	import { Fingerprint } from '$lib/icons';
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger >
		<div class="fido">
			<Fingerprint class="size-[38px] fill-white" />
			<span>Use fingerprint</span>
		</div>

	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your account
				and remove your data from our servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action>Continue</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
<style>
    .fido {
        background-color: #5395ff;
        border: none;
        color: #ffffff;
        font-family: Quicksand;
        font-weight: 400;
        text-align: center;
        display: inline-grid;
        grid-template-columns: 48px 1fr;
        grid-template-rows: 1fr;
        grid-template-areas: 'icon text';
        align-items: center;
        padding-right: 2rem;
        width: 18rem;
        height: 50px;
        column-gap: 1rem;
        font-size: 1.2rem;
        cursor: pointer;
        padding-top: 6px;
        padding-bottom: 6px;
        padding-left: 12px;
        margin-right: auto;
        margin-left: auto;
    }
</style>
