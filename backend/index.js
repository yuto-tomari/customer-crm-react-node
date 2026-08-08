const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('顧客管理Webアプリ Ver.2 API')
})

app.listen(PORT, () => {
  console.log(`API server: http://localhost:${PORT}`)
})