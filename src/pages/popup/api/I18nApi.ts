import { BrowserApiUtil, Env } from './BrowserApiUtil'
import { LanguageEnum } from '../../../common/i18n/LocalUtil'

interface BaseI18nApi {
  language(): string
}

class WebI18nApi implements BaseI18nApi {
  language(): string {
    return LanguageEnum.zhCN
  }
}

class ChromeI18nApi implements BaseI18nApi {
  language(): string {
    return chrome.i18n.getUILanguage()
  }
}

class FirefoxI18nApi implements BaseI18nApi {
  language(): string {
    return browser.i18n.getUILanguage()
  }
}

export const i18nApi: BaseI18nApi = BrowserApiUtil.get({
  [Env.Web]: WebI18nApi,
  [Env.Chrome]: ChromeI18nApi,
  [Env.Firefox]: FirefoxI18nApi,
})
