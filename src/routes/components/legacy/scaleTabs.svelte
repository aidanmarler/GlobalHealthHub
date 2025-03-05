<script lang="ts">
	import { currentViewportState } from '$lib/globals/Viewport.svelte';
	import ScaleTab from '../navigation/scaleTab.svelte';
	import Tab from '../navigation/scaleTab.svelte';
</script>

<div class="absolute left-1/2 top-2 flex -translate-x-1/2 transform items-center">
	<ScaleTab scale={'Global'} />
	<ScaleTab scale={'Country'} />
	<ScaleTab scale={'Network'} />
	<ScaleTab scale={'Project'} />
</div>
