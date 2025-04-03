<script lang="ts">
	import { currentViewportState, viewportData } from '$lib/globals/Viewport.svelte';
	import type { College } from '$lib/types';

	let college: College = $derived(currentViewportState.collegeName as College);

	const websites: Record<College, string> = {
		['Colorado School of Public Health']: 'https://coloradosph.cuanschutz.edu/',
		['College of Nursing']: 'https://nursing.cuanschutz.edu/',
		['School of Dental Medicine']: 'https://dental.cuanschutz.edu/',
		['Skaggs School of Pharmacy and Pharmaceutical Sciences']: 'https://pharmacy.cuanschutz.edu/',
		['School of Medicine']: 'https://medschool.cuanschutz.edu/'
	};
</script>

<a href={websites[college]} target="_blank">
	<img alt="Learn More" class="text-blue-600 hover:underline" />
</a>

<!-- Country Summary -->
There {viewportData.projects.length == 1
	? 'is 1 project'
	: 'are ' + viewportData.projects.length + ' projects'}
in {college}.
