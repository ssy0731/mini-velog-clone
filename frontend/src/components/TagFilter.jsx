import { useState } from "react"

function TagFilter({ onTagSearch }) {
    const [tag, setTag] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        onTagSearch(tag.trim())
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={tag}
                onChange={(event) => setTag(event.target.value)}
                placeholder="태그 검색 예: react"
            />

            <button type="submit">
                태그 검색
            </button>
        </form>
    )
}

export default TagFilter