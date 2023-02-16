export const command = 'health [check]'

export const describe = 'Check health'

export const builder = {
  check: {
    type: 'string',
    default: 'readyz',
    describe: 'Health check'
  }
}

export const handler = async ({ check, app, logger }) => {
  const res = await fetch(`${app.baseUrl}/${check}`)
  const body = await res.json()
  logger.info({ body }, `GET /${check}`)
}
