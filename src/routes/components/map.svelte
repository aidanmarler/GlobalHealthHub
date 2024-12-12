<script lang="ts">
	import { onMount } from 'svelte';
	import mapboxgl from 'mapbox-gl';
	import { Mission, type Project } from '$lib/types';
	import { missionColors, missionName } from '$lib/mapDependencies';
	import { Filters, ViewportScale, ViewportState } from '../GlobalStates.svelte';

	let { projects }: { projects: Project[] } = $props();
	let map: any;
	let geojsonData = {};

	async function LoadGeoJSON(projects: Project[]) {
		// Convert projects to GeoJSON
		geojsonData = {
			type: 'FeatureCollection',
			features: projects.map((project: Project) => ({
				type: 'Feature',
				properties: {
					Id: project.id,
					Global: project.Global,
					Country: project.Country,
					City: project.City,
					Mission: project.Mission,
					PrimaryCollegeOrSchool: project.PrimaryCollegeOrSchool,
					PrimaryDepartmentOrCenter: project.PrimaryDepartmentOrCenter,
					ContactName: project.ContactName,
					ContactEmail: project.ContactEmail,
					ContactPosition: project.ContactPosition
				},
				geometry: {
					type: 'Point',
					coordinates: [project.longitude, project.latitude]
				}
			}))
		};
	}

	async function InitializeMapbox() {
		mapboxgl.accessToken =
			'pk.eyJ1IjoiYWltYTc5MTciLCJhIjoiY2xxdGkzNzMyNTMzaTJqbm1zeHJkaXlpeiJ9.tYKBJ6Ekn4KKunlpW-9Ukg';

		map = new mapboxgl.Map({
			container: 'map',
			center: [0, 0], // Set initial center
			zoom: 1, // Set initial zoom level
			pitch: 0,
			bearing: 0,
			logoPosition: 'top-left',
			attributionControl: false
		});

		// On load, add the data
		map.on('load', () => {
			// Add the GeoJSON source
			map.addSource('projects', {
				type: 'geojson',
				data: geojsonData
			});

			map.addLayer({
				id: 'project-circles',
				type: 'circle',
				source: 'projects',
				paint: {
					'circle-opacity': 0.7,
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
					'circle-radius': [
						'interpolate',
						['linear'],
						['zoom'],
						// zoom is 5 (or less) -> circle radius will be 1px
						0,
						3,
						// zoom is 10 (or greater) -> circle radius will be 5px
						10,
						20
					],
					'circle-stroke-width': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0],
					'circle-stroke-color': [
						'match',
						['get', 'Mission'],
						missionName[Mission.Education],
						missionColors[Mission.Education],
						missionName[Mission.Research],
						missionColors[Mission.Research],
						missionName[Mission.Service],
						missionColors[Mission.Service],
						/* other */ '#ccc'
					]
				},
				// Filter by if Mission
				filter: [
					'match',
					['get', 'Mission'],
					missionName[Mission.Education],
					Filters[Mission.Education],
					missionName[Mission.Research],
					Filters[Mission.Research],
					missionName[Mission.Service],
					Filters[Mission.Service],
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
				//console.log('click event type:', e.type);
				const coordinates = e.features[0].geometry.coordinates;
				const properties = e.features[0].properties;

				//alert(`Clicked on project: ${properties}`);
				map.flyTo({ center: coordinates, zoom: 3, duration: 1000, essential: true });
				//map.zoomTo(2, {	duration: 50});

				ViewportState.scale = ViewportScale.Project;
				ViewportState.projectID = properties.Id;
				//ViewportState.itemTitle = properties;
			});

			// Add interactivity: hover
			map.on('mouseenter', 'project-circles', (e: any) => {
				// Change the cursor style as a UI indicator.
				map.getCanvas().style.cursor = 'pointer';

				// Copy coordinates array.
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

			map.on('mouseleave', 'project-circles', (e: any) => {
				map.getCanvas().style.cursor = '';
				popup.remove();
			});
		});

		map.on('style.load', () => {
			map.setFog({
				color: 'rgb(25, 29, 39)', // Lower atmosphere
				'high-color': 'rgb(5, 5, 25)', // Upper atmosphere
				'horizon-blend': 0.05, // Atmosphere thickness (default 0.2 at low zooms)
				'space-color': 'rgb(0, 0, 0)', // Background color
				'star-intensity': 0.2 // Background star brightness (default 0.35 at low zoooms )
			});
		});

		map.on('flystart', () => {
			map.interactive = false;
		});

		map.on('flyend', () => {
			map.interactive = true;
		});

		// Set as dark mapbox
		map.setStyle('mapbox://styles/mapbox/dark-v10');

		/*

		// At low zooms, complete a revolution every two minutes.
		const secondsPerRevolution = 240;
		// Above zoom level 5, do not rotate.
		const maxSpinZoom = 2;

		let userInteracting = false;
		const spinEnabled = true;

		function spinGlobe() {
			const zoom = map.getZoom();
			if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
				let distancePerSecond = 360 / secondsPerRevolution;
				const center = map.getCenter();
				center.lng -= distancePerSecond;
				// Smoothly animate the map over one second.
				// When this animation is complete, it calls a 'moveend' event.
				map.easeTo({ center, duration: 1000, easing: (n: number) => n });
			}
		}

		// Pause spinning on interaction
		map.on('mousedown', () => {
			userInteracting = true;
		});
		map.on('dragstart', () => {
			userInteracting = true;
		});

		// When animation is complete, start spinning if there is no ongoing interaction
		map.on('moveend', () => {
			spinGlobe();
		});

		spinGlobe();

*/

		// Set styles
		map.getCanvasContainer().style.zIndex = 1000;
		map.addControl(new mapboxgl.AttributionControl(), 'bottom-left');

		/*
		return () => {
			map.remove();
		};
		*/
	}

	// when projects changes, reload GeoJSON
	$effect(() => {
		if (projects.length > 0) {
			LoadGeoJSON(projects);
		}
	});

	// When filters change, reload filters
	$effect(() => {
		const filter = [
			'match',
			['get', 'Mission'],
			missionName[Mission.Education],
			Filters[Mission.Education],
			missionName[Mission.Research],
			Filters[Mission.Research],
			missionName[Mission.Service],
			Filters[Mission.Service],
			/* other */ false
		];
		console.log('Change Points: ', Filters);
		if (map !== undefined) {
			map.setFilter('project-circles', filter);
		}
	});

	// On mount, initialize mapbox
	onMount(async () => {
		// Finally, load GeoJSON

		InitializeMapbox();
		map.setProjection('globe');
	});
</script>

<div id="map" class="w-full"></div>
