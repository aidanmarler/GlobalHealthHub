<script lang="ts">
	import { newNavigation } from '$lib/globals/Viewport.svelte';
	import type { Category, ViewportState } from '$lib/types';
	import { fly } from 'svelte/transition';

	// Get a list of either Contacts or Countries from parent component
	let { category, items }: { category: Category; items: string[] } = $props();
	let dropdownOpen: boolean = $state(false);
</script>

<div>
	<div class="bg-999">
		<h3 class="font-semibold">{category == 'Country' ? 'Countries' : 'Contacts'}</h3>
		<button
			title={dropdownOpen ? 'Close List' : 'Open List'}
			aria-label={dropdownOpen ? 'Close List' : 'Open List'}
			onclick={() => {
				dropdownOpen = !dropdownOpen;
			}}
		>
			<img alt="Arrow" src="icons/interaction/arrowLeft.svg" />
		</button>
	</div>
    <div class="overflow-hidden">
        {#if dropdownOpen}
		<div class="bg-green-300 z-10" transition:fly={{ y: -100, duration: 300 }}>
			{#each items as item (item)}
				<button
					title={'See ' + item}
                    class="w-full text-left px-2"
					aria-label={'See ' + item}
					onclick={() => {
						if (category == 'Country') {
							const newState: ViewportState = {
								scale: category,
								countryName: item
							};
							newNavigation(newState);
						}
						if (category == 'Contact') {
							const newState: ViewportState = {
								scale: category,
								networkName: item
							};
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
