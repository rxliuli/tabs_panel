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
import { localUtil } from './common/i18n/LocalUtil'

const Popup: React.FC = () => {
  const [tabs, setTabs] = useState<TabModel[]>([])
  useEffect(() => {
    return tabApi.onChange(async () => {
      const tabs = await tabApi.all()
      console.log('Popup tabApi.onChange: ', tabs)
      setTabs(tabs)
    })
  })
  useDidMount(async () => {
    const tabOrderMap: TabOrderMap = await storageApi.get(Config.IdOrderMapName)
    const list = sortBy(
      await tabApi.all(),
      (tab) => -(tabOrderMap[tab.id] || 0),
    )
    setTabs(list)
  })

  //region 初始化配置项

  const [config, setConfig] = useState(initGlobalConfig)
  useDidMount(async () => {
    const config = await globalConfigApi.getConfig()
    setConfig(config)
    console.log('Popup config: ', config.language)
    localUtil.language = config.language
  })

  //endregion
  return (
    //使用黑暗主题
    <PopupContext.Provider value={config}>
      <TabPanel list={tabs} />
    </PopupContext.Provider>
  )
}

ReactDOM.render(<Popup />, document.getElementById('app'))
