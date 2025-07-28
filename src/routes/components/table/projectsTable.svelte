<script lang="ts">
	import { newNavigation } from '$lib/globals/Viewport.svelte';
	import { type Category, type College, type Mission, type Project } from '$lib/types';
	import { fade, fly } from 'svelte/transition';
	import { updateTooltip } from '../tooltip/tooltipHelper.svelte';
	import {
		bg_college,
		bg_general,
		bg_mission,
		categoryIcons,
		propertyNameToCategory
	} from '$lib/ProjectParameters';

	let { projects, properties }: { projects: Project[]; properties: Array<keyof Project> } =
		$props();

	const propertiesDisplayInfo = {
		ContactName: {
			displayName: 'Contact',
			width: 'auto'
		}
	};

	const propertyNames: Partial<Record<keyof Project, string>> = {
		ProjectTitle: 'Project',
		PrimaryCollegeOrSchool: 'College',
		PrimaryContactName: 'Contact'
	};

	function handleClick(project: Project, property: keyof Project) {
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
			case 'PrimaryContactName':
				newNavigation({
					scale: 'Contact',
					networkName: project.PrimaryContactName
				});
				break;

			case 'ProjectTitle':
				newNavigation({
					scale: 'Project',
					projectID: project.id,
					networkName: project.PrimaryContactName,
					countryName: project.Country
				});
				break;

			default:
				break;
		}
	}

	function retrieve_bg(property: string, project: Record<string, any>): string {
		switch (property) {
			case 'ProjectTitle':
				return bg_general.Project;
			case 'Country':
				return bg_general.Country;
			case 'PrimaryContactName':
				return bg_general.Contact;
			case 'Mission':
				return bg_mission[project[property] as Mission] ?? '';
			case 'PrimaryCollegeOrSchool':
				return bg_college[project[property] as College] ?? '';
			default:
				return '';
		}
	}
</script>

<div class="absolute w-full pb-6 transition-all duration-300">
	<table class="h-1/3 w-full min-w-[550px] overflow-x-clip table-fixed cursor-default ">
		<thead class="h-2 p-0 shadow-md">
			<tr class="">
				{#each properties as property}
					<th
						title={(propertyNames[property] ? propertyNames[property] : property) +
							' ' +
							(['Contact'].includes(
								String(propertyNames[property] ? propertyNames[property] : property)
							)
								? 'for'
								: 'of') +
							' a Project'}
						class="border-collapse border border-black bg-ddd text-lg"
					>
						<div class="flex h-full w-full items-center justify-center text-center">
							<img
								alt="person"
								class="mr-2 w-5 invert"
								src={'icons/' + categoryIcons[propertyNameToCategory[property]]}
							/>
							{propertyNames[property] ? propertyNames[property] : property}
						</div>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody class="h-1/2 overflow-auto border-x border-white">
			{#each projects as project (project.id)}
				<tr
					in:fade|global={{ duration: 100 }}
					class=" border-b border-neutral-300 transition-transform duration-75"
				>
					{#each properties as property}
						<td class="objects-center center items-center bg-center p-2 text-center">
							<button
								onclick={() => {
									handleClick(project, property);
								}}
								title={'See ' +
									(String(property) == 'ProjectTitle'
										? 'Project'
										: String(propertyNames[property] ? propertyNames[property] : property))}
								class="bubble bg-opacity-50 hover:bg-opacity-70
								{retrieve_bg(property, project)}
								"
							>
								{project[property]}
							</button>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
