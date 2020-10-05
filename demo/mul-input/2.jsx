import React from 'react';
import { Form, Button } from 'antd';
import { MulInput } from 'rclt';

const validateEmails = (rule, value, callback) => {
  if (!value) {
    callback('该项为必填项');
  } else if (
    !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*(;\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*$/.test(
      value,
    )
  ) {
    callback('邮箱格式不正确');
  } else {
    callback();
  }
};

const validatePhoneNum = (rule, value, callback) => {
  if (!value) {
    callback('该项为必填项');
  } else if (!/^1[3456789]\d{9}(;1[3456789]\d{9})*$/.test(value)) {
    callback('请输入正确的手机号');
  } else {
    callback();
  }
};

const Example = props => {
  const { form } = props;
  const { validateFields, getFieldDecorator } = form;
  const save = () => {
    validateFields((err, values) => {
      if (err) return;
      const { email, phoneNum } = values;
      console.log(email, phoneNum);
    });
  };
  return (
    <div>
      <Form>
        <Form.Item label="请输入邮箱：">
          {getFieldDecorator('email', {
            initialValue: 'z11hgq@gmail.com',
            rules: [
              {
                validator: validateEmails,
              },
            ],
          })(<MulInput />)}
        </Form.Item>
        <Form.Item label="请输入手机号：">
          {getFieldDecorator('phoneNum', {
            initialValue: '15228940449',
            rules: [
              {
                validator: validatePhoneNum,
              },
            ],
          })(<MulInput />)}
        </Form.Item>
        <Form.Item>
          <Button onClick={save} htmlType="submit">
            {'保存'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create()(Example);
