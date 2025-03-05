import { colleges, missions } from '$lib/ProjectParameters';
import type { Project, Category, SearchResult } from '$lib/types';

const SearchableItems: { [key in Category]: string[] } = {
	Global: [],
	Mission: [],
	College: [],
	Country: [],
	Contact: [],
	Project: []
};

// Step 1
export async function retrieveItems(projects: Project[]) {
	SearchableItems.Mission = missions as string[];
	SearchableItems.College = colleges as string[];
	const retrievedValues = await retrieveCountriesContactsProjects(projects);
	SearchableItems.Country = retrievedValues.Country;
	SearchableItems.Contact = retrievedValues.Contact;
	SearchableItems.Project = retrievedValues.Project;
}

// Step 2
async function retrieveCountriesContactsProjects(projects: Project[]) {
	const RetrievedItems: { [key: string]: string[] } = {
		Country: [],
		Contact: [],
		Project: []
	};
	projects.forEach((project) => {
		if (!RetrievedItems.Country.includes(project.Country)) {
			RetrievedItems.Country.push(project.Country);
		}
		if (!RetrievedItems.Contact.includes(project.ContactName)) {
			RetrievedItems.Contact.push(project.ContactName);
		}
		if (!RetrievedItems.Project.includes(project.ProjectTitle)) {
			RetrievedItems.Project.push(project.ProjectTitle);
		}
	});
	return RetrievedItems;
}

let currentSearchController: AbortController | null = null;

export async function search(text: string, signal?: AbortSignal): Promise<SearchResult[]> {
	let results: SearchResult[] = [];

	if (text.length === 0) return results;

	// Iterate through each key in the SearchableItems dictionary
	(Object.keys(SearchableItems) as Category[]).forEach((category) => {
		// Get the array of items for the current category
		const items = SearchableItems[category];

		if (results.length > 10) return results;

		// Check if the search text exists in the current array
		items.forEach((item) => {
			// Check if the search has been aborted
			if (signal?.aborted) return;

			if (item.toLowerCase().includes(text.toLowerCase())) {
				// If it does, add it to the results array
				results.push({ category, value: item });
			}
		});
	});

	return results;
}

export async function search0(text: string) {
	let results: SearchResult[] = [];

	if (text.length == 0) return results;

	// Iterate through each key in the SearchableItems dictionary
	(Object.keys(SearchableItems) as Category[]).forEach((category) => {
		// Get the array of items for the current category
		const items = SearchableItems[category];

		// Check if the search text exists in the current array
		items.forEach((item) => {
			if (item.toLowerCase().includes(text.toLowerCase())) {
				// If it does, add it to the results array
				results.push({ category, value: item });
			}
		});
	});

	return results;
}

export async function performSearch(text: string): Promise<SearchResult[]> {
	// Abort the previous search if it's still running
	if (currentSearchController) {
		currentSearchController.abort();
	}

	// Create a new AbortController for the current search
	const controller = new AbortController();
	currentSearchController = controller;

	try {
		const results = await search(text, controller.signal);
		return results;
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			// The search was aborted, so we can ignore this error
			return [];
		}
		throw error; // Re-throw other errors
	} finally {
		// Reset the current search controller
		currentSearchController = null;
	}
}
