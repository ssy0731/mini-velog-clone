import { useEffect, useState } from 'react'
import { getPosts } from '../api/PostApi'
import PostList from '../components/PostList'
import SearchBar from '../components/SearchBar'
import { Link } from 'react-router'

function HomePage() {
  // 게시글 여러 개를 저장할 state
  const [posts, setPosts] = useState([])

  // API 요청 실패 여부를 저장할 state
  const [error, setError] = useState('')

  const fetchPosts = async (search = '') => {
    try {
      setError('')
      const response = await getPosts(search)
      setPosts(response.data)
    } catch (error) {
      console.error(error)
      setError('게시글을 불러오지 못했습니다.')
    }
  }
  useEffect(() => {
    fetchPosts()
  }, []) // []는 App 화면이 처음 나타났을 때 한 번만 요청한다는 뜻이다.

  return(
    <main>
      <h1>Mini Velog Clone</h1>

      <Link to="/posts/new">
        새 글 작성
      </Link>
      <SearchBar onSearch={fetchPosts}/>

      {error && <p>{error}</p>}

      <p>검색 결과: {posts.length}개</p>

      <PostList posts={posts} />
    </main>
  )
}

export default HomePage