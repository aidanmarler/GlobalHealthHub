import { delay } from '$lib/utils/utils';
import { tick } from 'svelte';
import { derived } from 'svelte/store';

let timeSinceReset = $state(0);
const timeToDisapear = 300;

export let tooltip = $state({ content: '', display: '' });

let fromActive = $derived(tooltip.display.length >= 1);
let toActive = $derived(tooltip.content.length >= 1);

async function updateDisplay() {
	if (fromActive && !toActive) {
		await delay(100);
		tooltip.display = tooltip.content;
	} else {
		tooltip.display = tooltip.content;
	}
}

export async function updateTooltip(content: string) {
	tooltip.content = content;
	await tick();
	updateDisplay();
}
