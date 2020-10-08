import * as React from 'react';

import LocaleContext from './context';
import { MulInputLocale } from '../mul-input';

export const ANT_MARK = 'internalMark';

export interface Locale {
  locale: string;
  global?: Object;
  MulInput: MulInputLocale;
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
