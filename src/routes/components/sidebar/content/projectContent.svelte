<script lang="ts">
	import { newNavigation, viewportData } from '$lib/globals/Viewport.svelte';
	import { type ViewportState } from '$lib/types';
	import { onMount } from 'svelte';
	import CalloutProjectProperty from '../components/calloutProjectProperty.svelte';
	import Page from '../../../+page.svelte';
	import ProjectsTable from '../../table/projectsTable.svelte';

	type InfoItemProps = {
		label: string;
		content: string | undefined;
		isEmail: boolean;
		isLink: boolean;
	};

	onMount(() => {
		console.log('PROJECT:', viewportData.projects[0]);
	});
</script>

<CalloutProjectProperty project={viewportData.projects[0]} />

<br />
{#snippet infoItem(
	label: string,
	content: string | undefined,
	hide: boolean = false,
	isEmail: boolean = false,
	isLink: boolean = false
)}
	{#if hide == false || !(content == undefined || content.trim() === '')}
		<p class="font-semibold">
			{label}:
			{#if content == undefined || content.trim() === ''}
				<span class=" text-base font-normal italic text-neutral-800"> none provided </span>
			{:else if isEmail}
				<a class="font-normal text-blue-600 hover:underline" href="mailto:{content}">
					{content}
				</a>
			{:else if isLink}
				<a class="font-normal text-blue-600 visited:text-purple-600 hover:underline" href={content}>
					{content}
				</a>
			{:else}
				<span class="font-normal">{content}</span>
			{/if}
		</p>
	{/if}
{/snippet}

{#if viewportData.projects[0].ProjectAcronym}
	<p class="font-semibold">viewportData.projects[0].ProjectAcronym</p>
{/if}
{@render infoItem('Email', viewportData.projects[0].PrimaryContactEmail, false, true, false)}
{@render infoItem('Website', viewportData.projects[0].ProjectWebsite, false, false, true)}
{@render infoItem('Department', viewportData.projects[0].PrimaryDepartmentOrCenter)}
{@render infoItem('City', viewportData.projects[0].City)}
<br />
{@render infoItem('International Network', viewportData.projects[0].InternationalNetwork)}
{@render infoItem('International Institution', viewportData.projects[0].InternationalInstitution)}
{@render infoItem('Primary Funding Agency', viewportData.projects[0].PrimaryFundingAgency)}
<br />

<h4 class=" text-lg italic">Opportunity for Participation</h4>
{@render infoItem(
	'Opportunity for Participation',
	viewportData.projects[0].OpportunityForParticipation ? 'Yes' : 'No'
)}
{#if viewportData.projects[0].OpportunityForParticipation}
	{@render infoItem('Time Commitment', viewportData.projects[0].OpportunityTimeCommitment)}
	{@render infoItem('Paid', viewportData.projects[0].OpportunityPaid ? 'Yes' : 'No')}
{/if}
{@render infoItem('Students Traveled', viewportData.projects[0].NumStudentsTraveled.toString())}
{@render infoItem(
	'Resident Trainees Traveled',
	viewportData.projects[0].NumResidentsTraineesTraveled.toString()
)}
{@render infoItem('Faculty Involved', viewportData.projects[0].NumStudentsTraveled.toString())}

<br />
<h4 class=" text-lg italic">Agreements</h4>
<div class="flex flex-wrap space-x-4">
	{@render infoItem('IRB', viewportData.projects[0].IRB ? 'Yes' : 'No')}
	{@render infoItem('LOA', viewportData.projects[0].LOA ? 'Yes' : 'No')}
	{@render infoItem('DTA', viewportData.projects[0].DTA ? 'Yes' : 'No')}
	{@render infoItem('MOU', viewportData.projects[0].MOU ? 'Yes' : 'No')}
	{@render infoItem('MTA', viewportData.projects[0].MTA ? 'Yes' : 'No')}
</div>
{@render infoItem('Other Agreements', viewportData.projects[0].OtherAgreementType)}

<br />
{@render infoItem('Description', viewportData.projects[0].Description)}
{@render infoItem('Notes', viewportData.projects[0].Notes, true)}
