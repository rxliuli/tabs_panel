import { BrowserApiUtil, Env } from './BrowserApiUtil'

export type TabOrderMap = Record<number, number>

interface BaseStorageApi {
  /**
   * 根据 key 获取缓存值列表，如果不传则返回全部
   */
  get<T>(k: string): Promise<T>
  set(k: string, v: any): Promise<void>
}
class WebStorageApi implements ChromeStorageApi {
  async get<T>(k: string): Promise<T> {
    return new Map<number, number>() as any
  }

  async set(k: string, v: any): Promise<void> {
    console.log('设置缓存')
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

export const storageApi: BaseStorageApi = BrowserApiUtil.get({
  [Env.Web]: WebStorageApi,
  [Env.Chrome]: ChromeStorageApi,
  [Env.Firefox]: FirefoxStorageApi,
})
