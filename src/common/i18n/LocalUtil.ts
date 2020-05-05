import { zhCN } from './zhCN'
import { enUS } from './enUS'
import { LocalDefine } from './LocalDefine'
import { get } from '../util/get'

export enum LanguageEnum {
  enUS = 'enUS',
  zhCN = 'zhCN',
}

export class LocalUtil {
  private static map = {
    [LanguageEnum.enUS]: enUS,
    [LanguageEnum.zhCN]: zhCN,
  } as Record<LanguageEnum, LocalDefine>
  private _language!: LanguageEnum
  private localInfo!: LocalDefine

  set language(language: LanguageEnum) {
    this._language = language
    this.localInfo = LocalUtil.map[this._language]
  }
  constructor() {
    this.language = LanguageEnum.enUS
  }
  get(key: string): string {
    return get<string>(this.localInfo, key)!
  }
}

export const localUtil = new LocalUtil()
