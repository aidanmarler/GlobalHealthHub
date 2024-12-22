'use strict';

import { ViewportScale, type ViewportData, type ViewportState } from '$lib/types';

// Define a first state for the app to start in - I will make it global
const firstState: ViewportState = {
	scale: ViewportScale.Global
};

// Hold viewport state, storing what scale is active and what the label should be
export let currentViewportState: ViewportState = $state({ scale: ViewportScale.Global });

// Define a ViewportData object, adding firstState to it as well
export let viewportData: ViewportData = $state({
	projects: [],
	navEvents: [firstState],
	navCurrent: 0
});


// Hold if sidebar is open or not and what should be inside
export let sidebar = $state({
	sidebarOpen: false,
	sidebarHeader: 'Sidebar',
	sidebarContent: ''
});

// This is a function to be called that will insert a new nav into the Viewport data
// it acts to track movements around, so users can navigate it like a web page.
export function newNavigation(newState: ViewportState) {
	const currentState = $state.snapshot(currentViewportState);
	if (
		newState.scale == currentState.scale &&
		newState.countryName == currentState.countryName &&
		newState.networkName == currentState.networkName &&
		newState.projectID == currentState.projectID
	) {
		//console.log('Same state!', currentViewportState, newState);
		return;
	}
	currentViewportState.scale = newState.scale;
	if (newState.countryName) {
		currentViewportState.countryName = newState.countryName;
	}
	if (newState.networkName) {
		currentViewportState.networkName = newState.networkName;
	}
	if (newState.projectID) {
		currentViewportState.projectID = newState.projectID;
	}
	viewportData.navEvents = viewportData.navEvents.slice(0, viewportData.navCurrent + 1);
	viewportData.navEvents.push(newState);
	viewportData.navCurrent += 1;
	//console.log(viewportData.navCurrent, viewportData.navEvents);
}

export function navBack() {
	//console.log('Nav backward from ' + viewportData.navCurrent);
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
}

export function navForward() {
	//console.log('Nav forward from ' + viewportData.navCurrent + ' of ' + viewportData.navEvents.length);
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
}

/*

function updateViewportProjects() {
	switch (currentViewportState.scale) {
		case ViewportScale.Global: {
			viewportData.projects = []; //projects;
			break;
		}
		case ViewportScale.Network: {
			viewportData.projects = []
			break;
		}
		case ViewportScale.Country: {
			break;
		}
		case ViewportScale.Project: {
			break;
			if (currentViewportState.projectID !== undefined) {

				viewportData.projects = [currentViewportState.projectID];
			}
			break;
		}
	}
}
*/