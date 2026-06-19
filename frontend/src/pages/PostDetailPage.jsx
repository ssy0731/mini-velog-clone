import { useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { getPost } from '../api/PostApi'

function PostDetailPage() {
    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setError('')
                const response = await getPost(postId)
                setPost(response.data)
            } catch (error) {
                console.error(error)
                setError('게시글을 불러오지 못했습니다.')
            }
        }

        fetchPost()
    }, [postId])

    // 데이터가 아직 도착하지 않은 동안 보여줄 화면
    if (!post && !error) {
        return <p>게시글을 불러오는 중입니다.</p>
    }

    // 에러가 있을 때 보여줄 화면
    if (error) {
        return <p>{error}</p>
    }

    return (
        <main>
            <h1>{post.title}</h1>
            {post.summary && (
                <p>{post.summary}</p>
            )}
            <p>{post.content}</p>
            <p>태그: {post.tags || '태그 없음'}</p>
            <small>작성일: {post.created_at}</small>
        </main>
    )
}

export default PostDetailPage