import * as React from 'react'
import * as ReactDOM from 'react-dom'
import TabList from './pages/popup/TabList'
import { useEffect, useState } from 'react'
import { TabModel } from './pages/popup/model/TabModel'
import { tabApi } from './pages/popup/api/TabApi'
import 'normalize.css'
import { sortBy } from './common/util/sortBy'
import { useDidMount } from './common/hooks/useDidMount'
import { storageApi, TabOrderMap } from './pages/popup/api/StorageApi'
import { Config } from './pages/background/config/Config'

const Popup: React.FC = () => {
  const [tabs, setTabs] = useState<TabModel[]>([])
  useEffect(() => {
    return tabApi.onChange(async () => {
      setTabs(await tabApi.all())
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

  return <TabList list={tabs} />
}

ReactDOM.render(<Popup />, document.getElementById('app'))
