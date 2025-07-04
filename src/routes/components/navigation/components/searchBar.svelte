<script lang="ts">
	import type {
		Category,
		College,
		Mission,
		Project,
		SearchElement,
		SearchResult,
		ViewportState
	} from '$lib/types';
	import { delay } from '$lib/utils/utils';
	import { onMount, tick } from 'svelte';
	import { performSearch, retrieveItems } from './search';
	import { categoryIcons } from '$lib/ProjectParameters';
	import { newNavigation } from '$lib/globals/Viewport.svelte';
	import { updateTooltip } from '../../tooltip/tooltipHelper.svelte';

	let { projects }: { projects: Project[] } = $props(); // projects to search from
	let canSearch = $state(false); // if projects are loaded, can search
	let searching = $state(false); // if something typed in, start searching
	let isExpanded = $state(false); // if search bar is open
	let text = $state(''); // input text to search
	let results: SearchResult[] = $state([]); // list of SearchResults
	let selectedIndex: number | null = $state(null); // Track selected index
	let isFocused = $derived(selectedIndex !== null); // Track curent focus state
	let searchBar: HTMLInputElement; // Search bar element

	// Track selected project to blur
	let searchElements: SearchElement[] = [];

	// On begin, attempt to retrieve the projects - this is a reoccuring loop until the projects are loaded
	onMount(async () => {
		const element = document.getElementById('searchBar'); // Search bar element
		if (element !== null) searchBar = element as HTMLInputElement;
		attemptRetrieval(0);
	});

	// Call this function to attempt to retrieve the projects.  If loaded, it works, else, try again in .1s
	async function attemptRetrieval(attemptCount: number) {
		if (projects != undefined && projects.length > 0) {
			await retrieveItems(projects);
			canSearch = true;
		} else {
			if (attemptCount < 3000) {
				// try for 5 minutes with 100ms delay
				await delay(100);
				attemptRetrieval(attemptCount + 1);
			} else if (attemptCount < 7200) {
				// try for 2 hours with 10s delay
				await delay(1000);
				attemptRetrieval(attemptCount + 1);
			} else {
				console.error("Seach functionality can't find projects");
			}
		}
	}

	/*         --------------------         */
	/*  Interactive & functional functions  */
	/*         --------------------         */

	// Call when any input in the search bar
	async function handleSearch() {
		searching = true;
		searchElements = []; // Reset search elements
		await tick(); // Ensure the DOM is updated
		results = await performSearch($state.snapshot(text)); // Use the updated `text` value
		searching = false;
		selectedIndex = -1; // Reset selection when input changes
		updateTooltip('');
		await tick(); // Ensure the DOM is updated
		// Now, update searchElements
		for (const i in results) {
			const htmlElement = document.getElementById('SearchResult_' + i);
			if (htmlElement == null) return;
			const searchElement: SearchElement = {
				result: results[i],
				element: htmlElement
			};
			searchElements.push(searchElement);
		}
	}

	// Handle selecting a search result though mouse click or enter key
	async function handleSelect(category: Category, text: string, index: number) {
		console.log('clicked', text);
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
			case 'Project':
				newState.projectID = text;
				break;
			default:
				break;
		}
		newNavigation(newState);
		return;
	}

	// Handles getting the new Selected Index while bluring startIndex and focusing endIndex
	function handleBlurAndFocus(startIndex: number | null, endIndex: number | null) {
		if (startIndex == null) console.log('start NULL');

		// First, handle blurring the start index if end index is null
		if (endIndex != null) {
			// Else, handle focusing the end index
			console.log('FOCUS', startIndex, endIndex);
			if (endIndex == -1) {
				searchBar.focus();
			} else if (endIndex >= 0) {
				searchElements[endIndex].element.focus();
			}
			return endIndex;
		} else {
			console.log('BLUR', startIndex, endIndex);
			if (startIndex == -1) {
				searchBar.blur();
			} else if (startIndex !== null) {
				if (startIndex >= -1) {
					searchElements[startIndex].element.blur();
				}
			}
			return null;
		}
	}

	// Handle keydown events for arrow navigation
	function handleKeydown(event: KeyboardEvent) {
		if (selectedIndex == null) return;
		if (event.key === 'Tab') {
			if (event.shiftKey) {
				if (selectedIndex - 1 >= -1) {
					event.preventDefault();
					selectedIndex = handleBlurAndFocus(selectedIndex, selectedIndex - 1);
				} else {
					selectedIndex = handleBlurAndFocus(selectedIndex, null);
				}
			} else {
				if (selectedIndex + 1 <= results.length - 1) {
					event.preventDefault();
					selectedIndex = handleBlurAndFocus(selectedIndex, selectedIndex + 1);
				} else {
					selectedIndex = handleBlurAndFocus(selectedIndex, null);
				}
			}
		} else if (event.key === 'ArrowDown') {
			if (selectedIndex + 1 <= results.length - 1) {
				event.preventDefault();
				selectedIndex = handleBlurAndFocus(selectedIndex, selectedIndex + 1);
			}
		} else if (event.key === 'ArrowUp') {
			if (selectedIndex - 1 >= -1) {
				event.preventDefault();
				selectedIndex = handleBlurAndFocus(selectedIndex, selectedIndex - 1);
			}
		} else if (event.key === 'Enter' && selectedIndex >= 0) {
			// Handle Enter key to select a result
			const selectedResult = results[selectedIndex]; // get selected result
			handleSelect(selectedResult.category, selectedResult.title, selectedIndex);
			selectedIndex = handleBlurAndFocus(selectedIndex, null);
		} else if (event.key === 'Escape') {
			selectedIndex = handleBlurAndFocus(selectedIndex, null);
		}
	}
