<script lang="ts">
	import { type College, type Mission, type Project, type ViewportState } from '$lib/types';
	import {
		viewportData,
		currentViewportState,
		newNavigation,
		scaleDisplayData
	} from '../../../lib/globals/Viewport.svelte';
	import StackedBarChart from '../legacy/stackedBarChart.svelte';
	import CountryContent from './content/countryContent.svelte';
	import ProjectContent from './content/projectContent.svelte';
	import NetworkContent from './content/networkContent.svelte';
	import GlobalContent from './content/globalContent.svelte';
	import MissionContent from './content/missionContent.svelte';
	import CollegeContent from './content/collegeContent.svelte';

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

	let college: College = $derived(currentViewportState.collegeName as College);

	const websites: Record<College, string> = {
		['Colorado School of Public Health']: 'https://coloradosph.cuanschutz.edu/',
		['College of Nursing']:
			'https://nursing.cuanschutz.edu/degrees-programs/global-health-locations',
		['School of Dental Medicine']: 'https://dental.cuanschutz.edu/',
		['Skaggs School of Pharmacy and Pharmaceutical Sciences']: 'https://pharmacy.cuanschutz.edu/',
		['School of Medicine']: 'https://medschool.cuanschutz.edu/medicine'
	};

	let lineColor = $derived.by(() => {
		if (currentViewportState.scale == 'Global') return 'border-neutral-800';
		if (currentViewportState.scale == 'Project') return 'border-neutral-200';
		if (currentViewportState.scale == 'Contact') return 'border-neutral-300';
		if (currentViewportState.scale == 'Country') return 'border-neutral-400';
		if (currentViewportState.scale == 'Mission')
			return currentViewportState.missionName == 'Education'
				? 'border-education'
				: currentViewportState.missionName == 'Research'
					? 'border-research'
					: 'border-service';
		if (currentViewportState.scale == 'College')
			return currentViewportState.collegeName == 'College of Nursing'
				? 'border-nursing'
				: currentViewportState.collegeName == 'Colorado School of Public Health'
					? 'border-public'
					: currentViewportState.collegeName == 'School of Dental Medicine'
						? 'border-dental'
						: currentViewportState.collegeName == 'School of Medicine'
							? 'border-medicine'
							: 'border-pharmacy';
		return 'border-blue-500';
	});
</script>

<!-- Project Summary -->
<!--Need custom transtion code here to adjust x and y depending on navigation direction transition:fly={{ x:100, duration: 100 }}-->
<!-- Sidebar Title -->
<h1 class="{lineColor} mb-4 flex items-center border-y-[4px] p-3 text-3xl font-thin text-black">
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
<div class="text-md h-full w-full lg:pr-5">
	{#if currentViewportState.scale == 'Project'}
		<ProjectContent />
	{:else if currentViewportState.scale == 'Country'}
		<CountryContent />
	{:else if currentViewportState.scale == 'Mission'}
		<MissionContent />
	{:else if currentViewportState.scale == 'College'}
		<CollegeContent />
	{:else if currentViewportState.scale == 'Contact'}
		<NetworkContent {projects}/>
	{:else if currentViewportState.scale == 'Global'}
		<GlobalContent {projects} {viewportDivisions} />
	{/if}
</div>
