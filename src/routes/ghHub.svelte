<script lang="ts">
	import { onMount } from 'svelte';
	import Map from './components/map.svelte';
	import type { Project } from '$lib/types';
	import { parseProjectsCSV } from '$lib/utils/csvUtils';
	import Legend from './components/legend.svelte';
	import SideBar from './components/sideBar.svelte';
	import ScaleTabs from './components/scaleTabs.svelte';

	let MapContext = $state('Global');
	let projects: Project[] = $state([]);
	let selectedProjectID: number = $state(0);

	onMount(async () => {
		projects = await parseProjectsCSV('/data/projects_2023.csv');
	});
</script>

<div class="fixed h-screen w-screen">
	<!-- Map -->
	<div class="absolute inset-0 flex">
		<!-- I am dubious on this whole system, 
		 but it is the only I was able to get global projects working.  
		 Mostly unhappy they are a state and not a const.-->

		<Map {projects} />
	</div>

	<!-- Top label / Tabs -->
	<ScaleTabs />

	<!-- Map legend -->
	<Legend {projects} />

	<!-- Side bar -->
	<SideBar {projects} />
</div>
