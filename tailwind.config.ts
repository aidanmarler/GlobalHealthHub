import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				eee: '#eee',
				ddd: '#ddd',
				ccc: '#ccc',
				bbb: '#bbb',
				aaa: '#aaa',
				999: '#999',
				cugold: '#CFB87C',
				education: '#92D22A',
				research: '#00AD93',
				service: '#00226B',
				public: '#CC79A7',
				nursing: '#582973',
				medicine: '#ffcc59',
				dental: '#3f1b00',
				pharmacy: '#b24400'
			},
			fontFamily: {
				sans: [
					'Roboto',
					'ui-sans-serif',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Arial',
					'sans-serif'
				]
			}
		}
	},
	darkMode: 'selector',

	plugins: []
} satisfies Config;
