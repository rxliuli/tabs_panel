import * as React from 'react'
import { MouseEventHandler } from 'react'
import { TabModel } from '../model/TabModel'
import { tabApi } from '../api/TabApi'
import css from './TabItem.module.css'
import classNames from 'classnames'

type PropsType = {
  item: TabModel
  selected: boolean
  onMouseOver: MouseEventHandler<HTMLDivElement>
}

const TabItem: React.FC<PropsType> = (props) => {
  const { id, title, url, favIconUrl, windowId } = props.item
  return (
    <div
      className={classNames(css.root, {
        [css.active]: props.selected,
      })}
      onClick={() =>
        tabApi.activeByWindow({
          tabId: id,
          windowId,
        })
      }
      onMouseOver={props.onMouseOver}
    >
      <section>
        <img className={css.icon} src={favIconUrl} alt="icon" />
      </section>
      <section className={css.content}>
        <h4 className={classNames(css.ellipsis, css.title)}>{title}</h4>
        <p className={classNames(css.ellipsis, css.url)}>{url}</p>
      </section>
    </div>
  )
}

export default TabItem
