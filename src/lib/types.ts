export type College =
	| 'Colorado School of Public Health'
	| 'College of Nursing'
	| 'School of Medicine'
	| 'School of Dental Medicine'
	| 'Skaggs School of Pharmacy and Pharmaceutical Sciences';

export type Mission = 'Education' | 'Research' | 'Service/Clinical';

export type Project = {
	id: number;
	Global: string;
	Country: string;
	City: string;
	Mission: Mission; // Q: Why not use an enum?   A: Because styling with Mapbox was a headache - they expect a string and it's not super dynamic, as far as I've been able to figure out
	PrimaryCollegeOrSchool: College;
	PrimaryDepartmentOrCenter: string;
	ContactName: string;
	ContactEmail: string;
	ContactPosition: string;
	ProjectAcronym: string;
	ProjectTitle: string;
	ProjectWebsite: string;
	InternationalNetwork: string;
	InternationalInstitution: string;
	PrimaryFundingAgency: string;
	IRB: boolean;
	LOA: boolean;
	DTA: boolean;
	MOU: boolean;
	MTA: boolean;
	OtherAgreementType: string;
	NumStudentsTraveled: string;
	NumResidentsTraineesTraveled: number;
	NumFacultyInvolved: number;
	StartYear: number;
	EndYear: number;
	Description: string;
	Location: string;
	latitude: number;
	longitude: number;
};

export type MissionCount = {
	[key in Mission]: number;
};

export type CollegeCount = {
	[key in College]: number;
};

export type DivisionCount = {
	type: Mission | College;
	count: number;
	label: string;
};

export type ViewportState = {
	scale: Category;
	projectID?: number;
	countryName?: string;
	networkName?: string;
	missionName?: Mission;
	collegeName?: College;
};

export type ViewportData = {
	projects: Project[];
	navEvents: ViewportState[];
	navCurrent: number;
};

export type PropertyDisplayInfo = {
	displayName: string;
	width: string;
};

export type ColorPointBy = 'Mission' | 'College';

export type Category = 'Global' | 'Mission' | 'College' | 'Country' | 'Contact' | 'Project';

export type SearchResult = { category: Category; value: string; focused: boolean; };

export type SearchElement = { result: SearchResult; element: HTMLElement; };
