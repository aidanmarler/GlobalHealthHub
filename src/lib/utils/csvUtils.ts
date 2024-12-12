import type { Project } from '$lib/types';
import Papa from 'papaparse';

async function parseCSV(filePath: string) {
	return new Promise<any[]>((resolve, reject) => {
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

export async function parseProjectsCSV(path: string): Promise<Project[]> {
	const parsedData = await parseCSV(path);

	const rows = parsedData as Record<string, string>[]; // All values are strings initially

	// Map CSV data to `Project` type
	const projects: Project[] = rows.map((row) => ({
		id: parseInt(row.id, 10),
		Global: row.Global,
		Country: row.Country,
		City: row.City,
		Mission: row.Mission,
		PrimaryCollegeOrSchool: row.PrimaryCollegeOrSchool,
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

	return projects;
}
