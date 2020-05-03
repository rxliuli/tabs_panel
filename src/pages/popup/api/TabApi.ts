import { TabModel } from '../model/TabModel'
import { EmptyFunc } from '../../../common/types/EmptyFunc'
import { Random } from 'mockjs'
import { windowApi } from './WindowApi'
import TabActiveInfo = chrome.tabs.TabActiveInfo
import Tab = chrome.tabs.Tab
import { BrowserApiUtil, Env } from './BrowserApiUtil'

export interface BaseTabApi {
  /**
   * 选择激活指定标签页
   * @param id
   */
  active(id: number): Promise<TabModel>
  activeByWindow(info: TabActiveInfo): Promise<void>
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

  async activeByWindow(info: chrome.tabs.TabActiveInfo): Promise<void> {
    const activeWindowId = (await windowApi.current()).id
    if (activeWindowId !== info.windowId) {
      await windowApi.active(info.windowId)
    }
    await this.active(info.tabId)
  }

  private queryWindow() {
    return new Promise<chrome.windows.Window[]>((resolve) => {
      chrome.windows.getAll(resolve)
    })
  }
  private queryTabByWindowId(windowId: number) {
    return new Promise<TabModel[]>((resolve) =>
      chrome.tabs.query({ windowId }, (tabs) => {
        resolve(
          tabs
            //过滤掉没有标题的和插件本身
            .filter((tab) => tab.title)
            .map((tab) => tab as TabModel),
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

class WebTabApi implements BaseTabApi {
  private static mockTabModel(): TabModel {
    return {
      id: Random.increment(),
      windowId: Random.increment(),
      title: Random.ctitle(10, 100),
      url: Random.url(),
      favIconUrl: Random.image('40px'),
    }
  }

  async activeByWindow(info: chrome.tabs.TabActiveInfo): Promise<void> {
    console.log('激活窗口和 tabId 了')
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
    return () => {
      console.log('结束监听 tab 页变化')
    }
  }
}

export const tabApi: BaseTabApi = BrowserApiUtil.get({
  [Env.Web]: WebTabApi,
  [Env.Chrome]: ChromeTabApi,
})
