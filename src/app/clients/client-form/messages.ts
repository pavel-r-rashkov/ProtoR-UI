import { IMessages } from '@shared';

export const VALIDATION_MESSAGES: IMessages = {
  clientId: {
    maxlength: (error: any) => `Maximum length is ${error.requiredLength}`,
    required: 'Client ID is required',
  },
  clientName: {
    maxlength: (error: any) => `Maximum length is ${error.requiredLength}`,
    required: 'Client name is required',
  },
  secret: {
    maxlength: (error: any) => `Maximum length is ${error.requiredLength}`,
    minlength: (error: any) => `Minimum length is ${error.requiredLength}`,
    required: 'Secret is required',
  },
  grantTypes: {
    minCount: 'At least one grant type is required',
  },
  groupRestrictions: {
    minCount: 'At least one group restriction is required',
  },
  redirectUris: {
    minCount: 'At least one redirect URI is required',
    uri: 'Needs to be a valid URI',
  },
};
