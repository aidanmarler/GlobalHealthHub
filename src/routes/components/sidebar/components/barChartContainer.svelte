<script lang="ts">
	import { currentViewportState, viewportData } from '$lib/globals/Viewport.svelte';
	import type { College, Mission, SortBy } from '$lib/types';
	import BarChart from './barChart.svelte';

	let { updateColors, sortBy = $bindable() }: { updateColors: () => void; sortBy: SortBy } =
		$props();

	let missionCounts: Record<Mission, number> = $derived.by(() => {
		const projects = $state.snapshot(viewportData.projects);
		let missions: Record<Mission, number> = {
			['Education']: 0,
			['Research']: 0,
			['Service/Clinical']: 0
		};

		projects.forEach((project) => {
			switch (project.Mission) {
				case 'Education': {
					missions['Education'] += 1;
					break;
				}
				case 'Research': {
					missions['Research'] += 1;
					break;
				}
				case 'Service/Clinical': {
					missions['Service/Clinical'] += 1;
					break;
				}
				default: {
					break;
				}
			}
		});
		return missions;
	});

	let collegeCounts: Record<College, number> = $derived.by(() => {
		const projects = $state.snapshot(viewportData.projects);
		let colleges: Record<College, number> = {
			['School of Medicine']: 0,
			['Colorado School of Public Health']: 0,
			['Skaggs School of Pharmacy and Pharmaceutical Sciences']: 0,
			['College of Nursing']: 0,
			['School of Dental Medicine']: 0
		};

		projects.forEach((project) => {
			switch (project.PrimaryCollegeOrSchool) {
				case 'Colorado School of Public Health': {
					colleges['Colorado School of Public Health'] += 1;
					break;
				}
				case 'College of Nursing': {
					colleges['College of Nursing'] += 1;
					break;
				}
				case 'School of Medicine': {
					colleges['School of Medicine'] += 1;
					break;
				}
				case 'School of Dental Medicine': {
					colleges['School of Dental Medicine'] += 1;
					break;
				}
				case 'Skaggs School of Pharmacy and Pharmaceutical Sciences': {
					colleges['Skaggs School of Pharmacy and Pharmaceutical Sciences'] += 1;
					break;
				}
				default: {
					break;
				}
			}
		});
		return colleges;
	});

	let maxMissionCount = $derived(Math.max(...Object.values(missionCounts)));
	let maxCollegeCount = $derived(Math.max(...Object.values(collegeCounts)));

	function toggle() {
		sortBy = sortBy === 'Mission' ? 'College' : 'Mission';
		updateColors(); // Your callback
	}

	let plotTitle = $derived.by(() => {
		switch (currentViewportState.scale) {
			case 'Global':
				return ' Total Projects';
			case 'Mission':
				return currentViewportState.missionName + ' Projects';
			case 'College':
				return ' projects led by the ' + currentViewportState.collegeName;
			case 'Country':
				return ' projects in ' + currentViewportState.countryName;
			case 'Contact':
				return ' projects let by ' + currentViewportState.networkName;
			case 'Project':
				return ' single project';
		}
	});
</script>

<div class="mb-1 flex w-full">
	<button
		onclick={toggle}
		class="transition-color relative flex h-[27px] w-auto items-center justify-between rounded-full border-2 border-neutral-800 bg-neutral-800 text-sm font-semibold shadow-ccc outline-2 outline-blue-500 duration-100 hover:bg-neutral-700 hover:shadow"
		aria-label="Toggle Mission or College"
	>
		<!-- Sliding Thumb -->
		<div
			class="absolute top-0.5 h-5 w-20 rounded-full bg-white transition-all duration-75
		{sortBy === 'Mission' ? 'left-0.5 translate-x-0' : '-left-0.5 translate-x-full'} "
		></div>

		<!-- Labels -->
		<div class="z-10 flex justify-between py-0.5 font-bold">
			<div class="w-20 {sortBy === 'Mission' ? 'text-black' : 'text-neutral-400'}">Mission</div>
			<div class="w-20 {sortBy === 'College' ? 'text-black' : 'text-neutral-400'}">College</div>
		</div>
	</button>
	<p class="w-full items-center pr-10 text-center text-sm italic text-neutral-600">
		{viewportData.projects.length}
		{plotTitle}
	</p>
</div>

{#if sortBy == 'Mission'}
	{#each Object.entries(missionCounts) as [key, value]}
		<BarChart {value} max={maxMissionCount} type={key as Mission} />
	{/each}
{:else if sortBy == 'College'}
	{#each Object.entries(collegeCounts) as [key, value]}
		<BarChart {value} max={maxCollegeCount} type={key as College} />
	{/each}
{/if}
