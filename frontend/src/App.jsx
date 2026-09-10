import { useEffect, useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000').replace(/\/+$/, '')

function App() {
  const [currentView, setCurrentView] = useState('login')

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

  if (currentView === 'home') {
    return <HomePage />
  }

  return (
    <main className="login-screen">
      <LoginPage onLogin={() => setCurrentView('home')} />
    </main>
  )
}

export default App
