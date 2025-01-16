<script lang="ts">
	import { onMount } from 'svelte';
	import { tooltip } from './tooltipHelper.svelte.js';
	import { fade, fly } from 'svelte/transition';

	// Mouse position state
	let mouseX = $state(0);
	let mouseY = $state(0);

	// Update mouse position on movement
	const handleMouseMove = (event: MouseEvent) => {
		mouseX = event.clientX;
		mouseY = event.clientY;
	};

	// Attach the mousemove event listener on mount
	onMount(() => {
		window.addEventListener('mousemove', handleMouseMove);
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

{#if tooltip.display.length >= 1}
	<div
		in:fade={{ duration: 200, delay: 500 }}
		out:fade={{ duration: 50 }}
		class="bg-zinc-950 italic font-semibold backdrop-blur-sm text-sm bg-opacity-70 opacity-95 border border-zinc-950 shadow-lg text-white px-3 fixed z-50"
		style="left: {mouseX + 5}px; top: {mouseY + 10}px;"
	>
		<p>{tooltip.display}</p>
	</div>
{/if}

<!--
<style>
	.show {
		position: absolute;
		z-index: 10;
		width: auto;
		height: auto;
		border-radius: 0.1rem;
		border-width: 0.1rem;
		border-style: solid;
		border-color: hsla(0, 0%, 90%, 0.4);
		background-color: hsla(0, 0%, 5%, 0.4);
		backdrop-filter: blur(0.5rem);
		padding-left: 0.4rem;
		padding-right: 0.4rem;
		transition: opacity ease-in-out 0.2s;
		box-shadow: 0rem 0.1rem 0.1rem 0.1rem hsla(0, 0%, 5%, 0.8);
	}

	p {
		color: hsl(0, 0%, 90%);
		font-family: Verdana, Geneva, Tahoma, sans-serif;
		font-weight: 100;
		font-size: 0.8rem;
		line-height: 0.1rem;
	}
</style>
-->
