<script>
	import { navBack, navForward, viewportData } from '$lib/globals/Viewport.svelte';
	import { updateTooltip } from '../tooltip/tooltipHelper.svelte';
</script>

<div class="mb-4">
	{#if viewportData.navCurrent > 0}
		<button
			onmouseover={async () => {
				updateTooltip('Go Back');
			}}
			onfocus={async () => {
				updateTooltip('Go Back');
			}}
			onmouseleave={async () => {
				updateTooltip('');
			}}
			onfocusout={async () => {
				updateTooltip('');
			}}
			onclick={() => {
				navBack();
			}}
			class="rounded border border-zinc-500 bg-zinc-900 p-0.5 shadow hover:border-zinc-600 hover:bg-zinc-800"
		>
			<img class="h-8" alt="back arrow" aria-label="back arrow" src="/icons/arrowLeft.svg" />
		</button>
	{:else}
		<button
			onmouseover={async () => {
				updateTooltip('');
			}}
			onfocus={async () => {
				updateTooltip('');
			}}
			onmouseleave={async () => {
				updateTooltip('');
			}}
			onfocusout={async () => {
				updateTooltip('');
			}}
			class="cursor-default rounded border border-zinc-600 bg-zinc-900 p-0.5 text-zinc-500 opacity-60"
		>
			<img class="h-8" alt="back arrow" aria-label="back arrow" src="/icons/arrowLeft.svg" />
		</button>
	{/if}
	{#if viewportData.navCurrent < viewportData.navEvents.length - 1}
		<button
			onmouseover={async () => {
				updateTooltip('Return');
			}}
			onfocus={async () => {
				updateTooltip('Return');
			}}
			onmouseleave={async () => {
				updateTooltip('');
			}}
			onfocusout={async () => {
				updateTooltip('');
			}}
			onclick={() => {
				navForward();
			}}
			class="rounded border border-zinc-500 bg-zinc-900 p-0.5 shadow hover:border-zinc-600 hover:bg-zinc-800"
		>
			<img
				class="h-8 rotate-180"
				alt="back arrow"
				aria-label="back arrow"
				src="/icons/arrowLeft.svg"
			/>
		</button>
	{:else}
		<button
			onmouseover={async () => {
				updateTooltip('');
			}}
			onfocus={async () => {
				updateTooltip('');
			}}
			onmouseleave={async () => {
				updateTooltip('');
			}}
			onfocusout={async () => {
				updateTooltip('');
			}}
			class="cursor-default rounded border border-zinc-600 bg-zinc-900 p-0.5 text-zinc-500 opacity-60"
		>
			<img
				class="h-8 rotate-180"
				alt="back arrow"
				aria-label="back arrow"
				src="/icons/arrowLeft.svg"
			/>
		</button>
	{/if}
</div>
