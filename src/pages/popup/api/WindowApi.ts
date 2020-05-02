interface BaseWindowApi {
  active(windowId: number): Promise<chrome.windows.Window>
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
}

export const windowApi: BaseWindowApi = new ChromeWindowApi()
