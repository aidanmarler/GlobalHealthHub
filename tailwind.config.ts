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
				public: '#000000',
				nursing: '#E69F00',
				medicine: '#0072B2',
				dental: '#D55E00',
				pharmacy: '#CC79A7'
			}
		}
	},
	darkMode: 'selector',

	plugins: []
} satisfies Config;
