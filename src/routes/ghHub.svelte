<script lang="ts">
	import { onMount } from 'svelte';
	import type { Project } from '$lib/types';
	import { parseProjectsCSV } from '$lib/utils/csvUtils';
	import { updateViewportLocalProjects, viewportData } from '$lib/globals/Viewport.svelte';
	import seedrandom from 'seedrandom';
	import type { FeatureCollection, Feature, Point } from 'geojson';
	import LoadingIcon from './components/map/loadingIcon.svelte';
	import Tooltip from './components/tooltip/tooltip.svelte';
	import ProjectsTable from './components/table/projectsTable.svelte';
	import SideBar from './components/sidebar/sideBar.svelte';
	import Map from './components/map/map.svelte';
	import NavBar from './components/navigation/navBar.svelte';

	let projects: Project[] = $state([]);
	let projectsGeoJSON: FeatureCollection<Point> = $state({
		type: 'FeatureCollection',
		features: []
	});
	let loadComplete = $state(false);

	const properties: Array<keyof Project> = [
		'ProjectTitle',
		'ContactName',
		'Country',
		'PrimaryCollegeOrSchool',
		'Mission'
	];

	onMount(async () => {
		projects = await parseProjectsCSV('/data/projects_2023.csv');
		projectsGeoJSON = await LoadGeoJSON(projects);
		updateViewportLocalProjects(projects); // projects[] are stored in the viewport, but initally loaded here for svelte reasons. So this gives the loaded projects to viewport.svelte.ts
	});

	async function LoadGeoJSON(projects: Project[]) {
		let geojsonData: FeatureCollection;

		const rng = seedrandom('seed');

		// Function to apply jitter
		function jitter(value: number) {
			return value + (rng() - 0.5) * 0.1 * 2; // Random value in [-jitterAmount, jitterAmount]
		}

		// Convert projects to GeoJSON
		return (geojsonData = {
			type: 'FeatureCollection',
			features: projects
				.filter((project) => project.longitude !== null && project.latitude !== null) // Ensure valid coordinates
				.map(
					(project: Project): Feature<Point> => ({
						id: project.id,
						type: 'Feature',
						properties: {
							Id: project.id,
							Global: project.Global,
							Country: project.Country,
							City: project.City,
							Mission: project.Mission,
							PrimaryCollegeOrSchool: project.PrimaryCollegeOrSchool,
							PrimaryDepartmentOrCenter: project.PrimaryDepartmentOrCenter,
							ContactName: project.ContactName,
							ContactEmail: project.ContactEmail,
							ContactPosition: project.ContactPosition
						},
						geometry: {
							type: 'Point',
							coordinates: [jitter(project.longitude), jitter(project.latitude)]
						}
					})
				)
		});
	}
</script>

<!--The border used online: border-width:5px;border-style:solid;border-color:#eee;padding:20px;-->
<!--top:50%; left:50%; transform:translate(-50%, -50%); width: 1140px; height: 627.6px; -->

<Tooltip />

<div
	class="overflow-scroll-y relative flex h-auto w-full flex-col items-center justify-center bg-white p-10 shadow-lg md:h-[628px]"
	style="box-shadow: 5px 5px 5px #ddd; border: 1px solid #ddd;"
>
	<!-- Nav Bar -->
	<div class="relative left-0 top-0 h-16 w-full z-30 md:absolute">
		<NavBar {projects} />
	</div>

	<!-- Connected, as legend always goes below map at equal width -->
	<div class="relative bottom-0 top-24 w-full p-5 md:absolute md:top-16">
		<!-- Map Components -->
		<div
			class="relative top-0 flex h-96 w-full md:absolute md:bottom-0 md:right-auto md:h-auto md:w-[calc(60%-30px)]"
		>
			<!-- Map -->
			<div class="absolute bottom-52 top-0 flex w-full" style="border: 1px solid #ddd;">
				{#if projectsGeoJSON.features.length > 0}
					<Map {projectsGeoJSON} bind:loadComplete />
				{/if}
				{#if !loadComplete}
					<LoadingIcon />
				{/if}
			</div>
		</div>
		<div class="absolute bottom-3 left-5 right-5 flex h-48 overflow-scroll md:absolute">
			<ProjectsTable projects={viewportData.projects} {properties} />
		</div>
		<!-- Description -->
		<div
			class="relative bottom-52 left-2 right-3 top-0 flex h-auto md:absolute md:left-auto md:w-[calc(40%-15px)]"
		>
			<SideBar {projects} />
		</div>
	</div>
</div>
