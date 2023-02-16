import { Writable } from 'node:stream'

import { pino } from 'pino'
import pinoPretty from 'pino-pretty'

export const createLogger = ({ t, config } = {}) => {
  const options = {}
  if (config?.logLevel != null) options.level = config.logLevel
  if (config?.useProductionLogger) return pino(options)
  if (t != null) return createTestLogger(t, options)
  return pino(options, pinoPretty.default())
}

const createTestLogger = (t, options) => {
  const stream = new LogStream((data) => {
    const { msg, levelLabel, ...rest } = JSON.parse(data)
    delete rest.hostname
    delete rest.level
    delete rest.pid
    delete rest.time
    t.log(levelLabel.toUpperCase(), msg, rest)
  })
  const logger = pino(
    {
      ...options,
      sync: true,
      mixin(_context, level) {
        return { levelLabel: logger.levels.labels[level] }
      }
    },
    stream
  )
  return logger
}

class LogStream extends Writable {
  constructor(log) {
    super()
    this.log = log
  }

  _write(chunk, encoding, callback) {
    this.log(chunk.toString().trim())
    callback()
  }
}
