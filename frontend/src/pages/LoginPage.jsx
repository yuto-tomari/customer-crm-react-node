import { useState } from 'react'
import './LoginPage.css'

function LoginPage() {
  // 項目ごとのエラーをstateに持たせ、送信時と入力時に表示を更新します。
  const [errors, setErrors] = useState({ username: false, password: false })

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const values = new FormData(form)
    const nextErrors = {
      username: !String(values.get('username') ?? '').trim(),
      password: !String(values.get('password') ?? ''),
    }
    setErrors(nextErrors)

    if (nextErrors.username || nextErrors.password) {
      form.elements.namedItem(nextErrors.username ? 'username' : 'password').focus()
      return
    }

  }

  function clearError(field) {
    setErrors((previous) => ({ ...previous, [field]: false }))
  }

  return (
    <section className="login-page" aria-labelledby="login-title">
      <h1 id="login-title">管理者ログイン</h1>

      {/* 標準の吹き出しを無効にし、React側で入力欄の下へエラーを表示します。 */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="login-field">
          <label htmlFor="login-user-id">ユーザーID</label>
          <input
            id="login-user-id"
            name="username"
            type="text"
            autoComplete="username"
            required
            aria-invalid={errors.username}
            aria-describedby={errors.username ? 'login-user-id-error' : undefined}
            onChange={() => clearError('username')}
          />
          {errors.username && (
            <p id="login-user-id-error" className="login-error" role="alert">
              <span className="login-error-mark" aria-hidden="true">●</span>
              ユーザーIDを入力してください
            </p>
          )}
        </div>

        <div className="login-field">
          <label htmlFor="login-password">パスワード</label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            aria-invalid={errors.password}
            aria-describedby={errors.password ? 'login-password-error' : undefined}
            onChange={() => clearError('password')}
          />
          {errors.password && (
            <p id="login-password-error" className="login-error" role="alert">
              <span className="login-error-mark" aria-hidden="true">●</span>
              パスワードを入力してください
            </p>
          )}
        </div>

        <button type="submit">ログイン</button>
      </form>
    </section>
  )
}

export default LoginPage
