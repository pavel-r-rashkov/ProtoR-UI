export interface ClientForm {
  clientId: string;
  clientName: string;
  secret: string;
  grantTypes: string[];
  redirectUris: string[];
  postLogoutRedirectUris: string[];
  allowedCorsOrigins: string[];
  roleBindings: number[];
  groupRestrictions: string[];
  isActive: boolean;
}
