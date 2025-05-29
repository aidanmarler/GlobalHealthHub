<script lang="ts">
	import { newNavigation } from '$lib/globals/Viewport.svelte';
	import type { College, Mission, Project, ViewportState } from '$lib/types';
	import CalloutStatContainer from '../components/calloutStatContainer.svelte';
	import StackedBarChart from '../../legacy/stackedBarChart.svelte';
	let {
		projects,
		viewportDivisions
	}: {
		projects: Project[];
		viewportDivisions: { m: Record<Mission, number>; c: Record<College, number> };
	} = $props();
</script>

<CalloutStatContainer calloutStats={['Projects', 'Contacts', 'Countries']} />

<p class="text-black">
	The <span class="">Colorado School of Public Health, Center for Global Health,</span>
	has projects accross the globe!
</p>
<br />
<p>
	Every project has a mission to help through
	<button
		class=" bubble bg-education bg-opacity-60 hover:bg-opacity-70"
		onclick={() => {
			const newState: ViewportState = { scale: 'Mission', missionName: 'Education' };
			newNavigation(newState);
		}}>Education</button
	>,
	<button
		class="  bubble bg-research bg-opacity-60 hover:bg-opacity-70"
		onclick={() => {
			const newState: ViewportState = { scale: 'Mission', missionName: 'Research' };
			newNavigation(newState);
		}}>Research</button
	>, or
	<button
		class="  bubble bg-service bg-opacity-50 hover:bg-opacity-60"
		onclick={() => {
			const newState: ViewportState = { scale: 'Mission', missionName: 'Service/Clinical' };
			newNavigation(newState);
		}}>Service/Clinical</button
	> work.
</p>
<br />
<p>
	All projects are primarily hosted under either the
	<button
		class=" bubble bg-medicine bg-opacity-60 hover:bg-opacity-70"
		onclick={() => {
			const newState: ViewportState = { scale: 'College', collegeName: 'School of Medicine' };
			newNavigation(newState);
		}}>School of Medicine</button
	>
	,
	<button
		class=" bubble bg-public bg-opacity-60 hover:bg-opacity-70"
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
		class=" bubble bg-pharmacy bg-opacity-60 hover:bg-opacity-70"
		onclick={() => {
			const newState: ViewportState = {
				scale: 'College',
				collegeName: 'Skaggs School of Pharmacy and Pharmaceutical Sciences'
			};
			newNavigation(newState);
		}}>Skaggs School of Pharmacy and Pharmaceutical Sciences</button
	>,
	<button
		class=" bubble bg-nursing bg-opacity-50 hover:bg-opacity-70"
		onclick={() => {
			const newState: ViewportState = { scale: 'College', collegeName: 'College of Nursing' };
			newNavigation(newState);
		}}>College of Nursing</button
	>, or
	<button
		class=" bubble bg-dental bg-opacity-40 hover:bg-opacity-60 hover:underline"
		onclick={() => {
			const newState: ViewportState = { scale: 'College', collegeName: 'College of Nursing' };
			newNavigation(newState);
		}}>School of Dental Medicine</button
	>.
</p>
<br />
<p>
	Use the help button at the top to see all features, or just have fun exploring by clicking on different items.
</p>
