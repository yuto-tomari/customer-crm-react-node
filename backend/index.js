const express = require('express')
const cors = require('cors')
const { google } = require('googleapis')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3000
const hasGoogleOAuthConfig =
  Boolean(process.env.GOOGLE_CLIENT_ID) &&
  Boolean(process.env.GOOGLE_CLIENT_SECRET) &&
  Boolean(process.env.GOOGLE_REDIRECT_URI)
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
)

const TOKEN_PATH = path.join(__dirname, 'google-token.json')

console.log(
  `Google OAuth config: ${hasGoogleOAuthConfig ? 'OK' : 'NG'}`
)

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('顧客管理Webアプリ Ver.2 API')
})

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API接続成功',
  })
})

app.get('/auth/google', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/drive.file',
    ],
  })

  res.redirect(authUrl)
})

app.get('/oauth2callback', async (req, res) => {
  try {
    const { code } = req.query

    if (!code) {
      return res.status(400).send('認証コードがありません')
    }

    const { tokens } = await oauth2Client.getToken(code)

    oauth2Client.setCredentials(tokens)

    if (tokens.refresh_token) {
      fs.writeFileSync(
        TOKEN_PATH,
        JSON.stringify(
          { refresh_token: tokens.refresh_token },
          null,
          2
        )
      )
    }

    console.log(
      `Google OAuth access token: ${tokens.access_token ? 'OK' : 'NG'}`
    )

    console.log(
      `Google OAuth refresh token: ${tokens.refresh_token ? 'OK' : 'なし'}`
    )

    res.send('Google OAuth 認証成功')
  } catch (error) {
    console.error('Google OAuth callback error:', error.message)

    res.status(500).send('Google OAuth 認証失敗')
  }
})

app.listen(PORT, () => {
  console.log(`API server: http://localhost:${PORT}`)
})