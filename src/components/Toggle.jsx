import { Switch } from '@headlessui/react'
import { useDarkMode } from '../context/DarkModeContext'

function Toggle() {
	const { isDarkMode, toggleDarkMode } = useDarkMode()

	return (
		<Switch
			checked={isDarkMode}
			onChange={toggleDarkMode}
			className={`${
				isDarkMode ? 'bg-[#A445ED]' : 'bg-[#757575]'
			} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
		>
			<span
				className={`${
					isDarkMode ? 'translate-x-6' : 'translate-x-1'
				} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
			/>
		</Switch>
	)
}

export default Toggle
