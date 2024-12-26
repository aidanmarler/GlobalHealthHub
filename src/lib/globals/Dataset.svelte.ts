import { ViewportScale, type Project } from '$lib/types';
import { parseProjectsCSV } from '$lib/utils/csvUtils';
import { currentViewportState } from './Viewport.svelte';

// Define Project Data type to store data
type ProjectData = {
	all: Project[];
	viewport: Project[];
};

// Store projects as an object with lists to access
let projects: ProjectData = {
	all: [],
	viewport: []
};

//initializeDataset();

// Function to get the dataset from csv and adjust the viewport
export async function initializeDataset() {
	projects.all = await parseProjectsCSV('/data/projects_2023.csv');
	updateViewportProjects(currentViewportState.scale);
}

// This function updates projects that are being examined/used by user
export function updateViewportProjects(scale: ViewportScale) {
	let projectsList: Project[] = [];

	switch (currentViewportState.scale) {
		case ViewportScale.Project: {
			if (currentViewportState.projectID != undefined) {
				projectsList.push(projects.all[currentViewportState.projectID - 1]);
			}
			break;
		}
		case ViewportScale.Country: {
			projects.all.forEach((project) => {
				if (project.Country == currentViewportState.countryName) {
					projectsList.push(project);
				}
			});
			break;
		}
		case ViewportScale.Network: {
			projects.all.forEach((project) => {
				if (project.ContactName == currentViewportState.networkName) {
					projectsList.push(project);
				}
			});
			break;
		}
		case ViewportScale.Global: {
			projectsList = projects.all;
		}
	}
	projects.viewport = projectsList;
	return;
}

/*

Note for future me: setting this is causing a weird error at the moment where it all breaks on reload.

Also, I want to update the viewport data on viewport state changing and the project data being loaded in
*/

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
