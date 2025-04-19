'use strict';

import type { College, Mission, Category } from './types';

export const missions: Mission[] = [
	'Education',
	'Research',
	'Service/Clinical'
];

export const colleges: College[] = [
	'School of Medicine',
	'Colorado School of Public Health',
	'Skaggs School of Pharmacy and Pharmaceutical Sciences',
	'College of Nursing',
	'School of Dental Medicine'
];

export const missionColors: { [key in Mission]: string } = {
	Education: '#8BC553', //'#009052', // Green
	Research: '#00AF78', //'#4C00C5', // Blue
	'Service/Clinical': '#3A6B3C' //'#D55E00' // Red
};

export const collegeColors: { [key in College]: string } = {
	'School of Medicine': '#ffcc59',
	'Colorado School of Public Health': '#CC79A7',
	'Skaggs School of Pharmacy and Pharmaceutical Sciences': '#b24400',
	'School of Dental Medicine': '#3f1b00',
	'College of Nursing': '#582973'
};

export const missionLabels: { [key in Mission]: string } = {
	Education: 'Education',
	Research: 'Research',
	'Service/Clinical': 'Service/Clinical'
};

export const collegeLabels: { [key in College]: string } = {
	'Colorado School of Public Health': 'CSPH',
	'College of Nursing': 'Nursing',
	'School of Medicine': 'Medicine',
	'School of Dental Medicine': 'Dental Medicine',
	'Skaggs School of Pharmacy and Pharmaceutical Sciences': 'Skaggs Pharma.'
};

export const categoryIcons: { [key in Category]: string } = {
	Global: 'category/globe.svg',
	Mission: 'category/target.svg',
	Country: 'category/flag.svg',
	College: 'category/school.svg',
	Contact: 'category/person.svg',
	Project: 'category/point.svg'
};

export const propertyNameToCategory: { [key: string]: Category } = {
	'Mission': 'Mission',
	'PrimaryCollegeOrSchool': 'College',
	'Country': 'Country',
	'PrimaryContactName': 'Contact',
	'ProjectTitle': 'Project'
}
