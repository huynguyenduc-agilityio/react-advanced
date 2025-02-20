import { HTTP_METHOD } from '@/constants';

export type httpsMethod = keyof typeof HTTP_METHOD;

export interface RequestOptions {
  method: httpsMethod;
  headers?: Record<string, string>;
  body?: string;
}
