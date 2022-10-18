/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: colors.blue,
				secondary: colors.pink,
			},
			fontFamily: {
				sans: ["'InterVariable'", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
	darkMode: 'class',
};
