<script lang="ts">
	import { newNavigation } from '$lib/globals/Viewport.svelte';
	import { type College, type Mission, type Project } from '$lib/types';
	import { fade, fly } from 'svelte/transition';
	import { updateTooltip } from '../tooltip/tooltipHelper.svelte';

	let { projects, properties }: { projects: Project[]; properties: Array<keyof Project> } =
		$props();

	const propertiesDisplayInfo = {
		ContactName: {
			displayName: 'Contact',
			width: 'auto'
		}
	};

	const propertyNames: Partial<Record<keyof Project, string>> = {
		ProjectTitle: 'Title',
		PrimaryCollegeOrSchool: 'College',
		ContactName: 'Contact'
	};
</script>

<table class="h-1/3 overflow-hidden absolute w-full table-fixed cursor-default">
	<thead class="h-2 p-0">
		<!--Column Headers are created here here-->
		<tr class="shadow shadow-ccc">
			{#each properties as property}
				<th
					onmouseover={() => {
						updateTooltip(
							(propertyNames[property] ? propertyNames[property] : property) +
								' ' +
								(['Contact'].includes(
									String(propertyNames[property] ? propertyNames[property] : property)
								)
									? 'for'
									: 'of') +
								' a Project'
						);
					}}
					onfocus={() => {
						updateTooltip(
							(propertyNames[property] ? propertyNames[property] : property) +
								' ' +
								(['Contact'].includes(
									String(propertyNames[property] ? propertyNames[property] : property)
								)
									? 'for'
									: 'of') +
								' a Project'
						);
					}}
					onmouseleave={() => {
						updateTooltip('');
					}}
					onfocusout={() => {
						updateTooltip('');
					}}
					class="border-collapse border-2 border-b-2 border-black"
					>{propertyNames[property] ? propertyNames[property] : property}</th
				>
			{/each}
		</tr>
	</thead>
	<tbody class="cursor-pointer overflow-scroll h-1/2 bg-yellow-300 border-x-2 border-white shadow-inner shadow-ccc">
		<!--Project Rows are created here-->
		{#each projects as project (project.id)}
			<tr
				in:fade|global={{ duration: 100 }}
				class="border-b-2 border-ccc transition-transform duration-75"
			>
				{#each properties as property}
					<td
						onmouseover={() => {
							updateTooltip(
								'See ' +
									(String(property) == 'ProjectTitle'
										? 'Project'
										: String(propertyNames[property] ? propertyNames[property] : property))
							);
						}}
						onfocus={() => {
							updateTooltip(
								(propertyNames[property] ? propertyNames[property] : property) + ' of a Project'
							);
						}}
						onmouseleave={() => {
							updateTooltip('');
						}}
						onfocusout={() => {
							updateTooltip('');
						}}
						onclick={() => {
							switch (property) {
								case 'Mission':
									newNavigation({
										scale: 'Mission',
										missionName: project.Mission
									});
									break;

								case 'PrimaryCollegeOrSchool':
									newNavigation({
										scale: 'College',
										collegeName: project.PrimaryCollegeOrSchool
									});
									break;

								case 'Country':
									newNavigation({
										scale: 'Country',
										countryName: project.Country
									});
									break;
								case 'ContactName':
									newNavigation({
										scale: 'Contact',
										networkName: project.ContactName
									});
									break;

								case 'ProjectTitle':
									newNavigation({
										scale: 'Project',
										projectID: project.id,
										networkName: project.ContactName,
										countryName: project.Country
									});
									break;

								default:
									break;
							}
						}}
						class="border-collapse p-2 shadow-ccc transition-all duration-75 hover:bg-eee hover:shadow-md"
					>
						{#if ['ContactName', 'Country'].includes(property)}
							<button class="h-full w-full px-3 text-center">
								{project[property]}
							</button>
						{:else if property == 'Mission'}
							<button
								class="{project[property] == 'Education'
									? 'border-education'
									: project[property] == 'Research'
										? 'border-research'
										: project[property] == 'Service/Clinical'
											? 'border-service'
											: 'stone-500'} w-full content-center border-b-4 bg-center text-center"
							>
								{project[property]}
							</button>
						{:else if property == 'PrimaryCollegeOrSchool'}
							<button
								class="{project[property] == 'Colorado School of Public Health'
									? 'border-public'
									: project[property] == 'College of Nursing'
										? 'border-nursing'
										: project[property] == 'School of Medicine'
											? 'border-medicine'
											: project[property] == 'School of Dental Medicine'
												? 'border-dental'
												: project[property] ==
													  'Skaggs School of Pharmacy and Pharmaceutical Sciences'
													? 'border-pharmacy'
													: 'stone-900'} mx-1 w-full border-b-4"
							>
								{project[property]}
							</button>
						{:else}
							{project[property]}
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
