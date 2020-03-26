import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'
import * as dotenvExpand from 'dotenv-expand'

const output = (dotEnvPath: string) => {
  const dotEnvFile = path.join(dotEnvPath, '.env')
  const NODE_ENV = process.env.NODE_ENV || 'production'

  const dotenvFiles = [
    `${dotEnvFile}.${NODE_ENV}.local`,
    `${dotEnvFile}.${NODE_ENV}`,
    NODE_ENV !== 'test' && `${dotEnvFile}.local`,
    dotEnvFile,
  ].filter(Boolean) as Array<string>

  dotenvFiles.forEach(dotEnvFile => {
    if (fs.existsSync(dotEnvFile)) {
      dotenvExpand(dotenv.config({
        path: dotEnvFile,
      }))
    }
  })
}

export default output
