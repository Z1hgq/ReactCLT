---
title: 快速开始
order: 1
---

# rclt

React 组件库模版，参考 antd

## 快速上手

### 启动命令

```sh
npm install
npm start
```

浏览器打开 http://127.0.0.1:3010, 端口可在项目根目录`.umirc.js`中配置

### 开发

1、在 `src` 下建立对应组件目录，例如： `example-component`（注意：文件夹命名小写，2 个单词及以上使用中划线连接）；

2、在 `example-component` 目录下直接写组件代码；

3、新建 style 文件夹存放组件的样式文件，style 目录下需要文件`index.tsx`引入该目录下所有的样式文件；（详情见主题功能）

4、通过`example-component/index.tsx`进行组件导出；

5、在 `demo` 目录下新建 `example-component` 文件夹，存放示例代码；

6、在 `docs/components` 目录下新建`example-component.md`，写组件的说明文档，文档中可引入 demo 中的代码，例如：

```js
<code src="demo/example-component/1.jsx">
```

说明文档应该至少包括“何时使用”、“代码演示”、“API”

7、在`src/example-component/__tests__/`目录添加组件的测试代码；

8、代码编写完毕，需要在`src/index.d.ts` 中添加对于的包导出：

```js
// 示例
export { default as MulInput } from './mul-input';
```

> PS: **主题**和**多语言**功能分别参考`docs/theme.md`和`docs/internal.md`

### 编译

```shell
# 编译 es和 lib文件
npm run compile
# 编译dist文件
npm run dist
```

### 发布

```shell
# 编译组件代码并编译打包说明文档静态网页文件
npm run release
# 发布到npm仓库
npm publish
```

### 使用

```shell
# 安装
npm install rclt
```

配置**按需加载**，否则组件没有样式哦。首先要安装`babel-plugin-import`，然后在 `babel` 的 `plugins` 配置中加入

```js
[
  'babel-plugin-import',
  {
    libraryName: 'rclt',
    style: true,
  },
  'rclt',
];
```

```js
// 引入组件之后就可以使用啦
import { MulInput } from 'rclt';
```
