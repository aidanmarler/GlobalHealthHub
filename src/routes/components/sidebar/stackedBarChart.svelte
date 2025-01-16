<script lang="ts">
	import { collegeName, missionName } from '$lib/mapDependencies';
	import { College, Mission, type DivisionCount } from '$lib/types';
	import { updateTooltip } from '../tooltip/tooltipHelper.svelte';

	let { active, divisionCounts }: { active: boolean; divisionCounts: DivisionCount[] } = $props();

	let totalCount = $derived.by(() => {
		let total = 0;
		divisionCounts.forEach((divisionCount) => {
			total += divisionCount.count;
		});
		return total;
	});
</script>

<div class="w-full {active ? 'h-10' : 'h-5'}">
	{#each divisionCounts as divisionCount}
		{#if divisionCount.count > 0}
			<button
				onmouseover={() => {
					updateTooltip(
						divisionCount.label +
							' - ' +
							String(divisionCount.count) +
							' project' +
							(divisionCount.count > 1 ? 's' : '')
					);
				}}
				onfocus={() => {
					updateTooltip(
						divisionCount.label +
							' - ' +
							String(divisionCount.count) +
							' project' +
							(divisionCount.count > 1 ? 's' : '')
					);
				}}
				onmouseleave={() => {
					updateTooltip('');
				}}
				onfocusout={() => {
					updateTooltip('');
				}}
				onclick={() => {
					console.log('divisionCount.type');
				}}
				aria-label={'Mission or College'}
				style="width: {String((divisionCount.count / totalCount) * 100)}%;"
				class="h-full border {divisionCount.type == Mission.Education
					? 'bg-education'
					: divisionCount.type == Mission.Research
						? 'bg-research'
						: divisionCount.type == Mission.Service
							? 'bg-service'
							: divisionCount.type == College.Public
								? 'bg-public'
								: divisionCount.type == College.Nursing
									? 'bg-nursing'
									: divisionCount.type == College.Medicine
										? 'bg-medicine'
										: divisionCount.type == College.Dental
											? 'bg-dental'
											: divisionCount.type == College.Pharmacy
												? 'bg-pharmacy'
												: 'bg-999'} border-white"
			>
			</button>
		{/if}
	{/each}
</div>
