'use strict';

import { Mission } from './types';

export const missionColors = {
	[Mission.Education]: '#009052', // Green
	[Mission.Research]: '#4C00C5', // Blue
	[Mission.Service]: '#D55E00' // Red
};

export const missionName = {
	[Mission.Education]: 'Education',
	[Mission.Research]: 'Research',
	[Mission.Service]: 'Service/Clinical'
};
