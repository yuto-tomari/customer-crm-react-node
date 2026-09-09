const express = require('express')
const cors = require('cors')

function createApp({ corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173' } = {}) {
  const app = express()

  app.use(cors({ origin: [corsOrigin] }))
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

  return app
}

module.exports = { createApp }
