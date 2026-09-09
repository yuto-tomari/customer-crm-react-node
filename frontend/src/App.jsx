import { useEffect, useState } from 'react'
import './App.css'
import AppHeader from './components/AppHeader'
import ApiStatus from './components/ApiStatus'

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
      <AppHeader />
      <ApiStatus message={message} />
    </main>
  )
}

export default App