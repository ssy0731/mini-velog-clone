import { useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router'
import { deletePost, getPost } from '../api/PostApi'

function PostDetailPage() {
    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleDelete = async () => {
        const isConfirmed = window.confirm(
            '정말 이 게시글을 삭제하시겠습니까?'
        )
        if (!isConfirmed) {
            return
        }
        try {
            await deletePost(postId)
            navigate(`/`)
        } catch (error) {
            console.error(error)
            setError('게시글 삭제에 실패했습니다.')
        }
    }

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
            <Link to={`/posts/${postId}/edit`}>
                수정하기
            </Link>
            <button type="button" onClick={handleDelete}>
                삭제하기
            </button>
        </main>
    )
}

export default PostDetailPage