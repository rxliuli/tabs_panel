import * as React from 'react'
import { Reducer, useCallback, useEffect, useReducer, useState } from 'react'
import * as ReactDOM from 'react-dom'
import TabPanel from './pages/popup/TabPanel'
import { TabModel } from './pages/popup/model/TabModel'
import { tabApi } from './pages/popup/api/TabApi'
import 'normalize.css'
import { sortBy } from './common/util/sortBy'
import { useDidMount } from './common/hooks/useDidMount'
import { storageApi, TabOrderRecord } from './pages/popup/api/StorageApi'
import { Config } from './pages/background/config/Config'
import { PopupContext } from './pages/popup/component/PopupContext'
import {
  globalConfigApi,
  initGlobalConfig,
} from './pages/popup/api/GlobalConfigApi'
import { localUtil } from './common/i18n/LocalUtil'

const Popup: React.FC = () => {
  const [tabs, setTabs] = useState<TabModel[]>([])

  const load = useCallback(async () => {
    const map =
      (await storageApi.get<TabOrderRecord>(Config.IdOrderMapName)) || {}
    Reflect.set(window, 'tabApi', tabApi)
    const list = sortBy(await tabApi.all(), (tab) => -([tab.id] || 0))
    // console.log('loading tabs: ', map, list)
    if (
      JSON.stringify(list.map((item) => item.id)) ===
      JSON.stringify(tabs.map((item) => item.id))
    ) {
      return
    }
    console.log(
      'real loading tabs: ',
      map,
      list.map((item) => item.id),
      tabs.map((item) => item.id),
    )
    setTabs(list)
  }, [tabs])

  useDidMount(load)
  useEffect(() => {
    return tabApi.onChange(load)
  }, [load])

  //region 初始化配置项

  const [config, setConfig] = useState(initGlobalConfig)
  useDidMount(async () => {
    const config = await globalConfigApi.getConfig()
    localUtil.language = config.language
    setConfig(config)
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
