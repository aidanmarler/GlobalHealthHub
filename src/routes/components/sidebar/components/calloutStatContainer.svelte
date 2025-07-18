<script lang="ts">
	import { viewportData } from '$lib/globals/Viewport.svelte';
	import { categoryIcons, retrieve_bg } from '$lib/ProjectParameters';
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

	let personsTraveled = $derived.by(() => {
		let total: number = 0;
		for (const project of viewportData.projects) {
			if (project.NumStudentsTraveled > 0) total += Number(project.NumStudentsTraveled);
			if (project.NumResidentsTraineesTraveled > 0)
				total += Number(project.NumResidentsTraineesTraveled);
			console.log(total);
		}
		return total;
	});

	let calloutStatCategory: Partial<Record<CalloutStat, Category>> = {
		Projects: 'Project',
		Contacts: 'Contact',
		Countries: 'Country'
	};

	let calloutStatIcons: Record<CalloutStat, string> = {
		Projects: categoryIcons['Project'],
		Contacts: categoryIcons['Contact'],
		Countries: categoryIcons['Country'],
		Travelers: 'category/backpack.svg'
	};
</script>

<div class="my-4 flex h-full flex-wrap items-center justify-center">
	{#each calloutStats as calloutStat}
		{#if calloutStat !== 'Travelers'}
			<div
				class="flex h-auto w-[130px] flex-col items-center justify-center bg-opacity-65 p-4 py-2
			{calloutStatCategory[calloutStat]
					? retrieve_bg(calloutStatCategory[calloutStat])
					: ' bg-stone-600'} "
			>
				<p class="text-center text-3xl font-bold text-black">
					<!--{calloutStat == 'Travelers'
						? personsTraveled
						: calloutStat == 'Projects'
							? viewportData.projects.length
							: calloutStat == 'Countries'
								? countries.size
								: contacts.size}-->
					{calloutStat == 'Projects'
						? viewportData.projects.length
						: calloutStat == 'Countries'
							? countries.size
							: contacts.size}
				</p>
				<div class="flex justify-around">
					<img
						alt="person"
						class={'opacity-80 invert'}
						src={'icons/' + calloutStatIcons[calloutStat]}
					/>
					<p class="text-center text-lg font-semibold text-neutral-900">{calloutStat}</p>
				</div>
			</div>
		{/if}
	{/each}
</div>
