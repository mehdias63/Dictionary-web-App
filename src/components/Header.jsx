import { useState, useEffect } from 'react'
import { useDarkMode } from '../context/DarkModeContext'
import Toggle from './Toggle'
import { Moon } from 'lucide-react'

export default function Header({ onFontChange }) {
	const [selectedFont, setSelectedFont] = useState('Inter')
	const { isDarkMode } = useDarkMode()

	useEffect(() => {
		document.body.style.fontFamily = selectedFont
	}, [selectedFont])

	return (
		<header className="p-4 flex justify-between items-center w-full">
			<div className="flex items-center space-x-4">
				<img src="/assets/images/logo.svg" alt="logo" />
			</div>
			<div className="flex items-center gap-x-12">
				<select
					value={selectedFont}
					onChange={e => {
						setSelectedFont(e.target.value)
						onFontChange(e.target.value)
					}}
					className={`${
						isDarkMode
							? 'text-white bg-[#050505]'
							: 'text-primary-600'
					} p-2 rounded`}
				>
					<option value="Inter">Inter</option>
					<option value="Lora">Lora</option>
					<option value="Inconsolata">Inconsolata</option>
				</select>
				<div className="flex items-center gap-x-2">
					<Toggle />
					<Moon
						className={`${
							isDarkMode ? 'text-primary-50' : 'text-primary-400'
						}`}
					/>
				</div>
			</div>
		</header>
	)
}
