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
		onmouseover={async () => {
			updateTooltip('Global Summary');
		}}
		onfocus={async () => {
			updateTooltip('Global Summary');
		}}
		onmouseleave={async () => {
			updateTooltip('');
		}}
		onfocusout={async () => {
			updateTooltip('');
		}}
	>
		<img alt="project icon" class="h-full w-full opacity-100" src="/icons/category/globe.svg" />
	</button>

	<!-- Search Bar-->
	<div class=" absolute left-80 right-64 flex w-auto">
		<div class="h-9 w-full"><SearchBar {projects} /></div>
	</div>

	<!-- Help Button-->
	<button
		onclick={() => {
			databaseOpen = true;
		}}
		onmouseover={async () => {
			updateTooltip('Database');
		}}
		onfocus={async () => {
			updateTooltip('Database');
		}}
		onmouseleave={async () => {
			updateTooltip('');
		}}
		onfocusout={async () => {
			updateTooltip('');
		}}
		class="absolute right-16 h-8 w-8 opacity-50 shadow-ccc hover:opacity-70"
	>
		<img alt="Open Help" class="h-full w-full invert" src="/icons/interaction/database.svg" />
	</button>

	<!-- Help Button-->
	<button
		onclick={() => {
			helpOpen = true;
		}}
		onmouseover={async () => {
			updateTooltip('Help');
		}}
		onfocus={async () => {
			updateTooltip('Help');
		}}
		onmouseleave={async () => {
			updateTooltip('');
		}}
		onfocusout={async () => {
			updateTooltip('');
		}}
		class="absolute right-5 h-8 w-8 opacity-75 shadow-ccc hover:opacity-100"
	>
		<img alt="Open Help" class="h-full w-full invert" src="/icons/interaction/help.svg" />
	</button>
</div>
