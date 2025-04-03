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
	import Help from './components/helpWindow/help.svelte';
	import { fade, fly } from 'svelte/transition';
	import DatabasePanel from './components/databasePanelWindow/databasePanel.svelte';

	// Holds projects from csv in an array of custom Project type
	let projects: Project[] = $state([]);
	// Holds projects from array in a GeoJSON feature collection
	let projectsGeoJSON: FeatureCollection<Point> = $state({
		type: 'FeatureCollection',
		features: []
	});
	let loadComplete = $state(false); // tracks if loading screen should disappear
	let helpOpen = $state(true); // tracks if should show help page
	let databaseOpen = $state(false); // tracks if should show database page
	let beginLoadingMap = $state(false); // tracks if initial page help page been closed to call and load Map
	let canScrollToTop = $state(false); // tracks if should show scroll to top button

	// What properties should head the Table
	const properties: Array<keyof Project> = [
		'ProjectTitle',
		'ContactName',
		'Country',
		'PrimaryCollegeOrSchool',
		'Mission'
	];

	// On mount, load the projects, then load a GeoJSON from it, and update the viewports local store of projects
	// the local store could affect RAM...
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
	class="relative flex h-[120vmin] min-h-[500px] w-full flex-col items-center justify-center overflow-x-hidden bg-white p-2 shadow-lg md:h-[628px] md:p-10"
	style="box-shadow: 5px 5px 5px #ddd; border: 1px solid #ddd;"
>
	<!-- Help Window -->
	{#if helpOpen}
		<div
			transition:fly={{ x: 100, y: 0, duration: 200 }}
			class="absolute left-0 right-0 z-40 h-full w-full p-1"
		>
			<Help bind:helpOpen bind:beginLoadingMap />
		</div>
	{/if}

	<!-- Database Panel -->
	{#if databaseOpen}
		<div
			transition:fly={{ x: -100, duration: 200 }}
			class="absolute left-0 right-0 z-40 h-full w-full p-0"
		>
			<DatabasePanel bind:databaseOpen {projects} />
		</div>
	{/if}

	<!-- Nav Bar -->
	<div class=" absolute left-0 top-0 z-30 h-14 w-full shadow-sm shadow-ccc">
		<NavBar {projects} bind:helpOpen bind:databaseOpen />
	</div>

	<!-- Scroll to Top Button -->
	<div class=" absolute bottom-5 right-5 z-30 h-auto w-auto">
		{#if canScrollToTop}
			<button
				transition:fly={{ y: 50, duration: 200 }}
				title="Scroll to Top"
				aria-label="Scroll to Top"
				class="h-14 w-14 rounded-xl border border-ccc
				bg-neutral-200 bg-opacity-50 p-2 text-black shadow-sm shadow-neutral-500 outline-offset-2 outline-blue-500 backdrop-blur-sm transition-all
				duration-100 hover:bg-neutral-100 hover:bg-opacity-100 hover:shadow-black focus:bg-white focus:bg-opacity-100 focus:shadow-black"
				onclick={() => {
					const mainContent = document.getElementById('mainContent');
					if (mainContent) {
						mainContent.scrollTo({ top: 0, behavior: 'smooth' });
					}
				}}
			>
				<img
					alt="Double Up Arrow"
					class="h-full w-full invert"
					src="/icons/interaction/arrowUpDouble.svg"
				/>
			</button>
		{/if}
	</div>

	<!-- Connected, as legend always goes below map at equal width -->
	<div
		class="absolute bottom-0 top-14 h-auto w-full overflow-y-scroll bg-white p-5"
		onscroll={() => {
			const projectsTable = document.getElementById('projectsTable');
			if (projectsTable) {
				const rect = projectsTable.getBoundingClientRect();
				canScrollToTop = rect.top < 400; // Toggle button visibility if scrolled this far
			}
		}}
		id="mainContent"
	>
		<!-- Description -->
		<div
			class=" absolute left-3 right-3 top-0 mb-10 flex h-1/3 pb-10
			md:bottom-40 md:left-auto md:top-0 md:h-auto md:w-[calc(40%-15px)]"
		>
			<SideBar {projects} />
		</div>

		<!-- Map Components -->
		<!-- Map -->
		<div
			class="absolute bottom-[20%] left-3 right-3 top-[34%] flex h-auto w-auto bg-purple-200
				md:absolute md:bottom-40 md:left-5 md:right-auto md:top-2 md:h-auto md:w-[calc(60%-30px)]"
			style="border: 1px solid #ddd;"
		>
			{#if projectsGeoJSON.features.length > 0 && beginLoadingMap}
				<Map {projectsGeoJSON} bind:loadComplete />
			{/if}
			{#if !loadComplete}
				<LoadingIcon />
			{/if}
		</div>

		<!-- Table of Projects -->
		<div
			class="absolute bottom-3 left-3 right-3 flex h-1/6 w-auto
			md:absolute md:bottom-3 md:left-5 md:right-5 md:h-36"
			id="projectsTable"
		>
			<ProjectsTable projects={viewportData.projects} {properties} />
		</div>
	</div>
</div>
