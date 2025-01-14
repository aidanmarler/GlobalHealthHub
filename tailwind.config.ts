import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				cgh_border_grey: '#eee'
			}
		}
	},
	darkMode: 'selector',

	plugins: []
} satisfies Config;
