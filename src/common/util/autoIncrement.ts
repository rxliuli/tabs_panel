import { storageApi } from '../../pages/popup/api/StorageApi'

let last = 0
//初始化
// eslint-disable-next-line @typescript-eslint/no-explicit-any
storageApi.get('Last').then((res: any) => {
  const val = parseInt(res || '0')
  last = isNaN(val) ? 0 : val
})

/**
 * 获取自增长序列的最新值
 * @returns 最新值
 */
export async function autoIncrement(): Promise<number> {
  const num = last++
  await storageApi.set('Last', num)
  console.log('autoIncrement: ', num)
  return num
}
