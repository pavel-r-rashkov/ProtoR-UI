export interface ClientListItem {
  id: number;
  clientId: string;
  clientName: string;
  grantTypes: string;
  redirectUris: string;
  postLogoutRedirectUris: string;
  allowedCorsOrigins: string;
  groupRestrictions: string;
  isActive: boolean;
  createdOn: Date;
  createdBy: string;
}
