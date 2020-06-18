import { Env } from '../pages/popup/api/BrowserApiUtil'

/**
 * 这种定义方式来自 https://stackoverflow.com/questions/45194598/
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ApiEnv?: Env
      NODE_ENV: 'development' | 'production'
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
