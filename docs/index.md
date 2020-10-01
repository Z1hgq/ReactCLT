# ReactCLT

React Components Library Template

## 快速上手

### 开发

#### 启动命令

```sh
npm install
npm start
```

浏览器打开 http://127.0.0.1:3010, 端口可在项目根目录`.umirc.js`中配置

#### 开发方式

1、在 `src` 下建立对应组件目录，例如： `example-component`（注意：文件夹命名小写，2 个单词及以上使用中划线连接）；

2、在 `example-component` 目录下直接写组件代码，新建 style 文件夹存放组件的样式文件，通过`index.jsx`和`index.d.ts`导出组件；

3、在 `demo` 目录下新建 `example-component` 文件夹，存放示例代码；

4、在 `docs/components` 目录下新建`example-component.md`，写组件的说明文档，文档中可引入 demo 中的代码，例如：

5、在`src/example-component/__tests__/`目录添加组件的测试代码；

```js
<code src="demo/example-component/1.jsx">
```

说明文档应该至少包括“何时使用”、“代码演示”、“API”

6、代码编写完毕，需要在 `src/index.jsx` 或 `src/index.d.ts` 中添加对于的包导出：

```js
// 示例
export { default as MulInput } from './mul-input';
```
