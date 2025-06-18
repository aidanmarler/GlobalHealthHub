<script lang="ts">
	import { newNavigation, viewportData } from '$lib/globals/Viewport.svelte';
	import { type ViewportState } from '$lib/types';
	import { onMount } from 'svelte';
	import CalloutProjectProperty from '../components/calloutProjectProperty.svelte';

	type InfoItemProps = {
		label: string;
		content: string | undefined;
		isEmail: boolean;
		isLink: boolean;
	};

	onMount(()=>{
		console.log("PROJECT:", viewportData.projects[0])
	})
</script>

<CalloutProjectProperty project={viewportData.projects[0]}/>


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
