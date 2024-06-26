import type { CSSProperties, PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

interface IBadge {
	className?: string
	variant?: string
	style?: CSSProperties
}

const badge = tv({
	base: 'rounded-lg w-max py-1 px-2 text-xs font-semibold text-xs text-white transition',
	variants: {
		backgroundColor: {
			gray: 'bg-gray-500/20',
			high: 'bg-red-400/60',
			medium: 'bg-orange-400/70',
			low: 'bg-blue-400/70',
			backlog: 'bg-primary-purple-400/70',
			to_do:'bg-orange-400/70',
			in_progress: 'bg-yellow-400/70',
			done: 'bg-green-400/70',
			blocked:'bg-red-400/70',
			feedback:'bg-blue-400/70',
			1:'bg-green-400/70',
			2:'bg-yellow-400/70',
			3:'bg-orange-400/70',
			4:'bg-red-400/70',
			planned:'bg-yellow-400/70',
			active:'bg-orange-400/70',
			completed:'bg-green-400/70'
		}
	},
	defaultVariants: {
		backgroundColor: 'gray'
	}
})

export function Badge({
	children,
	className,
	variant,
	style
}: PropsWithChildren<IBadge>) {
	return (
		<span
			className={badge({
				backgroundColor: variant as 'low' | 'high' | 'medium',
				className
			})}
			style={style}
		>
			{children}
		</span>
	)
}
