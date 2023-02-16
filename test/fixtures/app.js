import { argv, env } from 'node:process'

import getPort from '@ava/get-port'

import { createApp, createLogger, getConfig } from '../../index.js'

export const startTestApp = async (t) => {
  const app = await getTestApp(t)
  await app.start()
  t.teardown(() => app.stop())
  return app
}

export const getTestApp = async (t) => {
  const port = await getPort()
  const config = await getConfig({
    ...env,
    NODE_ENV: 'test',
    PORT: argv.includes('--smoke') ? env.PORT : port.toString()
  })
  const logger = createLogger({ config, t })
  const app = createApp({ config, logger })
  t.context.app = app
  return app
}
