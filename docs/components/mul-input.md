---
group:
  title: 通用组件
  path: /components
title: MulInput
order: 4
---

# MulInput 多标签输入

### 何时使用

当有多个标签数据需要输入时

### 代码演示

**默认使用**

<code src="../../demo/mul-input/1.jsx">

**结合 antd 的表单带校验使用**

<code src="../../demo/mul-input/2.jsx">

**注意:** 使用回车键添加 tab 的时候会触发 form 中的 submit 事件

### API

| 参数        | 描述                   | 类型                                                                                                                                                | 默认值                    |
| ----------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| className   | 自定义 CSS class       | `string`                                                                                                                                            | -                         |
| onChange    | 输入框内容变化时的回调 | `Function(text, arr)`                                                                                                                               | -                         |
| value       | 输入框内容             | `string`                                                                                                                                            | -                         |
| style       | 自定义内联样式         | [React.CSSProperties](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e434515761b36830c3e58a970abf5186f005adac/types/react/index.d.ts#L794) | -                         |
| placeholder | 输入文字提示           | `string`                                                                                                                                            | "多个输入用英文分号;分隔" |

### 变更记录

v0.0.1

- 🔥 新增组件
