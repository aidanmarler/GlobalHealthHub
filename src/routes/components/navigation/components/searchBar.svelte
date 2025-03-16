<script lang="ts">
	import type {
		Category,
		College,
		Mission,
		Project,
		SearchResult,
		ViewportState
	} from '$lib/types';
	import { delay } from '$lib/utils/utils';
	import { onMount, tick } from 'svelte';
	import { performSearch, retrieveItems } from './search';
	import { categoryIcons } from '$lib/ProjectParameters';
	import { newNavigation } from '$lib/globals/Viewport.svelte';
	import { updateTooltip } from '../../tooltip/tooltipHelper.svelte';

	let { projects }: { projects: Project[] } = $props();
	let canSearch = $state(false);
	let searching = $state(false);
	let text = $state('');
	let results: SearchResult[] = $state([]);
	let barFocused = $state(false); // Track if bar in focus
	let resultFocused = $derived.by(() => {
		for (const result of results) {
			if (result.focused == true) return true;
		}
		return false;
	});
	let isFocused = $derived(() => {
		return barFocused || resultFocused;
	}); // Track if anything in focus
	let selectedIndex = $state(-1); // Track selected result index

	// function to blue all results
	function blurResults() {
		for (const result of results) {
			result.focused = false;
		}
	}

	onMount(async () => {
		attemptRetrieval(0);
	});

	// Call this function to attempt to retrieve the projects.  If loaded, it works, else, try again in .1s
	async function attemptRetrieval(attemptCount: number) {
		if (projects.length > 0) {
			await retrieveItems(projects);
			canSearch = true;
		} else {
			if (attemptCount < 9999) {
				await delay(100);
				attemptRetrieval(attemptCount + 1);
			} else {
				console.error("Seach functionality can't find projects");
			}
		}
	}

	// Call when any input in the search bar
	async function handleInput(event: Event) {
		searching = true;
		await tick(); // Ensure the DOM is updated
		results = await performSearch(text); // Use the updated `text` value
		searching = false;
		barFocused = true;
		selectedIndex = -1; // Reset selection when input changes
		updateTooltip('');
	}

	// Call when any result is blured
	function handleResultBlur(event: Event) {
		if (selectedIndex == -1) blurResults();
	}

	// Call when seachbar is blured
	function handleInputBlur(event: Event) {
		if (selectedIndex == -1) barFocused = false;
	}

	// Handle keydown events for arrow navigation
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Tab') {
			if (event.shiftKey) {
				selectedIndex = Math.max(selectedIndex - 1, -1);
			} else {
				selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
			}
		} else if (event.key === 'ArrowDown') {
			if (selectedIndex + 1 <= results.length - 1) {
				event.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
				moveFocusToNextElement();
			}
		} else if (event.key === 'ArrowUp') {
			if (selectedIndex - 1 >= -1) {
				event.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, -1);
				moveFocusToPreviousElement();
			}
		} else if (event.key === 'Enter' && selectedIndex >= 0) {
			// Handle Enter key to select a result
			const selectedResult = results[selectedIndex];
			selectedIndex = -1;
			handleSelect(selectedResult.category, selectedResult.value);
			blurResults();
			barFocused = false;
			if (document.activeElement instanceof HTMLElement) {
				document.activeElement.blur();
			}
		} else if (event.key === 'Escape') {
			selectedIndex = -1;
			blurResults();
			barFocused = false;
			if (document.activeElement instanceof HTMLElement) {
				document.activeElement.blur();
			}
		}
	}

	// Move focus to the next focusable element
	function moveFocusToNextElement() {
		const focusableElements = getFocusableElements();
		const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);

		if (currentIndex < focusableElements.length - 1) {
			focusableElements[currentIndex + 1].focus();
		} else {
			// Wrap around to the first element if at the end
			focusableElements[0].focus();
		}
	}

	// Move focus to the previous focusable element
	function moveFocusToPreviousElement() {
		const focusableElements = getFocusableElements();
		const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);

		if (currentIndex > 0) {
			focusableElements[currentIndex - 1].focus();
		} else {
			// Wrap around to the last element if at the beginning
			focusableElements[focusableElements.length - 1].focus();
		}
	}

	// Get all focusable elements within the component
	function getFocusableElements(): HTMLElement[] {
		// Query all focusable elements (you can customize this selector as needed)
		return Array.from(
			document.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			)
		) as HTMLElement[];
	}

	function handleSelect(category: Category, text: string) {
		const newState: ViewportState = { scale: category };
		switch (category) {
			case 'Mission':
				newState.missionName = text as Mission;
				break;
			case 'College':
				newState.collegeName = text as College;
				break;
			case 'Country':
				newState.countryName = text;
				break;
			case 'Contact':
				newState.networkName = text;
				break;
			//case 'Project':
			///	newState.projectID = text;
			//	break;
			default:
				break;
		}

		newNavigation(newState);
	}
</script>

{#snippet SearchResult(category: Category, text: string, index: number)}
	<button
		class="z-100 flex min-h-7 w-full items-center rounded-lg bg-opacity-10 py-1 pl-10 text-left text-black hover:bg-white focus:border-blue-500 focus:bg-white"
		onfocus={() => {}}
		onkeydown={handleKeydown}
		onblur={() => {
			//selectedIndex = -1;
			//barFocused = false;
			//blurResults();
		}}
		onclick={() => {
			selectedIndex = -1;
			barFocused = false;
			blurResults();
			handleSelect(category, text);
		}}
	>
		<img
			alt="search icon"
			class=" absolute left-4 h-full w-4 invert"
			src="/icons/{categoryIcons[category]}"
		/>
		{text}
	</button>
{/snippet}

<div class="h-auto w-full p-1">
	<div class="relative z-30 flex h-8 w-full items-center">
		<img
			alt="search icon"
			class=" absolute left-3 h-full w-5 opacity-100 invert"
			src="/icons/interaction/search.svg"
		/>
		<input
			class="h-full w-full rounded-lg border-2 border-gray-300 pl-10 pr-4 outline-none transition-all duration-75 focus:border-blue-500"
			type="text"
			id="search"
			name="search"
			placeholder="Search projects in Global Health Hub"
			bind:value={text}
			oninput={handleInput}
			onkeydown={handleKeydown}
			onblur={handleInputBlur}
			onmouseover={async () => {
				updateTooltip('Search');
			}}
			onfocus={async () => {
				barFocused = true;
				updateTooltip('Search');
			}}
			onmouseleave={async () => {
				updateTooltip('');
			}}
			onfocusout={async () => {
				updateTooltip('');
			}}
		/>
	</div>
	{#if isFocused()}
		<div
			class=" absolute left-0 top-0 z-20 w-full rounded-xl bg-bbb bg-opacity-80 p-2 backdrop-blur-md transition-all duration-75"
		>
			<div class="{results.length > 0 ? 'h-8' : 'h-6'}  w-full"></div>
			{#each results as result, index}
				{@render SearchResult(result.category, result.value, index)}
			{/each}
		</div>
	{/if}
</div>
