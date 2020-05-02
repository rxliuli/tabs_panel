import { TabModel } from '../model/TabModel'

export interface BaseTabApi {
  active(id: number): Promise<TabModel>
  all(): Promise<TabModel[]>
}

class ChromeTabApi implements BaseTabApi {
  active(id: number): Promise<TabModel> {
    return new Promise((resolve) =>
      chrome.tabs.update(
        id,
        {
          active: true,
        },
        resolve as any,
      ),
    )
  }
  all(): Promise<TabModel[]> {
    return new Promise((resolve) =>
      chrome.tabs.query({}, (tabs) => {
        resolve(tabs.filter((tab) => tab.title) as any)
      }),
    )
  }
}

class FireFoxTabApi implements BaseTabApi {
  active(id: number): Promise<TabModel> {
    throw new Error('Method not implemented.')
  }
  all(): Promise<TabModel[]> {
    throw new Error('Method not implemented.')
  }
}

class WebTabApi implements BaseTabApi {
  async active(id: number): Promise<TabModel> {
    console.log('切换到指定页面')
    return {
      id: 0,
      title: '标题 0',
      url: '',
    }
  }
  async all(): Promise<TabModel[]> {
    return Array(30)
      .fill(0)
      .map(
        (_, i) =>
          ({
            id: i,
            title: `标题 ${i}`,
            url: `http://localhost:1234/${i}`,
          } as TabModel),
      )
  }
}

export const tabApi = new ChromeTabApi()
