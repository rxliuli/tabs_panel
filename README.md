## 场景

Chrome 的标签页太多时几乎没办法查找，所以有非常强烈的需求有一个插件能实现以下功能。

1. 通过快捷键打开一个面板，包含所有当前打开的标签页列表
2. 在列表直接输入即可搜索，同时搜索时标签中的关键字高亮，允许上下移动
3. 标签页的功能允许使用回车切换到选定标签，删除关闭选定标签

> 注：该功能的 idea 来自于 JetBrains 系 IDE 的 Recent Files 功能。

## 优化

- [x] 历史模式，最近浏览的排在最前面
- [x] 切换多个窗口的 Tab
- [ ] 分词全文搜索
- [ ] 使用缓存优化获取所有 Tab 列表的性能
- [ ] UI/UX 优化

## 声明

- 该扩展的图标来自于 [iconfont](https://www.iconfont.cn/search/index?searchType=icon&q=tab)，作者是 [Mace](https://www.iconfont.cn/user/detail?spm=a313x.7781069.0.d214f71f6&uid=4223729)。
