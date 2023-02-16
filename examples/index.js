#!/usr/bin/env node

import { env } from 'node:process'

import landlubber, { defaultMiddleware } from 'landlubber'

import { createApp, createLogger, getConfig } from '../index.js'

import * as health from './health.js'

const commands = [health]

const createAppContext = async (argv) => {
  const config = await getConfig(env)
  const logger = createLogger({ config })
  const app = createApp({ config, logger })
  if (argv.start) await app.start()
  argv.app = app
}

const middleware = [...defaultMiddleware, createAppContext]

const args = await landlubber(commands, { middleware })
  .describe('start', 'Run server during execution')
  .boolean('start')
  .default('start', false)
  .parse()

if (args.start) await args.app.stop()
