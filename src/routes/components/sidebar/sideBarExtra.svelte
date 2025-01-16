<script lang="ts">
	import { College, Mission, ViewportScale, type Project, type ViewportState } from '$lib/types';
	import {
		viewportData,
		currentViewportState,
		newNavigation,
		scaleDisplayData
	} from '../../../lib/globals/Viewport.svelte';
	import { collegeName, missionName } from '$lib/mapDependencies';
	import StackedBarChart from './stackedBarChart.svelte';

	let { projects }: { projects: Project[] } = $props();

	let viewportDivisions = $derived.by(() => {
		const projects = viewportData.projects;

		let missions: Record<Mission, number> = {
			[Mission.Education]: 0,
			[Mission.Research]: 0,
			[Mission.Service]: 0
		};
		let colleges: Record<College, number> = {
			[College.fake1]: 0,
			[College.fake2]: 0,
			[College.fake3]: 0,
			[College.Public]: 0,
			[College.Nursing]: 0,
			[College.Medicine]: 0,
			[College.Dental]: 0,
			[College.Pharmacy]: 0
		};

		projects.forEach((project) => {
			switch (project.Mission) {
				case missionName[Mission.Education]: {
					missions[Mission.Education] += 1;
					break;
				}
				case missionName[Mission.Research]: {
					missions[Mission.Research] += 1;
					break;
				}
				case missionName[Mission.Service]: {
					missions[Mission.Service] += 1;
					break;
				}
				default: {
					console.log('Unknown mission type: ' + project.Mission);
					break;
				}
			}
			switch (project.PrimaryCollegeOrSchool) {
				case collegeName[College.Public]: {
					colleges[College.Public] += 1;
					break;
				}
				case collegeName[College.Nursing]: {
					colleges[College.Nursing] += 1;
					break;
				}
				case collegeName[College.Medicine]: {
					colleges[College.Medicine] += 1;
					break;
				}
				case collegeName[College.Dental]: {
					colleges[College.Dental] += 1;
					break;
				}
				case collegeName[College.Pharmacy]: {
					colleges[College.Pharmacy] += 1;
					break;
				}
				default: {
					console.log('Unknown mission type: ' + project.Mission);
					break;
				}
			}
			return;
		});
		return { m: missions, c: colleges };
	});
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
						class="border-b-4 {viewportData.projects[0].Mission == missionName[Mission.Education]
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
			{#if currentViewportState.scale != ViewportScale.Project}
				<div class="mt-3">
					<StackedBarChart
						active={true}
						divisionCounts={[
							{
								type: Mission.Education,
								count: viewportDivisions.m[Mission.Education],
								label: missionName[Mission.Education]
							},
							{
								type: Mission.Research,
								count: viewportDivisions.m[Mission.Research],
								label: missionName[Mission.Research]
							},
							{
								type: Mission.Service,
								count: viewportDivisions.m[Mission.Service],
								label: missionName[Mission.Service]
							}
						]}
					/>
				</div>
				<div>
					<StackedBarChart
						active={false}
						divisionCounts={[
							{
								type: College.Public,
								count: viewportDivisions.c[College.Public],
								label: collegeName[College.Public]
							},
							{
								type: College.Nursing,
								count: viewportDivisions.c[College.Nursing],
								label: collegeName[College.Nursing]
							},
							{
								type: College.Medicine,
								count: viewportDivisions.c[College.Medicine],
								label: collegeName[College.Medicine]
							},
							{
								type: College.Dental,
								count: viewportDivisions.c[College.Dental],
								label: collegeName[College.Dental]
							},
							{
								type: College.Pharmacy,
								count: viewportDivisions.c[College.Pharmacy],
								label: collegeName[College.Pharmacy]
							}
						]}
					/>
				</div>
			{/if}
		</div>
	</div>
</div>
