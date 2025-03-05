<script lang="ts">
	import '/src/lib/styles/mapbox-gl.css';
	import { onMount } from 'svelte';
	import mapboxgl, { type LngLatLike } from 'mapbox-gl';
	import type { FeatureCollection, Feature, Point } from 'geojson';
	import { type ColorPointBy, type Project, type ViewportState } from '$lib/types';
	import { collegeColors, missionColors } from '$lib/ProjectParameters';
	import {
		newNavigation,
		viewportData,
		currentViewportState,
		subscribeToViewportChange
	} from '../../../lib/globals/Viewport.svelte';
	import { filters } from '$lib/globals/DataFilters.svelte';
	import LoadingIcon from './loadingIcon.svelte';
	import MapLegend from './MapLegend.svelte';

	let {
		projectsGeoJSON,
		loadComplete = $bindable()
	}: {
		projectsGeoJSON: FeatureCollection<Point>;
		loadComplete: boolean;
	} = $props();
	let colorBy: ColorPointBy = $state('Mission');
	let loadingMap: boolean = $state(false);
	let loadingProjects: boolean = $state(false);
	let map: mapboxgl.Map | undefined;

	let lastHighlightedProjects: number[] = [];

	let styleLoaded: boolean = false;

	const pointColor: mapboxgl.ExpressionSpecification = [
		'case',
		// svelte-ignore state_referenced_locally
		['==', 'Mission', colorBy], // Check if ColorBy is "Mission"
		[
			'match',
			['get', 'Mission'],
			'Education',
			missionColors['Education'],
			'Research',
			missionColors['Research'],
			'Service/Clinical',
			missionColors['Service/Clinical'],
			'#ccc'
		],
		[
			'match',
			['get', 'PrimaryCollegeOrSchool'],
			'Colorado School of Public Health',
			collegeColors['Colorado School of Public Health'],
			'College of Nursing',
			collegeColors['College of Nursing'],
			'School of Dental Medicine',
			collegeColors['School of Dental Medicine'],
			'School of Medicine',
			collegeColors['School of Medicine'],
			'Skaggs School of Pharmacy and Pharmaceutical Sciences',
			collegeColors['Skaggs School of Pharmacy and Pharmaceutical Sciences'],
			'#ccc'
		]
	];

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
					'circle-opacity': ['case', ['boolean', ['feature-state', 'highlight'], false], 0.9, 0.2],
					'circle-stroke-opacity': [
						'case',
						['boolean', ['feature-state', 'highlight'], false],
						1,
						0
					],
					//0.7,
					'circle-color': pointColor,
					'circle-stroke-color': pointColor,
					'circle-radius': [
						'interpolate',
						['linear'],
						['zoom'],
						// zoom is 0.5 (or less) -> circle radius will be 4px hovered, 1.5 not
						0.5,
						['case', ['boolean', ['feature-state', 'hover'], false], 4, 2],
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
					'Education',
					filters['Education'],
					'Research',
					filters['Research'],
					'Service/Clinical',
					filters['Service/Clinical'],
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
					scale: 'Project',
					projectID: properties.Id,
					countryName: properties.Country,
					networkName: properties.ContactName
				};

				newNavigation(newState);
			});

			let hoveredProjectId: number | null = null;

			// Add interactivity: hover
			map.on('mouseenter', 'project-circles', (e: any) => {
				if (map === undefined) {
					return;
				}

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

	function updateFilters() {
		const filter: mapboxgl.FilterSpecification = [
			'match',
			['get', 'Mission'],
			'Education',
			filters['Education'] ? true : false,
			,
			'Research',
			filters['Research'] ? true : false,
			,
			'Service/Clinical',
			filters['Service/Clinical'] ? true : false,
			,
			/* other */ false
		];

		if (map !== undefined) {
			map.setFilter('project-circles', filter);
		}
	}

	export function updateColors() {
		if (map !== undefined) {
			const pointColor: mapboxgl.ExpressionSpecification = [
				'case',
				['==', 'Mission', colorBy], // Check if ColorBy is "Mission"
				[
					'match',
					['get', 'Mission'],
					'Education',
					missionColors['Education'],
					'Research',
					missionColors['Research'],
					'Service/Clinical',
					missionColors['Service/Clinical'],
					'#ccc'
				],
				[
					'match',
					['get', 'PrimaryCollegeOrSchool'],
					'Colorado School of Public Health',
					collegeColors['Colorado School of Public Health'],
					'College of Nursing',
					collegeColors['College of Nursing'],
					'School of Dental Medicine',
					collegeColors['School of Dental Medicine'],
					'School of Medicine',
					collegeColors['School of Medicine'],
					'Skaggs School of Pharmacy and Pharmaceutical Sciences',
					collegeColors['Skaggs School of Pharmacy and Pharmaceutical Sciences'],
					'#ccc'
				]
			];
			map.setPaintProperty('project-circles', 'circle-color', pointColor);
			map.setPaintProperty('project-circles', 'circle-stroke-color', pointColor);
		}
	}

	export function highlightProjects(projectsToHighlight: Project[]) {
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

	function zoomToHighlightedProjects() {
		if (map === undefined) return;
		if (
			currentViewportState.scale == 'Global' ||
			currentViewportState.scale == 'Mission' ||
			currentViewportState.scale == 'College'
		) {
			map.flyTo({ center: [0, 0], zoom: 0.5, pitch: 0, duration: 2000, essential: true });
			return;
		}
		if (currentViewportState.scale == 'Project') {
			// Change later
			if (map.getZoom() < 6.5) {
				const project = viewportData.projects[0];
				const coordinates: LngLatLike = [project.longitude, project.latitude];
				map.flyTo({ center: coordinates, zoom: 6.5, duration: 2000, essential: true });
			}
			return;
		}
		const minLon = Math.min(...viewportData.projects.map((project) => project.longitude));
		const maxLon = Math.max(...viewportData.projects.map((project) => project.longitude));
		const minLat = Math.min(...viewportData.projects.map((project) => project.latitude));
		const maxLat = Math.max(...viewportData.projects.map((project) => project.latitude));
		let padding = 100;
		let duration = 2000;
		let maxZoom = 5.8;
		let minZoom = 0.5;
		if (currentViewportState.scale == 'Country') {
			padding = 100;
			duration = 2000;
			maxZoom = 5.8;
		} else if (currentViewportState.scale == 'Contact') {
			padding = 100;
			duration = 2000;
			maxZoom = 6.2;
		}
		map.fitBounds(
			[
				[minLon, minLat],
				[maxLon, maxLat]
			],
			{
				padding: padding,
				duration: duration,
				essential: true,
				maxZoom: maxZoom,
				minZoom: minZoom
			}
		);
	}

	// On mount, initialize data, mapbox, and set projection
	onMount(async () => {
		// Subscribe to Viewport data events
		initializeViewportEventSubscription();

		await InitializeMapbox();
		loadingMap = false;
		// This should be changed as well
		await setTimeout(() => {
			highlightProjects(viewportData.projects);
		}, 1000);
		loadComplete = true;
	});

	function initializeViewportEventSubscription() {
		// Subscribe to the event emitter
		const unsubscribe = subscribeToViewportChange(() => {
			if (!styleLoaded) return;
			if (!map) return;
			highlightProjects(viewportData.projects);
			zoomToHighlightedProjects();
		});

		// Cleanup on component destruction
		return () => {
			unsubscribe();
		};
	}
</script>

<div id="map" class="z-0 w-full dark:bg-black"></div>
<MapLegend bind:colorBy {updateColors} />
