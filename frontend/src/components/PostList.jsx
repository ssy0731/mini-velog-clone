import PostCard from "./PostCard"

function PostList({ posts }) {
    console.log('PostList가 받은 posts:', posts)
    return (
        <section>
            <h2>게시글 목록</h2>

            {/* 게시글이 없을 때 보여줄 문구 */}
            {posts.length === 0 && (
                <p>게시글이 없습니다.</p>
            )}
            
            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                />
            ))}
        </section>
    )
}

export default PostList