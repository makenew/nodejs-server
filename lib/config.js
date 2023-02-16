export const getConfig = async (env) => ({
  logLevel: env.LOG_LEVEL ?? 'info',
  useProductionLogger: isProduction(env),
  port: getPort(env)
})

const getPort = (env) => {
  if (env.PORT != null) return Number(env.PORT)
  if (isProduction(env)) return 8080
  if (isTest(env)) return 4000
  return 3000
}

const isTest = (env) => env.NODE_ENV === 'test'

const isProduction = (env) => env.NODE_ENV === 'production'
