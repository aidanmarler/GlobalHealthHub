<script>
	import { currentViewportState, viewportData } from '$lib/globals/Viewport.svelte';
	import CalloutStatContainer from '../components/calloutStatContainer.svelte';
</script>

<CalloutStatContainer calloutStats={['Projects', 'Contacts', 'Travelers']} />
