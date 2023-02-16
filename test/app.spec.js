import test from 'ava'

import { startTestApp } from './fixtures/app.js'

test('GET: /', async (t) => {
  const app = await startTestApp(t)
  const res = await fetch(`${app.baseUrl}/`)
  t.true(res.ok)
  const body = await res.json()
  t.snapshot(body, 'body')
})

test('GET: /livez', async (t) => {
  const app = await startTestApp(t)
  const res = await fetch(`${app.baseUrl}/livez`)
  t.true(res.ok)
  const body = await res.json()
  t.snapshot(body, 'body')
})

test('GET: /readyz', async (t) => {
  const app = await startTestApp(t)
  const res = await fetch(`${app.baseUrl}/readyz`)
  t.true(res.ok)
  const body = await res.json()
  t.snapshot(body, 'body')
})
