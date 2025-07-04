<script lang="ts">
	import { currentViewportState, viewportData } from '$lib/globals/Viewport.svelte';
	import { onMount } from 'svelte';
	import DropDown from '../components/dropDown.svelte';
	import CalloutStatContainer from '../components/calloutStatContainer.svelte';
	import type { Project } from '$lib/types';

	let { projects }: { projects: Project[] } = $props();

	let countries = $derived.by(() => {
		const list: string[] = [];
		for (const project of viewportData.projects) {
			if (list.includes(project.Country)) continue;
			list.push(project.Country);
		}
		viewportData.projects;
		return list;
	});

	let network = $derived.by(() => {
		const list: string[] = [];
		for (const project of projects) {
			if (!countries.includes(project.Country)) continue;	// if country not in countries
			if (list.includes(project.PrimaryContactName)) continue;
			if (project.PrimaryContactName == currentViewportState.networkName as string) continue;
			list.push(project.PrimaryContactName);
		}
		return list;
	});

	let emails = $derived.by(() => {
		const list: string[] = [];
		for (const project of viewportData.projects) {
			if (list.includes(project.PrimaryContactEmail.trim())) continue;
			list.push(project.PrimaryContactEmail.trim());
		}
		viewportData.projects;
		return list;
	});
</script>

<CalloutStatContainer calloutStats={['Projects', 'Countries']} />

<!-- Network Summary -->
{currentViewportState.networkName} is the contact for {viewportData.projects.length} projects.

<br />
<br />
<DropDown category={'Country'} items={countries} startOpen={true} isNetwork={false} />
<DropDown category={'Network'} items={network} startOpen={true} isNetwork={false} />
<p class="font-semibold">
	Email: {#each emails as email, i}
		{#if i !== 0},
		{/if}
		<a class="font-normal text-blue-600 hover:underline" href="mailto:{email}">
			{email}
		</a>
	{/each}
</p>
