'use strict';

import { type Project, type ViewportData, type ViewportState } from '$lib/types';
import { tick } from 'svelte';

// Event Management System!
// Here, we fire an event when we want, and components can subscribe to these events
type EventListener = () => void;
const listeners: EventListener[] = [];

export function subscribeToViewportChange(callback: EventListener) {
	listeners.push(callback);
	// Return cleanup function
	return () => {
		const index = listeners.indexOf(callback);
		if (index !== -1) listeners.splice(index, 1);
	};
}

export function fireViewportChangeEvent() {
	listeners.forEach((listener) => listener());
}

// This holds a copy of our projects
let localProjects: Project[] = [];

// Define a first state for the app to start in - I will make it global
const firstState: ViewportState = { scale: 'Global' };

// This function updates projects that are being examined/used by user
function updateViewportProjects() {
	let projectsList: Project[] = [];

	switch (currentViewportState.scale) {
		case 'Project': {
			if (currentViewportState.projectID != undefined) {
				projectsList.push(localProjects[currentViewportState.projectID - 1]);
			}
			break;
		}

		case 'Country': {
			localProjects.forEach((project) => {
				if (project.Country == currentViewportState.countryName) {
					projectsList.push(project);
				}
			});
			break;
		}

		case 'Contact': {
			localProjects.forEach((project) => {
				if (project.ContactName == currentViewportState.networkName) {
					projectsList.push(project);
				}
			});
			break;
		}

		case 'Mission': {
			localProjects.forEach((project) => {
				if (project.Mission == currentViewportState.missionName) {
					projectsList.push(project);
				}
			});
			break;
		}

		case 'College': {
			localProjects.forEach((project) => {
				if (project.PrimaryCollegeOrSchool == currentViewportState.collegeName) {
					projectsList.push(project);
				}
			});
			break;
		}

		case 'Global': {
			projectsList = localProjects;
		}
	}
	viewportData.projects = projectsList;

	tick().then(() => {
		// Update map hightlight here
		fireViewportChangeEvent();
	});
	return;
}

// // Below are the variables this exports to be used by other objects // //

// This holds data for the viewing and interacting with scale in the sidebar and nav components
export let scaleDisplayData = {
	['Global']: {
		name: 'Global',
		icon: 'globe.svg',
		dropdown: false
	},
	['Mission']: {
		name: 'Mission',
		icon: 'target.svg',
		dropdown: false
	},
	['College']: {
		name: 'College',
		icon: 'school.svg',
		dropdown: false
	},
	['Country']: {
		name: 'Country',
		icon: 'flag.svg',
		dropdown: true
	},
	['Contact']: {
		name: 'Contact',
		icon: 'person.svg',
		dropdown: true
	},
	['Project']: {
		name: 'Project',
		icon: 'point.svg',
		dropdown: false
	}
};

// Hold viewport state, storing what scale is active and what the label should be
export let currentViewportState: ViewportState = $state({ scale: 'Global' });

// Define a ViewportData object, adding firstState to it as well
export let viewportData: ViewportData = $state({
	projects: [],
	navEvents: [firstState],
	navCurrent: 0
});

// // Below are the functions this exports to be used by other objects // //

// This is a function to be called that will insert a new nav into the Viewport data
// it acts to track movements around, so users can navigate it like a web page.
export function newNavigation(newState: ViewportState) {
	const currentState = $state.snapshot(currentViewportState);
	if (
		newState.scale == currentState.scale &&
		newState.countryName == currentState.countryName &&
		newState.networkName == currentState.networkName &&
		newState.missionName == currentState.missionName &&
		newState.collegeName == currentState.collegeName &&
		newState.projectID == currentState.projectID
	) {
		return;
	}

	// Copy all properties without using currentViewportState = newState
	currentViewportState.scale = newState.scale;
	console.log(newState.scale);
	currentViewportState.countryName = newState.countryName;
	currentViewportState.networkName = newState.networkName;
	currentViewportState.projectID = newState.projectID;
	currentViewportState.missionName = newState.missionName;
	currentViewportState.collegeName = newState.collegeName;

	// Add the navigation to the nav events
	viewportData.navEvents = viewportData.navEvents.slice(0, viewportData.navCurrent + 1);
	viewportData.navEvents.push(newState);
	viewportData.navCurrent += 1;

	// Once done, update the viewport
	tick().then(updateViewportProjects);
}

export function navBack() {
	if (viewportData.navCurrent > 0) {
		const backState: ViewportState = viewportData.navEvents[viewportData.navCurrent - 1];
		currentViewportState.scale = backState.scale;
		if (backState.countryName) {
			currentViewportState.countryName = backState.countryName;
		}
		if (backState.networkName) {
			currentViewportState.networkName = backState.networkName;
		}
		if (backState.projectID) {
			currentViewportState.projectID = backState.projectID;
		}
		viewportData.navCurrent -= 1;
	}
	tick().then(updateViewportProjects);
}

export function navForward() {
	if (viewportData.navCurrent < viewportData.navEvents.length) {
		const forwardState: ViewportState = viewportData.navEvents[viewportData.navCurrent + 1];
		currentViewportState.scale = forwardState.scale;
		if (forwardState.countryName) {
			currentViewportState.countryName = forwardState.countryName;
		}
		if (forwardState.networkName) {
			currentViewportState.networkName = forwardState.networkName;
		}
		if (forwardState.projectID) {
			currentViewportState.projectID = forwardState.projectID;
		}
		viewportData.navCurrent += 1;
	}
	tick().then(updateViewportProjects);
}

export function rezoomNav() {
	//const currentState = $state.snapshot(currentViewportState);
	//currentViewportState.scale = currentState.scale + 1;
	//currentViewportState.scale = currentState.scale;
	updateViewportProjects();
}

export function updateViewportLocalProjects(projects: Project[]) {
	if (localProjects !== projects) {
		localProjects = projects;
	}
	tick().then(updateViewportProjects);
}
