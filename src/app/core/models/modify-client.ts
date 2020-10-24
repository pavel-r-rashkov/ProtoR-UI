export interface ModifyClient {
  id?: number;
  secret: string;
  clientId: string;
  clientName: string;
  grantTypes: string[];
  redirectUris: string[];
  postLogoutRedirectUris: string[];
  allowedCorsOrigins: string[];
  roleBindings: number[];
  groupRestrictions: string[];
  isActive: boolean;
}
