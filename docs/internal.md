---
title: 多语言
order: 4
---

# 多语言

## 开发

1、在`src/local-provider/index.tsx`的接口`Locale`中定义组件国际化数据对象的类型；

```ts
// 各组件的国际化数据类型在组件内部进行定义，src/mul-input/index.tsx
export interface MulInputLocale {
  placeholder?: string;
}
// src/local-provider/index.tsx
import { MulInputLocale } from '../mul-input';
export interface Locale {
  locale: string;
  global?: Object;
  MulInput: MulInputLocale; //新增的组件
}
```

2、在`src/local/xxx.tsx`各种语言中加入组件需要国际化的数据；

```ts
// src/local/default.tsx
import { Locale } from '../locale-provider';
const localeValues: Locale = {
  locale: 'en',
  global: {
    placeholder: 'Please select',
  },
  MulInput: {
    placeholder: 'Please use semicolons to separate multiple inputs',
  },
};
export default localeValues;
```

3、在组件内部使用`LocaleReceiver`和`defaultLocale`来引入词条，默认语言类型为英文；

```js
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';

<LocaleReceiver componentName="MulInput" defaultLocale={defaultLocale.MulInput}>
  {(locale: MulInputLocale) => {
    return (
      <input
        ref={inputEl}
        value={currentText}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        title={placeholder || locale.placeholder}
        placeholder={placeholder || locale.placeholder}
      />
    );
  }}
</LocaleReceiver>;
```

## 使用

<code src="../demo/internal/1.jsx">

## 支持

目前支持以下语言：

| 语言         | 文件名 |
| ------------ | ------ |
| 英语（美式） | en_US  |
| 简体中文     | zh_CN  |
