import { useState } from 'react'

function SearchBar({ onSearch }) {
    const [search, setSearch] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('검색어:', search)
        onSearch(search.trim())
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="검색어를 입력하세요"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />

            <button type="submit">
                검색
            </button>
        </form>
    )   
}

export default SearchBar