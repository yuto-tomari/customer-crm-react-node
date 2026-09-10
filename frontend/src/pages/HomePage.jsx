import { useEffect, useState } from 'react'
import './HomePage.css'

const menus = [
  { id: 'new', title: '新規顧客登録', description: '新しく登録する', icon: 'new' },
  { id: 'regular', title: '常連顧客更新', description: '情報を更新する', icon: 'regular' },
  { id: 'search', title: '顧客検索', description: 'お客様を検索する', icon: 'search' },
  { id: 'summary', title: 'サマリー', description: '状況を確認する', icon: 'summary' },
]

const statistics = [
  ['顧客数', '登録済みのお客様', 'customers', '名'],
  ['今月売上', '今月の売上', 'yen', '¥'],
  ['今月誕生日', '今月お誕生日のお客様', 'birthday', '名'],
  ['今月登録', '今月の新規登録', 'registered', '名'],
]

const todos = [
  ['写真未登録', '写真を登録しましょう', 'photo'],
  ['誕生日未登録', '誕生日を登録しましょう', 'calendar'],
  ['メモ未登録', '接客メモを残しましょう', 'memo'],
  ['特徴未登録', '特徴を登録しましょう', 'tag'],
]

// 同じ線画アイコンをカードとナビで共有し、見た目を揃えます。
function HomeIcon({ name }) {
  const paths = {
    checklist: 'M9 5h12M9 12h12M9 19h12M2 5l2 2 3-4M2 12l2 2 3-4M2 19l2 2 3-4',
    recent: 'M12 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M1 21v-2a7 7 0 0 1 10-6M23 17a5 5 0 1 1-10 0 5 5 0 0 1 10 0M18 14v3l2 1',
    customers: 'M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0M7 20v-1a5 5 0 0 1 10 0v1M7 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0M1.5 19v-1a4 4 0 0 1 4-4M21 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0M22.5 19v-1a4 4 0 0 0-4-4',
    yen: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M8.5 7.5 12 12l3.5-4.5M8.5 13h7M8.5 16h7M12 12v6',
    birthday: 'M12 2.5c1 1 1.4 1.8 1.4 2.6A1.4 1.4 0 0 1 12 6.5a1.4 1.4 0 0 1-1.4-1.4c0-.8.4-1.6 1.4-2.6zM12 6.5V9M5 12h14M7 8h10a2 2 0 0 1 2 2v2H5v-2a2 2 0 0 1 2-2zM5 12v7h14v-7M5 15c2 2 4-2 7 0s5-2 7 0',
    new: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M2 21v-2a7 7 0 0 1 12-5M19 13v8M15 17h8',
    regular: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M2 21v-2a7 7 0 0 1 10-6M15 14a4 4 0 1 1-1 5M15 10v4h4',
    search: 'M20 20l-5-5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0',
    summary: 'M4 3v18h17M8 16v-5M13 16V7M18 16V4',
    photo: 'M3 3h18v18H3zM3 17l6-6 4 4 3-3 5 5M8 7h.01',
    calendar: 'M4 5h16v16H4zM4 10h16M8 3v4M16 3v4',
    memo: 'M5 3h14v18H5zM8 8h8M8 12h8M8 16h5',
    tag: 'M3 3h8l10 10-8 8L3 11zM7 7h.01',
    home: 'M3 10l9-7 9 7M5 9v12h5v-7h4v7h5V9',
    bell: 'M5 17h14l-2-3V9a5 5 0 0 0-10 0v5zM10 21h4',
    menu: 'M3 5h18M3 12h18M3 19h18',
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  )
}

