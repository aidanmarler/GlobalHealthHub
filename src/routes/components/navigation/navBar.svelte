<script lang="ts">
	import { currentViewportState, newNavigation } from '$lib/globals/Viewport.svelte';
	import type { Project } from '$lib/types';
	import { updateTooltip } from '../tooltip/tooltipHelper.svelte';
	import NavPageButtons from './components/navPageButtons.svelte';
	import SearchBar from './components/searchBar.svelte';

	let {
		projects,
		helpOpen = $bindable(),
		databaseOpen = $bindable()
	}: { projects: Project[]; helpOpen: boolean; databaseOpen: boolean } = $props();
</script>

<div class="absolute flex h-full w-full content-center items-center">
	<!-- Nav Buttons -->
	<div class="absolute left-5">
		<NavPageButtons />
	</div>

	<!-- Globe Button -->
	<button
		class=" absolute left-24 w-7 cursor-default rounded-full bg-black p-0.5 transition-colors duration-75 {currentViewportState.scale ==
		'Global'
			? 'opacity-30'
			: 'opacity-80 hover:opacity-100 hover:shadow-sm'} shadow-999"
		onclick={() => {
			newNavigation({ scale: 'Global' });
		}}
		title="Global Summary"
		aria-label="Global Summary"
	>
		<img alt="project icon" class="h-full w-full opacity-100" src="/icons/category/globe.svg" />
	</button>

	<!-- Search Bar-->
	<div
		class=" absolute left-32 right-4 flex sm:left-40 sm:right-32 md:left-1/2 md:w-1/2 md:-translate-x-[45%] lg:w-1/2"
	>
		<div class="h-9 w-full"><SearchBar {projects} /></div>
	</div>

	<!-- Help Button-->
	<button
		onclick={() => {
			databaseOpen = true;
		}}
		title="Database"
		aria-label="Open Database"
		class="absolute right-16 h-8 w-8 rounded-full opacity-70 shadow-ccc outline-offset-2 outline-blue-500 hover:opacity-100 focus:opacity-100"
	>
		<img alt="Open Help" class="h-full w-full invert" src="/icons/interaction/database.svg" />
	</button>

	<!-- Help Button-->
	<button
		onclick={() => {
			helpOpen = true;
		}}
		title="Help"
		aria-label="Open Help"
		class="absolute right-5 h-8 w-8 rounded-full opacity-75 shadow-ccc outline-offset-2 outline-blue-500 hover:opacity-100 focus:opacity-100"
	>
		<img alt="Open Help" class="h-full w-full invert" src="/icons/interaction/help.svg" />
	</button>
</div>
