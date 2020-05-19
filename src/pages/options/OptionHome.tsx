import * as React from 'react'
import { Button, Form, Select } from 'antd'
import {
  GlobalConfig,
  globalConfigApi,
  initGlobalConfig,
  ThemeEnum,
} from '../popup/api/GlobalConfigApi'
import { LanguageEnum } from '../../common/i18n/LocalUtil'
import { useDidMount } from '../../common/hooks/useDidMount'

const { Option } = Select

type PropsType = {}
/**
 * 选项配置页首页
 * @param props
 * @constructor
 */
const OptionHome: React.FC<PropsType> = (props) => {
  const [form] = Form.useForm()
  useDidMount(async () => {
    const config = await globalConfigApi.getConfig()
    form.setFieldsValue({
      ...initGlobalConfig,
      ...config,
    })
    console.log('OptionHome config: ', config)
  })

  async function handleSubmit(config: object) {
    console.log('handleSubmit', config)
    await globalConfigApi.setConfig(config)
  }

  return (
    <Form form={form} initialValues={initGlobalConfig} onFinish={handleSubmit}>
      <h2>OptionHome</h2>
      {/*主题*/}
      <Form.Item
        name={'theme' as keyof GlobalConfig}
        label={'主题'}
        rules={[{ required: true }]}
      >
        <Select style={{ width: 300 }}>
          <Option value={ThemeEnum.Dark}>暗色</Option>
          <Option value={ThemeEnum.Light}>亮色</Option>
        </Select>
      </Form.Item>
      {/*语言*/}
      <Form.Item
        name={'language' as keyof GlobalConfig}
        label={'语言'}
        rules={[{ required: true }]}
      >
        <Select style={{ width: 300 }}>
          <Option value={LanguageEnum.zhCN}>简体中文</Option>
          <Option value={LanguageEnum.enUS}>English</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType={'submit'}>
          确定
        </Button>
      </Form.Item>
    </Form>
  )
}

export default OptionHome
