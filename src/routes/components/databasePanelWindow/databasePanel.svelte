<script lang="ts">
	import type { Project } from '$lib/types';
	import { fade } from 'svelte/transition';

	let {
		projects,
		databaseOpen = $bindable()
	}: {
		projects: Project[];
		databaseOpen: boolean;
	} = $props();
</script>

<div
	class="h-full w-full items-center overflow-scroll bg-white bg-opacity-100 shadow-sm shadow-999"
>
	<div class="absolute left-0 top-0 z-30 h-14 w-full bg-white shadow-sm shadow-ccc">
		<button
			title="Download Database"
			onclick={() => {
				const downloadLink = document.createElement('a');
				downloadLink.href = '/data/projects_2025.csv'; // Publicly accessible static file
				downloadLink.download = 'CSPH_projects_2025.csv'; // Suggested filename for download

				alert(
					'Downloading CSPH_projects_2025.csv (113kb)'
				);

				// Append the link to the body and trigger a click to start the download
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
			}}
			class="text-md absolute right-16 top-1.5 flex h-auto items-center rounded-full border-4 border-white bg-blue-600 bg-opacity-70 p-0.5 px-6 text-center font-semibold text-white hover:bg-opacity-100"
		>
			<img alt="Close Help Page" class="mr-3 h-8 w-8" src="/icons/interaction/download.svg" />
			Download
		</button>
		<h1 class="absolute flex left-4 h-full items-center text-2xl font-thin text-black">
			Complete Dataset ({projects.length} Projects)
		</h1>
		<button
			onclick={() => {
				databaseOpen = false;
			}}
			title="Return to Map"
			class="absolute right-3 top-1 h-12 w-12 rounded-full border-2 border-transparent p-1 opacity-70 shadow-ccc outline-blue-500 hover:border-black hover:bg-white hover:opacity-100 focus:opacity-100"
		>
			<img alt="Close Help Page" class="h-full w-full invert" src="/icons/interaction/close.svg" />
		</button>
	</div>

	<div class="mt-14 p-3">
		<table class="h-full max-w-max cursor-default">
			<thead>
				<tr class="border-2 border-black bg-white text-center font-semibold text-black">
					<!--Itterate through each key of Project type-->
					{#each Object.keys(projects[0]) as property}
						<th title={property} class="border-collapse border-2 border-black">
							{property}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody class="h-1/2 overflow-auto bg-eee shadow-inner shadow-ccc">
				<!--Project Rows are created here-->
				{#each projects as project (project.id)}
					<tr
						in:fade|global={{ duration: 100 }}
						class="border-b-2 border-ccc text-center transition-transform duration-75"
					>
						<!--Itterate through each key of Project type-->
						{#each Object.keys(project) as property}
							<td>
								{project[property as keyof Project]}
							</td>
						{/each}
						<td class="px-2">{project.id}</td>
						<td>{project.ProjectTitle}</td>
						<td>{project.Country}</td>
						<td>{project.City}</td>
						<td>{project.PrimaryContactName}</td>
						<td>{project.PrimaryContactPosition}</td>
						<td>{project.PrimaryContactEmail}</td>
						<td>{project.Mission}</td>
						<td>{project.PrimaryCollegeOrSchool}</td>
						<td>{project.PrimaryDepartmentOrCenter}</td>
						<td>{project.ProjectAcronym}</td>
						<td>{project.ProjectTitle}</td>
						<td>{project.ProjectWebsite}</td>
						<td class="text-left">{project.Description}</td>
						<td>{project.Description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
