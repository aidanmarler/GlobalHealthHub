<script lang="ts">
	import '/src/lib/styles/mapbox-gl.css';
	import { onMount } from 'svelte';
	import mapboxgl, { type LngLatLike } from 'mapbox-gl';
	import type { FeatureCollection, Feature, Point } from 'geojson';
	import { type SortBy, type Project, type ViewportState } from '$lib/types';
	import { collegeColors, missionColors } from '$lib/ProjectParameters';
	import {
		newNavigation,
		viewportData,
		currentViewportState,
		subscribeToViewportChange
	} from '../../../lib/globals/Viewport.svelte';
	import { filters } from '$lib/globals/DataFilters.svelte';
	import MapLegend from './MapLegend.svelte';
	import { updateMapColors } from '$lib/utils/mapboxUtils';

	let {
		projectsGeoJSON,
		sortBy,
		loadComplete = $bindable()
	}: {
		projectsGeoJSON: FeatureCollection<Point>;
		sortBy: SortBy;
		loadComplete: boolean;
	} = $props();

	let loadingMap: boolean = $state(false);
	let map: mapboxgl.Map | undefined;

	let lastHighlightedProjects: string[] = [];

	let styleLoaded: boolean = false;

	export function call_updateColors() {
		console.log('call_updateColors called', sortBy);
		if (map === undefined) return;
		const pointColor: mapboxgl.ExpressionSpecification = [
			'case',
			['==', 'Mission', sortBy], // Check if ColorBy is "Mission"
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

	const pointColor: mapboxgl.ExpressionSpecification = [
		'case',
		// svelte-ignore state_referenced_locally
		['==', 'Mission', sortBy], // Check if ColorBy is "Mission"
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
			center: [10, 13], // Set initial center
			zoom: 0.2, // Set initial zoom level
			pitch: 0,
			bearing: 0,
			logoPosition: 'top-left',
			attributionControl: false,
			projection: { name: 'mercator' }
		});

		// Set as dark mapbox
		map.setStyle('mapbox://styles/mapbox/light-v11'); // "darkmode: dark-v10"

		map.on('style.load', () => {
			if (map === undefined) return;
			styleLoaded = true;
		});

		// On load, add the data
		map.on('load', () => {
			if (map === undefined || projectsGeoJSON === undefined) return;

			console.log('map loaded');
			console.log('projectsGeoJSON', projectsGeoJSON);

			const projectsGeoJSON_snapshot = $state.snapshot(projectsGeoJSON);

			// Add the GeoJSON source
			map.addSource('projects', {
				type: 'geojson',
				data: projectsGeoJSON,
				promoteId: 'id' // Ensures Mapbox uses `feature.id` from your data
			});

			console.log(map.getSource('projects'));

			map.addLayer({
				id: 'project-circles',
				type: 'circle',
				source: 'projects',
				paint: {
					'circle-opacity': [
						'interpolate',
						['linear'],
						['zoom'],
						0.5, // zoom is 0.5 (or less) -> circle radius will be 4px hovered, 2 not
						['case', ['boolean', ['feature-state', 'highlight'], false], 0.8, 0.12],
						1, // zoom is 2.5 (or greater) -> circle radius will be 13px
						['case', ['boolean', ['feature-state', 'highlight'], false], 0.85, 0.4]
					],
					//'circle-opacity': ['case', ['boolean', ['feature-state', 'highlight'], false], 0.8, 0.2],
					'circle-stroke-opacity': [
						'case',
						['boolean', ['feature-state', 'highlight'], false],
						1,
						0
					],
					'circle-color': pointColor,
					'circle-stroke-color': pointColor,
					'circle-radius': [
						'interpolate',
						['linear'],
						['zoom'],
						0.5, // zoom is 0.5 (or less) -> circle radius will be 4px hovered, 2 not
						['case', ['boolean', ['feature-state', 'hover'], false], 4, 3],
						2.5, // zoom is 2.5 (or greater) -> circle radius will be 13px
						['case', ['boolean', ['feature-state', 'hover'], false], 8, 7]
					],
					'circle-stroke-width': [
						'interpolate',
						['linear'],
						['zoom'],
						0.5, // zoom is 0.5 (or less) -> circle radius will be 4px hovered, 2 not
						['case', ['boolean', ['feature-state', 'highlight'], false], 2, 0],
						2.5, // zoom is 2.5 (or greater) -> circle radius will be 13px
						['case', ['boolean', ['feature-state', 'highlight'], false], 4, 0]
					]
				},
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

			map.on('click', (e) => {
				if (map === undefined) return;
				const features = map.queryRenderedFeatures(e.point, { layers: ['project-circles'] });
				console.log('Clicked features:', features);
				console.log('First feature id:', features[0]?.id);
				console.log('First feature properties:', features[0]?.properties);
			});

			// Add interactivity: click
			map.on('click', 'project-circles', (e: any) => {
				const coordinates = e.features[0].geometry.coordinates;
				const properties = e.features[0].properties;
				console.log('click', e.features[0]);
				// First set new viewport state
				const newState: ViewportState = {
					scale: 'Project',
					projectID: properties.id,
					countryName: properties.Country,
					networkName: properties.PrimaryContactName
				};

				newNavigation(newState);
			});

			let hoveredProjectId: string | null = null;

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
				console.log('mousemove: ', e.features[0]);
				if (
					map === undefined ||
					e.features[0].properties.id === null ||
					e.features[0].properties.id === undefined ||
					e.features[0].properties.id === hoveredProjectId ||
					e.features.length === 0
				) {
					return;
				}
				if (hoveredProjectId !== null) {
					//console.log('unhover 0: ', hoveredProjectId);
					map.setFeatureState({ source: 'projects', id: hoveredProjectId }, { hover: false });
				}
				hoveredProjectId = e.features[0].properties.id;
				if (hoveredProjectId !== null) {
					//console.log('hover 0: ', hoveredProjectId);
					map.setFeatureState({ source: 'projects', id: hoveredProjectId }, { hover: true });
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
					//console.log('unhover 1: ', hoveredProjectId);
					map.setFeatureState({ source: 'projects', id: hoveredProjectId }, { hover: false });
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

		map.addControl(new mapboxgl.NavigationControl());

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

	export function highlightProjects(projectsToHighlight: Project[]) {
		console.log('highlighting ' + projectsToHighlight.length + ' projects');
		console.log(
			lastHighlightedProjects.length + ' lastHighlightedProjects',
			lastHighlightedProjects
		);
		for (let i = 0; i < lastHighlightedProjects.length; i++) {
			if (map == undefined) {
				return;
			}
			//console.log('unhighlight 0: ', lastHighlightedProjects[i]);
			map.setFeatureState(
				{ source: 'projects', id: lastHighlightedProjects[i] },
				{ highlight: false }
			);
		}
		lastHighlightedProjects = [];
		projectsToHighlight.forEach((project) => {
			if (map == undefined) {
				return;
			}
			//console.log('highlight 0: ', project.id);
			map.setFeatureState({ source: 'projects', id: project.id }, { highlight: true });
			lastHighlightedProjects.push(project.id);
		});

		console.log('Now highlighting: ', lastHighlightedProjects);
	}

	function calculateZoomLevel(
		minLon: number,
		maxLon: number,
		minLat: number,
		maxLat: number
	): number {
		if (map === undefined) return 0.35;

		// Calculate the zoom level based on the bounds
		const bounds = [
			[minLon, minLat],
			[maxLon, maxLat]
		];
		const mapDim = { width: map.getCanvas().width, height: map.getCanvas().height };
		const boundsDim = {
			width: Math.abs(bounds[1][0] - bounds[0][0]),
			height: Math.abs(bounds[1][1] - bounds[0][1])
		};

		const zoomX = Math.log2(mapDim.width / boundsDim.width);
		const zoomY = Math.log2(mapDim.height / boundsDim.height);

		return Math.max(zoomX, zoomY);
	}

	function zoomToHighlightedProjects() {
		if (map === undefined) return;
		// Zoom to Global, Mission, or College
		if (
			currentViewportState.scale == 'Global' ||
			currentViewportState.scale == 'Mission' ||
			currentViewportState.scale == 'College'
		) {
			map.flyTo({ center: [10, 13], zoom: 0.2, pitch: 0, duration: 2000, essential: true });
			return;
		}
		// Zoom to project
		if (currentViewportState.scale == 'Project') {
			// Change later
			if (map.getZoom() < 6.45) {
				const project = viewportData.projects[0];
				const coordinates: LngLatLike = [project.Lng, project.Lat];
				map.flyTo({ center: coordinates, zoom: 6.5, duration: 2000, essential: true });
			}
			return;
		}
		// Zoom to Country or Contact
		// Zoom to Country or Contact
		const minLon = Math.min(...viewportData.projects.map((project) => project.Lng));
		const maxLon = Math.max(...viewportData.projects.map((project) => project.Lng));
		const minLat = Math.min(...viewportData.projects.map((project) => project.Lat));
		const maxLat = Math.max(...viewportData.projects.map((project) => project.Lat));
		let padding = 100;
		let duration = 2000;
		let maxZoom = 5.8;
		let minZoom = 0.5;
		if (currentViewportState.scale == 'Country') {
			padding = 20;
			duration = 2000;
			maxZoom = 5.8;
		} else if (currentViewportState.scale == 'Contact') {
			padding = 20;
			duration = 2000;
			maxZoom = 6.2;
		}
		map.fitBounds(
			[
				[minLon, minLat],
				[maxLon, maxLat]
			],
			{ padding: padding, duration: duration, essential: true, maxZoom: 5 }
		);
	}

	// On mount, initialize data, mapbox, and set projection
	onMount(async () => {
		// Subscribe to Viewport data events
		initializeViewportEventSubscription();
		await InitializeMapbox();

		// This should be changed as well
		if (!map) throw new Error('Map is undefined');
		await waitForLayerLoad(map, 'project-circles');
		highlightProjects(viewportData.projects);
		console.log('step 0');
		if (map !== undefined) {
			const source = map.getSource('projects');
			if (source) {
				console.log('SOURCE', source);
			}
		}
		loadingMap = false;
		loadComplete = true;
	});

	async function waitForLayerLoad(map: mapboxgl.Map, layerId: string) {
		return new Promise<void>((resolve) => {
			const checkLayer = () => {
				const layer = map.getLayer(layerId);
				if (layer) resolve();
				else setTimeout(checkLayer, 100);
			};
			checkLayer();
		});
	}

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

<div id="map" class="h-full w-full"></div>
<!--<MapLegend bind:colorPointBy={sortBy} {updateColors} />-->
