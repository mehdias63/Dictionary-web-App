import * as React from 'react'

import { cn } from '@/lib/utils'

const Input = React.forwardRef(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-10 w-full rounded-lg border border-input bg-primary-200 p-6 text-lg text-primary-900 transition-all placeholder:text-[1.25rem] placeholder:opacity-25 placeholder:text-primary-400 focus:ring-0 focus:outline-none focus:border focus:border-primary-50 mt-4',
					className,
				)}
				ref={ref}
				{...props}
			/>
		)
	},
)
Input.displayName = 'Input'

export { Input }
