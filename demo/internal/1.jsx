import React, { useEffect, useState } from 'react';
import { MulInput, LocaleProvider } from 'rclt';
import { Radio } from 'antd';

export default () => {
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('zh_CN');
  const [locale, setLocale] = useState({});
  const onChange = (str, arr) => {
    setValue(str);
  };

  useEffect(() => {
    setLocale(getLocale());
  }, [language]);

  const getLocale = () => {
    const context = require.context(
      '../../lib/locale-provider',
      false,
      /\.js$/,
    );
    return context(`./${language}.js`);
  };

  const onLanguageChange = e => {
    const lang = e.target.value;
    setLanguage(lang);
  };
  return (
    <LocaleProvider locale={locale.default}>
      <Radio.Group onChange={onLanguageChange} value={language}>
        <Radio.Button value="zh_CN">zh_CN</Radio.Button>
        <Radio.Button value="en_US">en_US</Radio.Button>
      </Radio.Group>
      <MulInput
        value={value}
        onChange={onChange}
        style={{ marginTop: '32px' }}
      />
    </LocaleProvider>
  );
};
