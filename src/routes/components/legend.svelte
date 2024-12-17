<script lang="ts">
	import { viewportData } from '$lib/globals/Viewport.svelte';
	import { missionName } from '$lib/mapDependencies';
	import { Mission, type MissionCount, type Project } from '$lib/types';
	import BarChart from './barChart.svelte';

	('use strict');

	let { projects }: { projects: Project[] } = $props();

	let missionCount = $state({
		[Mission.Education]: 0,
		[Mission.Research]: 0,
		[Mission.Service]: 0
	});

	function CountProjectTypes(projects_counted: Project[]) {
		let projectTypes: MissionCount = {
			[Mission.Education]: 0,
			[Mission.Research]: 0,
			[Mission.Service]: 0
		};
		projects_counted.forEach((project) => {
			switch (project.Mission) {
				case missionName[Mission.Education]: {
					projectTypes[Mission.Education] += 1;
					break;
				}
				case missionName[Mission.Research]: {
					projectTypes[Mission.Research] += 1;
					break;
				}
				case missionName[Mission.Service]: {
					projectTypes[Mission.Service] += 1;
					break;
				}
				default: {
					console.log('Unknown mission type: ' + project.Mission);
					break;
				}
			}
			return;
		});
		return projectTypes;
	}

	$effect(() => {
		console.log("viewportData", viewportData)
		//missionCount = CountProjectTypes(viewportData.projects);
		missionCount = CountProjectTypes(projects);
	
	});
</script>

<div
	class="absolute bottom-7 left-5 w-auto transform rounded-md border border-stone-600 bg-stone-700 bg-opacity-60 px-2 py-1 text-white backdrop-blur-md"
>
	<h4 class="px-5">Mission</h4>
	<BarChart {missionCount} />
</div>
