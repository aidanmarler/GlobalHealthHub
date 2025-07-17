<script>
	import { currentViewportState, viewportData } from '$lib/globals/Viewport.svelte';
	import CalloutStatContainer from '../components/calloutStatContainer.svelte';
</script>

<CalloutStatContainer calloutStats={['Projects', 'Contacts', 'Countries', 'Travelers']} />

{#if currentViewportState.missionName == 'Education'}
	<p>We target issues from an interdisciplinary approach using various perspectives and disciplines.</p>
{:else if currentViewportState.missionName == 'Service/Clinical'}
	<p>We work with under-resouced communities for better healthcare, better health, and a better future.</p>
{:else}
	<p>We are involved in research projects that are focues on improving health and healthcare.</p>
{/if}
