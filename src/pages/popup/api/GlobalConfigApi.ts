import { storageApi } from './StorageApi'
import { Config } from '../../background/config/Config'
import { BrowserApiUtil, Env } from './BrowserApiUtil'
import { LanguageEnum } from '../../../common/i18n/LocalUtil'
import { i18nApi } from './I18nApi'

export enum ThemeEnum {
  Light,
  Dark,
}

/**
 * 全局配置项
 */
export type GlobalConfig = {
  theme: ThemeEnum
  language: LanguageEnum
}

export const initGlobalConfig: GlobalConfig = {
  theme: ThemeEnum.Dark,
  language: i18nApi.language() as any,
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

class FirefoxGlobalConfigApi implements BaseGlobalConfigApi {
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
  [Env.Firefox]: FirefoxGlobalConfigApi,
})
