import * as React from 'react'
import { useEffect, useState } from 'react'
import * as ReactDOM from 'react-dom'
import TabPanel from './pages/popup/TabPanel'
import { TabModel } from './pages/popup/model/TabModel'
import { tabApi } from './pages/popup/api/TabApi'
import 'normalize.css'
import { sortBy } from './common/util/sortBy'
import { useDidMount } from './common/hooks/useDidMount'
import { storageApi, TabOrderMap } from './pages/popup/api/StorageApi'
import { Config } from './pages/background/config/Config'
import { PopupContext } from './pages/popup/component/PopupContext'
import {
  globalConfigApi,
  initGlobalConfig,
} from './pages/popup/api/GlobalConfigApi'

const Popup: React.FC = () => {
  const [tabs, setTabs] = useState<TabModel[]>([])
  useEffect(() => {
    return tabApi.onChange(async () => {
      setTabs(await tabApi.all())
    })
  })
  useDidMount(async () => {
    Reflect.set(window, 'tabApi', tabApi)
    const tabOrderMap: TabOrderMap = await storageApi.get(Config.IdOrderMapName)
    const list = sortBy(
      await tabApi.all(),
      (tab) => -(tabOrderMap[tab.id] || 0),
    )
    setTabs(list)
  })

  const [config, setConfig] = useState(initGlobalConfig)
  useDidMount(async () => {
    setConfig(await globalConfigApi.getConfig())
  })

  return (
    //使用黑暗主题
    <PopupContext.Provider value={config}>
      <TabPanel list={tabs} />
    </PopupContext.Provider>
  )
}

ReactDOM.render(<Popup />, document.getElementById('app'))
