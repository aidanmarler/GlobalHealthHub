<script lang="ts">
	import { navBack, navForward, viewportData } from '$lib/globals/Viewport.svelte';
	import { updateTooltip } from '../../tooltip/tooltipHelper.svelte';
</script>

{#snippet NavPageButton(disable: boolean, backButton: boolean)}
	<button
		onmouseover={async () => {
			updateTooltip(backButton ? 'Go Back' : 'Go Forward');
		}}
		onfocus={async () => {
			updateTooltip(backButton ? 'Go Back' : 'Go Forward');
		}}
		onmouseleave={async () => {
			updateTooltip('');
		}}
		onfocusout={async () => {
			updateTooltip('');
		}}
		onclick={() => {
			if (backButton) {
				navBack();
			} else {
				navForward();
			}
		}}
		class="h-full cursor-default rounded-sm {disable
			? 'opacity-30'
			: 'opacity-100 hover:bg-ccc hover:shadow-sm'} "
	>
		<img
			class="h-full invert {backButton ? '' : 'rotate-180'}"
			alt={backButton ? 'Back Arrow' : 'Forward Arrow'}
			aria-label={backButton ? 'Back Arrow' : 'Forward Arrow'}
			src="/icons/interaction/arrowLeft.svg"
		/>
	</button>
{/snippet}

<div class="h-7 cursor-default">
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