function HomePage() {
  const [currentMonth, setCurrentMonth] = useState(() => new Date().getMonth() + 1)

  useEffect(() => {
    // 月を固定せず、開いたままの月替わりやタブ復帰でも見出しを更新します。
    const updateMonth = () => setCurrentMonth(new Date().getMonth() + 1)
    const timer = window.setInterval(updateMonth, 60_000)
    document.addEventListener('visibilitychange', updateMonth)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', updateMonth)
    }
  }, [])

  return (
    <main className="home-screen">
      <div className="home-container">
        <header className="home-header">
          <div className="home-brand">
            <span className="home-brand-logo" aria-hidden="true" />
            <div>
              <div className="home-brand-title-row">
                <h1>顧客管理</h1>
                <span className="home-brand-version">Ver.2</span>
              </div>
              <p>顧客情報を、もっとスマートに。</p>
            </div>
          </div>
          <div className="home-header-actions">
            <button type="button" disabled><HomeIcon name="bell" /><span>お知らせ</span></button>
            <button type="button" disabled><HomeIcon name="menu" /><span>メニュー</span></button>
          </div>
        </header>

        <section className="home-overview" aria-label="ホーム概要">
          <div className="home-welcome">
            <h2 tabIndex={-1} ref={(element) => element?.focus()}>おかえりなさい！</h2>
            <p>今日も素敵な一日になりますように。</p>
          </div>
          <div className="home-summary-card">
            <h2>Geminiサマリー <span className="home-badge">NEW</span></h2>
            <p>集計データはまだありません。</p>
          </div>
        </section>

        {/* 各機能は表示のみ。遷移先ができるまでは操作を無効にします。 */}
        <section className="home-action-grid" aria-label="メインメニュー">
          {menus.map((menu) => (
            <button key={menu.id} type="button" className={`home-action-card home-action-card--${menu.id}`} disabled>
              <span className="home-action-heading">
                <span className="home-action-icon"><HomeIcon name={menu.icon} /></span>
                <span>{menu.title}</span>
              </span>
              <span className="home-action-description">{menu.description}</span>
            </button>
          ))}
        </section>

        {/* API未接続の数値を0件と断定せず、未取得を表す「—」で表示します。 */}
        <section className="home-stats" aria-label="店舗の集計">
          {/* 1枚のカード内に指標を並べ、ラベル・値・単位を分けて管理します。 */}
          <dl className="home-stats-grid">
            {statistics.map(([title, description, icon, unit]) => (
              <div className="home-stat" key={title}>
                <dt className="home-stat-label">
                  <span className={`home-stat-icon home-stat-icon--${icon}`} aria-hidden="true">
                    {icon === 'registered' ? 'NEW' : <HomeIcon name={icon} />}
                  </span>
                  <span>{icon === 'yen' ? `${currentMonth}月売上` : title}</span>
                </dt>
                <dd className="home-stat-value">
                  {unit === '¥' && <span className="home-stat-unit home-stat-unit--prefix">{unit}</span>}
                  <span aria-label="未取得">—</span>
                  {unit !== '¥' && <span className="home-stat-unit">{unit}</span>}
                </dd>
                <dd className="home-stat-description">{description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="home-section" aria-labelledby="home-todo-title">
          <div className="home-section-heading">
            <h2 id="home-todo-title"><HomeIcon name="checklist" /><span>やることリスト</span></h2>
            <button type="button" disabled>すべて見る</button>
          </div>
          <div className="home-todo-grid">
            {todos.map(([title, description, icon]) => (
              <div className="home-todo-card" key={title}>
                <div className="home-todo-card-heading">
                  <span className="home-todo-icon"><HomeIcon name={icon} /></span>
                  <h3>{title}</h3>
                </div>
                <div className="home-todo-value"><strong aria-label="未取得">—</strong><span className="home-todo-unit">名</span></div>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="home-recent-grid">
          {[['最近追加したお客様', 'new'], ['最近見たお客様', 'recent']].map(([title, icon]) => (
            <section key={title} className="home-section">
              <div className="home-section-heading">
                <h2><HomeIcon name={icon} />{title}</h2>
                <button type="button" disabled>すべて見る</button>
              </div>
              <p className="home-empty">表示する顧客情報はまだありません。</p>
            </section>
          ))}
        </div>
      </div>

      <nav className="home-bottom-nav" aria-label="メインナビゲーション">
        {[['ホーム', 'home'], ['来店登録', 'new'], ['顧客検索', 'search'], ['サマリー', 'summary']].map(([title, icon], index) => (
          <button key={title} type="button" aria-current={index === 0 ? 'page' : undefined} disabled>
            <HomeIcon name={icon} /><span>{title}</span>
          </button>
        ))}
      </nav>
    </main>
  )
}

export default HomePage
