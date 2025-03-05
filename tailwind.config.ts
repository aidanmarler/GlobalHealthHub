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
				education: '#8BC553',
				research: '#00AF78',
				service: '#3A6B3C',
				public: '#CC79A7',
				nursing: '#582973',
				medicine: '#ffcc59',
				dental: '#3f1b00',
				pharmacy: '#b24400'
			}
		}
	},
	darkMode: 'selector',

	plugins: []
} satisfies Config;
