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

	let bar = { x: 250, y: 10, line_y: 14 };

	let barchartWidths = $derived({
		[Mission.Education]: bar.x * (missionCount[Mission.Education] / mostMissions),
		[Mission.Research]: bar.x * (missionCount[Mission.Research] / mostMissions),
		[Mission.Service]: bar.x * (missionCount[Mission.Service] / mostMissions)
	});

	let missions: Mission[] = $derived([Mission.Education, Mission.Research, Mission.Service]);
</script>

<div>
	{#each missions as mission (mission)}
		<!-- Button / Container -->
		<button
			onclick={() => {
				filters[mission] = !filters[mission];
				console.log('click!', filters);
			}}
			class=" {filters[mission]
				? 'border-stone-400 bg-stone-100 bg-opacity-100 hover:border-stone-600'
				: 'hover:border-stone-400'}
				m-1 flex cursor-pointer items-center gap-1 rounded border px-2 hover:bg-stone-200 hover:shadow"
		>
			<input
				class="cursor-pointer"
				type="checkbox"
				style="accent-color:{missionColors[mission]}"
				checked={filters[mission]}
			/>
			<!-- Label -->
			<span
				class=" {filters[mission]
					? 'text-stone'
					: 'text-stone-500'} text-md w-28 text-center transition-all duration-75"
				>{missionName[mission]}</span
			>

			<!-- Bar Chart -->
			<div
				class=" h-full flex-1 rounded-sm bg-stone-300 bg-opacity-80 shadow-inner"
				style="width:{bar.x}px; height:{bar.y}px;"
			>
				<div
					class="{filters[mission]
						? 'shadow'
						: 'backdrop-brightness-50'} h-full flex-1 rounded-sm bg-current transition-all duration-75"
					style="width:{barchartWidths[mission]}px; height:{bar.y}px; background-color:{filters[
						mission
					]
						? missionColors[mission]
						: missionColors[mission] + '44'};"
				></div>
			</div>
			<!-- Count -->
			<span class="w-5 text-left text-sm text-zinc-600">{missionCount[mission]}</span>
		</button>
	{/each}
</div>
