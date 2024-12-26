<script lang="ts">
	import { Mission, ViewportScale, type Project, type ViewportState } from '$lib/types';
	import { error } from '@sveltejs/kit';
	import {
		sidebar,
		viewportData,
		currentViewportState,
		newNavigation,
		navBack,
		navForward,
		scaleDisplayData
	} from '../../lib/globals/Viewport.svelte';
	import { onMount } from 'svelte';
	import { missionColors } from '$lib/mapDependencies';

	let { projects }: { projects: Project[] } = $props();

	/*
	let SidebarProjects = $derived.by(() => {
		console.log('scale! ', currentViewportState.scale);
		let projectsList: Project[] = [];
		switch (currentViewportState.scale) {
			case ViewportScale.Project: {
				if (currentViewportState.projectID != undefined) {
					projectsList.push(projects[currentViewportState.projectID - 1]);
				}
				break;
			}
			case ViewportScale.Country: {
				projects.forEach((project) => {
					if (project.Country == currentViewportState.countryName) {
						projectsList.push(project);
					}
				});
				break;
			}
			case ViewportScale.Network: {
				projects.forEach((project) => {
					if (project.ContactName == currentViewportState.networkName) {
						projectsList.push(project);
					}
				});
				break;
			}
			case ViewportScale.Global: {
				projectsList = projects;
			}
		}
		viewportData.projects = projectsList;
		return projectsList;
	});
	*/

	//let projectsInfo: Project = $derived.by(findProjectInfo(ViewportState.projectID)[0])
</script>

<div
	class="absolute right-0 top-0 z-30 h-full w-full overflow-y-scroll bg-white p-3 text-black transition-all duration-300 dark:bg-zinc-900"
>
	<!-- Project Summary -->
	<!--Need custom transtion code here to adjust x and y depending on navigation direction transition:fly={{ x:100, duration: 100 }}-->
	<div>
		<h1
			class="mb-4 flex items-center border border-zinc-700 bg-zinc-100 px-3 py-2 text-3xl font-thin text-black"
		>
			<img
				class="mr-1 h-9 opacity-80 invert"
				alt={scaleDisplayData[currentViewportState.scale].name}
				src="/icons/{scaleDisplayData[currentViewportState.scale].icon}"
			/>
			{#if currentViewportState.scale == ViewportScale.Project}
				Project Title
			{:else if currentViewportState.scale == ViewportScale.Country}
				{currentViewportState.countryName}
			{:else if currentViewportState.scale == ViewportScale.Network}
				{currentViewportState.networkName}
			{:else if currentViewportState.scale == ViewportScale.Global}
				Global Summary
			{/if}
		</h1>
		{#if currentViewportState.scale == ViewportScale.Project}
			{#if viewportData.projects[0].ProjectAcronym}{viewportData.projects[0].ProjectAcronym}{/if}
			{#if viewportData.projects[0].ProjectWebsite}
				<h3>Email: {viewportData.projects[0].ProjectWebsite}</h3>
			{/if}
			<h3>
				Country:
				<button
					class="rounded border-2 border-zinc-400 bg-zinc-300 px-3 font-semibold hover:border-zinc-600"
					onclick={() => {
						const newState: ViewportState = {
							scale: ViewportScale.Country,
							countryName: viewportData.projects[0].Country
						};
						newNavigation(newState);
					}}>{viewportData.projects[0].Country}</button
				>
			</h3>
			<br />
			<h3>
				Mission: <span class="border-b-4" style="border-color: {missionColors[Mission.Education]};"
					>{viewportData.projects[0].Mission}</span
				>
			</h3>
			<br />
			<h3>School: {viewportData.projects[0].PrimaryCollegeOrSchool}</h3>
			<br />
			<h3>
				<button
					class="rounded border-2 border-zinc-400 bg-zinc-300 px-3 font-semibold hover:border-zinc-600"
					onclick={() => {
						const newState: ViewportState = {
							scale: ViewportScale.Network,
							networkName: viewportData.projects[0].ContactName
						};
						newNavigation(newState);
					}}>{viewportData.projects[0].ContactName}</button
				>
				{#if viewportData.projects[0]}ContactPosition, {viewportData.projects[0].ContactPosition}
				{/if}
			</h3>

			{#if viewportData.projects[0].ContactEmail}
				<h3>Email: {viewportData.projects[0].ContactEmail}</h3>
			{/if}
			<br />
			<p>{viewportData.projects[0].InternationalNetwork}</p>
			<p>{viewportData.projects[0].InternationalInstitution}</p>
			<p>{viewportData.projects[0].PrimaryFundingAgency}</p>
			<p>{viewportData.projects[0].InternationalNetwork}</p>
			{#if viewportData.projects[0].Description}
				<p>{viewportData.projects[0].Description}</p>
			{/if}
		{:else if currentViewportState.scale == ViewportScale.Country}
			<!-- Country Summary -->
		{:else if currentViewportState.scale == ViewportScale.Network}
			<!-- Network Summary -->
		{:else if currentViewportState.scale == ViewportScale.Global}
			<p>
				There are a total of <span class="text">{projects.length}</span> projects from
				<span class="text">{48}</span>.
			</p>
		{/if}
	</div>
</div>
