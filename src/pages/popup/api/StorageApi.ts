import { safeExec } from '../../../common/util/safeExec'

export type TabOrderRecord = Record<number, number>

interface BaseStorageApi {
  /**
   * 根据 key 获取缓存值列表，如果不传则返回全部
   */
  get<T>(k: string): Promise<T>
  set(k: string, v: any): Promise<void>
}
class WebStorageApi implements ChromeStorageApi {
  async get<T>(k: string): Promise<T> {
    return JSON.parse(localStorage.getItem(k)!)
  }

  async set(k: string, v: any): Promise<void> {
    localStorage.setItem(k, JSON.stringify(v))
  }
}
class ChromeStorageApi implements BaseStorageApi {
  get<T>(k: string): Promise<T> {
    return new Promise((resolve) =>
      chrome.storage.local.get(k, (v) => resolve(v[k])),
    )
  }

  set(k: string, v: any): Promise<void> {
    return new Promise((resolve) =>
      chrome.storage.local.set(
        {
          [k]: v,
        },
        resolve,
      ),
    )
  }
}
class FirefoxStorageApi implements BaseStorageApi {
  async get<T>(k: string): Promise<T> {
    return (await browser.storage.local.get(k))[k]
  }

  async set(k: string, v: any): Promise<void> {
    await browser.storage.local.set({
      [k]: v,
    })
  }
}

export const storageApi: BaseStorageApi = new WebStorageApi()
