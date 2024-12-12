'use strict';

import { Mission } from '$lib/types';

// Control what is visible on the map.
export let Filters = $state({
	[Mission.Education]: true,
	[Mission.Research]: true,
	[Mission.Service]: true
});

// Enum to hold viewport scale types
export enum ViewportScale {
	Global,
	Country,
	Network,
	Project
}

// Hold viewport state, storing what scale is active and what the label should be
export let ViewportState = $state({
	scale: ViewportScale.Global,
	projectID: 0
});

// Hold if sidebar is open or not and what should be inside
export let Sidebar = $state({
	sidebarOpen: false,
	sidebarHeader: 'Sidebar',
	sidebarContent: ''
});
