import * as React from 'react'
import { TabModel } from '../model/TabModel'
import { tabApi } from '../api/TabApi'
import css from './TabItem.module.css'
import classNames from 'classnames'
import { MouseEventHandler } from 'react'

type PropsType = {
  item: TabModel
  selected: boolean
  onMouseOver: MouseEventHandler<HTMLDivElement>
}

const TabItem: React.FC<PropsType> = (props) => {
  return (
    <div
      className={classNames(css.root, {
        [css.active]: props.selected,
      })}
      onClick={() => tabApi.active(props.item.id)}
      onMouseOver={props.onMouseOver}
    >
      <section>
        <img className={css.icon} src={props.item.icon} alt="icon" />
      </section>
      <section className={css.content}>
        <h4 className={classNames(css.ellipsis, css.title)}>
          {props.item.title}
        </h4>
        <p className={classNames(css.ellipsis, css.url)}>{props.item.url}</p>
      </section>
    </div>
  )
}

export default TabItem
