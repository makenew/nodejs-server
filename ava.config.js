import { argv } from 'node:process'

export default () => {
  const ext = argv.includes('--smoke') ? 'test' : 'spec'
  return {
    ignoredByWatcher: ['tmp/**/*'],
    files: [`**/*.${ext}.js`, '!package/**/*']
  }
}
