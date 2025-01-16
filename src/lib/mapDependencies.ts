'use strict';

import { College, Mission } from './types';

export const missionName = {
	[Mission.Education]: 'Education',
	[Mission.Research]: 'Research',
	[Mission.Service]: 'Service/Clinical'
};

export const missionColors = {
	[Mission.Education]: '#8BC553',//'#009052', // Green
	[Mission.Research]: '#00AF78',//'#4C00C5', // Blue
	[Mission.Service]: '#3A6B3C',//'#D55E00' // Red
};

export const collegeName = {
	[College.Public]: 'Colorado School of Public Health',
	[College.Nursing]: 'College of Nursing',
	[College.Medicine]: 'School of Medicine',
	[College.Dental]: 'School of Dental Medicine',
	[College.Pharmacy]: 'Skaggs School of Pharmacy and Pharmaceutical Sciences'
};

export const collegeColors = {
	[College.Public]: '#000000',
	[College.Nursing]: '#E69F00',
	[College.Medicine]: '#0072B2',
	[College.Dental]: '#D55E00',
	[College.Pharmacy]: '#CC79A7'
};
