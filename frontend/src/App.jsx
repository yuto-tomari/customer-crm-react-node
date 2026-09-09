import { useEffect, useState } from 'react'
import './App.css'

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000').replace(/\/+$/, '')

function App() {
  const [message, setMessage] = useState('接続確認中...')

  useEffect(() => {
    fetch(apiBaseUrl + '/api/health')
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