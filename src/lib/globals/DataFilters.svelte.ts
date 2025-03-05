// Event Management System!

import type { Mission } from '$lib/types';

// Here, we fire an event when we want, and components can subscribe to these events
type EventListener = () => void;
const listeners: EventListener[] = [];

export function subscribeToFilterChange(callback: EventListener) {
	listeners.push(callback);
	// Return cleanup function
	return () => {
		const index = listeners.indexOf(callback);
		if (index !== -1) listeners.splice(index, 1);
	};
}

export function fireFilterChangeEvent() {
	listeners.forEach((listener) => listener());
}

// Control what is visible on the map.
export let filters: { [key in Mission]: boolean } = $state({
	Education: true,
	Research: true,
	'Service/Clinical': true
});
