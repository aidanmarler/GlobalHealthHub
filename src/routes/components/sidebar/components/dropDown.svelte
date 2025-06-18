<script lang="ts">
	import { newNavigation } from '$lib/globals/Viewport.svelte';
	import {
		bg_college,
		bg_general,
		bg_mission,
		categoryIcons,
		retrieve_bg
	} from '$lib/ProjectParameters';
	import type { Category, College, Mission, ViewportState } from '$lib/types';
	import { fly, scale } from 'svelte/transition';

	// Get a list of either Contacts or Countries from parent component
	let {
		category,
		items,
		startOpen = false,
		isNetwork = false
	}: { category: Category; items: string[]; startOpen: boolean; isNetwork: boolean } = $props();
	let dropdownOpen: boolean = $state($state.snapshot(startOpen));
	let dropdownLabel: string = $derived(isNetwork ? 'Network' : category);
	let dropdownIcon: string = $derived(categoryIcons[category]);
</script>

<div class=" justify-left mb-4 flex h-full items-stretch border-y-[4px]">
	<div class="min-w-36 bg-neutral-200">
		<div class="flex justify-between px-1">
			<img class="h-6 w-5 p-0.5 invert" alt={dropdownLabel} src={'icons/' + dropdownIcon} />
			<h3 class="pr-1 font-semibold">{dropdownLabel}</h3>
			<button
				class="rounded-full border border-transparent hover:border-black hover:bg-white"
				title={dropdownOpen ? 'Close List' : 'Open List'}
				aria-label={dropdownOpen ? 'Close List' : 'Open List'}
				onclick={() => {
					dropdownOpen = !dropdownOpen;
				}}
			>
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
				{/if}
			</button>
		</div>
	</div>
	<div class="overflow-hidden px-0.5">
		{#if dropdownOpen}
			<div class="transition-[ z-10 flex h-full flex-wrap">
				{#each items as item (item)}
					<button
						in:fly|global={{ x: -100, duration: 300 }}
						out:fly|global={{ x: -100, duration: 200 }}
						title={'See ' + item}
						class={'bubble m-0.5 bg-opacity-50 hover:bg-opacity-70 ' +
							(category === 'Mission'
								? retrieve_bg(category, item as Mission)
								: category === 'College'
									? retrieve_bg(category, undefined, item as College)
									: retrieve_bg(category))}
						aria-label={'See ' + item}
						onclick={() => {
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
