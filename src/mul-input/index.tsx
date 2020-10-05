import * as React from 'react';
import cn from 'classnames';
const { forwardRef, useState, useRef, useEffect } = React;

/**
 * 处理输入的值
 * @param {string} text 输入的值
 */
function handleInput(text: string = '') {
  const arr = text ? text.split(';') : [];
  let validatedOutputs: string[] = [];
  let curText: string = '';
  // 将输入值用';'分开后加入
  for (const item of arr) {
    if (item.length > 0) {
      validatedOutputs.push(item);
    } else {
      break;
    }
  }
  const tabsStr = validatedOutputs.join(';');
  if (tabsStr != text) {
    curText = text.replace(`${tabsStr};`, '');
  }
  return {
    validatedOutputs,
    curText,
  };
}
/**
 * 删除图标
 * @param {*} props
 */
const CloseIcon = props => {
  const { onClick = () => {} } = props;
  const path =
    'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z';
  return (
    <span className="reactCLT-mul-input-rect-suffix" onClick={onClick}>
      <i
        aria-label="图标: close-circle"
        role="button"
        tabIndex={-1}
        className="anticon anticon-close-circle ant-input-clear-icon"
      >
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="close-circle"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d={path} />
        </svg>
      </i>
    </span>
  );
};

export type MulInputOnchangeHandler = (
  text: string | undefined,
  arr: string[],
) => void;
export type SpanRef =
  | string
  | ((instance: HTMLSpanElement | null) => void)
  | React.RefObject<HTMLSpanElement>
  | null
  | undefined;
export interface MulInputProps {
  className?: string; // 自定样式类名
  style?: React.CSSProperties; // 自定义style
  value?: string; // 受控value
  onChange?: MulInputOnchangeHandler; // 输入值的回调函数
  placeholder?: string; // placeholder
}
interface CompoundedComponent
  extends React.ForwardRefExoticComponent<
    MulInputProps & React.RefAttributes<HTMLElement>
  > {
  __REACTCLT_MULINPUT: boolean;
}
const MulInput = forwardRef((props: MulInputProps, ref: SpanRef) => {
  const {
    className, // 自定样式类名
    style, // 自定义style
    value, // 受控value
    onChange = () => {}, // 输入值的回调函数
    placeholder = '多个输入用英文分号;分隔', // placeholder
  } = props;

  const [tabs, setTabs] = useState<string[]>([]); // 组件上的标签
  const [currentText, setCurrentText] = useState<string>(''); // 组件上的正在输入的值

  const inputEl = useRef<any>(null); // input框的ref

  /**
   * 校验输入值
   * @param {*} param 非受控时的输入值
   */
  const validate = () => {
    let text =
      tabs.join(';') +
      (tabs.length > 0 && currentText ? ';' : '') +
      currentText;
    if (value) {
      text = value;
    }
    const { validatedOutputs, curText } = handleInput(text);
    setTabs(validatedOutputs);
    setCurrentText(curText);
  };

  useEffect(() => {
    if (inputEl.current != document.activeElement) {
      validate();
    }
  }, [value]);

  const handleInputChange = e => {
    const targetValue: string = e.target.value;
    const outPutText =
      tabs.join(';') +
      (tabs.length > 0 && targetValue ? ';' : '') +
      targetValue;
    const { validatedOutputs, curText } = handleInput(outPutText);
    if (/;$/g.test(targetValue)) {
      validate();
      onChange(
        `${validatedOutputs.join(';')}${
          validatedOutputs.length > 0 && curText ? ';' : ''
        }${curText}`,
        validatedOutputs,
      );
    } else {
      setCurrentText(targetValue);
      onChange(outPutText, validatedOutputs);
    }
  };
  /**
   * 失去焦点事件
   * @param {*} e
   */
  const handleInputBlur = () => {
    validate();
  };
  /**
   * 使用删除键删除和回车添加事件
   * @param {*} e
   */
  const handleKeyDown = e => {
    if (e.keyCode == 8) {
      // 如果输入框没有内容, 再按消除键就删掉最后一个邮箱
      if (currentText == '') {
        const tempInputs = tabs.slice(0, -1);
        setTabs(tempInputs);
        onChange(tempInputs.join(';'), tempInputs);
      }
    }
    // 如果是回车键那么就执行添加操作
    if (e.keyCode == 13) {
      validate();
    }
  };
  const deleteInput = itemIndex => {
    const tempInputs = tabs.filter((item, index) => index !== itemIndex);
    setTabs(tempInputs);
    onChange(
      `${tempInputs.join(';')}${
        tempInputs.length > 0 && currentText ? ';' : ''
      }${currentText}`,
      tempInputs,
    );
  };

  return (
    <span
      ref={ref}
      className={cn('reactCLT-mul-input', className)}
      style={style}
      onClick={() => {
        inputEl && inputEl.current.focus();
      }}
    >
      <span onClick={e => e.stopPropagation()}>
        {tabs.map((item, index) => {
          return (
            <span key={index} className="reactCLT-mul-input-rect">
              {item}
              <CloseIcon onClick={() => deleteInput(index)} />
            </span>
          );
        })}
      </span>
      <input
        ref={inputEl}
        value={currentText}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </span>
  );
}) as CompoundedComponent;

MulInput.__REACTCLT_MULINPUT = true;
MulInput.displayName = 'MulInput';

export default MulInput;
