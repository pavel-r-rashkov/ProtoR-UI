import { IMessages } from '@shared';

export const VALIDATION_MESSAGES: IMessages = {
  name: {
    maxlength: (error: any) => `Maximum length is ${error.requiredLength}`,
    required: 'Name is required',
  },
};
