import { InjectionToken } from '@angular/core';

export const MESSAGES_TOKEN = new InjectionToken<string>('MessagesToken');

export type MessageGenerator = (error: any) => string;

export interface IMessages {
  [key: string]: { [key: string]: (string | MessageGenerator | undefined) }
}
