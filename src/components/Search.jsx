import { useState } from 'react'
import { SearchIcon, Volume2Icon, XCircleIcon } from 'lucide-react'
import { useDarkMode } from '../context/DarkModeContext'
import { useSearch } from '../context/SearchContext'
import axios from 'axios'

export default function Search() {
	const {
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
	} = useSearch()
	const { isDarkMode } = useDarkMode()
	const [inputTouched, setInputTouched] = useState(false)
	const [emptySearchError, setEmptySearchError] = useState(false)
	async function handleSearch(word = query) {
		const trimmedWord = word.trim()
		if (!trimmedWord) {
			setResult(null)
			setError('')
			setEmptySearchError(true)
			return
		}

		setLoading(true)
		setError('')
		setEmptySearchError(false)
		try {
			const res = await axios.get(
				`https://api.dictionaryapi.dev/api/v2/entries/en/${trimmedWord}`,
			)
			const data = res.data

			if (data.title === 'No Definitions Found') {
				setResult(null)
				setError('No Definitions Found')
			} else {
				setResult(data[0])
			}
		} catch (error) {
			setResult(null)
			setError('مشکلی در دریافت اطلاعات پیش آمد.')
		}
		setLoading(false)
	}

	async function fetchSuggestions(text) {
		if (text.length < 2) {
			setSuggestions([])
			return
		}
		const res = await axios.get(
			`https://api.datamuse.com/sug?s=${text}`,
		)
		const data = res.data
		setSuggestions(data.map(item => item.word))
	}

	function playAudio() {
		if (result?.phonetics[0]?.audio) {
			const audio = new Audio(result.phonetics[0].audio)
			audio.play()
		}
	}

	return (
		<div className="pt-4 w-full">
			<div className="relative">
				<input
					type="text"
					value={query}
					onChange={e => {
						setQuery(e.target.value)
						fetchSuggestions(e.target.value)
						setInputTouched(false)
					}}
					onKeyDown={e => e.key === 'Enter' && handleSearch()}
					className={`border p-2 pl-10 rounded w-full transition-all duration-300 focus:border focus:border-primary-50
            ${
							inputTouched && error
								? 'border-error'
								: 'border-gray-300'
						}`}
					placeholder="Search for any word…"
				/>

				{query ? (
					<XCircleIcon
						onClick={resetSearch}
						className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer"
						size={20}
					/>
				) : (
					<SearchIcon
						className="absolute top-2 right-2 text-gray-400"
						size={20}
					/>
				)}
			</div>

			{suggestions.length > 0 && (
				<ul
					className={`border rounded mt-2 shadow ${
						isDarkMode
							? 'bg-gray-700 text-white'
							: 'bg-white text-black'
					}`}
				>
					{suggestions.map((item, idx) => (
						<li
							key={idx}
							onClick={() => {
								setQuery(item)
								setSuggestions([])
								handleSearch(item)
							}}
							className="p-2 hover:bg-gray-200 cursor-pointer"
						>
							{item}
						</li>
					))}
				</ul>
			)}

			{loading && <p className="mt-4">در حال جستجو...</p>}

			{emptySearchError && <p>Whoops, can’t be empty...</p>}

			{error && !emptySearchError && (
				<div className="flex flex-col items-center justify-center mt-40">
					<span>😕</span>
					<h2 className="text-2xl font-semibold">{error}</h2>
					<p>
						Sorry pal, we couldn't find definitions for the word you
						were looking for. You can try the search again at later
						time or head to the web instead.
					</p>
				</div>
			)}

			{result && (
				<div
					className={`mt-4 p-4 rounded ${
						isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'
					}`}
				>
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-xl font-bold">{result.word}</h2>
							<p className="text-sm italic">{result.phonetic}</p>
						</div>
						{result.phonetics[0]?.audio && (
							<button onClick={playAudio}>
								<Volume2Icon size={24} className="text-indigo-500" />
							</button>
						)}
					</div>
					<p className="mt-4">
						{result.meanings[0]?.definitions[0]?.definition}
					</p>
				</div>
			)}
		</div>
	)
}
