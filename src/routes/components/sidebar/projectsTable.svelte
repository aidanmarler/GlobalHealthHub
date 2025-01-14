<script lang="ts">
	import { newNavigation } from '$lib/globals/Viewport.svelte';
	import {
		ViewportScale,
		type Project,
		type PropertyDisplayInfo,
		type ViewportState
	} from '$lib/types';

	let { projects, properties }: { projects: Project[]; properties: Array<keyof Project> } =
		$props();

	const propertiesDisplayInfo = {
		ContactName: {
			displayName: 'Contact',
			width: 'auto'
		}
	};
</script>

<table class="border-eee table-auto border-collapse border">
	<tbody>
		<!--Column Headers are created here here-->
		<tr class="border-999 shadow-ccc bg-eee left-0 right-0 overflow-scroll border shadow">
			{#each properties as property}
				<th class="border-r px-3 {property} border-999">{property}</th>
			{/each}
		</tr>

		<!--Project Rows are created here-->
		{#each projects as project (project.id)}
			<tr class="hover:bg-eee z-10 max-h-10 h-10 transition-all duration-75 hover:shadow">
				{#each properties as property}
					<td
						onclick={() => {
							if (['ContactName', 'Country'].includes(property)) {
								return;
							}
							const newViewportState: ViewportState = $state({
								scale: ViewportScale.Project,
								projectID: project.id
							});
							newNavigation(newViewportState);
						}}
						class="border-999 max-h-20 h-10 w-40 overflow-scroll border p-1"
					>
						{#if ['ContactName', 'Country'].includes(property)}
							<button
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
								class="rounded border-2 border-zinc-400 bg-zinc-300 font-semibold hover:border-zinc-600"
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
