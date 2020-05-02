import * as React from 'react'
import { TabModel } from '../model/TabModel'
import { tabApi } from '../api/TabApi'
import css from './TabItem.module.css'
import classNames from 'classnames'

type PropsType = {
  item: TabModel
  selected: boolean
}

const TabItem: React.FC<PropsType> = (props) => {
  return (
    <div
      className={classNames(css.root, {
        [css.active]: props.selected,
      })}
      onClick={() => tabApi.active(props.item.id)}
    >
      <h4 className={css.header}>{props.item.title}</h4>
      <p className={css.url}>{props.item.url}</p>
    </div>
  )
}

export default TabItem
