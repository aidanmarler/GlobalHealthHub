<script lang="ts">
	import { newNavigation } from '$lib/globals/Viewport.svelte';
	import {
		collegeColors,
		collegeLabels,
		colleges,
		missionColors,
		missionLabels,
		missions
	} from '$lib/ProjectParameters';

	import type { College, ColorPointBy, Mission } from '$lib/types';
	import { fade, fly } from 'svelte/transition';

	// Stores what points should be colored by on the map
	let { updateColors, colorBy = $bindable() }: { updateColors: () => void; colorBy: ColorPointBy } =
		$props();

	// Stores if the legend is hidden
	let showLegend = $state(true);
</script>

{#snippet LegendItem(mission?: Mission, college?: College)}
	<div class="flex w-full items-center">
		<button
			in:fly|global={{ y: 40, duration: 100 }}
			onclick={() => {
				if (mission) {
					newNavigation({
						scale: 'Mission',
						missionName: mission
					});
					return;
				}
				if (college) {
					newNavigation({
						scale: 'College',
						collegeName: college
					});
					return;
				}
			}}
			class="flex w-full cursor-pointer items-center text-sm hover:underline"
			title={mission ? mission : college ? college : ''}
			aria-label={mission ? mission : college ? college : ''}
		>
			<div
				class="ml-1 mr-2 h-4 w-5 border-white shadow-sm shadow-999"
				style="background-color:{mission
					? missionColors[mission]
					: college
						? collegeColors[college]
						: ''}"
			></div>
			<div
				class="flex w-full cursor-pointer content-center items-center justify-center text-center"
			>
				{mission ? missionLabels[mission] : college ? collegeLabels[college] : ''}
				<img
					class="h-4 w-4 opacity-0 invert"
					alt={mission ? missionLabels[mission] : college ? collegeLabels[college] : ''}
					src="/icons/interaction/exitBox.svg"
				/>
			</div>
		</button>
	</div>
{/snippet}

<div class="absolute bottom-1 right-1 z-10 block w-40">
	{#if showLegend}
		<div
			transition:fly={{ y: 40, duration: 100 }}
			class="w-full rounded-sm bg-eee bg-opacity-70 p-1 shadow-sm backdrop-blur-sm"
		>
			{#if colorBy == 'Mission'}
				{#each missions as mission}
					{@render LegendItem(mission, undefined)}
				{/each}
			{/if}
			{#if colorBy == 'College'}
				{#each colleges as college}
					{@render LegendItem(undefined, college)}
				{/each}
			{/if}
		</div>
	{/if}
	<div class="flex w-full rounded-sm bg-white bg-opacity-70 p-1 shadow-sm backdrop-blur-sm">
		<button
			class="left-0 mx-1 h-6 w-7 rounded-md p-1 opacity-70 shadow-sm hover:bg-white hover:opacity-100"
			onclick={() => {
				showLegend = !showLegend;
			}}
			title={showLegend ? 'Hide Legend' : 'Show Legend'}
			aria-label={showLegend ? 'Hide Legend' : 'Show Legend'}
		>
			<img
				class="h-full w-full invert"
				alt={showLegend ? 'Open Legend' : 'Close Legend'}
				src="/icons/interaction/{showLegend ? 'minimize' : 'maximize'}.svg"
			/>
		</button>
		<select
			class="w-full rounded-sm border border-999 bg-white px-1 pb-0.5 text-center text-sm text-neutral-900"
			onchange={updateColors}
			title="Color by Mission or College"
			aria-label="Color by Mission or College"
			bind:value={colorBy}
		>
			<option class="text-center" value="Mission"> Mission </option>
			<option value="College"> College </option>
		</select>
	</div>
</div>
