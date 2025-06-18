<script lang="ts">
	import {
		hex_college,
		collegeLabels,
		colleges,
		hex_mission,
		missionLabels,
		missions
	} from '$lib/ProjectParameters';
	import type { College, Mission } from '$lib/types';
	import { fly } from 'svelte/transition';
	import MissionContent from '../content/missionContent.svelte';
	import { newNavigation } from '$lib/globals/Viewport.svelte';

	let { value, max, type }: { value: number; max: number; type: Mission | College } = $props();

	let label = $derived(
		missions.includes(type as Mission)
			? missionLabels[type as Mission]
			: collegeLabels[type as College]
	);

	let color = $derived(
		missions.includes(type as Mission)
			? hex_mission[type as Mission]
			: hex_college[type as College]
	);

	let direction = $derived(missions.includes(type as Mission) ? 1 : -1);
</script>

<div
	class="flex h-5 w-full"
	in:fly|global={{ x: direction*10, duration: 75, delay: 75 }}
	out:fly|global={{ x: direction*10, duration: 75 }}
>
	<!--Label-->
	<button
		class="flex h-full w-48 items-center justify-center text-sm font-semibold hover:underline"
		onclick={() => {
			if (missions.includes(type as Mission)) {
				newNavigation({
					scale: 'Mission',
					missionName: type as Mission
				});
				return;
			}
			if (colleges.includes(type as College)) {
				newNavigation({
					scale: 'College',
					collegeName: type as College
				});
				return;
			}
		}}
	>
		{label}
	</button>
	<!--bar-->
	<div class="mx-1 my-0.5 h-auto w-full items-center rounded-sm bg-eee">
		<div
			class="h-full rounded-sm shadow-sm shadow-999"
			style="width: {(value / max) * 100}%; background-color: {color};"
		></div>
	</div>
	<div class="flex h-full w-10 items-center justify-center italic text-999">
		{value}
	</div>
</div>
