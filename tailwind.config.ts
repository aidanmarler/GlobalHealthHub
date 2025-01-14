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
			}
		}
	},
	darkMode: 'selector',

	plugins: []
} satisfies Config;
