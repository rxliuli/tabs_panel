import * as React from 'react'
import { MouseEventHandler, useContext, useEffect, useRef } from 'react'
import { TabModel } from '../model/TabModel'
import { tabApi } from '../api/TabApi'
import css from './TabItem.module.css'
import classNames from 'classnames'
import { TabItemKeywordHigh } from './TabItemKeywordHigh'
import defaultFavIconUrl from '../../../assets/icon/icon-default-fav-icon-url.png'
import { PopupContext } from './PopupContext'
import { ThemeEnum } from '../api/GlobalConfigApi'

type PropsType = {
  item: TabModel
  selected: boolean
  onMouseOver: MouseEventHandler<HTMLDivElement>
  keyword: string
}

const TabItem: React.FC<PropsType> = (props) => {
  const { id, title, url, favIconUrl, windowId } = props.item
  const theme = useContext(PopupContext).theme
  return (
    <div
      className={classNames(css.root, {
        [css.active]: props.selected,
        [css.light]: theme === ThemeEnum.Light,
      })}
      onClick={() =>
        tabApi.activeByWindow({
          tabId: id,
          windowId,
        })
      }
      onMouseOver={props.onMouseOver}
    >
      <img
        className={css.icon}
        src={favIconUrl || defaultFavIconUrl}
        alt="icon"
      />
      <section className={css.content}>
        <h4 className={classNames(css.ellipsis, css.title)}>
          <TabItemKeywordHigh title={title} keyword={props.keyword} />
        </h4>
        <p className={classNames(css.ellipsis, css.url)}>
          <TabItemKeywordHigh title={url} keyword={props.keyword} />
        </p>
      </section>
    </div>
  )
}

export default TabItem
