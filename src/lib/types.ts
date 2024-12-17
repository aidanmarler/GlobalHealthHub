export type Project = {
	id: number;
	Global: string;
	Country: string;
	City: string;
	Mission: string; // Q: Why not use an enum?   A: Because styling with Mapbox was a headache - they expect a string and it's not super dynamic, as far as I've been able to figure out
	PrimaryCollegeOrSchool: string;
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

// This holds our 3 types of missions, important for just about everything
export enum Mission {
	Education,
	Research,
	Service
}

export type MissionCount = {
	[Mission.Education]: number;
	[Mission.Research]: number;
	[Mission.Service]: number;
};

// Enum to hold viewport scale types
export enum ViewportScale {
	Global,
	Country,
	Network,
	Project
}

export type ViewportState = {
	scale: ViewportScale;
	projectID?: number;
	countryName?: string;
	networkName?: string;
};

export type ViewportData = {
	projects: Project[];
	navEvents: ViewportState[];
	navCurrent: number;
};
