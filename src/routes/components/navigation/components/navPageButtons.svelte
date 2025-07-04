<script lang="ts">
	import { navBack, navForward, viewportData } from '$lib/globals/Viewport.svelte';
	import { updateTooltip } from '../../tooltip/tooltipHelper.svelte';
</script>

{#snippet NavPageButton(disable: boolean, backButton: boolean)}
	<button
		title={backButton ? 'Go Back' : 'Go Forward'}
		aria-label={backButton ? 'Go Back' : 'Go Forward'}
		onclick={() => {
			if (backButton) {
				navBack();
			} else {
				navForward();
			}
		}}
		class="h-full border-transparent bg-white shadow-neutral-900 shadow-sm cursor-default  border-2 p-0.5 {disable
			? ' opacity-30 '
			: ' cursor-pointer hover:border-blue-500  hover:shadow-md hover:shadow-neutral-900 outline-blue-500 '} "
	>
		<img
			class="h-full invert {backButton ? '' : 'rotate-180'}"
			alt={backButton ? 'Back Arrow' : 'Forward Arrow'}
			aria-label={backButton ? 'Back Arrow' : 'Forward Arrow'}
			src="/icons/interaction/arrowLeft.svg"
		/>
	</button>
{/snippet}

<div class="h-9 cursor-default">
	{#if viewportData.navCurrent > 0}
		{@render NavPageButton(false, true)}
	{:else}
		{@render NavPageButton(true, true)}
	{/if}
	{#if viewportData.navCurrent < viewportData.navEvents.length - 1}
		{@render NavPageButton(false, false)}
	{:else}
		{@render NavPageButton(true, false)}
	{/if}
</div>
