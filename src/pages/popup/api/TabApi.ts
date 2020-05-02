import { TabModel } from '../model/TabModel'
import { EmptyFunc } from '../../../common/types/EmptyFunc'
import { Random } from 'mockjs'

export interface BaseTabApi {
  /**
   * 选择激活指定标签页
   * @param id
   */
  active(id: number): Promise<TabModel>

  /**
   * 获取所有的标签页
   */
  all(): Promise<TabModel[]>

  /**
   * 监听标签页发生变化，例如创建、关闭、修改之类
   * @param listener
   */
  onChange(listener: EmptyFunc): EmptyFunc
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

  private queryWindow() {
    return new Promise<chrome.windows.Window[]>((resolve) => {
      chrome.windows.getAll(resolve)
    })
  }
  private queryTabByWindowId(windowId: number) {
    return new Promise((resolve) =>
      chrome.tabs.query({ windowId }, (tabs) => {
        resolve(
          tabs
            .filter((tab) => tab.title)
            .map(
              (tab) =>
                ({
                  id: tab.id,
                  title: tab.title,
                  icon: tab.favIconUrl,
                  url: tab.url,
                } as TabModel),
            ),
        )
      }),
    )
  }
  async all(): Promise<TabModel[]> {
    return (
      await Promise.all(
        (await this.queryWindow()).map((window) =>
          this.queryTabByWindowId(window.id),
        ),
      )
    ).flat()
  }
  onChange(listener: EmptyFunc) {
    chrome.tabs.onCreated.addListener(listener)
    chrome.tabs.onRemoved.addListener(listener)
    chrome.tabs.onUpdated.addListener(listener)
    chrome.tabs.onReplaced.addListener(listener)
    return () => {
      chrome.tabs.onCreated.removeListener(listener)
      chrome.tabs.onRemoved.removeListener(listener)
      chrome.tabs.onUpdated.removeListener(listener)
      chrome.tabs.onReplaced.removeListener(listener)
    }
  }
}

class FireFoxTabApi implements BaseTabApi {
  active(id: number): Promise<TabModel> {
    throw new Error('Method not implemented.')
  }
  all(): Promise<TabModel[]> {
    throw new Error('Method not implemented.')
  }

  onChange(listener: EmptyFunc): EmptyFunc {
    throw new Error('Method not implemented.')
  }
}

class WebTabApi implements BaseTabApi {
  private static mockTabModel() {
    return {
      id: Random.increment(0),
      title: Random.ctitle(10, 100),
      url: Random.url(),
      icon: Random.image('40px'),
    }
  }

  async active(id: number): Promise<TabModel> {
    console.log('切换到指定页面')
    return WebTabApi.mockTabModel()
  }
  async all(): Promise<TabModel[]> {
    return Array(30).fill(0).map(WebTabApi.mockTabModel)
  }

  onChange(listener: EmptyFunc): EmptyFunc {
    console.log('开始监听 tab 页变化')
    const interval = setInterval(() => listener)
    return () => {
      console.log('结束监听 tab 页变化')
      clearInterval(interval)
    }
  }
}

export const tabApi: BaseTabApi = new ChromeTabApi()
