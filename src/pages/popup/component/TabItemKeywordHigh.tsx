import classNames from 'classnames'
import css from './TabItemKeywordHigh.module.css'
import * as React from 'react'
import { useContext } from 'react'
import { SnippetTypeEnum, split } from '../util/split'
import { PopupContext } from './PopupContext'
import { ThemeEnum } from '../api/GlobalConfigApi'

type PropsType = {
  title: string
  keyword: string
}
/**
 * 使用 memo 避免无用的重复渲染
 */
export const TabItemKeywordHigh: React.FC<PropsType> = React.memo((props) => {
  const theme = useContext(PopupContext).theme
  return (
    <>
      {split(props.title, props.keyword).map(({ type, val }, i) => (
        <span
          key={i}
          className={classNames({
            [css.keyword]: type === SnippetTypeEnum.Keyword,
            [css.light]: theme === ThemeEnum.Light,
          })}
        >
          {val}
        </span>
      ))}
    </>
  )
})
