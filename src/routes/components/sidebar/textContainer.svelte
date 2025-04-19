<script lang="ts">
	import { type College, type Mission, type Project, type ViewportState } from '$lib/types';
	import {
		viewportData,
		currentViewportState,
		newNavigation,
		scaleDisplayData
	} from '../../../lib/globals/Viewport.svelte';
	import StackedBarChart from './components/stackedBarChart.svelte';
	import CountryContent from './components/countryContent.svelte';
	import ProjectContent from './components/projectContent.svelte';
	import NetworkContent from './components/networkContent.svelte';
	import GlobalContent from './components/globalContent.svelte';
	import MissionContent from './components/missionContent.svelte';
	import CollegeContent from './components/collegeContent.svelte';

	let { projects }: { projects: Project[] } = $props();

	let ProjectTitle = $derived(
		projects.length > 1 ? viewportData.projects[0].ProjectTitle : 'title'
	);

	let viewportDivisions = $derived.by(() => {
		const projects = viewportData.projects;

		let missions: Record<Mission, number> = {
			['Education']: 0,
			['Research']: 0,
			['Service/Clinical']: 0
		};
		let colleges: Record<College, number> = {
			['Colorado School of Public Health']: 0,
			['College of Nursing']: 0,
			['School of Medicine']: 0,
			['School of Dental Medicine']: 0,
			['Skaggs School of Pharmacy and Pharmaceutical Sciences']: 0
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
			return;
		});
		return { m: missions, c: colleges };
	});
</script>

<!-- Project Summary -->
<!--Need custom transtion code here to adjust x and y depending on navigation direction transition:fly={{ x:100, duration: 100 }}-->
<!-- Sidebar Title -->
<h1
	class="border-cgh_border_grey mb-4 flex items-center border-b-[5px] p-3 text-3xl font-thin text-black"
>
	<img
		class="mr-1 h-9 opacity-80 invert"
		alt={scaleDisplayData[currentViewportState.scale].name}
		src="/icons/category/{scaleDisplayData[currentViewportState.scale].icon}"
	/>
	{#if currentViewportState.scale == 'Project'}
		{ProjectTitle}
	{:else if currentViewportState.scale == 'Country'}
		{currentViewportState.countryName}
	{:else if currentViewportState.scale == 'Contact'}
		{currentViewportState.networkName}
	{:else if currentViewportState.scale == 'Mission'}
		{currentViewportState.missionName}
	{:else if currentViewportState.scale == 'College'}
		{currentViewportState.collegeName}
	{:else if currentViewportState.scale == 'Global'}
		Global Summary
	{/if}
</h1>
<!-- Sidebar Content -->
<div class="h-full w-full text-lg md:pr-5">
	{#if currentViewportState.scale == 'Project'}
		<ProjectContent />
	{:else if currentViewportState.scale == 'Country'}
		<CountryContent />
	{:else if currentViewportState.scale == 'Mission'}
		<MissionContent />
	{:else if currentViewportState.scale == 'College'}
		<CollegeContent />
	{:else if currentViewportState.scale == 'Contact'}
		<NetworkContent />
	{:else if currentViewportState.scale == 'Global'}
		<GlobalContent {projects} {viewportDivisions} />
	{/if}
</div>
