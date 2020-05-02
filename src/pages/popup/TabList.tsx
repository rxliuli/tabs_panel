import * as React from 'react'
import TabItem from './component/TabItem'
import { useEffect, useState, useMemo } from 'react'
import { TabModel } from './model/TabModel'
import { useKey } from '../../common/hooks/useKey'
import { isCharOrNumber } from '../../common/util/isCharOrNumber'
import { tabApi } from './api/TabApi'
import css from './TabList.module.css'

type PropsType = {
  list: TabModel[]
}

const TabList: React.FC<PropsType> = (props) => {
  const [keyword, setKeyword] = useState('')
  const [selectIndex, setSelectIndex] = useState(0)
  const filterList = useMemo(
    () =>
      props.list.filter(
        (tab) =>
          tab.title.toUpperCase().includes(keyword.toUpperCase()) ||
          tab.url.toUpperCase().includes(keyword.toUpperCase()),
      ),
    [keyword, selectIndex, props.list],
  )
  useKey(
    (key, e) => {
      // 输入字符
      // 注：如果同时按住 `ctrl/alt` 也不行
      if (!e.ctrlKey && !e.altKey && isCharOrNumber(key)) {
        setKeyword(keyword + key)
        setSelectIndex(0)
      }
      // 删除字符
      if (key === 'Backspace') {
        if (keyword.length > 0) {
          setKeyword(keyword.substring(0, keyword.length - 1))
          setSelectIndex(0)
        }
      }
      if (key === 'Enter') {
        const current = filterList[selectIndex]
        if (!current) {
          return
        }
        tabApi.active(current.id)
      }
      // 上移
      if (key === 'ArrowUp') {
        setSelectIndex(Math.max(selectIndex - 1, 0))
      }
      // 下移
      if (key === 'ArrowDown') {
        console.log(selectIndex + 1, filterList.length - 1)
        setSelectIndex(Math.min(selectIndex + 1, filterList.length - 1))
      }
      console.log(key)
    },
    { deps: [keyword, selectIndex, filterList] },
  )

  return (
    <div className={css.root}>
      <header>
        <h2 className={css.header}>{keyword}</h2>
      </header>
      <ul className={css.list}>
        {filterList.map((tab, i) => (
          <li key={i}>
            <TabItem item={tab} selected={selectIndex === i} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TabList
