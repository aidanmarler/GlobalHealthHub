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

<button
	onclick={() => {
		databaseOpen = false;
	}}
	class="absolute right-5 top-4 z-40 h-8 w-8 rounded-full opacity-80 hover:opacity-100"
>
	<img alt="Close Help Page" class="h-full w-full invert" src="/icons/interaction/close.svg" />
</button>

<div class="h-full w-full border border-ccc bg-neutral-100 bg-opacity-100 shadow-sm shadow-999">
	<div class="absolute bottom-10 left-10 right-10 top-32 overflow-auto shadow-inner">
		<table class="h-full w-full table-fixed cursor-default">
			<tbody class="cursor-pointer border-x-2">
				<!--Project Rows are created here-->
				{#each projects as project (project.id)}
					<tr
						in:fade|global={{ duration: 100 }}
						class="border-b-2 border-ccc transition-transform duration-75"
					>
						<td>{project.id}</td>
						<td>{project.ProjectTitle}</td>
						<td>{project.Country}</td>
						<td>{project.City}</td>
						<td>{project.ContactName}</td>
						<td>{project.ContactPosition}</td>
						<td>{project.ContactEmail}</td>
						<td>{project.Mission}</td>
						<td>{project.PrimaryCollegeOrSchool}</td>
						<td>{project.PrimaryDepartmentOrCenter}</td>
						<td>{project.ProjectAcronym}</td>
						<td>{project.ProjectTitle}</td>
						<td>{project.ProjectWebsite}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
