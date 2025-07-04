<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div
	out:fade={{ duration: 300 }}
	class="aspect-[16/8] absolute z-30 flex w-full cursor-wait flex-col items-center justify-center bg-zinc-100 bg-opacity-50 backdrop-blur-sm
	top-0 "
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
