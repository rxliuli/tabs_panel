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
  setConfig(config: Partial<GlobalConfig>): Promise<void>
}

class WebGlobalConfigApi implements BaseGlobalConfigApi {
  async getConfig() {
    return initGlobalConfig
  }

  async setConfig(config: GlobalConfig) {
    Object.assign(initGlobalConfig, config)
  }
}

class ChromeGlobalConfigApi implements BaseGlobalConfigApi {
  async getConfig() {
    return {
      ...initGlobalConfig,
      ...(await storageApi.get<GlobalConfig>(Config.GlobalConfig)),
    }
  }

  async setConfig(config: GlobalConfig) {
    return new Promise<void>(async (resolve) =>
      chrome.storage.local.set(
        {
          ...initGlobalConfig,
          ...(await this.getConfig()),
          ...config,
        },
        resolve,
      ),
    )
  }
}

class FirefoxGlobalConfigApi implements BaseGlobalConfigApi {
  async getConfig() {
    return {
      ...initGlobalConfig,
      ...(await storageApi.get<GlobalConfig>(Config.GlobalConfig)),
    }
  }

  async setConfig(config: GlobalConfig): Promise<void> {
    return browser.storage.local.set({
      ...initGlobalConfig,
      ...(await this.getConfig()),
      ...config,
    })
  }
}

export const globalConfigApi: BaseGlobalConfigApi = BrowserApiUtil.get({
  [Env.Web]: WebGlobalConfigApi,
  [Env.Chrome]: ChromeGlobalConfigApi,
  [Env.Firefox]: FirefoxGlobalConfigApi,
})
