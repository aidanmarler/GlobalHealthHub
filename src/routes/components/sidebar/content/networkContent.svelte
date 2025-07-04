<script lang="ts">
	import { currentViewportState, newNavigation, viewportData } from '$lib/globals/Viewport.svelte';
	import { onMount } from 'svelte';
	import DropDown from '../components/dropDown.svelte';
	import CalloutStatContainer from '../components/calloutStatContainer.svelte';
	import type { College, Mission, Project, ViewportState } from '$lib/types';
	import { retrieve_bg } from '$lib/ProjectParameters';

	let { projects }: { projects: Project[] } = $props();

	let contactData = $derived.by(() => {
		const data: {
			countries: string[];
			network: string[];
			emails: string[];
			missions: Mission[];
			colleges: College[];
			departments: string[];
			positions: string[];
			internationalNetworks: string[];
			internationalInstitutions: string[];
			primaryFundingAgencies: string[];
		} = {
			countries: [],
			network: [],
			emails: [],
			missions: [],
			colleges: [],
			departments: [],
			positions: [],
			internationalNetworks: [],
			internationalInstitutions: [],
			primaryFundingAgencies: []
		};
		for (const project of viewportData.projects) {
			// Countries
			if (!data.countries.includes(project.Country)) data.countries.push(project.Country);
			// Emails
			if (!data.emails.includes(project.PrimaryContactEmail.trim()))
				data.emails.push(project.PrimaryContactEmail.trim());
			// Missions
			if (!data.missions.includes(project.Mission)) data.missions.push(project.Mission);
			// Colleges
			if (!data.colleges.includes(project.PrimaryCollegeOrSchool))
				data.colleges.push(project.PrimaryCollegeOrSchool);
			// Departments
			if (!data.departments.includes(project.PrimaryDepartmentOrCenter))
				data.departments.push(project.PrimaryDepartmentOrCenter);
			// Positions
			if (!data.positions.includes(project.PrimaryContactPosition))
				data.positions.push(project.PrimaryContactPosition);
			// International Networks
			if (!data.internationalNetworks.includes(project.InternationalNetwork))
				data.internationalNetworks.push(project.InternationalNetwork);
			// International Instituitons
			if (!data.internationalInstitutions.includes(project.InternationalInstitution))
				data.internationalInstitutions.push(project.InternationalInstitution);
			// Primary Funding Agencies
			if (!data.primaryFundingAgencies.includes(project.PrimaryFundingAgency))
				data.primaryFundingAgencies.push(project.PrimaryFundingAgency);
		}
		for (const project of projects) {
			if (!data.countries.includes(project.Country)) continue; // if country not in countries
			if (data.network.includes(project.PrimaryContactName)) continue;
			if (project.PrimaryContactName == (currentViewportState.networkName as string)) continue;
			data.network.push(project.PrimaryContactName);
		}
		return data;
	});
</script>

<CalloutStatContainer calloutStats={['Projects', 'Countries']} />

<div class="flex flex-wrap items-center justify-around">
	{#each contactData.colleges as college, i}
		<button
			title={'See ' + college}
			class={'bubble m-0.5 bg-opacity-50 hover:bg-opacity-70 ' +
				retrieve_bg('College', undefined, college)}
			aria-label={'See ' + college}
			onclick={() => {
				const newState: ViewportState = { scale: 'College', collegeName: college };
				newNavigation(newState);
			}}
		>
			{college}
		</button>
	{/each}
</div>
<div class="flex flex-wrap items-center justify-center">
	{#each contactData.missions as mission, i}
		<button
			title={'See ' + mission}
			class={'bubble m-0.5 bg-opacity-50 hover:bg-opacity-70 ' + retrieve_bg('Mission', mission)}
			aria-label={'See ' + mission}
			onclick={() => {
				const newState: ViewportState = { scale: 'College', missionName: mission };
				newNavigation(newState);
			}}
		>
			{mission}
		</button>
	{/each}
</div>
<div class="flex flex-wrap items-center justify-center">
	{#each contactData.emails as info, i}
		{#if i !== 0},
		{/if}
		<a class="font-normal text-blue-600 hover:underline" href="mailto:{info}">
			{info}
		</a>
	{/each}
</div>
<div class="flex flex-wrap items-center justify-center font-semibold">
	{#each contactData.positions as info, i}
		{info}
	{/each}
</div>
<div class="flex flex-wrap items-center justify-center font-semibold">
	{#each contactData.departments as info, i}
		{info}
	{/each}
</div>
{#if contactData.internationalNetworks.length > 0}
	<div class="justify-left flex items-center">
		Connected International Networks:
		{#each contactData.internationalNetworks as info, i}
			{#if i !== 0}{','}{/if}
			{' ' + info}
		{/each}
	</div>
{/if}
<div class="justify-left flex items-center">
	Connected International Instituitons:
	{#each contactData.internationalInstitutions as info, i}
		{#if i !== 0}{','}{/if}
		{' ' + info}
	{/each}
</div>
<div class="justify-left flex items-center">
	Connected Primary Funding Agencies:
	{#each contactData.primaryFundingAgencies as info, i}
		{#if i !== 0}{','}{/if}
		{' ' + info}
	{/each}
</div>
<br />
<br />

<DropDown category={'Country'} items={contactData.countries} startOpen={true} isNetwork={false} />
<DropDown category={'Network'} items={contactData.network} startOpen={true} isNetwork={false} />
<p class="font-semibold">
	Email: {#each contactData.emails as email, i}
		{#if i !== 0},
		{/if}
		<a class="font-normal text-blue-600 hover:underline" href="mailto:{email}">
			{email}
		</a>
	{/each}
</p>
