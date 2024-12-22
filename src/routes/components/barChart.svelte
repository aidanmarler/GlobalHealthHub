<script lang="ts">
	import { filters } from '$lib/globals/DataFilters.svelte';
	import { missionColors, missionName } from '$lib/mapDependencies';
	import { Mission, type MissionCount } from '$lib/types';

	let { missionCount }: { missionCount: MissionCount } = $props();

	let mostMissions = $derived(
		Math.max(
			missionCount[Mission.Education],
			missionCount[Mission.Research],
			missionCount[Mission.Service]
		)
	);

	let bar = { x: 200, y: 10, line_y: 15 };

	let barchartWidths = $derived({
		[Mission.Education]: bar.x * (missionCount[Mission.Education] / mostMissions),
		[Mission.Research]: bar.x * (missionCount[Mission.Research] / mostMissions),
		[Mission.Service]: bar.x * (missionCount[Mission.Service] / mostMissions)
	});

	let missions: Mission[] = $derived([Mission.Education, Mission.Research, Mission.Service]);
</script>

<div class="text-sm">
	{#each missions as mission (mission)}
		<!-- Button / Container -->
		<button
			onclick={() => {
				filters[mission] = !filters[mission];
				console.log(filters);
			}}
			class=" {filters[mission] ? 'bg-stone-950 bg-opacity-100' : ''}
				m-1 flex cursor-pointer items-center gap-1 rounded px-2 hover:bg-stone-700 hover:shadow"
		>
			<!-- Label -->
			<span
				class=" {filters[mission]
					? 'text-stone'
					: 'text-stone-500'} w-28 text-center text-sm transition-all duration-75"
				>{missionName[mission]}</span
			>

			<!-- Color Icon -->
			<div
				class="rounded-sm bg-stone-800 bg-opacity-80 shadow-inner"
				style="width 10px; height:{bar.y}px;"
			>
				<div
					class="{filters[mission]
						? 'shadow'
						: 'bg-opacity-0'} rounded-sm bg-current px-0 transition-all duration-75"
					aria-label="toggle {missionName[mission]}"
					style="width:{bar.y * 0.3}px; height:{bar.y}px; background-color:{filters[mission]
						? missionColors[mission]
						: missionColors[mission] + '77'};"
				></div>
			</div>

			<!-- Bar Chart -->
			<div
				class=" h-full flex-1 rounded-sm bg-stone-800 bg-opacity-80 shadow-inner"
				style="width:200px; height:{bar.y}px;"
			>
				<div
					class="{filters[mission]
						? 'shadow'
						: 'backdrop-brightness-50'} h-full flex-1 rounded-sm bg-current transition-all duration-75"
					style="width:{barchartWidths[mission]}px; height:{bar.y}px; background-color:{filters[
						mission
					]
						? missionColors[mission]
						: missionColors[mission] + '77'};"
				></div>
			</div>
			<!-- Count -->
			<span class="w-5 text-left text-xs text-stone-400">{missionCount[mission]}</span>
		</button>
	{/each}
</div>
