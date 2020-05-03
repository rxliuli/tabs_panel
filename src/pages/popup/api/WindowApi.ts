import { WindowModel } from '../model/WindowModel'

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

export const windowApi: BaseWindowApi = new ChromeWindowApi()
