import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('接続確認中...')

  useEffect(() => {
    fetch('http://localhost:3000/api/health')
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message)
      })
      .catch(() => {
        setMessage('API接続失敗')
      })
  }, [])

  return (
    <main>
      <h1>顧客管理Webアプリ Ver.2</h1>
      <p>{message}</p>
    </main>
  )
}

export default App