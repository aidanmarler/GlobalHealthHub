<script lang="ts">
	import { newNavigation } from '$lib/globals/Viewport.svelte';
	import type { College, Mission, Project, ViewportState } from '$lib/types';
	import CalloutStatContainer from '../components/calloutStatContainer.svelte';
	import StackedBarChart from '../../legacy/stackedBarChart.svelte';
	import { colleges, missions } from '$lib/ProjectParameters';
	import DropDown from '../components/dropDown.svelte';
	let {
		projects,
		viewportDivisions
	}: {
		projects: Project[];
		viewportDivisions: { m: Record<Mission, number>; c: Record<College, number> };
	} = $props();
</script>

<CalloutStatContainer calloutStats={['Projects', 'Contacts', 'Countries', 'Travelers']} />

<p class="text-black">
	The <span class="">Colorado School of Public Health, Center for Global Health,</span>
	has projects accross the globe!
</p>
<br />
	<DropDown items={missions} category={'Mission'} startOpen={true} isNetwork={false} />
	<DropDown items={colleges} category={'College'} startOpen={true} isNetwork={false} />
<br />
<p>
	Use the help button at the top to see all features, or just have fun exploring by clicking on different items.
</p>
