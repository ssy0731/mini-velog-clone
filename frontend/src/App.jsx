import { Routes, Route } from 'react-router'

import HomePage from './pages/HomePage'
import PostDetailPage from './pages/PostDetailPage'
import PostCreatePage from './pages/PostCreatePage'
import PostEditPage from './pages/PostEditPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/posts/:postId" element={<PostDetailPage/>}/>
      <Route path="/posts/new" element={<PostCreatePage/>}/>
      <Route path="/posts/:postId/edit" element={<PostEditPage/>}/>
    </Routes>
  )
}

export default App