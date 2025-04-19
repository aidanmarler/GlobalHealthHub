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

<div
	class="absolute flex h-full w-full content-center items-center border-b border-neutral-800 bg-ddd"
>
	<!-- Nav Buttons -->
	<div class="absolute left-5">
		<NavPageButtons />
	</div>

	<!-- Globe Button -->
	<button
		class=" absolute left-28 h-12 w-12 cursor-default rounded-full border border-transparent p-2 text-center {currentViewportState.scale ==
		'Global'
			? 'opacity-30'
			: 'cursor-pointer opacity-80 hover:border hover:border-black hover:bg-white hover:opacity-100'}"
		onclick={() => {
			newNavigation({ scale: 'Global' });
		}}
		title="Global Summary"
		aria-label="Global Summary"
	>
		<img
			alt="project icon"
			class="h-full w-full opacity-100 invert"
			src="/icons/category/globe.svg"
		/>
	</button>

	<!-- Search Bar-->
	<div
		class=" absolute left-32 right-4 flex sm:left-40 sm:right-32 md:left-1/2 md:w-1/2 md:-translate-x-[45%] lg:w-1/2"
	>
		<div class="w-full"><SearchBar {projects} /></div>
	</div>

	<!-- Database View Button-->
	<button
		onclick={() => {
			databaseOpen = true;
		}}
		title="Database"
		aria-label="Open Database"
		class="absolute right-16 mr-2 h-12 w-12 rounded-full border border-transparent p-1 opacity-80 shadow-ccc outline-offset-2 outline-blue-500 hover:border-black hover:bg-white hover:opacity-100 focus:opacity-100"
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
		class="absolute right-5 h-12 w-12 rounded-full border border-transparent p-1 opacity-80 shadow-ccc outline-blue-500 hover:border-black hover:bg-white hover:opacity-100 focus:opacity-100"
	>
		<img alt="Open Help" class="h-full w-full invert" src="/icons/interaction/help.svg" />
	</button>
</div>
