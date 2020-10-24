import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { GridState } from '@shared';
import { Client } from '../models/client';
import { PagedResult } from '../models/paged-result';
import { ModifyClient } from '../models/modify-client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor() { }

  getClients(state: GridState): Observable<PagedResult<Client>> {
    return of({ items: CLIENTS, totalCount: 100 }).pipe(delay(2000));
  }

  createClient(client: ModifyClient): Observable<any> {
    return of({}).pipe(delay(1500));
  }

  updateClient(client: ModifyClient): Observable<any> {
    return of({}).pipe(delay(1500));
  }

  deleteClient(id: number): Observable<any> {
    return of({}).pipe(delay(1500));
  }
}

const CLIENTS: Client[] = [
  {
    id: 1,
    secret: 'Qwertyuiop[]as1!',
    clientId: 'client1',
    clientName: 'Client 1',
    grantTypes: ['authorization_code'],
    redirectUris: ['http://localhost:1234/'],
    postLogoutRedirectUris: ['http://localhost:1234/'],
    allowedCorsOrigins: ['http://localhost:1234'],
    roleBindings: [1, 2, 3],
    groupRestrictions: ['*', 'dev-*'],
    isActive: true,
    createdOn: new Date(),
    createdBy: 'testuser',
  },
  {
    id: 2,
    secret: 'Qwertyuiop[]as1!',
    clientId: 'client2',
    clientName: 'Client 2',
    grantTypes: ['authorization_code'],
    redirectUris: ['http://localhost:1234/'],
    postLogoutRedirectUris: ['http://localhost:1234/'],
    allowedCorsOrigins: ['http://localhost:1234'],
    roleBindings: [1, 2, 3],
    groupRestrictions: ['*', 'dev-*'],
    isActive: true,
    createdOn: new Date(),
    createdBy: 'testuser',
  },
  {
    id: 3,
    secret: 'Qwertyuiop[]as1!',
    clientId: 'client3',
    clientName: 'Client 3',
    grantTypes: ['authorization_code'],
    redirectUris: ['http://localhost:1234/'],
    postLogoutRedirectUris: ['http://localhost:1234/'],
    allowedCorsOrigins: ['http://localhost:1234'],
    roleBindings: [1, 2, 3],
    groupRestrictions: ['*', 'dev-*'],
    isActive: true,
    createdOn: new Date(),
    createdBy: 'testuser',
  },
  {
    id: 4,
    secret: 'Qwertyuiop[]as1!',
    clientId: 'client4',
    clientName: 'Client 4',
    grantTypes: ['authorization_code'],
    redirectUris: ['http://localhost:1234/'],
    postLogoutRedirectUris: ['http://localhost:1234/'],
    allowedCorsOrigins: ['http://localhost:1234'],
    roleBindings: [1, 2, 3],
    groupRestrictions: ['*', 'dev-*'],
    isActive: true,
    createdOn: new Date(),
    createdBy: 'testuser',
  },
  {
    id: 5,
    secret: 'Qwertyuiop[]as1!',
    clientId: 'client5',
    clientName: 'Client 5',
    grantTypes: ['authorization_code'],
    redirectUris: ['http://localhost:1234/'],
    postLogoutRedirectUris: ['http://localhost:1234/'],
    allowedCorsOrigins: ['http://localhost:1234'],
    roleBindings: [1, 2, 3],
    groupRestrictions: ['*', 'dev-*'],
    isActive: true,
    createdOn: new Date(),
    createdBy: 'testuser',
  },
  {
    id: 6,
    secret: 'Qwertyuiop[]as1!',
    clientId: 'client6',
    clientName: 'Client 6',
    grantTypes: ['authorization_code'],
    redirectUris: ['http://localhost:1234/'],
    postLogoutRedirectUris: ['http://localhost:1234/'],
    allowedCorsOrigins: ['http://localhost:1234'],
    roleBindings: [1, 2, 3],
    groupRestrictions: ['*', 'dev-*'],
    isActive: true,
    createdOn: new Date(),
    createdBy: 'testuser',
  },
  {
    id: 7,
    secret: 'Qwertyuiop[]as1!',
    clientId: 'client7',
    clientName: 'Client 7',
    grantTypes: ['authorization_code'],
    redirectUris: ['http://localhost:1234/'],
    postLogoutRedirectUris: ['http://localhost:1234/'],
    allowedCorsOrigins: ['http://localhost:1234'],
    roleBindings: [1, 2, 3],
    groupRestrictions: ['*', 'dev-*'],
    isActive: true,
    createdOn: new Date(),
    createdBy: 'testuser',
  },
  {
    id: 8,
    secret: 'Qwertyuiop[]as1!',
    clientId: 'client8',
    clientName: 'Client 8',
    grantTypes: ['authorization_code'],
    redirectUris: ['http://localhost:1234/'],
    postLogoutRedirectUris: ['http://localhost:1234/'],
    allowedCorsOrigins: ['http://localhost:1234'],
    roleBindings: [1, 2, 3],
    groupRestrictions: ['*', 'dev-*'],
    isActive: true,
    createdOn: new Date(),
    createdBy: 'testuser',
  },
  {
    id: 9,
    secret: 'Qwertyuiop[]as1!',
    clientId: 'client9',
    clientName: 'Client 9',
    grantTypes: ['authorization_code'],
    redirectUris: ['http://localhost:1234/'],
    postLogoutRedirectUris: ['http://localhost:1234/'],
    allowedCorsOrigins: ['http://localhost:1234'],
    roleBindings: [1, 2, 3],
    groupRestrictions: ['*', 'dev-*'],
    isActive: true,
    createdOn: new Date(),
    createdBy: 'testuser',
  },
  {
    id: 10,
    secret: 'Qwertyuiop[]as1!',
    clientId: 'client10',
    clientName: 'Client 10',
    grantTypes: ['authorization_code'],
    redirectUris: ['http://localhost:1234/'],
    postLogoutRedirectUris: ['http://localhost:1234/'],
    allowedCorsOrigins: ['http://localhost:1234'],
    roleBindings: [1, 2, 3],
    groupRestrictions: ['*', 'dev-*'],
    isActive: true,
    createdOn: new Date(),
    createdBy: 'testuser',
  },
];
