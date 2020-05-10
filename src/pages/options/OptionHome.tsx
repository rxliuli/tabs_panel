import * as React from 'react'
import { Button } from 'antd'

type PropsType = {}
/**
 * 选项配置页首页
 * @param props
 * @constructor
 */
const OptionHome: React.FC<PropsType> = (props) => {
  return (
    <div>
      <h2>OptionHome</h2>
      <Button type="primary" onClick={() => console.log('Home')}>
        Home
      </Button>
    </div>
  )
}

export default OptionHome
