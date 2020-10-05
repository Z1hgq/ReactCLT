import React, { useState } from 'react';
import { MulInput } from 'reactCLT';

export default () => {
  const [value, setValue] = useState('123;321;456');
  const onChange = (str, arr) => {
    setValue(str);
  };
  return <MulInput value={value} onChange={onChange} />;
};
