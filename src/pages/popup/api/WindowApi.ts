interface BaseWindowApi {
  active(windowId: number): Promise<chrome.windows.Window>
  current(): Promise<chrome.windows.Window>
}

class ChromeWindowApi implements BaseWindowApi {
  active(windowId: number): Promise<chrome.windows.Window> {
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
  current(): Promise<chrome.windows.Window> {
    return new Promise((resolve) => chrome.windows.getCurrent(resolve))
  }
}

export const windowApi: BaseWindowApi = new ChromeWindowApi()
