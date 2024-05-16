import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

import { type Config } from 'tailwindcss'

export default {
	content: [
		'{routes,islands,components}/**/*.{ts,tsx}',
	],
	plugins: [forms, typography],
} satisfies Config
