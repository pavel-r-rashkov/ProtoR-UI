export interface Client {
  id: number;
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
  createdOn: Date;
  createdBy: string;
}
