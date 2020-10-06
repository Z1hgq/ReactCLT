---
title: 主题
order: 3
---

# 主题功能

## 开发

1、新开发一个组件时需要在组件的目录下新建 style 文件夹存放该组件所有的样式文件，该目录必须包含`index.less`和`index.tsx`文件，同时在`index.tsx`中`import '../../style/index.less';`。

2、在组件开发过程中，使用到的有关颜色的样式全部使用变量代替；

3、变量在`src/style/themes/default.less`末尾进行定义，同时在组件的`index.less`中`@import '../../style/themes/index.less';`来引入定义的变量。

4、在`src/style/themes/dark.less`末尾定义组件暗黑主题样式的变量；

5、切勿在组件的代码中引入样式文件；

**开发方式参考组件`MulInput`**

## 使用

在项目中

1、使用`babel-plugin-import`中的`style: false`（默认为 false）来阻止组件的样式文件加载；

2、在全局文件中手动引入组件库的样式文件`import 'rclt/dist/rclt.css';`；

3、项目的入口 html 文件中引入`less.min.js`并修改`window.less`变量属性；

```js
window.less = {
  async: false,
  env: 'production',
};
```

4、引入项目代码使用到的 less 文件`xxx.less`；

5、在`xxx.less`中重写项目中使用到的组件的 less 变量和样式代码；

> 可以通过脚本`scripts/generateTheme.js`快速重写

脚本使用方式

```js
const path = require('path');
const { generateTheme } = require('./generateTheme');

const options = {
  pkgname: 'rclt', // 组件库的名字，antd也同样适用
  stylesDir: path.join(__dirname, './'), // 样式文件存放的路径
  pkgPath: path.join(__dirname, '../../node_modules/rclt'), // 组件库安装的位置
  varFile: path.join(__dirname, './modify-var.less'), // 需要修改的变量的赋值，在这个文件中需要引入rclt/lib/style/themes/default.less 实现对组件库变量的覆盖，同时定义下方需要动态切换的主题变量的值，见下方示例代码
  themeVariables: [
    //需要动态切换的主题变量
    '@mul-input-background',
  ],
  outputFilePath: path.join(__dirname, './global-var.less'), //页面引入的主题变量文件
};

generateTheme(options)
  .then(less => {
    console.log('Theme generated successfully');
  })
  .catch(error => {
    console.log('Error', error);
  });
```

`modify-var.less`的代码

```less
@import '../../node_modules/rclt/lib/style/themes/default.less'; //引入变量文件，实现变量的覆盖
@mul-input-background: #1da57a;
```

最后的生成的文件会输出到`global-var.less`中，在`xxx.less`中引入`global-var.less`。除了`@mul-input-background`，其他的组件样式变量都是编译之后的结果

6、通过`less.modifyVars`来动态修改主题；

```js
window.less.modifyVars({
  '@mul-input-background': '#6a4c9b',
});
```
