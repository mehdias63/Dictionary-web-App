/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
	return ({ opacityValue }) => {
		if (opacityValue !== undefined) {
			return `rgba(var(${variableName}), ${opacityValue})`
		}
		return `rgb(var(${variableName}))`
	}
}

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					900: withOpacity('--color-primary-900'),
					800: withOpacity('--color-primary-800'),
					700: withOpacity('--color-primary-700'),
					600: withOpacity('--color-primary-600'),
					500: withOpacity('--color-primary-500'),
					400: withOpacity('--color-primary-400'),
					300: withOpacity('--color-primary-300'),
					200: withOpacity('--color-primary-200'),
					100: withOpacity('--color-primary-100'),
					50: withOpacity('--color-primary-50'),
				},
				error: withOpacity('--color-error'),
			},
		},
	},
	plugins: [],
}
