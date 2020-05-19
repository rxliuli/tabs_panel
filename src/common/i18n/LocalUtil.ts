import { zhCN } from './zhCN'
import { enUS } from './enUS'
import { LocalDefine } from './LocalDefine'
import { get } from '../util/get'

export enum LanguageEnum {
  enUS = 'en',
  zhCN = 'zh-CN',
}

export class LocalUtil {
  private static map = {
    [LanguageEnum.enUS]: enUS,
    [LanguageEnum.zhCN]: zhCN,
  } as Record<LanguageEnum, LocalDefine>
  private _language!: LanguageEnum
  private localInfo!: LocalDefine

  set language(language: LanguageEnum) {
    console.log('set language', language)
    this._language = language
    this.localInfo = LocalUtil.map[this._language]
  }
  constructor() {
    this.language = LanguageEnum.enUS
  }
  get(key: string): string {
    console.log('localUtil: ', this._language, key, this.localInfo)
    return get<string>(this.localInfo, key)!
  }
}

export const localUtil = new LocalUtil()
