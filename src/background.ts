import TabActiveInfo = chrome.tabs.TabActiveInfo
import { storageApi, TabOrderRecord } from './pages/popup/api/StorageApi'
import { Config } from './pages/background/config/Config'
import { autoIncrement } from './common/util/autoIncrement'
import { tabApi } from './pages/popup/api/TabApi'

/**
 * 处理命令
 */
chrome.commands.onCommand.addListener(async (command) => {
  console.log('onCommand: ', command)
})

/**
 * 记录活跃窗口打开的顺序
 */
chrome.tabs.onActivated.addListener(async (tab: TabActiveInfo) => {
  const cache =
    (await storageApi.get<TabOrderRecord>(Config.IdOrderMapName)) || {}
  const id = await autoIncrement()
  console.log('onActivated tab: ', id, tab, cache)
  cache[tab.tabId] = id
  await storageApi.set(Config.IdOrderMapName, cache)
})

chrome.tabs.onRemoved.addListener(async (tabId: number) => {
  const cache =
    (await storageApi.get<TabOrderRecord>(Config.IdOrderMapName)) || {}
  Reflect.deleteProperty(cache, tabId)
  await storageApi.set(Config.IdOrderMapName, cache)
})

Reflect.set(window, 'tabApi', tabApi)
