import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getPost, updatePost } from "../api/PostApi";

function PostEditPage() {
    const { postId } = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [summary, setSummary] = useState('')
    const [tags, setTags] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await getPost(postId)
                setTitle(response.data.title)
                setContent(response.data.content)
                setSummary(response.data.summary)
                setTags(response.data.tags)
            } catch (error) {
                console.error(error)
                setError('게시글을 불러오지 못했습니다.')
            }
        }
        fetchPost()
    }, [postId])

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
            const response = await updatePost(postId, postData)
            navigate(`/posts/${response.data.id}`)
        } catch (error) {
            console.error(error)
            setError('게시글 수정에 실패했습니다.')
        }
    }
    
    return (
        <main>
            <h1>글 수정</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">제목</label>
                    <input 
                        id="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)} 
                    />
                </div>

                <div>
                    <label htmlFor="summary">요약</label>
                    <input
                        id="summary"
                        value={summary}
                        onChange={(event) => setSummary(event.target.value)} 
                    />
                </div>

                <div>
                    <label htmlFor="tags">태그</label>
                    <input 
                        id="tags"
                        value={tags}
                        onChange={(event) => setTags(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="content">내용</label>
                    <input 
                        id="content"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    />
                </div>

                <button type="submit">수정 완료</button>
            </form> 
        </main>
    )
}

export default PostEditPage