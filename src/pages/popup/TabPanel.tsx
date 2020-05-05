import * as React from 'react'
import { useContext, useMemo, useRef, useState } from 'react'
import TabItem from './component/TabItem'
import { TabModel } from './model/TabModel'
import { useKey } from '../../common/hooks/useKey'
import { isCharOrNumber } from '../../common/util/isCharOrNumber'
import { tabApi } from './api/TabApi'
import css from './TabPanel.module.css'
import classNames from 'classnames'
import { PopupContext } from './component/PopupContext'
import { ThemeEnum } from './api/GlobalConfigApi'
import { LanguageEnum, localUtil } from '../../common/i18n/LocalUtil'

type PropsType = {
  list: TabModel[]
}

const TabPanel: React.FC<PropsType> = (props) => {
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

  const keywordInputRef = useRef<HTMLInputElement>(null)
  const [isFocus, setIsFocus] = useState(true)
  useKey(
    async (key, e) => {
      // 输入字符
      // 注：如果同时按住 `ctrl/alt` 也不行
      if (!e.ctrlKey && !e.altKey && isCharOrNumber(key)) {
        if (!isFocus) {
          keywordInputRef.current!.focus()
        }
      }
      if (key === 'Enter') {
        const current = filterList[selectIndex]
        if (!current) {
          return
        }
        await tabApi.activeByWindow({
          tabId: current.id,
          windowId: current.windowId,
        })
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
    { deps: [keyword, selectIndex, filterList, isFocus] },
  )

  const theme = useContext(PopupContext).theme

  return (
    <div
      className={classNames(css.root, {
        [css.light]: theme === ThemeEnum.Light,
      })}
    >
      <header className={css.header}>
        <input
          className={css.input}
          ref={keywordInputRef}
          placeholder={localUtil.get('popup.search.placeholder')}
          type="text"
          value={keyword}
          onChange={(e) => {
            setSelectIndex(0)
            setKeyword(e.target.value)
          }}
          autoFocus={true}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      </header>
      <ul className={css.list}>
        {filterList.map((tab, i) => (
          <li key={i}>
            <TabItem
              item={tab}
              keyword={keyword}
              selected={selectIndex === i}
              onMouseOver={() => setSelectIndex(i)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TabPanel
