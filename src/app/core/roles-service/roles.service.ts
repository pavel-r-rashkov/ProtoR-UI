import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { GridState } from '@shared';
import { PagedResult } from '../models/paged-result';
import { Role } from '../models/role';
import { ModifyRole } from '../models/modify-role';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor() { }

  getRoles(state: GridState): Observable<PagedResult<Role>> {
    return of({ items: ROLES, totalCount: 100 }).pipe(delay(1500));
  }

  updateRole(role: ModifyRole): Observable<any> {
    return of({}).pipe(delay(1500));
  }

  createRole(role: ModifyRole): Observable<any> {
    return of({}).pipe(delay(1500));
  }

  deleteRole(roleId: number): Observable<any> {
    return of({}).pipe(delay(1500));
  }
}

const ROLES: Role[] = [
  { id: 1, name: 'Role 1', createdBy: 'testuser', createdOn: new Date(), permissions: [1, 2, 5] },
  { id: 2, name: 'Role 1', createdBy: 'testuser', createdOn: new Date(), permissions: [3, 8, 9] },
  { id: 3, name: 'Role 1', createdBy: 'testuser', createdOn: new Date(), permissions: [] },
  { id: 4, name: 'Role 1', createdBy: 'testuser', createdOn: new Date(), permissions: [] },
  { id: 5, name: 'Role 1', createdBy: 'testuser', createdOn: new Date(), permissions: [] },
  { id: 6, name: 'Role 1', createdBy: 'testuser', createdOn: new Date(), permissions: [] },
  { id: 7, name: 'Role 1', createdBy: 'testuser', createdOn: new Date(), permissions: [] },
  { id: 8, name: 'Role 1', createdBy: 'testuser', createdOn: new Date(), permissions: [] },
  { id: 9, name: 'Role 1', createdBy: 'testuser', createdOn: new Date(), permissions: [] },
  { id: 10, name: 'Role 1', createdBy: 'testuser', createdOn: new Date(), permissions: [] },
];
