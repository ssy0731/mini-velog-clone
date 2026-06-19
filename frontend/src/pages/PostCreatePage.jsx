import { useState } from 'react'
import { useNavigate } from 'react-router'
import { createPost } from '../api/PostApi'

function PostCreatePage() {
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [summary, setSummary] = useState('')
    const [tags, setTags] = useState('')

    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!title.trim() || !content.trim()) {
            setError('제목과 내용은 필수입니다.')
            return
        }
        try {
            setError('')
            const postData = {
                title: title.trim(),
                content: content.trim(),
                summary: summary.trim(),
                tags: tags.trim(),
            }
            const response = await createPost(postData)

            navigate(`/posts/${response.data.id}`)
        } catch (error) {
            console.error(error)
            setError('게시글 작성에 실패했습니다.')
        }
    }
    return (
        <main>
            <h1>새 글 작성</h1>
            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">제목</label>
                    <input 
                    id="title"
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder='제목을 입력하세요'
                    />
                </div>

                <div>
                    <label htmlFor="summary">요약</label>
                    <input
                    id="summary" 
                    type="text" 
                    value={summary}
                    onChange={(event) => setSummary(event.target.value)}
                    placeholder='목록에 보여줄 짧은 요약'
                    />
                </div>

                <div>
                    <label htmlFor="tags">태그</label>
                    <input 
                    id="tags"
                    type="text" 
                    value={tags}
                    onChange={(event) => setTags(event.target.value)}
                    placeholder='태그를 단어로 입력하기'
                    />
                </div>

                <div>
                    <label htmlFor="content">내용</label>
                    <input 
                    id="tags"
                    type="text"
                    value={content}
                    onChange={(evnet) => setContent(event.target.value)}
                    placeholder='내용을 입력하세요'
                    />
                </div>

                <button type='submit'>
                    작성 완료
                </button>
            </form>
        </main>
    )
}

export default PostCreatePage