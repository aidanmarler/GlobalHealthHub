<script lang="ts">
	import { type SortBy, type Project } from '$lib/types';
	import type { FeatureCollection, Point } from 'geojson';

	import TextContainer from './textContainer.svelte';
	import LoadingIcon from '../map/loadingIcon.svelte';
	import Map from '../map/map.svelte';
	import BarChartContainer from './components/barChartContainer.svelte';
	import { currentViewportState } from '$lib/globals/Viewport.svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let {
		projects,
		countries,
		projectsGeoJSON,
		beginLoadingMap,
		loadComplete = $bindable()
	}: {
		projects: Project[];
		countries: Set<string>;
		projectsGeoJSON: FeatureCollection<Point>;
		beginLoadingMap: boolean;
		loadComplete: boolean;
	} = $props();

	let sortBy: SortBy = $state('Mission');

	let map: Map | null = $state(null);
	const updateColors = () => map?.call_updateColors();
</script>

<div class="z-20 h-full w-full text-black sm:p-2">
	<!-- Map Container -->
	<div
		class="relative aspect-video w-full
		lg:float-right lg:mb-0 lg:ml-5 lg:block lg:w-[35rem]"
	>
		<div class="aspect-[16/8] w-full border border-ddd">
			{#if projectsGeoJSON.features.length > 0 && beginLoadingMap}
				<Map {projectsGeoJSON} {countries} {sortBy} bind:loadComplete bind:this={map} />
			{/if}
			{#if !loadComplete}
				<LoadingIcon />
			{/if}
		</div>

		<div
			transition:fly={{ y: -10, duration: 100, opacity: 0 }}
			class=" relative block h-auto w-full lg:border border-ddd bg-white p-2 pb-3"
		>
			<BarChartContainer bind:sortBy {updateColors} />
		</div>
	</div>

	<!-- Text Container - like a little wiki page -->
	<TextContainer {projects} />
</div>
