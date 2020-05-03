/**
 * 片段类型
 */
export enum SnippetTypeEnum {
  Text,
  Keyword,
}

export interface Snippet {
  type: SnippetTypeEnum
  val: string
}

/**
 * 根据关键字将文本分割成文本片段列表
 * @param str
 * @param keyword
 */
export function split(str: string, keyword: string): Snippet[] {
  const res = [] as Snippet[]
  let temp = str
  while (keyword.length !== 0 && temp.includes(keyword)) {
    const i = temp.indexOf(keyword)
    if (i !== 0) {
      res.push({
        type: SnippetTypeEnum.Text,
        val: temp.substring(0, i),
      })
    }
    res.push({
      type: SnippetTypeEnum.Keyword,
      val: temp.substring(i, i + keyword.length),
    })
    temp = temp.substring(i + keyword.length)
  }
  res.push({
    type: SnippetTypeEnum.Text,
    val: temp,
  })
  return res
}
