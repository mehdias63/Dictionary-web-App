import { useState, useEffect } from 'react'
import { useDarkMode } from '../context/DarkModeContext'
import Toggle from './Toggle'
import { Moon } from 'lucide-react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

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
				<Select
					value={selectedFont}
					onValueChange={value => {
						setSelectedFont(value)
						onFontChange(value)
					}}
				>
					<SelectTrigger
						className={`w-[180px] ${
							isDarkMode
								? 'text-white bg-[#050505]'
								: 'text-primary-600'
						} p-2 rounded`}
					>
						<SelectValue placeholder="Select Font" />
					</SelectTrigger>
					<SelectContent
						className={`${
							isDarkMode
								? 'bg-[#1f1f1f] text-white shadow-[0_5px_30px_rgb(164,69,237)]'
								: 'bg-white text-black'
						}`}
					>
						<SelectItem
							value="Inter"
							className="hover:text-primary-50 cursor-pointer"
						>
							Inter
						</SelectItem>
						<SelectItem
							value="Lora"
							className="hover:text-primary-50 cursor-pointer"
						>
							Lora
						</SelectItem>
						<SelectItem
							value="Inconsolata"
							className="hover:text-primary-50 cursor-pointer"
						>
							Inconsolata
						</SelectItem>
					</SelectContent>
				</Select>

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
