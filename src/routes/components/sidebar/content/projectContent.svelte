<script lang="ts">
	import { newNavigation, viewportData } from '$lib/globals/Viewport.svelte';
	import { type ViewportState } from '$lib/types';

	type InfoItemProps = {
		label: string;
		content: string | undefined;
		isEmail: boolean;
		isLink: boolean;
	};
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

{#snippet infoItem(label: string, content: string | undefined, isEmail: boolean, isLink: boolean)}
	<p class="font-semibold">
		{label}:
		{#if content == undefined || content.trim() === ''}
			<span class=" text-base font-normal italic text-neutral-800"> none provided </span>
		{:else if isEmail}
			<a class="text-blue-600 hover:underline font-normal" href="mailto:{content}">
				{content}
			</a>
		{:else if isLink}
			<a class="text-blue-600 visited:text-purple-600 hover:underline font-normal" href={content}>
				{content}
			</a>
		{:else}
			<span class="font-normal">{content}</span>
		{/if}
	</p>
{/snippet}

{@render infoItem('Email', viewportData.projects[0].PrimaryContactEmail, true, false)}
{@render infoItem('Website', viewportData.projects[0].ProjectWebsite, false, true)}
{@render infoItem('International Network', viewportData.projects[0].InternationalNetwork, false, false)}
{@render infoItem('International Institution', viewportData.projects[0].InternationalInstitution, false, false)}
{@render infoItem('Primary Funding Agency', viewportData.projects[0].PrimaryFundingAgency, false, false)}

<br />
{#if viewportData.projects[0].Description}
	<p>{viewportData.projects[0].Description}</p>
{/if}
