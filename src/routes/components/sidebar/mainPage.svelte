<script lang="ts">
	import { type Project } from '$lib/types';
	import type { FeatureCollection, Point } from 'geojson';

	import TextContainer from './textContainer.svelte';
	import Map from '../map/map.svelte';
	import LoadingIcon from '../map/loadingIcon.svelte';
	import Map0 from '../map/map0.svelte';

	let {
		projects,
		projectsGeoJSON,
		beginLoadingMap,
		loadComplete = $bindable()
	}: {
		projects: Project[];
		projectsGeoJSON: FeatureCollection<Point>;
		beginLoadingMap: boolean;
		loadComplete: boolean;
	} = $props();
</script>

<div class="z-20 h-full w-full text-black sm:p-2">
	<!-- Map Container -->
	<div
		class="relative h-80 w-full border border-ddd
		md:float-right md:mb-0 md:ml-5 md:block md:h-80 md:w-[50%]"
	>
		{#if projectsGeoJSON.features.length > 0 && beginLoadingMap}
			<Map0 {projectsGeoJSON} bind:loadComplete />
		{/if}
		{#if !loadComplete}
			<LoadingIcon />
		{/if}
	</div>

	<!-- Text Container - like a little wiki page -->
	<TextContainer {projects} />
</div>
