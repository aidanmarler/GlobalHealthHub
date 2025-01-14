<script lang="ts">
	import { currentViewportState } from '$lib/globals/Viewport.svelte';
	import { ViewportScale } from '$lib/types';
	import ScaleTab from './scaleTab.svelte';
	import Tab from './scaleTab.svelte';
</script>

<div class="absolute left-1/2 top-2 flex -translate-x-1/2 transform items-center">
	<ScaleTab scale={ViewportScale.Global} />
	<ScaleTab scale={ViewportScale.Country} />
	<ScaleTab scale={ViewportScale.Network} />
	<ScaleTab scale={ViewportScale.Project} />
</div>
