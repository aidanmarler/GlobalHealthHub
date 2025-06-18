<script lang="ts">
	import { newNavigation, viewportData } from '$lib/globals/Viewport.svelte';
	import { categoryIcons, retrieve_bg } from '$lib/ProjectParameters';
	import type { Category, College, Mission, Project } from '$lib/types';

	let { project }: { project: Project } = $props();

	type PropertyCard = {
		category: Category;
		bg: string;
		img: string;
		text: string;
	};

	let propertyCards: PropertyCard[] = [
		{
			category: 'Contact',
			bg: retrieve_bg('Contact'),
			img: categoryIcons['Contact'],
			text: project.PrimaryContactName
		},
		{
			category: 'Country',
			bg: retrieve_bg('Country'),
			img: categoryIcons['Country'],
			text: project.Country
		},
		{
			category: 'College',
			bg: retrieve_bg('College', undefined, project.PrimaryCollegeOrSchool as College),
			img: categoryIcons['College'],
			text: project.PrimaryCollegeOrSchool
		},
		{
			category: 'Mission',
			bg: retrieve_bg('Mission', project.Mission as Mission),
			img: categoryIcons['Mission'],
			text: project.Mission
		}
	];

	function handleClick(category: Category) {
		switch (category) {
			case 'Mission':
				newNavigation({
					scale: 'Mission',
					missionName: project.Mission
				});
				break;

			case 'College':
				newNavigation({
					scale: 'College',
					collegeName: project.PrimaryCollegeOrSchool
				});
				break;

			case 'Country':
				newNavigation({
					scale: 'Country',
					countryName: project.Country
				});
				break;
			case 'Contact':
				newNavigation({
					scale: 'Contact',
					networkName: project.PrimaryContactName
				});
				break;
		}
		return;
	}
</script>

<div class="flex h-full flex-wrap items-center justify-center space-x-4 py-3">
	{#each propertyCards as propertyCard (propertyCard)}
		<button
			onclick={() => {
				handleClick(propertyCard.category);
			}}
			class="my-1 flex items-center justify-center rounded-2xl bg-opacity-60 p-1 px-4 hover:bg-opacity-80 hover:underline {propertyCard.bg}"
		>
			<div class="flex justify-around">
				<img alt="person" class={'h-6 w-6 p-1 invert'} src={'icons/' + propertyCard.img} />
				<p class="text-md text-center font-semibold">{propertyCard.text}</p>
			</div>
		</button>
	{/each}
</div>
