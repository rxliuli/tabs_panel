import { BrowserApiUtil, Env } from './BrowserApiUtil'
import { LanguageEnum } from '../../../common/i18n/LocalUtil'

interface BaseI18nApi {
  language(): LanguageEnum
}

class WebI18nApi implements BaseI18nApi {
  language(): LanguageEnum {
    return LanguageEnum.zhCN
  }
}

class ChromeI18nApi implements BaseI18nApi {
  language(): LanguageEnum {
    return chrome.i18n.getUILanguage() as any
  }
}

class FirefoxI18nApi implements BaseI18nApi {
  language(): LanguageEnum {
    return browser.i18n.getUILanguage() as any
  }
}

export const i18nApi: BaseI18nApi = BrowserApiUtil.get({
  [Env.Web]: WebI18nApi,
  [Env.Chrome]: ChromeI18nApi,
  [Env.Firefox]: FirefoxI18nApi,
})
