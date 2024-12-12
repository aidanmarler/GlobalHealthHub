'use strict';

import { Mission } from '$lib/types';

export let Filters = $state({
	[Mission.Education]: true,
	[Mission.Research]: true,
	[Mission.Service]: true
});

export let SchoolFilter = $state({
	[Mission.Education]: true,
	[Mission.Research]: true,
	[Mission.Service]: true
});

/*
export function ChangeMissionFilter(missionType: Mission) {
	console.log('Change Mission Filter!', missionType);
	MissionFilter = {
		[Mission.Education]: !MissionFilter[Mission.Education],
		[Mission.Research]: MissionFilter[Mission.Research],
		[Mission.Service]: MissionFilter[Mission.Service]
	};
}

/*
	switch (missionType) {
		case Educa: {
			projectTypes.Education += 1;
			break;
		}
		case missionName.Research: {
			projectTypes.Research += 1;
			break;
		}
		case missionName.Service: {
			projectTypes.Service += 1;
			break;
		}
		default: {
			console.log('Unknown mission type: ' + project.Mission);
			break;
		}
	}*/
