<script lang="ts">
	import type { Project } from '$lib/types';
	let { projects }: { projects: Project[] } = $props();
</script>

<p>
	The Center for Global Health has a total of <span class="text font-bold">{projects.length}</span>
	projects in
	<span class="text font-bold">{48}</span> countries.
</p>
