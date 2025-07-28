<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		img,
		children
	}: { img: null | { path: string; alt: string; fullWidth: boolean }; children: Snippet } =
		$props();
</script>

<div class="relative mb-5 flex {img?.fullWidth ? 'flex-col' : 'flex-col sm:flex-row'} h-auto w-full items-center space-x-2">
	{#if img}
		<div class="left-0  {img.fullWidth ? 'w-full' : 'w-full sm:w-[60%] mb-3'} border bg-neutral-600">
			<img fetchpriority="high" src={'img/' + img.path} alt={img.path} />
		</div>
		{#if img.fullWidth}
			<br /><br /><br />
		{/if}
	{/if}

	<div class="right-0 h-full {(img == null) || (img.fullWidth) ? 'w-full' : 'sm:w-[40%] w-full'} p-1 text-center">
		<div class="flex h-full items-center text-xl font-light ">
			{@render children()}
		</div>
	</div>
</div>
