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
			fontSize: {
				'heading-l': [
					'64px',
					{
						lineHeight: '77px',
						fontWeight: 'bold',
					},
				],
				'heading-m': [
					'24px',
					{
						lineHeight: '29px',
						fontWeight: '400',
					},
				],
				'heading-s': [
					'20px',
					{
						lineHeight: '24px',
						fontWeight: '400',
					},
				],
				'body-m': [
					'18px',
					{
						lineHeight: '24px',
						fontWeight: '400',
					},
				],
				'body-s': [
					'14px',
					{
						lineHeight: '17px',
						fontWeight: '400',
					},
				],
			},
		},
	},
	plugins: [],
}
