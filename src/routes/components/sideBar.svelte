<script lang="ts">
	import type { Project } from '$lib/types';
	import { Sidebar } from '../GlobalStates.svelte';

	let { projects }: { projects: Project[] } = $props();
</script>

<button
	onclick={() => {
		Sidebar.sidebarOpen = !Sidebar.sidebarOpen;
	}}
	class="{Sidebar.sidebarOpen
		? 'right-96 '
		: 'right-0 w-4 cursor-pointer hover:right-2 '}  absolute top-0 z-40 h-full w-4 bg-stone-700 shadow-2xl transition-all duration-300"
>
	<div>open</div>
	{#if Sidebar.sidebarOpen}
		<div class="mt-2 text-center text-white"></div>
	{/if}
</button>
<div
	class="{Sidebar.sidebarOpen
		? 'w-96'
		: 'w-2'} absolute right-0 top-0 z-30 h-full bg-stone-800 transition-all duration-300"
>
	<h3>Country</h3>
    <h3>Mission</h3>
	<h3>School</h3>
	<h3>Contact</h3>
</div>
