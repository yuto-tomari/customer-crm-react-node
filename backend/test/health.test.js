const { test } = require('node:test')
const assert = require('node:assert/strict')
const { once } = require('node:events')
const { createApp } = require('../app')

async function startApp(t, options) {
  const server = createApp(options).listen(0, '127.0.0.1')
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve())
    server.closeAllConnections()
  }))
  await once(server, 'listening')
  return `http://127.0.0.1:${server.address().port}`
}

test('health returns HTTP 200 and the Japanese message', async (t) => {
  const baseUrl = await startApp(t)
  const response = await fetch(`${baseUrl}/api/health`)
  assert.equal(response.status, 200)
  assert.match(response.headers.get('content-type'), /application\/json/)
  assert.deepEqual(await response.json(), {
    status: 'ok',
    message: 'API接続成功',
  })
})

test('CORS permits the configured frontend origin', async (t) => {
  const origin = 'http://localhost:5517'
  const baseUrl = await startApp(t, { corsOrigin: origin })
  const response = await fetch(`${baseUrl}/api/health`, {
    headers: { Origin: origin },
  })
  assert.equal(response.headers.get('access-control-allow-origin'), origin)
})

test('CORS does not permit a different origin', async (t) => {
  const baseUrl = await startApp(t, { corsOrigin: 'http://localhost:5173' })
  const response = await fetch(`${baseUrl}/api/health`, {
    headers: { Origin: 'https://untrusted.example' },
  })
  assert.equal(response.headers.get('access-control-allow-origin'), null)
})
