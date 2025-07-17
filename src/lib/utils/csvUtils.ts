import type { College, Mission, Project } from '$lib/types';
import Papa from 'papaparse';

async function parseCSV(filePath: string) {
	return new Promise<unknown[]>((resolve, reject) => {
		Papa.parse(filePath, {
			download: true,
			header: true,
			complete: (result) => {
				resolve(result.data);
			},
			error: (error) => {
				reject(error);
			}
		});
	});
}

/*
export async function parseProjectsCSV_old(path: string): Promise<Project[]> {
	const parsedData = await parseCSV(path);

	const rows = parsedData as Record<string, string>[]; // All values are strings initially

	// Map CSV data to `Project` type
	const projects_old: Project_old[] = rows.map((row) => ({
		id: parseInt(row.id, 10),
		Global: row.Global,
		Country: row.Country,
		City: row.City,
		Mission: row.Mission as Mission,
		PrimaryCollegeOrSchool: row.PrimaryCollegeOrSchool as College,
		PrimaryDepartmentOrCenter: row.PrimaryDepartmentOrCenter,
		ContactName: row.ContactName,
		ContactEmail: row.ContactEmail,
		ContactPosition: row.ContactPosition,
		ProjectAcronym: row.ProjectAcronym,
		ProjectTitle: row.ProjectTitle,
		ProjectWebsite: row.ProjectWebsite,
		InternationalNetwork: row.InternationalNetwork,
		InternationalInstitution: row.InternationalInstitution,
		PrimaryFundingAgency: row.PrimaryFundingAgency,
		IRB: row.IRB === 'true',
		LOA: row.LOA === 'true',
		DTA: row.DTA === 'true',
		MOU: row.MOU === 'true',
		MTA: row.MTA === 'true',
		OtherAgreementType: row.OtherAgreementType,
		NumStudentsTraveled: row.NumStudentsTraveled,
		NumResidentsTraineesTraveled: parseInt(row.NumResidentsTraineesTraveled, 10),
		NumFacultyInvolved: parseInt(row.NumFacultyInvolved, 10),
		StartYear: parseInt(row.StartYear, 10),
		EndYear: parseInt(row.EndYear, 10),
		Description: row.Description,
		Location: row.Location,
		latitude: parseFloat(row.latitude),
		longitude: parseFloat(row.longitude)
	}));

	return projects_old;
}
*/

export async function parseProjectsCSV(path: string): Promise<Project[]> {
	const parsedData = await parseCSV(path);

	const rows = parsedData as Record<string, string>[]; // All values are strings initially

	console.log(rows)

	// Map CSV data to `Project` type
	const projects: Project[] = rows.map((row) => ({
		id: row.id,
		ProjectTitle: row.ProjectTitle,
		Country: row.Country,
		City: row.City,
		Lat: parseFloat(row.Lat),
		Lng: parseFloat(row.Lng),
		Mission: row.Mission as Mission,
		PrimaryCollegeOrSchool: row.PrimaryCollegeOrSchool as College,
		PrimaryDepartmentOrCenter: row.PrimaryDepartmentOrCenter,
		PrimaryContactName: row.PrimaryContactName,
		PrimaryContactEmail: row.PrimaryContactEmail,
		PrimaryContactPosition: row.PrimaryContactPosition as "Faculty" | "Staff" | "Student",
		OtherContactsNames: row.OtherContactsNames.split(',').map((name) => name.trim()),
		OtherContactsEmails: row.OtherContactsEmails.split(',').map((email) => email.trim()),
		ProjectAcronym: row.ProjectAcronym,
		ProjectWebsite: row.ProjectWebsite,
		InternationalNetwork: row.InternationalNetwork,
		InternationalInstitution: row.InternationalInstitution,
		PrimaryFundingAgency: row.PrimaryFundingAgency,
		IRB: row.IRB === 'true',
		LOA: row.LOA === 'true',
		DTA: row.DTA === 'true',
		MOU: row.MOU === 'true',
		MTA: row.MTA === 'true',
		OtherAgreementType: row.OtherAgreementType,
		NumStudentsTraveled: parseInt(row.NumStudentsTraveled, 10),
		NumResidentsTraineesTraveled: parseInt(row.NumResidentsTraineesTraveled, 10),
		NumFacultyInvolved: parseInt(row.NumFacultyInvolved, 10),
		OpportunityForParticipation: row.OpportunityForParticipation === 'true',
		OpportunityTimeCommitment: row.OpportunityTimeCommitment,
		OpportunityPaid: row.OpportunityPaid === 'true',
		StartYear: parseInt(row.StartYear, 10),
		EndYear: parseInt(row.EndYear, 10),
		Description: row.Description,
		Notes: row.Notes
	}));

	return projects;
}