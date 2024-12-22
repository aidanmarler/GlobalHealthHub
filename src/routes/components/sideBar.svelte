<script lang="ts">
	import { ViewportScale, type Project, type ViewportState } from '$lib/types';
	import { error } from '@sveltejs/kit';
	import {
		sidebar,
		viewportData,
		currentViewportState,
		newNavigation,
		navBack,
		navForward
	} from '../../lib/globals/Viewport.svelte';

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

	$effect(() => {
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
		return;
	});

	//let projectsInfo: Project = $derived.by(findProjectInfo(ViewportState.projectID)[0])
</script>

<button
	onclick={() => {
		sidebar.sidebarOpen = !sidebar.sidebarOpen;
	}}
	class="{sidebar.sidebarOpen
		? 'right-96 '
		: 'right-0 w-4 cursor-pointer hover:right-2 '}  absolute top-0 z-40 h-full w-4 bg-stone-700 shadow-2xl transition-all duration-300"
>
	{#if sidebar.sidebarOpen}
		<div class="mt-2 text-center text-white"></div>
	{/if}
</button>
<div
	class="{sidebar.sidebarOpen
		? 'w-96'
		: 'w-2'} absolute right-0 top-0 z-30 h-full overflow-y-scroll bg-stone-900 p-2 text-white transition-all duration-300"
>
	<div class="mb-4">
		{#if viewportData.navCurrent > 0}
			<button
				onclick={() => {
					navBack();
				}}
				class="rounded border border-zinc-500 bg-zinc-900 p-0.5 shadow hover:border-zinc-600 hover:bg-zinc-800"
			>
				<img class="h-8" alt="back arrow" aria-label="back arrow" src="/icons/arrowLeft.svg" />
			</button>
		{:else}
			<button
				class="cursor-default rounded border border-zinc-600 bg-zinc-900 p-0.5 text-zinc-500 opacity-60"
			>
				<img class="h-8" alt="back arrow" aria-label="back arrow" src="/icons/arrowLeft.svg" />
			</button>
		{/if}
		{#if viewportData.navCurrent < viewportData.navEvents.length - 1}
			<button
				onclick={() => {
					navForward();
				}}
				class="rounded border border-zinc-500 bg-zinc-900 p-0.5 shadow hover:border-zinc-600 hover:bg-zinc-800"
			>
				<img
					class="h-8 rotate-180"
					alt="back arrow"
					aria-label="back arrow"
					src="/icons/arrowLeft.svg"
				/>
			</button>
		{:else}
			<button
				class="cursor-default rounded border border-zinc-600 bg-zinc-900 p-0.5 text-zinc-500 opacity-60"
			>
				<img
					class="h-8 rotate-180"
					alt="back arrow"
					aria-label="back arrow"
					src="/icons/arrowLeft.svg"
				/>
			</button>
		{/if}
	</div>

	{#if currentViewportState.scale == ViewportScale.Project}
		<!-- Project Summary -->
		<!--Need custom transtion code here to adjust x and y depending on navigation direction transition:fly={{ x:100, duration: 100 }}-->
		<div>
			<h1
				class="mb-4 flex items-center rounded-sm border border-white bg-stone-950 px-3 py-2 text-4xl font-thin text-white"
			>
				<img class="mr-1 h-9 opacity-80" alt="point" src="/icons/point.svg" />
				Project Title
			</h1>
			{#if viewportData.projects[0].ProjectAcronym}{viewportData.projects[0].ProjectAcronym}{/if}
			{#if viewportData.projects[0].ProjectWebsite}
				<h3>Email: {viewportData.projects[0].ProjectWebsite}</h3>
			{/if}
			<h3>
				Country:
				<button
					class="rounded border-2 border-zinc-950 bg-zinc-950 px-3 font-semibold hover:border-zinc-100"
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
			<h3>Mission: {viewportData.projects[0].Mission}</h3>
			<br />
			<h3>School: {viewportData.projects[0].PrimaryCollegeOrSchool}</h3>
			<br />
			<h3>
				<button
					class="rounded border-2 border-zinc-950 bg-zinc-950 px-3 font-semibold hover:border-zinc-100"
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
		</div>
	{:else if currentViewportState.scale == ViewportScale.Country}
		<!-- Country Summary -->
		<h1
			class="mb-4 flex items-center rounded-sm border border-white bg-stone-950 px-3 py-2 text-4xl font-thin text-white"
		>
			<img class="mr-1 h-9 opacity-80" alt="flag" src="/icons/flag.svg" />
			{currentViewportState.countryName}
		</h1>
	{:else if currentViewportState.scale == ViewportScale.Network}
		<!-- Network Summary -->
		<h1
			class="mb-4 flex items-center rounded-sm border border-white bg-stone-950 px-3 py-2 text-4xl font-thin text-white"
		>
			<img class="mr-1 h-9 opacity-80" alt="person" src="/icons/person.svg" />
			{currentViewportState.networkName}
		</h1>
	{:else if currentViewportState.scale == ViewportScale.Global}
		<!-- Global Summary -->
		<h1
			class="mb-4 flex items-center rounded-sm border border-white bg-stone-950 px-3 py-2 text-4xl font-thin text-white"
		>
			<img class="mr-1 h-9 opacity-80" alt="globe" src="/icons/globe.svg" />
			Global Summary
		</h1>
		<p>
			There are a total of <span class="text">{projects.length}</span> projects from
			<span class="text">{48}</span>.
		</p>
	{/if}
</div>
