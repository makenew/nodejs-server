import { createServer } from 'node:http'

import { Daemon } from './daemon.js'

export const createApp = ({ config, logger }) => new App({ config, logger })

class App {
  #daemon
  #config
  #logger

  constructor({ config, logger }) {
    this.#config = config
    this.#logger = logger
  }

  get baseUrl() {
    return `http://localhost:${this.#server.port}`
  }

  async start() {
    await this.#server.start()
  }

  async stop() {
    await this.#cleanup()
    await this.#server.stop()
  }

  // TODO: Define your request handling here.
  // You can swap out the native Node.js HTTP server with your framework of choice.
  #createServer = () => {
    const server = createServer((req, res) => {
      this.#logger.info(req, 'HTTP Request')
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ data: 'TODO' }))
      this.#logger.info(res, 'HTTP Response')
    })
    return server
  }

  #healthChecks = {
    '/livez': async () => true,
    '/readyz': async () => true
  }

  #cleanup = async () => {}

  get #server() {
    this.#daemon ??= new Daemon(this.#createServer(), {
      signals: ['SIGINT', 'SIGUSR2'],
      onSignal: this.#cleanup,
      healthChecks: this.#healthChecks,
      port: this.#config.port,
      logger: this.#logger
    })
    return this.#daemon
  }
}
