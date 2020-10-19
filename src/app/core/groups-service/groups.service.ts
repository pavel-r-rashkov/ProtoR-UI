import { Injectable } from '@angular/core';

import { Observable, of, throwError, timer } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

import { GridState } from '@shared';
import { Group } from '../models/group';
import { PagedResult } from '../models/paged-result';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor() { }

  getGroups(state: GridState): Observable<PagedResult<Group>> {
    return of({ items: ITEMS, totalCount: 100 }).pipe(delay(2000));
  }

  createGroup(group: any): Observable<any> {
    return of({}).pipe(delay(1500));

    //const throwingObservable = throwError({});
    //return timer(1500).pipe(mergeMap(e => throwingObservable));
  }

  deleteGroup(groupName: string): Observable<any> {
    return of({}).pipe(delay(1500));
  }
}

const ITEMS: Group[] = [
  {
    id: 1,
    name: 'Group A',
    createdBy: 'John',
    createdOn: new Date(),
  },
  {
    id: 2,
    name: 'Group B',
    createdBy: 'Sue',
    createdOn: new Date(),
  },
  {
    id: 3,
    name: 'Group C',
    createdBy: 'Alice',
    createdOn: new Date(),
  },
  {
    id: 4,
    name: 'Group D',
    createdBy: 'John',
    createdOn: new Date(),
  },
  {
    id: 5,
    name: 'Group E',
    createdBy: 'Peter',
    createdOn: new Date(),
  },
  {
    id: 6,
    name: 'Group F',
    createdBy: 'Peter',
    createdOn: new Date(),
  },
  {
    id: 7,
    name: 'Group G',
    createdBy: 'Meryl',
    createdOn: new Date(),
  },
  {
    id: 8,
    name: 'Group H',
    createdBy: 'Sue',
    createdOn: new Date(),
  },
  {
    id: 9,
    name: 'Group I',
    createdBy: 'Jim',
    createdOn: new Date(),
  },
  {
    id: 10,
    name: 'Group J',
    createdBy: 'Sue',
    createdOn: new Date(),
  },
];
