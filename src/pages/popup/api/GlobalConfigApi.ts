import { storageApi } from './StorageApi'
import { Config } from '../../background/config/Config'
import { BrowserApiUtil, Env } from './BrowserApiUtil'

export enum ThemeEnum {
  Light,
  Dark,
}

export type GlobalConfig = {
  theme: ThemeEnum
}
export const initGlobalConfig: GlobalConfig = {
  theme: ThemeEnum.Dark,
}

interface BaseGlobalConfigApi {
  getConfig(): Promise<GlobalConfig>
}

class WebGlobalConfigApi implements BaseGlobalConfigApi {
  async getConfig() {
    return initGlobalConfig
  }
}

class ChromeGlobalConfigApi implements BaseGlobalConfigApi {
  async getConfig() {
    return {
      ...initGlobalConfig,
      ...(await storageApi.get<GlobalConfig>(Config.GlobalConfig)),
    }
  }
}

export const globalConfigApi: BaseGlobalConfigApi = BrowserApiUtil.get({
  [Env.Web]: WebGlobalConfigApi,
  [Env.Chrome]: ChromeGlobalConfigApi,
})
