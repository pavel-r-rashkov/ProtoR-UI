import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Permission } from '../models/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor() { }

  getPermissions(): Observable<Permission[]> {
    return of(permissions).pipe(delay(1500));
  }
}

const permissions: Permission[] = [
  { id: 1, name: 'Permissions 1' },
  { id: 2, name: 'Permissions 2' },
  { id: 3, name: 'Permissions 3' },
  { id: 4, name: 'Permissions 4' },
  { id: 5, name: 'Permissions 5' },
  { id: 6, name: 'Permissions 6' },
  { id: 7, name: 'Permissions 7' },
  { id: 8, name: 'Permissions 8' },
  { id: 9, name: 'Permissions 9' },
];
