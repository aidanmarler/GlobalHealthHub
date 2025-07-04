<script lang="ts">
	import { viewportData } from '$lib/globals/Viewport.svelte';
	import { categoryIcons } from '$lib/ProjectParameters';
	import type { CalloutStat, Category } from '$lib/types';
	import { onMount } from 'svelte';

	let { calloutStats }: { calloutStats: CalloutStat[] } = $props();

	let countries = $derived.by(() => {
		let set = new Set();
		for (const project of viewportData.projects) {
			set.add(project.Country);
		}
		return set;
	});

	let contacts = $derived.by(() => {
		let set = new Set();
		for (const project of viewportData.projects) {
			set.add(project.PrimaryContactName);
		}
		return set;
	});

	let calloutStatCategory: Record<CalloutStat, Category> = {
		Projects: 'Project',
		Contacts: 'Contact',
		Countries: 'Country'
	};

	let bg: Record<CalloutStat, string> = {
		Projects: 'bg-neutral-300/60',
		Contacts: 'bg-neutral-400/60',
		Countries: 'bg-neutral-500/60'
	};

	let border: Record<CalloutStat, string> = {
		Projects: 'border-neutral-300',
		Contacts: 'border-neutral-400',
		Countries: 'border-neutral-500'
	};

	let text: Record<CalloutStat, string> = {
		Projects: 'text-neutral-900',
		Contacts: 'text-neutral-900',
		Countries: 'text-neutral-900'
	};

	let opacity: Record<CalloutStat, string> = {
		Projects: 'opacity-80',
		Contacts: 'opacity-80',
		Countries: 'opacity-80'
	};
</script>

<div class="flex flex-wrap h-full items-center justify-center my-4 ">
	{#each calloutStats as calloutStat}
		<div
			class="flex h-auto w-[136px] flex-col items-center justify-center p-4 py-2
			{bg[calloutStat]} {border[calloutStat]} "
		>
			<p class="text-center text-3xl font-bold text-black">
				{calloutStat == 'Projects'
					? viewportData.projects.length
					: calloutStat == 'Countries'
						? countries.size
						: contacts.size}
			</p>
			<div class="flex justify-around">
				<img
					alt="person"
					class={"invert "+ opacity[calloutStat]}
					src={'icons/' + categoryIcons[calloutStatCategory[calloutStat]]}
				/>
				<p class="text-center text-lg font-semibold {text[calloutStat]}">{calloutStat}</p>
			</div>
		</div>
	{/each}
</div>
