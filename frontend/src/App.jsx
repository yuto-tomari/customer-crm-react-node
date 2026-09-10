import { useEffect } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000').replace(/\/+$/, '')

function App() {
  useEffect(() => {
    // 接続確認は残し、結果はログイン画面ではなく開発者用コンソールで確認します。
    fetch(apiBaseUrl + '/api/health')
      .then((response) => response.json())
      .then((data) => {
        console.debug('API health:', data.status)
      })
      .catch(() => {
        console.debug('API接続失敗')
      })
  }, [])

  return (
    <main className="login-screen">
      <LoginPage />
    </main>
  )
}

export default App
