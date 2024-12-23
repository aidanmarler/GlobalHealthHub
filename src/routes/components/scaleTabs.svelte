<script lang="ts">
	import { currentViewportState } from '$lib/globals/Viewport.svelte';
	import { ViewportScale } from '$lib/types';
</script>

{#snippet figure(image)}{/snippet}

<div class="absolute left-1/2 top-3 flex -translate-x-1/2 transform items-center space-x-2">
	<button
		aria-label="Global View"
		class="{currentViewportState.scale == ViewportScale.Global
			? 'rounded bg-stone-700'
			: 'rounded-full'} w-auto cursor-pointer rounded border border-stone-600 px-2 py-2 text-center text-white backdrop-blur-md transition-all hover:bg-stone-500"
		><img
			alt="globe icon"
			class={currentViewportState.scale == ViewportScale.Global
				? 'h-6 w-6 opacity-100'
				: 'h-5 w-5 opacity-50'}
			src="/icons/globe.svg"
		/></button
	>
	<button
		aria-label="Country View"
		class="{currentViewportState.scale == ViewportScale.Country
			? 'rounded bg-stone-700'
			: 'rounded-full'} w-auto cursor-pointer rounded border border-stone-600 px-2 py-2 text-center text-white backdrop-blur-md transition-all hover:bg-stone-500"
		><img
			alt="country icon"
			class={currentViewportState.scale == ViewportScale.Country
				? 'h-6 w-6 opacity-100'
				: 'h-5 w-5 opacity-50'}
			src="/icons/flag.svg"
		/></button
	>
	<button
		aria-label="Network View"
		class="{currentViewportState.scale == ViewportScale.Network
			? 'rounded bg-stone-700'
			: 'rounded-full'} w-auto cursor-pointer rounded border border-stone-600 px-2 py-2 text-center text-white backdrop-blur-md transition-all hover:bg-stone-500"
		><img
			alt="network icon"
			class={currentViewportState.scale == ViewportScale.Network
				? 'h-6 w-6 opacity-100'
				: 'h-5 w-5 opacity-50'}
			src="/icons/person.svg"
		/></button
	>
	<button
		aria-label="Project View"
		class="{currentViewportState.scale == ViewportScale.Project
			? 'rounded-xl bg-stone-700'
			: 'rounded-full'} w-auto cursor-pointer rounded border border-stone-600 px-2 py-2 text-center text-white backdrop-blur-md transition-all hover:bg-stone-500"
		><img
			alt="project icon"
			class={currentViewportState.scale == ViewportScale.Project
				? 'h-6 w-6 opacity-100'
				: 'h-5 w-5 opacity-50'}
			src="/icons/point.svg"
		/></button
	>
</div>
