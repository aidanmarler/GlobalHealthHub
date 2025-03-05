<script>
	import { currentViewportState, viewportData } from '$lib/globals/Viewport.svelte';
</script>

<!-- Network Summary -->
{currentViewportState.networkName} is the contact for {viewportData.projects.length} projects.
