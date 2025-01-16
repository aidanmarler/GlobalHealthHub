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
	} from '../../../lib/globals/Viewport.svelte';
	import { onMount } from 'svelte';
	import { missionName } from '$lib/mapDependencies';
	import Table from '../table/projectsTable.svelte';

	let { projects }: { projects: Project[] } = $props();

	let properties: Array<keyof Project> = [
		'ProjectTitle',
		'Mission',
		'PrimaryCollegeOrSchool',
		'ContactName',
		'Country',
		'City'
	];
</script>

<div
	class="absolute right-0 top-0 z-30 h-full w-full overflow-y-scroll bg-white p-2 text-black transition-all duration-300 dark:bg-zinc-900"
>
	<!-- Project Summary -->
	<!--Need custom transtion code here to adjust x and y depending on navigation direction transition:fly={{ x:100, duration: 100 }}-->
	<div>
		<h1
			class="border-cgh_border_grey mb-4 flex items-center border-b-[5px] bg-white p-3 text-3xl font-thin text-black"
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
		<div class="h-full w-full px-1">
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
					Mission: <span
						class="border-b-4 {viewportData.projects[0].Mission ==
						missionName[Mission.Education]
							? 'border-education'
							: viewportData.projects[0].Mission == missionName[Mission.Research]
								? 'border-research'
								: viewportData.projects[0].Mission == missionName[Mission.Service]
									? 'border-service'
									: 'stone-500'}">{viewportData.projects[0].Mission}</span
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
				There {viewportData.projects.length == 1
					? 'is 1 project'
					: 'are ' + viewportData.projects.length + ' projects'}
				in {currentViewportState.countryName}.
			{:else if currentViewportState.scale == ViewportScale.Network}
				<!-- Network Summary -->
				{currentViewportState.networkName} is the contact for {viewportData.projects.length} projects.
			{:else if currentViewportState.scale == ViewportScale.Global}
				<p>
					The Center for Global Health has a total of <span class="text font-bold"
						>{projects.length}</span
					>
					projects in
					<span class="text font-bold">{48}</span> countries.
				</p>
			{/if}
		</div>

		{#if currentViewportState.scale != ViewportScale.Project}
			<div class="mb-1 mt-7 max-h-96 overflow-scroll">
				<Table projects={viewportData.projects} {properties} />
			</div>
		{/if}
	</div>
</div>
