import { WindowModel } from '../model/WindowModel'
import { Random } from 'mockjs'
import { BrowserApiUtil, Env } from './BrowserApiUtil'

interface BaseWindowApi {
  active(windowId: number): Promise<WindowModel>
  current(): Promise<WindowModel>
}

class ChromeWindowApi implements BaseWindowApi {
  active(windowId: number): Promise<WindowModel> {
    return new Promise((resolve) =>
      chrome.windows.update(
        windowId,
        {
          focused: true,
        },
        resolve,
      ),
    )
  }
  current(): Promise<WindowModel> {
    return new Promise((resolve) => chrome.windows.getCurrent(resolve))
  }
}

class WebWindowApi implements BaseWindowApi {
  async active(windowId: number): Promise<WindowModel> {
    return {
      id: windowId,
    }
  }

  async current(): Promise<WindowModel> {
    return {
      id: Random.increment(),
    }
  }
}

export const windowApi: BaseWindowApi = BrowserApiUtil.get({
  [Env.Web]: WebWindowApi,
  [Env.Chrome]: ChromeWindowApi,
})
