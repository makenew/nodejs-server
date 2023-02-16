import { createServer } from 'node:http'

import getPort from '@ava/get-port'
import test from 'ava'

import { Daemon } from './daemon.js'
import { createLogger } from './logger.js'

test.beforeEach((t) => {
  t.context.createDaemon = async (t, options = {}) => {
    const port = await getPort()
    const server = createServer()
    const logger = createLogger({ t })
    return new Daemon(server, { logger, port, ...options })
  }
})

test('Daemon: constructor', (t) => {
  const server = createServer()
  const logger = createLogger({ t })
  const daemon = new Daemon(server, { logger })
  t.truthy(daemon.start, 'has start')
  t.truthy(daemon.start, 'has stop')
  t.is(daemon.port, 80, 'has port')
})

test('Daemon: selects port', async (t) => {
  const daemon = await t.context.createDaemon(t, { port: 8080 })
  t.is(daemon.port, 8080, 'origin uses selected port')
})

test('Daemon: starts and stops', async (t) => {
  const daemon = await t.context.createDaemon(t)
  t.is(daemon.isStarted, false)
  t.is(daemon.isStopped, true)
  await daemon.start()
  t.is(daemon.isStarted, true)
  t.is(daemon.isStopped, false)
  await daemon.stop()
  t.is(daemon.isStarted, false)
  t.is(daemon.isStopped, true)
})

test('Daemon: will not start if already started', async (t) => {
  const daemon = await t.context.createDaemon(t, { port: 8080 })
  await daemon.start()
  t.is(daemon.isStarted, true)
  await t.throwsAsync(() => daemon.start(), { message: /already started/ })
})

test('Daemon: will not stop if already stopped', async (t) => {
  const daemon = await t.context.createDaemon(t, { port: 8080 })
  t.is(daemon.isStopped, true)
  await t.throwsAsync(() => daemon.stop(), { message: /already stopped/ })
})
