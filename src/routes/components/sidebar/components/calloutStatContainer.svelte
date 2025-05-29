<script lang="ts">
	import { viewportData } from '$lib/globals/Viewport.svelte';
	import type { CalloutStat } from '$lib/types';
	import { onMount } from 'svelte';

	let { calloutStats }: { calloutStats: CalloutStat[] } = $props();

	let countries = $derived.by(() => {
		let set = new Set();
		for (const project of viewportData.projects) {
			set.add(project.Country);
		}
		return set;
	});

	let contacts = $derived.by(() => {
		let set = new Set();
		for (const project of viewportData.projects) {
			set.add(project.PrimaryContactName);
		}
		return set;
	});

	let bg: Record<CalloutStat, string> = {
		Projects: 'bg-neutral-300/70',
		Contacts: 'bg-neutral-400/70',
		Countries: 'bg-neutral-500/70'
	};

	let border: Record<CalloutStat, string> = {
		Projects: 'border-neutral-300',
		Contacts: 'border-neutral-400',
		Countries: 'border-neutral-500'
	};

	let text: Record<CalloutStat, string> = {
		Projects: 'text-neutral-700',
		Contacts: 'text-neutral-800',
		Countries: 'text-neutral-900'
	};
</script>

<div class="flex h-full items-center justify-center space-x-4 py-3">
	{#each calloutStats as calloutStat}
		<div
			class="flex h-auto w-24 flex-col items-center justify-center rounded-lg {bg[calloutStat]} p-4 py-4"
		>
			<p class="text-center text-3xl font-bold text-black">
				{calloutStat == 'Projects'
					? viewportData.projects.length
					: calloutStat == 'Countries'
						? countries.size
						: contacts.size}
			</p>
			<p class="text-center text-lg font-semibold {text[calloutStat]}">{calloutStat}</p>
		</div>
	{/each}
</div>
