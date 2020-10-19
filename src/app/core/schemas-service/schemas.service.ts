import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { GridState } from '@shared';
import { PagedResult } from '../models/paged-result';
import { Schema } from '../models/schema';

@Injectable({
  providedIn: 'root'
})
export class SchemasService {

  constructor() { }

  getSchemas(groupName: string, state: GridState): Observable<PagedResult<Schema>> {
    return of({ items: ITEMS, totalCount: 100 }).pipe(delay(2000));
  }

  createSchema(groupName: string, schema: any): Observable<any> {
    return of({}).pipe(delay(1500));

    //const throwingObservable = throwError({});
    //return timer(1500).pipe(mergeMap(e => throwingObservable));
  }
}

const ITEMS: Schema[] = [
  {
    id: 1,
    version: 1,
    contents: 'syntax = "proto3";',
    createdBy: 'test user',
    createdOn: new Date(),
  },
  {
    id: 2,
    version: 2,
    contents: 'syntax = "proto3";',
    createdBy: 'test user',
    createdOn: new Date(),
  },
  {
    id: 3,
    version: 3,
    contents: 'syntax = "proto3";',
    createdBy: 'test user',
    createdOn: new Date(),
  },
  {
    id: 4,
    version: 4,
    contents: 'syntax = "proto3";',
    createdBy: 'test user',
    createdOn: new Date(),
  },
  {
    id: 5,
    version: 5,
    contents: 'syntax = "proto3";',
    createdBy: 'test user',
    createdOn: new Date(),
  },
  {
    id: 6,
    version: 6,
    contents: 'syntax = "proto3";',
    createdBy: 'test user',
    createdOn: new Date(),
  },
  {
    id: 7,
    version: 7,
    contents: 'syntax = "proto3";',
    createdBy: 'test user',
    createdOn: new Date(),
  },
  {
    id: 8,
    version: 8,
    contents: 'syntax = "proto3";',
    createdBy: 'test user',
    createdOn: new Date(),
  },
  {
    id: 9,
    version: 9,
    contents: 'syntax = "proto3";',
    createdBy: 'test user',
    createdOn: new Date(),
  },
  {
    id: 10,
    version: 10,
    contents: 'syntax = "proto3";',
    createdBy: 'test user',
    createdOn: new Date(),
  },
];
