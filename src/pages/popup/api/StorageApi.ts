export type TabOrderMap = Record<number, number>

interface BaseStorageApi {
  /**
   * 根据 key 获取缓存值列表，如果不传则返回全部
   */
  get<T>(k: string): Promise<T>
  set(k: string, v: any): Promise<void>
}
class ChromeStorageApi implements BaseStorageApi {
  get<T>(k: string): Promise<T> {
    return new Promise((resolve) =>
      chrome.storage.sync.get(k, (v) => resolve(v[k])),
    )
  }

  set(k: string, v: any): Promise<void> {
    return new Promise((resolve) =>
      chrome.storage.sync.set(
        {
          [k]: v,
        },
        resolve,
      ),
    )
  }
}
class FireFoxStorageApi {}
class WebStorageApi {}

export const storageApi: BaseStorageApi = new ChromeStorageApi()
