<script lang="ts">
	import { currentViewportState, viewportData } from '$lib/globals/Viewport.svelte';
	import type { College } from '$lib/types';
	import CalloutStatContainer from '../components/calloutStatContainer.svelte';

	let college: College = $derived(currentViewportState.collegeName as College);

	const websites: Record<College, string> = {
		['Colorado School of Public Health']: 'https://coloradosph.cuanschutz.edu/',
		['College of Nursing']:
			'https://nursing.cuanschutz.edu/degrees-programs/global-health-locations',
		['School of Dental Medicine']: 'https://dental.cuanschutz.edu/',
		['Skaggs School of Pharmacy and Pharmaceutical Sciences']: 'https://pharmacy.cuanschutz.edu/',
		['School of Medicine']: 'https://medschool.cuanschutz.edu/medicine'
	};
</script>

<p class=" flex justify-center">
	<button
		title={websites[college]}
		onclick={() => {
			window.open(websites[college], '_blank');
		}}
		class=" rounded-full px-3 text-lg font-semibold text-blue-600 hover:underline"
	>
		See Website
		<svg
			class="inline h-6 w-6 pb-1 text-blue-600"
			xmlns="http://www.w3.org/2000/svg"
			width="24px"
			height="24px"
			viewBox="0 0 24 24"
		>
			<path
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="3"
				d="M13.5 10.5L21 3m-5 0h5v5m0 6v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"
			/>
		</svg>
	</button>
</p>

<CalloutStatContainer calloutStats={['Projects', 'Contacts', 'Countries']} />

{#if college == 'School of Medicine'}
	<p>
		The CU Department of Medicine is grounded in equity, collaboration, and innovation. Through our
		Global Health program, we build sustainable partnerships, enhance medical education, and work to
		improve healthcare delivery in underserved communities worldwide. With immersive experiences in
		Zimbabwe, Guatemala, and beyond, we empower residents, faculty, and partners to address health
		disparities with compassion and action.
	</p>
{:else if college == 'College of Nursing'}
	<br />
	<p>
		Global Health programming at the CU College of Nursing is committed to equipping and training
		transformational leaders prepared to address disparities and inequities in healthcare delivery
		in the U.S. and beyond.
	</p>
	<br />
	<ul>
		<li>Collaboration in partnership development and sustainability in project development.</li>
		<li>Sustainability in project development.</li>
		<li>Academic rigor in coursework offered.</li>
		<li>Service, practice, research, and teaching.</li>
		<li>Diversity and inclusion with regard to student/faculty involvement.</li>
		<li>Reciprocal capacity building in all project partnerships.</li>
		<li>Participate in local and peer-reviewed scholarship activities.</li>
	</ul>
{:else if college == 'Colorado School of Public Health'}
	<p></p>
{:else if college == 'School of Dental Medicine'}
	<p></p>
{:else if college == 'Skaggs School of Pharmacy and Pharmaceutical Sciences'}
	<p>
		Originally established in 1911 as a department of the School of Medicine at the University of
		Colorado at Boulder, the School of Pharmacy opened its doors with two students and one faculty
		member. The school became an independent college in 1913, the same year it awarded its first
		degree, and CU Pharmacy became a school in 1957. The school held its first classes at the former
		Health Sciences Center campus in 1992. In 2008, the school moved to the CU Anschutz Medical
		Campus, a comprehensive health center where teaching, research, and health care combine.
	</p>
	<br /><br />
	<p>
		During its 110-plus year history, the School of Pharmacy has been a global leader in medical
		discoveries, patient care, pharmacy advocacy, and education. CU School of Pharmacy is ranked #15
		of all pharmacy schools in the nation, producing graduates that exceed national student outcomes
		and enjoy stellar career opportunities. The School is nationally recognized for its leadership
		in pharmacy professional education and its strong commitment to developing and sustaining an
		exceptional faculty, staff, and student body. It has long been a leader in NIH funding among
		pharmacy schools and CU Pharmacy faculty have consistently advanced science and health care
		through programs and discoveries with global impact.
	</p>
	<br /><br />
	<ul>
		<li>
			SSPPS Mission: We are committed to excellence and innovation in professional, graduate, and
			post-graduate education; scholarship and research; patient-centered care; public health
			advocacy; and societal leadership and engagement.
		</li>
		<li>
			SSPPS Vision: Together, our innovation, discoveries and engagement with our communities
			improve the health and well-being of society.
		</li>
	</ul>
	<br /><br />
	<p>
		<a
			href="https://pharmacy.cuanschutz.edu/about-us/dept-clinical-pharmacy"
			target="_blank"
			class="font-semibold text-blue-600 hover:underline"
		>
			Department of Clinical Pharmacy
		</a>
	</p>
	<p>
		In addition to teaching the next generation of pharmacists and providing exemplary patient care,
		faculty in the Department of Clinical Pharmacy (DOCP) are also highly engaged in research
		designed to enhance the safe and effective use of drugs and to assess patient outcomes
		associated with medication use. DOCP faculty conduct clinical research across a wide range of
		therapeutic areas including oncology, neurology, diabetes, cardiovascular diseases, geriatric
		medicine, critical care, infectious diseases, and others. The department also has a Center for
		Pharmaceutical Outcomes Research to enhance research in areas such as pharmacoeconomics and
		cost-effectiveness analysis, pharmacoepidemiology, health policy research, and pharmacy benefits
		design.
	</p>
	<br /><br />
	<p>
		<a
			href="https://pharmacy.cuanschutz.edu/pharmaceutical-sciences"
			target="_blank"
			class="font-semibold text-blue-600 hover:underline"
		>
			Department of Pharmaceutical Sciences
		</a>
	</p>
	<p>
		The Department of Pharmaceutical Sciences is a research-intensive department. Our research
		comprises a unique blend of basic and translational science with an emphasis on drug discovery,
		development, and delivery. Our faculty address real world problems with a direct impact – such
		as developing first in class inhibitors for colorectal cancer, tracking the ability of the SARS
		CoV2 spike protein to evade antibody response, and addressing toxicity in populations exposed to
		synthetic PFAS contaminants. To support our interdisciplinary brand of science, we host multiple
		centers and core facilities, and constantly invest in new and emerging technologies. For
		example, as part of our new Center for Drug Discovery, we recently installed high throughput
		screening and imaging robotics, which represent the only example of its kind between the Coasts
		and a once in a decade investment. As with our other centers and cores, this instrumentation is
		available to the Anschutz Campus, the state of Colorado, and the greater Rocky Mountain region.
		We also maintain multiple PhD programs, and an MS program with specialty tracks and an online
		option. Collectively, our researchers, faculty and staff are committed to diversity,
		inclusivity, and sense of community in our quest for transformational science.
	</p>
{/if}
