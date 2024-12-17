import { Mission } from "$lib/types";

// Control what is visible on the map.
export let filters = $state({
	[Mission.Education]: true,
	[Mission.Research]: true,
	[Mission.Service]: true
});
