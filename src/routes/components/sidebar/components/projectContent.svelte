<script lang="ts">
	import { newNavigation, viewportData } from '$lib/globals/Viewport.svelte';
	import { type ViewportState } from '$lib/types';
</script>

<p>
	This is a project focused on
	<button
		onclick={() => {
			const newState: ViewportState = {
				scale: 'Mission',
				missionName: viewportData.projects[0].Mission
			};
			newNavigation(newState);
		}}
		class="bubble bg-opacity-50 hover:bg-opacity-70 {viewportData.projects[0].Mission == 'Education'
			? 'bg-education'
			: viewportData.projects[0].Mission == 'Research'
				? 'bg-research'
				: viewportData.projects[0].Mission == 'Service/Clinical'
					? 'bg-service'
					: 'bg-neutral-500'}"
		>{viewportData.projects[0].Mission}
	</button>
	work and hosted primarily by
	<button
		onclick={() => {
			const newState: ViewportState = {
				scale: 'College',
				collegeName: viewportData.projects[0].PrimaryCollegeOrSchool
			};
			newNavigation(newState);
		}}
		class="bubble bg-opacity-50 hover:bg-opacity-70
			{viewportData.projects[0].PrimaryCollegeOrSchool == 'Colorado School of Public Health'
			? 'bg-public'
			: viewportData.projects[0].PrimaryCollegeOrSchool == 'College of Nursing'
				? 'bg-nursing'
				: viewportData.projects[0].PrimaryCollegeOrSchool == 'School of Medicine'
					? 'bg-medicine'
					: viewportData.projects[0].PrimaryCollegeOrSchool == 'School of Dental Medicine'
						? 'bg-dental'
						: viewportData.projects[0].PrimaryCollegeOrSchool ==
							'Skaggs School of Pharmacy and Pharmaceutical Sciences'}
		"
		>{viewportData.projects[0].PrimaryCollegeOrSchool}
	</button>.
	<br />
	The primary contact is
	<button
		class="bubble bg-neutral-400 bg-opacity-50 hover:bg-opacity-70"
		onclick={() => {
			const newState: ViewportState = {
				scale: 'Contact',
				networkName: viewportData.projects[0].PrimaryContactName
			};
			newNavigation(newState);
		}}>{viewportData.projects[0].PrimaryContactName}</button
	>

	and it opperates out of
	<button
		class="bubble bg-neutral-500 bg-opacity-50 hover:bg-opacity-70"
		onclick={() => {
			const newState: ViewportState = {
				scale: 'Country',
				countryName: viewportData.projects[0].Country
			};
			newNavigation(newState);
		}}>{viewportData.projects[0].Country}</button
	>.
</p>

<br />
<br />

{#if viewportData.projects[0].PrimaryContactEmail}
	<p>
		Email:
		<a
			class="text-blue-600 hover:underline"
			href="mailto:{viewportData.projects[0].PrimaryContactEmail}"
		>
			{viewportData.projects[0].PrimaryContactEmail}
		</a>
	</p>
{/if}
{#if viewportData.projects[0].ProjectWebsite}
	<p>
		Website:
		<a
			class="text-blue-600 visited:text-purple-600 hover:underline"
			href={viewportData.projects[0].ProjectWebsite}
		>
			{viewportData.projects[0].ProjectWebsite}
		</a>
	</p>
{/if}
{#if viewportData.projects[0].InternationalNetwork}
	<p>International Network: {viewportData.projects[0].InternationalNetwork}</p>
{/if}
{#if viewportData.projects[0].InternationalInstitution}
	<p>International Institution: {viewportData.projects[0].InternationalInstitution}</p>
{/if}
{#if viewportData.projects[0].PrimaryFundingAgency}
	<p>Primary Funding Agency: {viewportData.projects[0].PrimaryFundingAgency}</p>
{/if}
<br />
{#if viewportData.projects[0].Description}
	<p>{viewportData.projects[0].Description}</p>
{/if}
