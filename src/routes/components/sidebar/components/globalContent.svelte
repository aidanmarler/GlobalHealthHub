<script lang="ts">
	import { newNavigation } from '$lib/globals/Viewport.svelte';
	import type { College, Mission, Project, ViewportState } from '$lib/types';
	import StackedBarChart from './stackedBarChart.svelte';
	let {
		projects,
		viewportDivisions
	}: {
		projects: Project[];
		viewportDivisions: { m: Record<Mission, number>; c: Record<College, number> };
	} = $props();
</script>

<p class="text-lg text-black">
	The <span class="">Colorado School of Public Health, Center for Global Health,</span>
	has a total of <span class="text font-bold">{projects.length}</span>
	projects in
	<span class="font-bold">{48}</span> countries!
</p>
<br />
<br />
<p>
	Each project has a mission to help through
	<button
		class=" cursor-pointer rounded-full bg-education bg-opacity-60 px-2 text-center text-sm font-semibold hover:bg-opacity-70 hover:underline"
		onclick={() => {
			const newState: ViewportState = {
				scale: 'Mission',
				missionName: 'Education'
			};
			newNavigation(newState);
		}}>Education</button
	>,
	<button
		class=" cursor-pointer rounded-full bg-research bg-opacity-60 px-2 text-center text-sm font-semibold hover:bg-opacity-70 hover:underline"
		onclick={() => {
			const newState: ViewportState = {
				scale: 'Mission',
				missionName: 'Research'
			};
			newNavigation(newState);
		}}>Research</button
	>,
	or
	<button
		class=" cursor-pointer rounded-full bg-service bg-opacity-60 px-2 text-center text-sm font-semibold hover:bg-opacity-70 hover:underline"
		onclick={() => {
			const newState: ViewportState = {
				scale: 'Mission',
				missionName: 'Service/Clinical'
			};
			newNavigation(newState);
		}}>Service/Clinical</button
	> work.
</p>
<div class="mt-3">
	<StackedBarChart
		active={true}
		divisionCounts={[
			{
				type: 'Education',
				count: viewportDivisions.m['Education'],
				label: 'Education'
			},
			{
				type: 'Research',
				count: viewportDivisions.m['Research'],
				label: 'Research'
			},
			{
				type: 'Service/Clinical',
				count: viewportDivisions.m['Service/Clinical'],
				label: 'Service/Clinical'
			}
		]}
	/>
</div>
<br />
<br />
<p>
	All projects are primarily hosted under either the
	<button
		class="cursor-pointer rounded-full bg-medicine bg-opacity-60 px-2 text-center text-sm font-semibold hover:bg-opacity-70 hover:underline"
		onclick={() => {
			const newState: ViewportState = {
				scale: 'College',
				collegeName: 'School of Medicine'
			};
			newNavigation(newState);
		}}>School of Medicine</button
	>
	,
	<button
		class="cursor-pointer rounded-full bg-public bg-opacity-60 px-2 text-center text-sm font-semibold hover:bg-opacity-70 hover:underline"
		onclick={() => {
			const newState: ViewportState = {
				scale: 'College',
				collegeName: 'Colorado School of Public Health'
			};
			newNavigation(newState);
		}}>Colorado School of Public Health</button
	>
	,
	<button
		class="cursor-pointer rounded-full bg-pharmacy bg-opacity-60 px-2 text-center text-sm font-semibold hover:bg-opacity-70 hover:underline"
		onclick={() => {
			const newState: ViewportState = {
				scale: 'College',
				collegeName: 'Skaggs School of Pharmacy and Pharmaceutical Sciences'
			};
			newNavigation(newState);
		}}>Skaggs School of Pharmacy and Pharmaceutical Sciences</button
	>,
	<button
		class="cursor-pointer rounded-full bg-nursing bg-opacity-50 px-2 text-center text-sm font-semibold hover:bg-opacity-70 hover:underline"
		onclick={() => {
			const newState: ViewportState = {
				scale: 'College',
				collegeName: 'College of Nursing'
			};
			newNavigation(newState);
		}}>College of Nursing</button
	>, or
	<button
		class="cursor-pointer rounded-full bg-dental bg-opacity-40 px-2 text-center text-sm font-semibold hover:bg-opacity-60 hover:underline"
		onclick={() => {
			const newState: ViewportState = {
				scale: 'College',
				collegeName: 'College of Nursing'
			};
			newNavigation(newState);
		}}>School of Dental Medicine</button
	>.
</p>
<StackedBarChart
	active={false}
	divisionCounts={[
		{
			type: 'School of Medicine',
			count: viewportDivisions.c['School of Medicine'],
			label: 'School of Medicine'
		},
		{
			type: 'Colorado School of Public Health',
			count: viewportDivisions.c['Colorado School of Public Health'],
			label: 'Colorado School of Public Health'
		},
		{
			type: 'Skaggs School of Pharmacy and Pharmaceutical Sciences',
			count: viewportDivisions.c['Skaggs School of Pharmacy and Pharmaceutical Sciences'],
			label: 'Skaggs School of Pharmacy and Pharmaceutical Sciences'
		},
		{
			type: 'College of Nursing',
			count: viewportDivisions.c['College of Nursing'],
			label: 'College of Nursing'
		},

		{
			type: 'School of Dental Medicine',
			count: viewportDivisions.c['School of Dental Medicine'],
			label: 'School of Dental Medicine'
		}
	]}
/>
<br />
<br />