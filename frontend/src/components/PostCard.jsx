import { Link } from 'react-router'

function PostCard({ post }) {
    return (
        <article>
            <h3>
                <Link to={`/posts/${post.id}`}>
                    <h3>{post.title}</h3>
                </Link>
            </h3>

            {post.summary && (
                <p>{post.summary}</p>
            )}

            <p>태그: {post.tags || '태그 없음'}</p>

            <small>작성일: {post.created_at}</small>
        </article>
    )
}

export default PostCard