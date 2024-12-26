<script lang="ts">
	import { currentViewportState, viewportData } from '$lib/globals/Viewport.svelte';
	import { missionName } from '$lib/mapDependencies';
	import { Mission, ViewportScale, type MissionCount, type Project } from '$lib/types';
	import BarChart from './subcomponents/barChart.svelte';

	('use strict');

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
		//console.log("viewportData", viewportData)
		//missionCount = CountProjectTypes(viewportData.projects);
		missionCount = CountProjectTypes(viewportData.projects);
		//console.log("", missionCount);
	});

	let legendTitle = $derived.by(() => {
		let title: string = '';
		switch (currentViewportState.scale) {
			case ViewportScale.Global: {
				title = 'Missions, Globaly';
				break;
			}
			case ViewportScale.Network: {
				title = 'Missions led by ' + currentViewportState.networkName;
				break;
			}
			case ViewportScale.Country: {
				title = 'Missions in ' + currentViewportState.countryName;
				break;
			}
			case ViewportScale.Project: {
				title = 'Project Mission';
				break;
			}
			default: {
				title = 'Missions';
			}
		}
		return title;
	});
</script>

<div class=" w-full flex items-center text-black">
	<h4 class=" w-40 self-center px-2 text-center text-xl font-semibold">{legendTitle}</h4>
	<BarChart {missionCount} />
</div>