</script>

{#snippet SearchResult(category: Category, text: string, index: number, id: string)}
	<button
		id={'SearchResult_' + index}
		class="z-100 flex min-h-7 w-full items-center rounded-lg bg-opacity-10 py-1 pl-10 text-left text-white hover:bg-black focus:border-blue-500 focus:bg-black"
		title={'Zoom to ' + category}
		aria-label={'Zoom to ' + text}
		onclick={async () => {
			await handleSelect(category, id, index).then(() => {
				selectedIndex = handleBlurAndFocus(index, null);
			});
		
		}}
		onkeydown={handleKeydown}
		onblur={async () => {
			delay(250).then(() => {
				// if after 10ms still same index, blur
				if (selectedIndex == index) {
					selectedIndex = handleBlurAndFocus(selectedIndex, null);
				}
			});
		}}
	>
		<img
			alt="search icon"
			class="pointer-events-none absolute left-4 h-full w-4"
			src="/icons/{categoryIcons[category]}"
		/>
		{text}
	</button>
{/snippet}

<!-- h-auto w-full p-1 -->
<div
	class=" rounded-full p-1 transition-all duration-200 ease-in-out md:h-auto md:w-full relative z-40
	{isFocused ? ' bg-black/70 ' : ' w-12   '}"
>
	<div title="Search" class="relative z-30 flex h-9 w-full rounded-full items-center">
		<img
			alt="search icon"
			class=" pointer-events-none absolute h-full left-2 w-6 opacity-100 invert
			md:left-3" 
			src="/icons/interaction/search.svg"
		/>
		<input
			class="h-full rounded-full border bg-neutral-100 w-full outline-none transition-all duration-75 
			focus:border-blue-500 hover:bg-white focus:bg-white hover:shadow hover:shadow-neutral-500/60
			md:pr-4 md:pl-10 md:text-black
			{isFocused
				? ' border-transparent w-full pl-10 pr-4 text-black '
				: ' border-black p-0 text-white '}"
			type="text"
			id="searchBar"
			name="search"
			placeholder="Search"
			title="Search"
			aria-label="Search"
			bind:value={text}
			oninput={handleSearch}
			onkeydown={handleKeydown}
			onfocusin={() => {
				selectedIndex = -1;
				handleSearch();
			}}
			onblur={async () => {
				delay(250).then(() => {
					// if after 10ms still same index, blur
					if (selectedIndex == -1) {
						selectedIndex = handleBlurAndFocus(selectedIndex, null);
					}
				});
			}}
		/>
	</div>
	{#if isFocused}
		<div
			class=" absolute left-0 top-0 z-20 w-full rounded-3xl bg-black/80 p-2 backdrop-blur-md transition-all duration-75"
		>
			<div class="{results.length > 0 ? 'h-9' : 'h-7'}  w-full"></div>
			{#each results as result, index}
				{@render SearchResult(result.category, result.title, index, result.id)}
			{/each}
		</div>
	{/if}
</div>
