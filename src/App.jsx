import Header from './components/Header'
import { DarkModeProvider } from './context/DarkModeContext'
import Search from './components/Search'
import { useState } from 'react'
import { SearchProvider } from './context/SearchContext'

function App() {
	const [font, setFont] = useState('Inter')
	return (
		<DarkModeProvider>
			<SearchProvider>
				<div
					className={`min-h-screen max-w-[46rem] flex flex-col items-center mx-auto ${font}`}
				>
					<Header onFontChange={setFont} />
					<Search />
				</div>
			</SearchProvider>
		</DarkModeProvider>
	)
}

export default App
