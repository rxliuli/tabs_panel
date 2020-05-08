import { WindowModel } from '../model/WindowModel'
import { Random } from 'mockjs'
import { BrowserApiUtil, Env } from './BrowserApiUtil'
import Tab = browser.tabs.Tab

interface BaseWindowApi {
  active(windowId: number): Promise<WindowModel>
  current(): Promise<WindowModel>
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

class FirefoxWindowApi implements BaseWindowApi {
  active(windowId: number): Promise<WindowModel> {
    return browser.windows.update(windowId, {
      focused: true,
    }) as Promise<Required<browser.windows.Window>>
  }
  current(): Promise<WindowModel> {
    return browser.windows.getCurrent() as Promise<
      Required<browser.windows.Window>
    >
  }
}

export const windowApi: BaseWindowApi = BrowserApiUtil.get({
  [Env.Web]: WebWindowApi,
  [Env.Chrome]: ChromeWindowApi,
  [Env.Firefox]: FirefoxWindowApi,
})
