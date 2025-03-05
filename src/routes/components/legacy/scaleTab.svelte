<script lang="ts">
	import {
		currentViewportState,
		newNavigation,
		rezoomNav,
		scaleDisplayData
	} from '$lib/globals/Viewport.svelte';
	import type { ViewportScale } from '$lib/types';
	import { updateTooltip } from '../tooltip/tooltipHelper.svelte';

	let { scale }: { scale: ViewportScale } = $props();

	let active = $derived(currentViewportState.scale == scale);
	let able = $derived.by(() => {
		if (active) return false;
		if (currentViewportState.scale == 'Project') {
			return true;
		} else if (scale == 'Network' && currentViewportState.scale == 'Network') {
			return true;
		} else if (scale == 'Country' && currentViewportState.scale == 'Country') {
			return true;
		} else if (scale == 'Global') {
			return true;
		} else {
			false;
		}
	});

	let tooltipContent: string = $derived.by(() => {
		if (active || able) {
			return 'View ' + scaleDisplayData[scale as keyof typeof scaleDisplayData].name;
		} else {
			return '';
		}
	});

	function handleClick() {
		if (active) {
			rezoomNav();
		} else if (able) {
			console.log('currentViewportState: ', currentViewportState);
			if (scale == 'Global') {
				newNavigation({ scale: 'Global' });
			} else if (scale == 'Network') {
				newNavigation({
					scale: 'Network',
					networkName: currentViewportState.networkName
				});
			} else if (scale == 'Country') {
				newNavigation({
					scale: 'Country',
					countryName: currentViewportState.countryName
				});
			}
		}
	}
</script>

<button
	onmouseover={async () => {
		updateTooltip(tooltipContent);
	}}
	onfocus={async () => {
		updateTooltip(tooltipContent);
	}}
	onmouseleave={async () => {
		updateTooltip('');
	}}
	onfocusout={async () => {
		updateTooltip('');
	}}
	onclick={() => {
		handleClick();
	}}
	aria-label="Project View"
	class="{active
		? 'cursor-default bg-zinc-950 text-white shadow-lg'
		: able
			? 'cursor-pointer hover:bg-zinc-200 hover:shadow-md'
			: 'cursor-default border-white opacity-30'} 
			{scale == 'Global' || scale == 'Network'
		? 'mr-3 border-l-2'
		: 'mr-0.5 border-r-2'} flex h-10 w-36 self-center border-b-2 border-t-2 border-zinc-950 px-2 py-1.5 text-center transition-all"
>
	{#if scale == 'Country' || scale == 'Project'}
		<span
			class="z-0 h-7 w-7 -translate-x-5 -translate-y-0.5 -rotate-45 border-b-2 border-r-2 border-zinc-950 bg-white"
		></span>
	{/if}

	<img
		alt="project icon"
		class="{active
			? 'invert-0 dark:opacity-100'
			: 'dark:opacity-30'} mr-2 h-6 w-6 opacity-100 invert"
		src="/icons/category/{scaleDisplayData[scale as keyof typeof scaleDisplayData].icon}"
	/>

	<span class="w-12">{scaleDisplayData[scale as keyof typeof scaleDisplayData].name}</span>

	{#if scale == 'Global' || scale == 'Network'}
		<span
			class="z-10 h-7 w-7 -translate-y-0.5 translate-x-10 -rotate-45 border-b-2 border-r-2 border-zinc-950 bg-inherit"
		></span>
	{/if}
</button>
