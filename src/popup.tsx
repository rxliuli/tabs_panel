import * as React from 'react'
import * as ReactDOM from 'react-dom'
import TabList from './pages/popup/TabList'
import { useEffect, useState } from 'react'
import { useDidMount } from './common/hooks/useDidMount'
import { TabModel } from './pages/popup/model/TabModel'
import { tabApi } from './pages/popup/api/TabApi'
import 'normalize.css'

const Popup: React.FC = () => {
  const [tabs, setTabs] = useState<TabModel[]>([])
  useEffect(() => {
    return tabApi.onChange(async () => {
      return setTabs(await tabApi.all())
    })
  })
  useDidMount(async () => {
    setTabs(await tabApi.all())
    Reflect.set(window, 'chrome', chrome)
  })
  return <TabList list={tabs} />
}

ReactDOM.render(<Popup />, document.getElementById('app'))
