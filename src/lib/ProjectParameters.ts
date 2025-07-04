'use strict';

import type { College, Mission, Category } from './types';

export const missions: Mission[] = ['Education', 'Research', 'Service/Clinical'];

export const colleges: College[] = [
	'School of Medicine',
	'Colorado School of Public Health',
	'Skaggs School of Pharmacy and Pharmaceutical Sciences',
	'College of Nursing',
	'School of Dental Medicine'
];

export const hex_mission: { [key in Mission]: string } = {
	Education: '#92D22A',
	Research: '#00AD93',
	'Service/Clinical': '#00226B'
};

export const hex_college: { [key in College]: string } = {
	'School of Medicine': '#ffcc59',
	'Colorado School of Public Health': '#CC79A7',
	'Skaggs School of Pharmacy and Pharmaceutical Sciences': '#b24400',
	'School of Dental Medicine': '#3f1b00',
	'College of Nursing': '#582973'
};

export const bg_general: { [key in Category]: string } = {
	Project: 'bg-stone-300',
	Country: 'bg-slate-500',
	Contact: 'bg-zinc-400',
	Global: 'bg-black',
	Mission: 'bg-transparent',
	College: 'bg-transparent'
};

export const bg_mission: { [key in Mission]: string } = {
	Education: 'bg-education',
	Research: 'bg-research',
	'Service/Clinical': 'bg-service'
};

export const bg_college: { [key in College]: string } = {
	'School of Medicine': 'bg-medicine',
	'Colorado School of Public Health': 'bg-public',
	'Skaggs School of Pharmacy and Pharmaceutical Sciences': 'bg-pharmacy',
	'School of Dental Medicine': 'bg-dental',
	'College of Nursing': 'bg-nursing'
};

export const border_general: { [key in Category]: string } = {
	Project: 'border-neutral-300',
	Country: 'border-neutral-500',
	Contact: 'border-neutral-400',
	Global: 'border-black',
	Mission: 'border-transparent',
	College: 'border-transparent'
};

export const border_mission: { [key in Mission]: string } = {
	Education: 'border-education',
	Research: 'border-research',
	'Service/Clinical': 'border-service'
};

export const border_college: { [key in College]: string } = {
	'School of Medicine': 'border-medicine',
	'Colorado School of Public Health': 'border-public',
	'Skaggs School of Pharmacy and Pharmaceutical Sciences': 'border-pharmacy',
	'School of Dental Medicine': 'border-dental',
	'College of Nursing': 'border-nursing'
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
	Mission: 'Mission',
	PrimaryCollegeOrSchool: 'College',
	Country: 'Country',
	PrimaryContactName: 'Contact',
	ProjectTitle: 'Project'
};

export function retrieve_bg(category: Category, mission?: Mission, college?: College): string {
	switch (category) {
		case 'Project':
			return bg_general.Project;
		case 'Country':
			return bg_general.Country;
		case 'Contact':
			return bg_general.Contact;
		case 'Mission':
			return mission ? bg_mission[mission] : '';
		case 'College':
			return college ? bg_college[college] : '';
		default:
			return 'bg-blue-500';
	}
}
export function retrieve_border(category: Category, mission?: Mission, college?: College): string {
	switch (category) {
		case 'Project':
			return border_general.Project;
		case 'Country':
			return border_general.Country;
		case 'Contact':
			return border_general.Contact;
		case 'Mission':
			return mission ? border_mission[mission] : '';
		case 'College':
			return college ? border_college[college] : '';
		default:
			return 'border-blue-500';
	}
}