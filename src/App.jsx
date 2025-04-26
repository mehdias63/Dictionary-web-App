import Header from './components/Header'
import { DarkModeProvider } from './components/DarkMode'

function App() {
	return (
		<DarkModeProvider>
			<Header />
		</DarkModeProvider>
	)
}

export default App
