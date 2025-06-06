import { useState } from 'react'
import { SearchIcon, XCircleIcon } from 'lucide-react'
import { useDarkMode } from '../context/DarkModeContext'
import { useSearch } from '../context/SearchContext'
import axios from 'axios'
import { Input } from './ui/input'

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
		setInputTouched(true)
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
		setInputTouched(true)
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
			setError('No Definitions Found')
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
		<div className="pt-4 w-full text-primary-900 px-2">
			<div className="relative">
				<Input
					placeholder="Search for any word…"
					value={query}
					onChange={e => {
						setQuery(e.target.value)
						fetchSuggestions(e.target.value)
						setInputTouched(false)
						if (emptySearchError) setEmptySearchError(false)
						if (error) setError(false)
					}}
					onKeyDown={e => e.key === 'Enter' && handleSearch()}
					className={`placeholder:opacity-25 placeholder:text-primary-400 
						${error || emptySearchError ? 'border-error' : 'border-gray-300'}`}
				/>
				{query ? (
					<XCircleIcon
						onClick={resetSearch}
						className="absolute top-4 right-4 text-gray-400 hover:text-red-500 cursor-pointer"
						size={20}
					/>
				) : (
					<img
						src="/assets/images/icon-search.svg"
						className="absolute top-4 right-4 text-gray-400"
						alt="search"
					/>
				)}
			</div>

			{suggestions.length > 0 && (
				<ul
					className={`border rounded mt-2 shadow ${
						isDarkMode
							? 'bg-primary-500 text-white'
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
							className="p-2 hover:bg-primary-700 cursor-pointer hover:text-primary-200"
						>
							{item}
						</li>
					))}
				</ul>
			)}

			{loading && <p className="mt-4">Is Loading ....</p>}

			{emptySearchError && (
				<p className="text-heading-s mt-4 text-error">
					Whoops, can’t be empty...
				</p>
			)}

			{error && !emptySearchError && (
				<div className="flex flex-col items-center justify-center mt-40">
					<span className="text-[4rem]">😕</span>
					<h2 className="text-xl font-bold mt-8">{error}</h2>
					<p className="text-body-m mt-5 text-center text-primary-400">
						Sorry pal, we couldn't find definitions for the word you
						were looking for. You can try the search again at later
						time or head to the web instead.
					</p>
				</div>
			)}
			{result && (
				<div className="mt-4 p-4 rounded">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-[2rem] sm:text-heading-l">
								{result.word}
							</h2>
							<p className="text-body-m sm:text-heading-m text-primary-50 mt-2">
								{result.phonetic}
							</p>
						</div>
						{result.phonetics[0]?.audio && (
							<button onClick={playAudio}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="75"
									height="75"
									viewBox="0 0 75 75"
									fill="none"
									className="transition-all duration-300 hover:scale-105 cursor-pointer"
								>
									<circle
										opacity="0.25"
										cx="37.5"
										cy="37.5"
										r="37.5"
										fill="#A445ED"
										className="fill-[#A445ED] hover:fill-purple-900 transition-colors"
									/>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M29 27V48L50 37.5L29 27Z"
										fill="#A445ED"
										className="fill-[#A445ED] hover:fill-purple-900 transition-colors"
									/>
								</svg>
							</button>
						)}
					</div>

					{result.meanings.map((meaning, idx) => (
						<div key={idx} className="mt-8">
							<div className="flex items-center gap-4">
								<p className="text-lg sm:text-heading-m">
									{meaning.partOfSpeech}
								</p>
								<div className="flex-grow border-t border-primary-500" />
							</div>
							<h2 className="mt-8 text-primary-400 text-[1rem] sm:text-heading-s mb-4">
								Meaning
							</h2>

							<ul className="list-disc ml-6 mt-4 space-y-4 marker:text-primary-50 text-[0.9375rem] sm:text-body-m">
								{meaning.definitions.map((def, defIdx) => (
									<li key={defIdx}>
										{def.definition}
										{def.example && (
											<p className="text-primary-400 mt-1 text-sm mt-4">
												"{def.example}"
											</p>
										)}
									</li>
								))}
							</ul>

							{meaning.synonyms && meaning.synonyms.length > 0 && (
								<div className=" flex items-center mt-6 gap-x-5">
									<p className="text-primary-400 text-[1rem] sm:text-heading-s">
										Synonyms
									</p>
									<div className="flex flex-wrap gap-x-3">
										{meaning.synonyms
											.slice(0, 5)
											.map((syn, synIdx) => (
												<span
													key={synIdx}
													className="text-primary-50 text-sm"
												>
													{syn}
												</span>
											))}
									</div>
								</div>
							)}
						</div>
					))}

					{result.sourceUrls && (
						<div className="mt-8 border-t pt-4 border-primary-500 mb-20 sm:flex sm:gap-x-4">
							<p className="text-sm text-primary-400">Source:</p>
							<a
								href={result.sourceUrls[0]}
								target="_blank"
								rel="noreferrer"
								className="underline text-sm"
							>
								{result.sourceUrls[0]}
							</a>
						</div>
					)}
				</div>
			)}
		</div>
	)
}
