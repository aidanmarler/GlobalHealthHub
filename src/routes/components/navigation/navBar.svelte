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
	class="absolute flex h-full w-full content-center items-center border-b border-neutral-800 bg-neutral-200"
>
	<!-- Nav Buttons -->
	<div class="absolute left-5">
		<NavPageButtons />
	</div>

	
	<div class="h-6 w-[0px] bg-neutral-400/50 absolute left-[100px]"></div>

	<!-- Globe Button -->
	<button
		class="  left-[102px] rounded-full cursor-default text-center item-center justify-center
		absolute h-11 w-11 bg-white shadow-neutral-900 shadow-sm border-2 border-transparent outline-offset-2 p-1
		
		{currentViewportState.scale ==
		'Global'
			? ' opacity-30 '
			: '   cursor-pointer hover:border-blue-500  hover:shadow-md hover:shadow-neutral-900 outline-blue-500'}"
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
	<!--absolute right-1.5 left-1.5 bg-blue-500/20-->
	<div class="absolute left-40 right-4 sm:right-32 lg:w-1/2 lg:left-64">
		<SearchBar {projects} />
	</div>

	<!-- Database View Button-->
	<button
		onclick={() => {
			databaseOpen = true;
		}}
		title="Database"
		aria-label="Open Database"
		class=" right-[62px] mr-2 
		absolute h-11 w-11 rounded-full bg-white shadow-neutral-900 shadow-sm border-2 border-transparent p-0.5 outline-offset-2
		hover:border-blue-500  hover:shadow-md hover:shadow-neutral-900 outline-blue-500 "
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
		class=" right-5 
		absolute h-[46px] w-[46px] rounded-full bg-white shadow-neutral-900 shadow-sm border-2 border-transparent p-0.5 outline-offset-2
		hover:border-blue-500 hover:shadow-md hover:shadow-neutral-900 outline-blue-500 "
	>
		<img alt="Open Help" class="h-full w-full invert" src="/icons/interaction/help.svg" />
	</button>

</div>
