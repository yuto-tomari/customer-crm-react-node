import './LoginPage.css'

function LoginPage() {
  function handleSubmit(event) {
    // 認証APIは未実装のため、フォーム送信による画面遷移だけを防ぎます。
    event.preventDefault()
  }

  return (
    <section className="login-page" aria-labelledby="login-title">
      <h1 id="login-title">管理者ログイン</h1>

      <form onSubmit={handleSubmit}>
        <div className="login-field">
          <label htmlFor="login-user-id">ユーザーID</label>
          <input
            id="login-user-id"
            name="username"
            type="text"
            autoComplete="username"
            required
          />
        </div>

        <div className="login-field">
          <label htmlFor="login-password">パスワード</label>
          {/* 入力内容を伏せ字にし、認証用のパスワード欄であることをブラウザーへ伝えます。 */}
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>

        <button type="submit">ログイン</button>
      </form>
    </section>
  )
}

export default LoginPage
