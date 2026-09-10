import { useEffect, useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000').replace(/\/+$/, '')

const currentViewStorageKey = 'currentView'
const availableViews = ['login', 'home']

function restoreCurrentView() {
  // stateは再読み込みで初期化されるため、同じタブに残る画面名を初期値に使います。
  try {
    const savedView = sessionStorage.getItem(currentViewStorageKey)
    return availableViews.includes(savedView) ? savedView : 'login'
  } catch {
    return 'login'
  }
}

function App() {
  const [currentView, setCurrentView] = useState(restoreCurrentView)

  useEffect(() => {
    // 保存するのは画面名だけ。TODO: 本物の認証・セッション確認は後でNode.js側に実装する。
    try {
      sessionStorage.setItem(currentViewStorageKey, currentView)
    } catch {
      // 保存が制限された環境でも、React内の画面切り替えは継続します。
    }
  }, [currentView])

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
