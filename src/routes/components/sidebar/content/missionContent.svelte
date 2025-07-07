<script>
	import { currentViewportState, viewportData } from '$lib/globals/Viewport.svelte';
	import CalloutStatContainer from '../components/calloutStatContainer.svelte';
</script>

<CalloutStatContainer calloutStats={['Projects', 'Contacts', 'Countries', 'Travelers']} />

<p class="font-italic">
	NOTE: these are placeholders.  Should we link to specific projects?
</p>
{#if currentViewportState.missionName == 'Education'}
	<p>Education projects are for you and others to learn!</p>
{:else if currentViewportState.missionName == 'Service/Clinical'}
	<p>Service and Clinical work allows medical professionals, and aspiring proffessionals, to get out into the field and help people.</p>
{:else}
	<p>Reserach projects are for learning about existing diseases and </p>
{/if}
