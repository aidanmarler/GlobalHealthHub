<script>
	import { navBack, navForward, viewportData } from '$lib/globals/Viewport.svelte';
</script>

<div class="mb-4">
	{#if viewportData.navCurrent > 0}
		<button
			onclick={() => {
				navBack();
			}}
			class="rounded border border-zinc-500 bg-zinc-900 p-0.5 shadow hover:border-zinc-600 hover:bg-zinc-800"
		>
			<img class="h-8" alt="back arrow" aria-label="back arrow" src="/icons/arrowLeft.svg" />
		</button>
	{:else}
		<button
			class="cursor-default rounded border border-zinc-600 bg-zinc-900 p-0.5 text-zinc-500 opacity-60"
		>
			<img class="h-8" alt="back arrow" aria-label="back arrow" src="/icons/arrowLeft.svg" />
		</button>
	{/if}
	{#if viewportData.navCurrent < viewportData.navEvents.length - 1}
		<button
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
