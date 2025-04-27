import { createContext, useContext, useState } from 'react'

const SearchContext = createContext()

export function SearchProvider({ children }) {
	const [query, setQuery] = useState('')
	const [result, setResult] = useState(null)
	const [loading, setLoading] = useState(false)
	const [suggestions, setSuggestions] = useState([])
	const [error, setError] = useState('')

	const resetSearch = () => {
		setQuery('')
		setResult(null)
		setSuggestions([])
		setError('')
	}

	return (
		<SearchContext.Provider
			value={{
				query,
				setQuery,
				result,
				setResult,
				loading,
				setLoading,
				suggestions,
				setSuggestions,
				error,
				setError,
				resetSearch,
			}}
		>
			{children}
		</SearchContext.Provider>
	)
}

export function useSearch() {
	const context = useContext(SearchContext)
	if (!context)
		throw new Error('useSearch must be used within a SearchProvider')
	return context
}
