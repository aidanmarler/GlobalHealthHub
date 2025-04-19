<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import type { Project } from '$lib/types';
	import { parseProjectsCSV } from '$lib/utils/csvUtils';
	import { updateViewportLocalProjects, viewportData } from '$lib/globals/Viewport.svelte';
	import seedrandom from 'seedrandom';
	import type { FeatureCollection, Feature, Point } from 'geojson';
	import Tooltip from './components/tooltip/tooltip.svelte';
	import ProjectsTable from './components/table/projectsTable.svelte';
	import NavBar from './components/navigation/navBar.svelte';
	import Help from './components/helpWindow/help.svelte';
	import { fly } from 'svelte/transition';
	import DatabasePanel from './components/databasePanelWindow/databasePanel.svelte';
	import MainPage from './components/sidebar/mainPage.svelte';

	// Holds projects from csv in an array of custom Project type
	let projects: Project[] = $state([]);
	let all_projects = $state({}); // holds all projects from csv in an array of custom Project type
	let mapped_projects: Record<string, Project> = $state({}); // holds mapped projects from csv in an array of custom Project type

	setContext('all_projects', all_projects); // Set the context for the projects array
	setContext('mapped_projects', mapped_projects); // Set the context for the mapped projects array

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
		'PrimaryContactName',
		'Country',
		'PrimaryCollegeOrSchool',
		'Mission'
	];

	// On mount, load the projects, then load a GeoJSON from it, and update the viewports local store of projects
	// the local store could affect RAM...
	onMount(async () => {
		projects = await parseProjectsCSV('/data/projects_2025.csv');
		for (const project of projects) {
			if (project.Country == 'International') {
				console.log(project);
				console.log('undefined', project.Lng == undefined);
				console.log('null', project.Lng == null);
				console.log('NaN', Number.isNaN(project.Lng));
			}

			if (
				Number.isNaN(project.Lat) ||
				Number.isNaN(project.Lng) ||
				project.ProjectTitle == '' ||
				project.PrimaryContactName == '' ||
				project.Mission == undefined ||
				project.PrimaryCollegeOrSchool == undefined ||
				project.Country == '' ||
				project.Country == 'United States'
			) {
				continue;
			}

			mapped_projects[project.id] = project;
		}

		console.log('mapped_projects', mapped_projects);
		console.log('length', Object.keys(mapped_projects).length);

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
				.filter((project) => project.Lng !== null && project.Lat !== null) // Ensure valid coordinates
				.map(
					(project: Project): Feature<Point> => ({
						id: project.id,
						type: 'Feature',
						properties: {
							id: project.id,
							ProjectTitle: project.ProjectTitle,
							Country: project.Country,
							City: project.City,
							Mission: project.Mission,
							PrimaryCollegeOrSchool: project.PrimaryCollegeOrSchool,
							PrimaryDepartmentOrCenter: project.PrimaryDepartmentOrCenter,
							PrimaryContactName: project.PrimaryContactName,
							PrimaryContactEmail: project.PrimaryContactEmail,
							PrimaryContactPosition: project.PrimaryContactPosition
						},
						geometry: {
							type: 'Point',
							coordinates: [jitter(project.Lng), jitter(project.Lat)]
						}
					})
				)
		});
	}

	function handleScroll() {
		const mainContent = document.getElementById('mainContent');
		if (!mainContent) return;
		const scrollTop = mainContent.scrollTop;
		canScrollToTop = scrollTop > 300;
	}

	function scrollToTop() {
		const mainContent = document.getElementById('mainContent');
		mainContent?.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<!--The custom tooltip is a global thing that can be accessed anywhere by any component-->
<Tooltip />

<div
	class="relative flex h-[120vmin] min-h-[500px] w-full flex-col items-center justify-center overflow-x-hidden border border-neutral-700 bg-white p-2 shadow-lg md:h-[628px] md:p-10"
	style="box-shadow: 5px 5px 5px #ddd;"
>
	<!-- Help Window -->
	{#if helpOpen}
		<div
			transition:fly={{ x: 500, y: 0, duration: 500 }}
			class="absolute left-0 right-0 z-40 h-full w-full p-1"
		>
			<Help bind:helpOpen bind:beginLoadingMap />
		</div>
	{/if}

	<!-- Database Window -->
	{#if databaseOpen}
		<div
			transition:fly={{ x: 500, duration: 500 }}
			class="absolute left-0 right-0 z-40 h-full w-full p-0"
		>
			<DatabasePanel bind:databaseOpen {projects} />
		</div>
	{/if}

	<!-- Nav Bar (top) -->
	<div class=" absolute left-0 top-0 z-30 h-14 w-full shadow-sm shadow-ccc">
		<NavBar {projects} bind:helpOpen bind:databaseOpen />
	</div>

	<!-- Scroll to Top Button (on side) -->
	<div class=" absolute bottom-5 right-5 z-30 h-auto w-auto">
		{#if canScrollToTop}
			<button
				transition:fly={{ y: 50, duration: 200 }}
				title="Scroll to Top"
				aria-label="Scroll to Top"
				class="h-12 w-12 rounded-full border border-neutral-900
				bg-neutral-800 bg-opacity-70 p-2 text-black shadow-sm shadow-neutral-500 outline-offset-2 outline-blue-500 backdrop-blur-sm transition-all
				duration-100 hover:bg-neutral-900 hover:bg-opacity-100 hover:shadow-black focus:bg-neutral-900 focus:bg-opacity-100 focus:shadow-black"
				onclick={scrollToTop}
			>
				<img
					alt="Up Arrow"
					class="h-full w-full rotate-90"
					src="/icons/interaction/arrowLeft.svg"
				/>
			</button>
		{/if}
	</div>

	<!-- Main Page Content -->
	<div
		class="absolute bottom-0 top-14 h-auto w-full overflow-y-scroll bg-white p-3"
		id="mainContent"
		onscroll={handleScroll}
	>
		<div class="relative flex flex-col transition-all duration-300">
			<div class="relative h-auto w-full transition-all duration-300" id="">
				<MainPage {projects} {projectsGeoJSON} {beginLoadingMap} bind:loadComplete />
			</div>

			<div
				class="relative mb-10 mt-5 h-auto w-full border-y-2 border-eee py-1 text-center text-xl italic transition-all duration-300"
			>
				See projects below
			</div>

			<div class="relative flex h-1/6 w-auto transition-all duration-300">
				<ProjectsTable projects={viewportData.projects} {properties} />
			</div>
		</div>
	</div>
</div>
