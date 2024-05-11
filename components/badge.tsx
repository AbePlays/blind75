import { h } from 'preact'

export type BadgeProps = {
	variant: 'easy' | 'medium' | 'hard'
} & h.JSX.HTMLAttributes<HTMLSpanElement>

function getVariant(variant: BadgeProps['variant']) {
	const variantClasses = {
		easy:
			'bg-green-100 text-green-800 border border-green-300 dark:border-green-800 dark:bg-green-700 dark:text-green-200',
		medium:
			'bg-yellow-100 text-yellow-800 border border-yellow-300 dark:border-yellow-800 dark:bg-yellow-700 dark:text-yellow-200',
		hard: 'bg-red-100 text-red-800 border border-red-300 dark:border-red-800 dark:bg-red-700 dark:text-red-200',
	}

	return variantClasses[variant]
}

export default function Badge(props: BadgeProps) {
	const { className, variant, ...rest } = props

	return (
		<span
			class={`inline-flex items-center px-2.5 py-0.5 rounded-xl text-xs font-medium ${
				getVariant(variant)
			} ${className}`}
			{...rest}
		/>
	)
}
