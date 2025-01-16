<script lang="ts">
	import { newNavigation } from '$lib/globals/Viewport.svelte';
	import { collegeName, missionName } from '$lib/mapDependencies';
	import { College, Mission, ViewportScale, type Project } from '$lib/types';
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

<table class="h-full w-full table-fixed cursor-default">
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
	<tbody class="cursor-pointer border-x-2 border-white shadow-inner shadow-ccc">
		<!--Project Rows are created here-->
		{#each projects as project (project.id)}
			<tr class="border-b-2 border-ccc">
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
									/*newNavigation({
										scale: ViewportScale.Project,
										projectID: project.id,
										networkName: project.ContactName,
										countryName: project.Country
									});*/
									break;

								case 'PrimaryCollegeOrSchool':
									/*newNavigation({
										scale: ViewportScale.Project,
										projectID: project.id,
										networkName: project.ContactName,
										countryName: project.Country
									});*/
									break;

								case 'Country':
									newNavigation({
										scale: ViewportScale.Country,
										countryName: project.Country
									});
									break;
								case 'ContactName':
									newNavigation({
										scale: ViewportScale.Network,
										networkName: project.ContactName
									});
									break;

								case 'ProjectTitle':
									newNavigation({
										scale: ViewportScale.Project,
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
								class="{project[property] == missionName[Mission.Education]
									? 'border-education'
									: project[property] == missionName[Mission.Research]
										? 'border-research'
										: project[property] == missionName[Mission.Service]
											? 'border-service'
											: 'stone-500'} w-full content-center border-b-4 bg-center text-center"
							>
								{project[property]}
							</button>
						{:else if property == 'PrimaryCollegeOrSchool'}
							<button
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
