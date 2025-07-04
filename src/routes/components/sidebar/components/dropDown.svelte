<script lang="ts">
	import { newNavigation } from '$lib/globals/Viewport.svelte';
	import { categoryIcons, retrieve_bg } from '$lib/ProjectParameters';
	import type { Category, College, Mission, ViewportState } from '$lib/types';
	import { delay } from '$lib/utils/utils';
	import { fly, scale } from 'svelte/transition';

	// Get a list of either Contacts or Countries from parent component
	let {
		category,
		items,
		startOpen = false,
		isNetwork = false
	}: { category: Category; items: string[]; startOpen: boolean; isNetwork: boolean } = $props();
	let dropdownOpen: boolean = $state($state.snapshot(startOpen));
	let expandHeight: boolean = $state($state.snapshot(startOpen));
	let dropdownLabel: string = $derived(
		isNetwork ? 'Networks' : category == 'Country' ? 'Countries' : category + 's'
	);
	let dropdownIcon: string = $derived(categoryIcons[category]);

	$effect(() => {
		let cancelled = false;

		if (dropdownOpen) {
			console.log('startOpen');
			delay(150).then(() => {
				if (!cancelled) {
					console.log('open');
					expandHeight = true;
				}
			});
		} else {
			console.log('startClose');
			console.log('close');
			expandHeight = false;
			delay(0).then(() => {
				if (!cancelled) {
				}
			});
		}

		// Cleanup function
		return () => {
			cancelled = true;
		};
	});
</script>

<!--transition-[max-width,max-height] -->
<div
	class=" justify-left mb-1 flex h-full min-h-9 items-stretch border-y-4 border-neutral-200 transition-[max-width,border,max-height] duration-150
 	{dropdownOpen ? ' max-w-full border-r-4 ' : ' max-w-36 '} 
	{expandHeight ? ' max-h-full border-r-4  ' : ' max-h-9 '} "
>
	<div class="min-w-36 bg-neutral-200">
		<div class="flex justify-between px-1">
			<img class="h-full w-7 p-1.5 invert" alt={dropdownLabel} src={'icons/' + dropdownIcon} />
			<h3 class="h-full pt-0.5 pr-1 text-base font-semibold">{dropdownLabel}</h3>
			<button
				class="rounded-full border-2 bg-white w-6 h-6 mt-[2px] hover:border-blue-500 hover:bg-white hover:shadow hover:shadow-neutral-600"
				title={dropdownOpen ? 'Close List' : 'Open List'}
				aria-label={dropdownOpen ? 'Close List' : 'Open List'}
				onclick={() => {
					dropdownOpen = !dropdownOpen;
				}}
			>
				<img
					class="h-full w-full invert transition-all duration-150 {dropdownOpen ? 'rotate-180' : ''}"
					alt="open/close arrow"
					src="icons/interaction/arrowRightSimple.svg"
				/>
				<!--
				{#if dropdownOpen}
					<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
						<path fill="#000" d="M5 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1" />
					</svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
						<path
							fill="#000"
							d="M13 6a1 1 0 1 0-2 0v5H6a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5z"
						/>
					</svg>
				{/if}-->
			</button>
		</div>
	</div>
	<div class="overflow-y-hidden px-0.5">
		{#if expandHeight}
			<div class=" z-10 flex h-full flex-wrap">
				{#each items as item (item)}
					<button
						in:fly|global={{ x: -100, duration: 500 }}
						out:fly|global={{ x: -100, duration: 15 }}
						title={'See ' + item}
						class={'bubble m-0.5 bg-opacity-50 hover:bg-opacity-70 ' +
							(category === 'Mission'
								? retrieve_bg(category, item as Mission)
								: category === 'College'
									? retrieve_bg(category, undefined, item as College)
									: retrieve_bg(category))}
						aria-label={'See ' + item}
						onclick={() => {
							if (category == 'Mission') {
								const newState: ViewportState = { scale: category, missionName: item as Mission };
								newNavigation(newState);
							}
							if (category == 'College') {
								const newState: ViewportState = { scale: category, collegeName: item as College };
								newNavigation(newState);
							}
							if (category == 'Country') {
								const newState: ViewportState = { scale: category, countryName: item };
								newNavigation(newState);
							}
							if (category == 'Contact') {
								const newState: ViewportState = { scale: category, networkName: item };
								newNavigation(newState);
							}
						}}
					>
						{item}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>
