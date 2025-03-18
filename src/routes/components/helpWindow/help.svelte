<script lang="ts">
	let {
		helpOpen = $bindable(),
		beginLoadingMap = $bindable()
	}: {
		helpOpen: boolean;
		beginLoadingMap: boolean;
	} = $props();
</script>

{#snippet tutorial(title: string, text: string)}
	<div class="relative mb-12 flex h-52 w-full items-center space-x-2">
		<div class="left-0 h-full w-1/2 border bg-neutral-600"></div>
		<div class="right-0 h-full w-1/2 p-1 text-center">
			<h5 class="text-lg font-bold">{title}</h5>
			<p class="font-thin">{text}</p>
		</div>
	</div>
{/snippet}

<button
	onclick={() => {
		helpOpen = false;
	}}
	onmouseenter={() => {
		beginLoadingMap = true;
	}}
	onfocus={() => {
		beginLoadingMap = true;
	}}
	class="absolute right-5 top-4 z-40 h-8 w-8 rounded-full opacity-80 hover:opacity-100"
>
	<img alt="Close Help Page" class="h-full w-full invert" src="/icons/interaction/close.svg" />
</button>

<div
	class="h-full w-full overflow-auto border border-ccc bg-neutral-100 bg-opacity-100 shadow-sm shadow-999"
>
	<div class="mt-8 w-full items-center text-center">
		<h3 class="text-2xl font-extralight">Colorado School of Public Health's</h3>
		<h1 class="mb-20 text-5xl font-bold">Global Health Hub</h1>
		<!--<p class="italic">Explore the world of public health *</p>-->

		<div class="mb-10 mt-10 w-full px-4 text-left sm:px-12 md:px-16 lg:px-44 xl:px-72">
			<!--Map-->
			{@render tutorial(
				'Explore with the Map',
				'Using the map, you can explore selected projects or find new ones.'
			)}

			<!--Search Functionality-->
			{@render tutorial(
				'Search Through Projects',
				'The top search bar allows you to search for projects, contacts, countries, colleges and missions!'
			)}

			<!--Information Panel-->
			{@render tutorial(
				'Investiate further',
				'A heading shows current selection. Read about it below, whether its a project, contact, college, or anything!'
			)}

			<!--Table-->
			{@render tutorial(
				'Scroll all projects',
				'Using the map, you can explore selected projects or find new ones.'
			)}

			<!--Legend-->
			{@render tutorial(
				'Explore with the Map',
				'Using the map, you can explore selected projects or find new ones.'
			)}

			<!--Table-->
			{@render tutorial(
				'Explore with the Map',
				'Using the map, you can explore selected projects or find new ones.'
			)}

			<!--Download-->
			{@render tutorial(
				'Explore with the Map',
				'Using the map, you can explore selected projects or find new ones.'
			)}

			<!--Footer-->
			<br class="mb-4" />
			<div class="w-40">
				<img alt="Close Help Page" class="h-full w-full" src="/icons/branding/CSPH_simple.png" />
			</div>
		</div>
	</div>
</div>
