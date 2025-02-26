import { ElementType, JSX } from 'react';

export type TDataSource = {
  id: string;
  [key: string]: string | string[] | number | boolean | undefined;
};

export type THeaderTable = {
  title?: string;
  key?: string;
  icon?: ElementType;
  isSort?: boolean;
  renderBody?: (_: TDataSource, index?: number) => JSX.Element;
};

export type TCellTable = {
  key?: string;
  content?: string | number | boolean | JSX.Element | string[] | undefined;
};
