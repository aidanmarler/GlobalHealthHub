<script lang="ts">
	import { newNavigation } from '$lib/globals/Viewport.svelte';
	import { collegeName, missionName } from '$lib/mapDependencies';
	import {
		College,
		Mission,
		ViewportScale,
		type Project,
		type PropertyDisplayInfo,
		type ViewportState
	} from '$lib/types';
	import { updateTooltip } from '../tooltip/tooltipHelper.svelte';

	let { projects, properties }: { projects: Project[]; properties: Array<keyof Project> } =
		$props();

	const propertiesDisplayInfo = {
		ContactName: {
			displayName: 'Contact',
			width: 'auto'
		}
	};
</script>

<table class="h-full w-full cursor-default">
	<thead class="">
		<!--Column Headers are created here here-->
		<tr class="h-6 bg-eee shadow shadow-ccc">
			{#each properties as property}
				<th class="border-collapse border-2 border-999 px-3">{property}</th>
			{/each}
		</tr>
	</thead>
	<tbody class="shadow-inner shadow-ccc">
		<!--Project Rows are created here-->
		{#each projects as project (project.id)}
			<tr
				class="pointer-events-auto z-10 snap-end shadow-ccc transition-all duration-75 hover:bg-eee hover:shadow-md"
			>
				{#each properties as property}
					<td
						onclick={() => {
							if (['ContactName', 'Country'].includes(property)) {
								return;
							}
							const newViewportState: ViewportState = $state({
								scale: ViewportScale.Project,
								projectID: project.id,
								networkName: project.ContactName,
								countryName: project.Country
							});
							newNavigation(newViewportState);
						}}
						class="border-collapse snap-end overflow-scroll border-2 border-ccc p-2"
					>
						{#if ['ContactName', 'Country'].includes(property)}
							<button
								onmouseover={async () => {
									updateTooltip('View');
								}}
								onfocus={async () => {
									updateTooltip('View');
								}}
								onmouseleave={async () => {
									updateTooltip('');
								}}
								onfocusout={async () => {
									updateTooltip('');
								}}
								onclick={() => {
									if (property == 'ContactName') {
										const newViewportState: ViewportState = $state({
											scale: ViewportScale.Network,
											networkName: project.ContactName
										});
										newNavigation(newViewportState);
										return;
									}
									if (property == 'Country') {
										const newViewportState: ViewportState = $state({
											scale: ViewportScale.Country,
											countryName: project.Country
										});
										newNavigation(newViewportState);
										return;
									}
								}}
								class="h-full w-full rounded border-2 border-zinc-400 bg-zinc-300 px-3 text-center font-semibold hover:border-zinc-600"
							>
								{project[property]}
							</button>
						{:else if property == 'Mission'}
							<div
								class="{project[property] == missionName[Mission.Education]
									? 'border-education'
									: project[property] == missionName[Mission.Research]
										? 'border-research'
										: project[property] == missionName[Mission.Service]
											? 'border-service'
											: 'stone-500'} w-full content-center border-b-4 bg-center text-center"
								>{project[property]}
						</div>
						{:else if property == 'PrimaryCollegeOrSchool'}
							<span
								class="{project[property] == collegeName[College.Public]
									? 'border-public'
									: project[property] == collegeName[College.Nursing]
										? 'border-nursing'
										: project[property] == collegeName[College.Medicine]
											? 'border-medicine'
											: project[property] == collegeName[College.Dental]
												? 'border-dental'
												: project[property] == collegeName[College.Pharmacy]
													? 'border-pharmacy'
													: 'stone-900'} mx-1 w-full border-b-4"
								>{project[property]}
							</span>
						{:else}
							{project[property]}
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
	<tfoot class="block h-2"> </tfoot>
</table>
