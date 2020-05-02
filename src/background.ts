import TabActiveInfo = chrome.tabs.TabActiveInfo
import { storageApi, TabOrderMap } from './pages/popup/api/StorageApi'
import { Config } from './pages/background/config/Config'
import { autoIncrement } from './common/util/autoIncrement'

/**
 * 处理命令
 */
chrome.commands.onCommand.addListener(function (command) {
  console.log('command: ', command)
  if (command === 'showPopupPanel') {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      chrome.browserAction.getPopup(
        {
          tabId: tabs[0].id,
        },
        (result) => {
          console.log(result)
        },
      )
    })
  }
})

chrome.tabs.onActivated.addListener(async (tab: TabActiveInfo) => {
  const val = await storageApi.get<TabOrderMap>(Config.IdOrderMapName)
  const cache: TabOrderMap = val ? val : {}
  cache[tab.tabId] = autoIncrement()
  await storageApi.set(Config.IdOrderMapName, cache)
  console.log(
    'onActivated tab: ',
    tab,
    await storageApi.get(Config.IdOrderMapName),
  )
})
