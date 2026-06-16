import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState('')
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/')
      .then((response) => {
        setMessage(response.data.message)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  return (
    <div>
      <h1>Mini Velog Clone</h1>
      <p>React 화면이 실행 중입니다.</p>
      <p>FastAPI 응답: {message}</p>
    </div>
  )
}

export default App
