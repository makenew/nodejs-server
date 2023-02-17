import process, { exit } from 'node:process'
import { setImmediate } from 'node:timers/promises'
import { promisify } from 'node:util'

import { createTerminus } from '@godaddy/terminus'
import { pino } from 'pino'

export class Daemon {
  #started = false
  #logger

  constructor(
    server,
    { port = 80, logger = pino(), ...lifecycleOptions } = {}
  ) {
    this.port = port
    this.server = withLifecycle(server, logger, lifecycleOptions)
    this.#logger = logger
  }

  get isStarted() {
    return this.#started
  }

  get isStopped() {
    return !this.#started
  }

  async start() {
    if (this.isStarted) throw new Error('Server is already started')
    this.#logger.debug('Starting')
    await new Promise((resolve, reject) => {
      this.server?.once('error', reject)
      this.server?.listen(this.port, resolve)
    })
    this.#logger.debug({ port: this.port }, 'Started')
    this.#started = true
  }

  async stop() {
    if (this.isStopped) throw new Error('Server is already stopped')
    this.#logger.debug('Stopping')
    const stop = promisify(this.server.stop)
    await stop()
    this.#logger.debug('Stopped')
    this.#started = false
  }
}

const withLifecycle = (server, logger, lifecycleOptions) => {
  server.on('close', () => {
    logger.debug('Closed')
  })

  process.on('unhandledRejection', (err) => {
    logger.fatal({ err }, 'Unhandled rejection')
    exit(1)
  })

  process.on('uncaughtException', (err) => {
    logger.fatal({ err }, 'Uncaught exception')
    exit(1)
  })

  return createTerminus(server, {
    onShutdown: async () => {
      logger.fatal('Shutdown')
      await setImmediate()
    },
    logger: (msg, err) => {
      logger.error({ err }, msg)
    },
    ...lifecycleOptions
  })
}
