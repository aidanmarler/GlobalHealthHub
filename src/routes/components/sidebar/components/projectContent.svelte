<script lang="ts">
	import { newNavigation, viewportData } from '$lib/globals/Viewport.svelte';
	import { type ViewportState } from '$lib/types';
</script>

{#if viewportData.projects[0].ProjectAcronym}{viewportData.projects[0].ProjectAcronym}{/if}
{#if viewportData.projects[0].ProjectWebsite}
	<h3>Email: {viewportData.projects[0].ProjectWebsite}</h3>
{/if}
<h3>
	Country:
	<button
		class="rounded border-2 border-zinc-400 bg-zinc-300 px-3 font-semibold hover:border-zinc-600"
		onclick={() => {
			const newState: ViewportState = {
				scale: 'Country',
				countryName: viewportData.projects[0].Country
			};
			newNavigation(newState);
		}}>{viewportData.projects[0].Country}</button
	>
</h3>
<br />
<h3>
	Mission: <span
		class="border-b-4 {viewportData.projects[0].Mission == 'Education'
			? 'border-education'
			: viewportData.projects[0].Mission == 'Research'
				? 'border-research'
				: viewportData.projects[0].Mission == 'Service/Clinical'
					? 'border-service'
					: 'stone-500'}">{viewportData.projects[0].Mission}</span
	>
</h3>
<br />
<h3>School: {viewportData.projects[0].PrimaryCollegeOrSchool}</h3>
<br />
<h3>
	<button
		class="rounded border-2 border-zinc-400 bg-zinc-300 px-3 font-semibold hover:border-zinc-600"
		onclick={() => {
			const newState: ViewportState = {
				scale: 'Contact',
				networkName: viewportData.projects[0].ContactName
			};
			newNavigation(newState);
		}}>{viewportData.projects[0].ContactName}</button
	>
	{#if viewportData.projects[0]}ContactPosition, {viewportData.projects[0].ContactPosition}
	{/if}
</h3>

{#if viewportData.projects[0].ContactEmail}
	<h3>Email: {viewportData.projects[0].ContactEmail}</h3>
{/if}
<br />
<p>{viewportData.projects[0].InternationalNetwork}</p>
<p>{viewportData.projects[0].InternationalInstitution}</p>
<p>{viewportData.projects[0].PrimaryFundingAgency}</p>
<p>{viewportData.projects[0].InternationalNetwork}</p>
{#if viewportData.projects[0].Description}
	<p>{viewportData.projects[0].Description}</p>
{/if}
