import { useState, useEffect } from 'react'
import Toggle from './Toggle'

export default function Header() {
	const [selectedFont, setSelectedFont] = useState('Inter')

	useEffect(() => {
		document.body.style.fontFamily = selectedFont
	}, [selectedFont])

	return (
		<header className="p-4 flex justify-between items-center bg-gray-100 shadow-md">
			<h1 className="text-xl font-bold text-primary-50">
				My Project
			</h1>
			<select
				value={selectedFont}
				onChange={e => setSelectedFont(e.target.value)}
				className="p-2 rounded border border-gray-300"
			>
				<option value="Inter">Inter</option>
				<option value="Lora">Lora</option>
				<option value="Inconsolata">Inconsolata</option>
			</select>
			<div className="flex items-center gap-x-3">
				<Toggle />
				<img src="/public/assets/images/icon-moon.svg" />
			</div>
		</header>
	)
}
