<script lang="ts">
	import '/src/lib/styles/mapbox-gl.css';
	import { onMount } from 'svelte';
	import mapboxgl, { type LngLatLike } from 'mapbox-gl';
	import type { FeatureCollection, Feature, Point } from 'geojson';
	import { Mission, ViewportScale, type Project, type ViewportState } from '$lib/types';
	import { missionColors, missionName } from '$lib/mapDependencies';
	import {
		newNavigation,
		sidebar,
		viewportData,
		currentViewportState
	} from '../../../lib/globals/Viewport.svelte';
	import { filters } from '$lib/globals/DataFilters.svelte';
	import LoadingIcon from './loadingIcon.svelte';

	let {
		projectsGeoJSON,
		loadComplete = $bindable()
	}: { projectsGeoJSON: FeatureCollection<Point>; loadComplete: boolean } = $props();
	let loadingMap: boolean = $state(false);
	let loadingProjects: boolean = $state(false);
	let map: mapboxgl.Map | undefined;

	let lastHighlightedProjects: number[] = [];

	let styleLoaded: boolean = false;

	async function InitializeMapbox() {
		mapboxgl.accessToken =
			'pk.eyJ1IjoiYWltYTc5MTciLCJhIjoiY2xxdGkzNzMyNTMzaTJqbm1zeHJkaXlpeiJ9.tYKBJ6Ekn4KKunlpW-9Ukg';

		map = new mapboxgl.Map({
			container: 'map',
			center: [0, 0], // Set initial center
			zoom: 0.5, // Set initial zoom level
			pitch: 0,
			bearing: 0,
			logoPosition: 'top-left',
			attributionControl: false,
			projection: {
				name: 'mercator'
			}
		});

		// Set as dark mapbox
		map.setStyle('mapbox://styles/mapbox/light-v11'); // "darkmode: dark-v10"

		map.on('style.load', () => {
			if (map === undefined) {
				return;
			}
			styleLoaded = true;
			map.setFog({
				color: 'rgb(25, 29, 39)', // Lower atmosphere
				'high-color': 'rgb(5, 5, 25)', // Upper atmosphere
				'horizon-blend': 0.05, // Atmosphere thickness (default 0.2 at low zooms)
				'space-color': 'rgb(0, 0, 0)', // Background color
				'star-intensity': 0.2 // Background star brightness (default 0.35 at low zoooms )
			});
		});

		// On load, add the data
		map.on('load', () => {
			if (map === undefined || projectsGeoJSON === undefined) {
				return;
			}

			//console.log(projectsGeoJSON.features.length);

			// Add the GeoJSON source
			map.addSource('projects', {
				type: 'geojson',
				data: projectsGeoJSON
			});

			map.addLayer({
				id: 'project-circles',
				type: 'circle',
				source: 'projects',
				paint: {
					// AIDAN: this isn't working becasue supposedly we can't have a JS array directly in here. Although that's confusing based on how it says this should be an array.
					// GPT wants me to instead add highlighted propery to the GeoJSON and update whole dataset, which is a lot to do for each interaction at runtime
					// Especially for something like a 'hover'
					'circle-opacity': ['case', ['boolean', ['feature-state', 'highlight'], false], 0.7, 0.35],
					'circle-stroke-opacity': [
						'case',
						['boolean', ['feature-state', 'highlight'], false],
						0.9,
						0
					],
					//0.7,
					'circle-color': [
						'match',
						['get', 'Mission'],
						missionName[Mission.Education],
						missionColors[Mission.Education],
						missionName[Mission.Research],
						missionColors[Mission.Research],
						missionName[Mission.Service],
						missionColors[Mission.Service],
						/* other */ '#ccc'
					],
					'circle-stroke-color': [
						'match',
						['get', 'Mission'],
						missionName[Mission.Education],
						missionColors[Mission.Education],
						missionName[Mission.Research],
						missionColors[Mission.Research],
						missionName[Mission.Service],
						missionColors[Mission.Service],
						'#ccc'
					],
					'circle-radius': [
						'interpolate',
						['linear'],
						['zoom'],
						// zoom is 3 (or less) -> circle radius will be 1px
						0.5,
						['case', ['boolean', ['feature-state', 'hover'], false], 4, 1.5],
						// zoom is 20 (or greater) -> circle radius will be 5px
						10,
						['case', ['boolean', ['feature-state', 'hover'], false], 14, 10]
					],
					'circle-stroke-width': ['case', ['boolean', ['feature-state', 'highlight'], false], 2, 0]
				},
				// Filter by if Mission
				filter: [
					'match',
					['get', 'Mission'],
					missionName[Mission.Education],
					filters[Mission.Education],
					missionName[Mission.Research],
					filters[Mission.Research],
					missionName[Mission.Service],
					filters[Mission.Service],
					/* other */ false
				]
			});

			// Create a popup, but don't add it to the map yet.
			const popup = new mapboxgl.Popup({
				closeButton: false,
				closeOnClick: false,
				anchor: 'left',
				maxWidth: '350px',
				className: 'point-popup'
			});

			// Add interactivity: click
			map.on('click', 'project-circles', (e: any) => {
				const coordinates = e.features[0].geometry.coordinates;
				const properties = e.features[0].properties;

				// First set new viewport state
				const newState: ViewportState = {
					scale: ViewportScale.Project,
					projectID: properties.Id,
					countryName: properties.Country,
					networkName: properties.ContactName
				};

				newNavigation(newState);
				//currentViewportState.scale = ViewportScale.Project;
				//currentViewportState.projectID = properties.Id;
				// Update Navigation (stored in viewportData)
				//console.log('currentViewport', currentViewportState);
			});

			let hoveredProjectId: number | null = null;

			// Add interactivity: hover
			map.on('mouseenter', 'project-circles', (e: any) => {
				if (map === undefined) {
					return;
				}
				//console.log(e.features[0].id);
				// Change the cursor style as a UI indicator.
				map.getCanvas().style.cursor = 'pointer';

				// Copy coordinates array
				const coordinates = e.features[0].geometry.coordinates.slice();
				const description = e.features[0].properties.PrimaryCollegeOrSchool;

				if (['mercator', 'equirectangular'].includes(map.getProjection().name)) {
					while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
						coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
					}
				}

				// Populate the popup and set its coordinates
				popup.setLngLat(coordinates).setHTML(description).addTo(map);
			});

			map.on('mousemove', 'project-circles', (e: any) => {
				if (
					map === undefined ||
					e.features[0].id === null ||
					e.features[0].id === undefined ||
					e.features[0].id === hoveredProjectId ||
					e.features.length === 0
				) {
					return;
				}
				if (hoveredProjectId !== null) {
					map.setFeatureState({ source: 'projects', id: hoveredProjectId }, { hover: false });
				}
				hoveredProjectId = e.features[0].id;
				if (hoveredProjectId !== null) {
					// Highlight the circle
					map.setFeatureState(
						{
							source: 'projects',
							id: hoveredProjectId
						},
						{
							hover: true
						}
					);
				}
			});

			map.on('mouseleave', 'project-circles', (e: any) => {
				if (map === undefined) {
					return;
				}
				map.getCanvas().style.cursor = '';
				popup.remove();

				if (hoveredProjectId !== null) {
					// Highlight the circle
					map.setFeatureState(
						{
							source: 'projects',
							id: hoveredProjectId
						},
						{
							hover: false
						}
					);

					hoveredProjectId = null;
				}
			});
		});

		// Set styles
		map.addControl(new mapboxgl.AttributionControl(), 'bottom-left');

		// disable map rotation using right click + drag
		map.dragRotate.disable();

		// disable map rotation using touch rotation gesture
		map.touchZoomRotate.disableRotation();

		return () => {
			if (map !== undefined) map.remove();
		};
	}

	/*

	These effect runes are likely not the best way to implement these features.
	For optimization, these should likely be removed. 
	
	Already, at least 1 interesting bug has arisen where when zooming around points, it sometimes stops 
		running when scale is being told to change, because scale isn't actually changing.

	Also for the Map componenent - the first loading of the map is delayed from the rest, leading to the 
		highlightProjects function to not be called in time. This is also likely fixable by relying less
		on the $effect rune.

	*/

	// When filters change, reload filters
	$effect(() => {
		const filter: mapboxgl.FilterSpecification = [
			'match',
			['get', 'Mission'],
			missionName[Mission.Education].toString(),
			filters[Mission.Education] ? true : false,
			missionName[Mission.Research].toString(),
			filters[Mission.Research] ? true : false,
			missionName[Mission.Service].toString(),
			filters[Mission.Service] ? true : false,
			/* other */ false
		];
		//console.log('Change Points: ', filters);
		if (map !== undefined) {
			map.setFilter('project-circles', filter);
		}

		//console.log('viewportData from map', viewportData.projects);
	});

	// when selected projects change, zoom to selected projects
	$effect(() => {
		currentViewportState.scale
		if (map === undefined) {
			return;
		}
		console.log('--->', map.getZoom(), map.getZoom() > 6.5)
		if (currentViewportState.scale == ViewportScale.Global) {
			map.flyTo({ center: [0, 0], zoom: 0.5, pitch: 0, duration: 2000, essential: true });
		} else if (currentViewportState.scale == ViewportScale.Project) {
			// Change later
			if (map.getZoom() < 6.5) {
				const project = viewportData.projects[0];
				const coordinates: LngLatLike = [project.longitude, project.latitude];
				map.flyTo({ center: coordinates, zoom: 6.5, duration: 2000, essential: true });
			}
		} else if (currentViewportState.scale == ViewportScale.Country) {
			const minLon = Math.min(...viewportData.projects.map((project) => project.longitude));
			const maxLon = Math.max(...viewportData.projects.map((project) => project.longitude));
			const minLat = Math.min(...viewportData.projects.map((project) => project.latitude));
			const maxLat = Math.max(...viewportData.projects.map((project) => project.latitude));
			map.fitBounds(
				[
					[minLon, minLat],
					[maxLon, maxLat]
				],
				{
					padding: 100,
					duration: 2000,
					essential: true,
					maxZoom: 5.8
				}
			);
		} else if (currentViewportState.scale == ViewportScale.Network) {
			const minLon = Math.min(...viewportData.projects.map((project) => project.longitude));
			const maxLon = Math.max(...viewportData.projects.map((project) => project.longitude));
			const minLat = Math.min(...viewportData.projects.map((project) => project.latitude));
			const maxLat = Math.max(...viewportData.projects.map((project) => project.latitude));
			map.fitBounds(
				[
					[minLon, minLat],
					[maxLon, maxLat]
				],
				{
					padding: 100,
					duration: 2000,
					essential: true,
					maxZoom: 6.2
				}
			);
		}
	});

	// Highlight projects on viewport data change
	$effect(() => {
		viewportData.projects
		//console.log('highlightedProjects', viewportData.projects);
		if (styleLoaded) {
			highlightProjects(viewportData.projects);
		}
	});

	function highlightProjects(projectsToHighlight: Project[]) {
		for (let i = 0; i < lastHighlightedProjects.length; i++) {
			if (map == undefined) {
				return;
			}
			map.setFeatureState(
				{
					source: 'projects',
					id: lastHighlightedProjects[i]
				},
				{
					highlight: false
				}
			);
		}
		lastHighlightedProjects = [];
		projectsToHighlight.forEach((project) => {
			if (map == undefined) {
				return;
			}
			map.setFeatureState(
				{
					source: 'projects',
					id: project.id
				},
				{
					highlight: true
				}
			);
			lastHighlightedProjects.push(project.id);
		});
	}

	// On mount, initialize data, mapbox, and set projection
	onMount(async () => {
		await InitializeMapbox();
		loadingMap = false;
		// This should be changed as well
		await setTimeout(() => {
			highlightProjects(viewportData.projects);
		}, 1000);
		loadComplete = true;
	});
</script>

<div id="map" class="z-0 w-full dark:bg-black"></div>
