<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		img,
		children
	}: { img: null | { path: string; alt: string; fullWidth: boolean }; children: Snippet } =
		$props();
</script>

<div class="relative mb-5 flex {img?.fullWidth ? 'flex-col' : ''} h-auto w-full items-center space-x-2">
	{#if img}
		<div class="left-0  {img.fullWidth ? 'w-full block' : 'w-[60%] mb-3'} border bg-neutral-600">
			<img src={'img/' + img.path} alt={img.path} />
		</div>
		{#if img.fullWidth}
			<br /><br /><br />
		{/if}
	{/if}

	<div class="right-0 h-full {(img == null) || (img.fullWidth) ? 'w-full' : 'w-[40%]'} p-1 text-center">
		<div class="flex h-full items-center text-xl font-thin">
			{@render children()}
		</div>
	</div>
</div>
