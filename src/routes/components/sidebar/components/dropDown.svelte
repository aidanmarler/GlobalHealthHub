<script lang="ts">
	import { newNavigation } from '$lib/globals/Viewport.svelte';
	import type { Category, ViewportState } from '$lib/types';
	import { fly } from 'svelte/transition';

	// Get a list of either Contacts or Countries from parent component
	let { category, items }: { category: Category; items: string[] } = $props();
	let dropdownOpen: boolean = $state(true);
</script>

<div
	class="flex-column justify-left mb-4 flex flex h-full items-center items-center border-y-[4px]"
>
	<div class=" flex bg-neutral-200 px-2">
		<h3 class=" font-semibold">{category == 'Country' ? 'Countries' : 'Contacts'}</h3>
		<button
			class="invert"
			title={dropdownOpen ? 'Close List' : 'Open List'}
			aria-label={dropdownOpen ? 'Close List' : 'Open List'}
			onclick={() => {
				dropdownOpen = !dropdownOpen;
			}}
		>
			{#if dropdownOpen}
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
					<path
						fill="#fff"
						d="M13 6a1 1 0 1 0-2 0v5H6a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5z"
					/>
				</svg>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
					<path fill="#fff" d="M5 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1" />
				</svg>
			{/if}
		</button>
	</div>
	<div class="overflow-hidden">
		{#if dropdownOpen}
			<div class="pl-1 z-10 flex flex-wrap space-x-1">
				{#each items as item (item)}
					<button
						in:fly|global={{ x: -100, duration: 300 }}
						out:fly|global={{ x: -100, duration: 200 }}
						title={'See ' + item}
						class="bubble bg-neutral-500 bg-opacity-50 hover:bg-opacity-70"
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
