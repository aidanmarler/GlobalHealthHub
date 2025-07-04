export type College =
	| 'Colorado School of Public Health'
	| 'College of Nursing'
	| 'School of Medicine'
	| 'School of Dental Medicine'
	| 'Skaggs School of Pharmacy and Pharmaceutical Sciences';

export type Mission = 'Education' | 'Research' | 'Service/Clinical';

export type Project = {
	id: string;
	ProjectTitle: string;
	Country: string;
	City: string;
	Lat: number;
	Lng: number;
	Mission: Mission;
	PrimaryCollegeOrSchool: College;
	PrimaryDepartmentOrCenter: string;
	PrimaryContactName: string;
	PrimaryContactEmail: string;
	PrimaryContactPosition: "Faculty" | "Staff" | "Student";
	OtherContactsNames: string[];
	OtherContactsEmails: string[];
	ProjectAcronym: string;
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
	OpportunityForParticipation: boolean;
	OpportunityTimeCommitment: string;
	OpportunityPaid: boolean;
	StartYear: number;
	EndYear: number | null;
	Description: string;
	Notes: string;
};

// Hold number of project in each mission
export type MissionCount = {
	[key in Mission]: number;
};
// Hold number of projects in each college
export type CollegeCount = {
	[key in College]: number;
};

export type ProjectHolder = {
	string : Project;
}

export type DivisionCount = {
	type: Mission | College;
	count: number;
	label: string;
};

// Hold active viewport state with 1 of 5 relevant categories
export type ViewportState = {
	scale: Category;
	projectID?: string;
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

export type SortBy = 'Mission' | 'College';

export type Category = 'Global' | 'Mission' | 'College' | 'Country' | 'Contact' | 'Project';

export type TitleIdPair = {title: string, id: string};

export type SearchResult = { category: Category; title: string; id:string; focused: boolean; };

export type SearchElement = { result: SearchResult; element: HTMLElement; };

export type CalloutStat = 'Projects' | 'Countries' | 'Contacts'