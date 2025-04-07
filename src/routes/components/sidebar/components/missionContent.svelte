<script>
	import { currentViewportState, viewportData } from '$lib/globals/Viewport.svelte';
</script>

<!-- Country Summary -->
There {viewportData.projects.length == 1
	? 'is 1 project'
	: 'are ' + viewportData.projects.length + ' projects'}
in {currentViewportState.missionName}.

