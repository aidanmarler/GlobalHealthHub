<script lang="ts">
	import { onMount } from 'svelte';
	import Map from './components/map.svelte';
	import type { Project } from '$lib/types';
	import { parseProjectsCSV } from '$lib/utils/csvUtils';
	import Legend from './components/legend.svelte';

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
	<!-- Top label -->
	<div class="absolute left-1/2 top-3 flex -translate-x-1/2 transform items-center space-x-2">
		{#if MapContext !== 'Global'}
			<button
				aria-label="Return to global view"
				class="rounded border border-stone-800 bg-stone-900 px-3 py-1 text-white hover:bg-sky-700"
				><img alt="globe icon" class="h-6 w-6 invert" src="./globe.svg" /></button
			>
		{/if}
		<div
			class="w-32 cursor-default rounded border border-stone-800 bg-stone-900 bg-opacity-50 px-3 py-1 text-center text-white backdrop-blur-md"
		>
			{MapContext}
		</div>
	</div>

	<!-- Map legend -->
	<Legend {projects} />

	<!-- Side bar -->
	<div
		class="absolute right-0 top-0 h-full w-5 cursor-pointer bg-stone-700 transition-all duration-300 hover:w-6"
	>
		<div class="mt-2 text-center text-white"></div>
	</div>
</div>
