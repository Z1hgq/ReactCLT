import * as React from 'react';

import LocaleContext from './context';

export const ANT_MARK = 'internalMark';

export interface Locale {
  locale: string;
  global?: Object;
}

export interface LocaleProviderProps {
  locale: Locale;
  children?: React.ReactNode;
  _ANT_MARK__?: string;
}

export default class LocaleProvider extends React.Component<
  LocaleProviderProps,
  any
> {
  static defaultProps = {
    locale: {},
  };

  constructor(props: LocaleProviderProps) {
    super(props);

    console.warn(
      props._ANT_MARK__ === ANT_MARK,
      'LocaleProvider',
      '`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale',
    );
  }

  render() {
    const { locale, children } = this.props;

    return (
      <LocaleContext.Provider value={{ ...locale, exist: true }}>
        {children}
      </LocaleContext.Provider>
    );
  }
}
