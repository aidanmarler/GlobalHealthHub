<script lang="ts">
	import { currentViewportState, viewportData } from '$lib/globals/Viewport.svelte';
	import { onMount } from 'svelte';
	import DropDown from '../components/dropDown.svelte';
	import CalloutStatContainer from '../components/calloutStatContainer.svelte';

	onMount(() => {
		console.log('projects', viewportData.projects);
		console.log('countries', countries);
	});

	let countries = $derived.by(() => {
		let list: string[] = [];
		for (const project of viewportData.projects) {
			if (list.includes(project.Country)) continue;
			list.push(project.Country);
		}
		viewportData.projects;
		return list;
	});

	let network = $derived.by(() => {
		let list: string[] = [];
		for (const project of viewportData.projects) {
			if (list.includes(project.Country)) continue;
			list.push(project.Country);
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
<br />
<DropDown category={'Contact'} items={network} startOpen={true} isNetwork={false}/>
