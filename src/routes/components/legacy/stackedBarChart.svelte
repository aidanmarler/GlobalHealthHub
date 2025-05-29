<script lang="ts">
	import { type DivisionCount } from '$lib/types';
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

<div class="w-full md:w-1/2 md:pr-5 {active ? 'h-6' : 'h-2'}">
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
				aria-label={'Mission or College'}
				style="width: {String((divisionCount.count / totalCount) * 100)}%;"
				class="h-full border {divisionCount.type == 'Education'
					? 'bg-education'
					: divisionCount.type == 'Research'
						? 'bg-research'
						: divisionCount.type == 'Service/Clinical'
							? 'bg-service'
							: divisionCount.type == 'Colorado School of Public Health'
								? 'bg-public'
								: divisionCount.type == 'College of Nursing'
									? 'bg-nursing'
									: divisionCount.type == 'School of Medicine'
										? 'bg-medicine'
										: divisionCount.type == 'School of Dental Medicine'
											? 'bg-dental'
											: divisionCount.type ==
												  'Skaggs School of Pharmacy and Pharmaceutical Sciences'
												? 'bg-pharmacy'
												: 'bg-999'} border-white"
			>
			</button>
		{/if}
	{/each}
</div>
