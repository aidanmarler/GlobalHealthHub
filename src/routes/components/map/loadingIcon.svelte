<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div
	out:fade={{ delay: 1000, duration: 500 }}
	class="pointer-events-none absolute z-50 flex h-full w-full cursor-wait flex-col items-center justify-center bg-zinc-100 bg-opacity-50 backdrop-blur-sm"
>
	<!-- Loading Circle -->
	<div>
		<img class="h-24 w-24 opacity-70 invert" alt="Loading..." src="/icons/interaction/loading.svg" />
	</div>

	<!-- Bottom Logo -->
	<div class="absolute bottom-10">
		<img class="h-auto w-48" alt="Colorado School of Public Health" src="/icons/branding/CSPH_simple.png" />
	</div>
</div>
