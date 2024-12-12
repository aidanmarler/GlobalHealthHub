'use strict';

import { Mission } from './types';

export const missionColors = {
	[Mission.Education]: '#D81B60', // Orange
	[Mission.Research]: '#1E88E5', // Green
	[Mission.Service]: '#FFC107' // Blue
};

export const missionName = {
	[Mission.Education]: 'Education',
	[Mission.Research]: 'Research',
	[Mission.Service]: 'Service/Clinical'
};
