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
	}: {
		category: Category | 'Network';
		items: string[];
		startOpen: boolean;
		isNetwork: boolean;
	} = $props();
	let dropdownOpen: boolean = $state($state.snapshot(startOpen));
	let expandHeight: boolean = $state($state.snapshot(startOpen));
	let dropdownLabel: string = $derived(
		category == 'Network' ? 'Network' : category == 'Country' ? 'Countries' : category + 's'
	);
	let dropdownIcon: string = $derived(
		category == 'Network' ? 'category/network.svg' : categoryIcons[category]
	);

	$effect(() => {
		let cancelled = false;

		if (dropdownOpen) {
			delay(150).then(() => {
				if (!cancelled) expandHeight = true;
			});
		} else {
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
	class=" justify-left mb-1 flex h-full min-h-8 rounded-2xl items-stretch overflow-hidden border border-neutral-300 transition-[max-width] duration-300
	{dropdownOpen ? ' max-w-full ' : ' max-w-36 '} 
	{expandHeight ? ' max-h-full  ' : ' max-h-9 '} 
	"
>
	<div class="min-w-36 w-36 border-r border-neutral-300 bg-neutral-300 pt-[3px] px-1">
		<button
			class="flex h-6 w-full justify-between rounded-2xl border-2 border-transparent bg-neutral-50 px-0.5 shadow shadow-neutral-800/30 hover:border-blue-500 hover:bg-white hover:shadow-sm hover:shadow-neutral-800"
			title={dropdownOpen ? 'Close List' : 'Open List'}
			aria-label={dropdownOpen ? 'Close List' : 'Open List'}
			onclick={() => {
				dropdownOpen = !dropdownOpen;
			}}
		>
			<img
				class="h-full w-6 p-0.5 text-center invert"
				alt={dropdownLabel}
				src={'icons/' + dropdownIcon}
			/>
			<h3 class="mt-[1px] h-full justify-center text-center align-middle text-sm font-semibold">
				{dropdownLabel}
			</h3>
			<img
				class=" invert transition-[max-width] duration-300 {dropdownOpen ? 'rotate-180' : ''}"
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
	<div class="w-full overflow-y-hidden {dropdownOpen ? ' p-[1px] ' : ' '}  shadow-inner shadow-neutral-800/10">
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
									: category === 'Network'
										? retrieve_bg('Contact')
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
							if (category == 'Network') {
								const newState: ViewportState = { scale: 'Contact', networkName: item };
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
