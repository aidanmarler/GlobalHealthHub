<script lang="ts">
	import {
		currentViewportState,
		newNavigation,
		rezoomNav,
		scaleDisplayData
	} from '$lib/globals/Viewport.svelte';
	import { ViewportScale } from '$lib/types';
	import { tooltip } from '../../tooltipHelper.svelte';

	let { scale }: { scale: ViewportScale } = $props();

	let active = $derived(currentViewportState.scale == scale);
	let able = $derived.by(() => {
		if (active) return false;
		if (currentViewportState.scale == ViewportScale.Project) {
			return true;
		} else if (
			scale == ViewportScale.Network &&
			currentViewportState.scale == ViewportScale.Network
		) {
			return true;
		} else if (
			scale == ViewportScale.Country &&
			currentViewportState.scale == ViewportScale.Country
		) {
			return true;
		} else if (scale == ViewportScale.Global) {
			return true;
		} else {
			false;
		}
	});

	function handleClick() {
		if (active) {
			rezoomNav();
		} else if (able) {
			console.log('currentViewportState: ', currentViewportState);
			if (scale == ViewportScale.Global) {
				newNavigation({ scale: ViewportScale.Global });
			} else if (scale == ViewportScale.Network) {
				newNavigation({
					scale: ViewportScale.Network,
					networkName: currentViewportState.networkName
				});
			} else if (scale == ViewportScale.Country) {
				newNavigation({
					scale: ViewportScale.Country,
					countryName: currentViewportState.countryName
				});
			}
		}
	}
</script>

<button
	onclick={() => {
		handleClick();
	}}
	onmouseover={() => {
		tooltip.content = 'View ' + scaleDisplayData[scale].name;
	}}
	onfocus={() => {
		tooltip.content = 'View ' + scaleDisplayData[scale].name;
	}}
	onmouseleave={() => {
		tooltip.content = '';
	}}
	onfocusout={() => {
		tooltip.content = '';
	}}
	aria-label="Project View"
	class="{active
		? 'cursor-default bg-zinc-950 text-white shadow-lg'
		: able
			? 'cursor-pointer hover:bg-zinc-200 hover:shadow-md'
			: 'cursor-default border-white opacity-30'} 
			{scale == ViewportScale.Global || scale == ViewportScale.Network
		? 'mr-3 border-l-2'
		: 'mr-0.5 border-r-2'} flex h-10 w-36 self-center border-b-2 border-t-2 border-zinc-950 px-2 py-1.5 text-center transition-all"
>
	{#if scale == ViewportScale.Country || scale == ViewportScale.Project}
		<span
			class="z-0 h-7 w-7 -translate-x-5 -translate-y-0.5 -rotate-45 border-b-2 border-r-2 border-zinc-950 bg-white"
		></span>
	{/if}

	<img
		alt="project icon"
		class="{active
			? 'invert-0 dark:opacity-100'
			: 'dark:opacity-30'} mr-2 h-6 w-6 opacity-100 invert"
		src="/icons/{scaleDisplayData[scale].icon}"
	/>

	<span class="w-12">{scaleDisplayData[scale].name}</span>

	{#if scale == ViewportScale.Global || scale == ViewportScale.Network}
		<span
			class="z-10 h-7 w-7 -translate-y-0.5 translate-x-10 -rotate-45 border-b-2 border-r-2 border-zinc-950 bg-inherit"
		></span>
	{/if}
</button>
