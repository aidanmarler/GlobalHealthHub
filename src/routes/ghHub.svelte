<script lang="ts">
	import { onMount } from 'svelte';
	import Map from './components/map.svelte';
	import { ViewportScale, type Project } from '$lib/types';
	import { parseProjectsCSV } from '$lib/utils/csvUtils';
	import Legend from './components/legend.svelte';
	import SideBar from './components/sideBar.svelte';
	import ScaleTabs from './components/scaleTabs.svelte';
	import NavPageButtons from './components/subcomponents/navPageButtons.svelte';
	import { currentViewportState, viewportData } from '$lib/globals/Viewport.svelte';

	let projects: Project[] = $state([]);

	async function initializeDataset() {
		projects = await parseProjectsCSV('/data/projects_2023.csv');
		updateViewportProjects(currentViewportState.scale);
	}

	onMount(async () => {
		initializeDataset()
		//projects = await parseProjectsCSV('/data/projects_2023.csv');
	});

	$effect(() => {
		updateViewportProjects(currentViewportState.scale);
	});

	// This function updates projects that are being examined/used by user
	export function updateViewportProjects(scale: ViewportScale) {
		let projectsList: Project[] = [];

		switch (currentViewportState.scale) {
			case ViewportScale.Project: {
				if (currentViewportState.projectID != undefined) {
					projectsList.push(projects[currentViewportState.projectID - 1]);
				}
				break;
			}
			case ViewportScale.Country: {
				projects.forEach((project) => {
					if (project.Country == currentViewportState.countryName) {
						projectsList.push(project);
					}
				});
				break;
			}
			case ViewportScale.Network: {
				projects.forEach((project) => {
					if (project.ContactName == currentViewportState.networkName) {
						projectsList.push(project);
					}
				});
				break;
			}
			case ViewportScale.Global: {
				projectsList = projects;
			}
		}
		viewportData.projects = projectsList;
		return;
	}
</script>

<!--The border used online: border-width:5px;border-style:solid;border-color:#eee;padding:20px;-->
<!--top:50%; left:50%; transform:translate(-50%, -50%); width: 1140px; height: 627.6px; -->

<div
	class="relative overflow-scroll-y flex h-auto md:h-[628px] w-full flex-col items-center justify-center bg-white p-10 shadow-lg"
	style="box-shadow: 5px 5px 5px #ddd; border: 1px solid #ddd;"
>
	<!-- Nav Bar -->
	<div class="relative md:absolute left-5 top-1 flex w-full">
		<!-- Scale Tabs -->
		<div>
			<ScaleTabs />
		</div>
		<!-- Nav Buttons -->
		<div class="absolute right-10 top-2.5">
			<NavPageButtons />
		</div>
	</div>

	<!-- Connected, as legend always goes below map at equal width -->
	<div class="relative md:absolute bottom-0 top-24 w-full p-5 md:top-16">
		<!-- Map Components -->
		<div
			class="relative top-0 flex h-96 w-full md:absolute md:bottom-5 md:right-auto md:h-auto md:w-[calc(64%-30px)]"
		>
			{#if true}
				<!-- Map -->
				<div class="absolute bottom-32 top-0 flex w-full" style="border: 1px solid #ddd;">
					<Map {projects} />
				</div>
				<!-- Map legend -->
				<div class="absolute bottom-0 w-full h-[calc(160px-20px)] flex md:absolute">
					<Legend />
				</div>
			{/if}
		</div>

		<!-- Description -->
		<div
			class="relative bottom-5 left-5 right-5 top-0 flex h-auto bg-red-500 md:absolute md:left-auto md:w-[calc(36%-30px)]"
			style="border-width:5px;border-style:solid;border-color:#eee;padding:15px;"
		>
			<SideBar {projects} />
		</div>
	</div>
</div>
