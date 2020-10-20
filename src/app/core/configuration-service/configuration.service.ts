import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Configuration } from '../models/configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

  getGroupConfiguration(groupName: string): Observable<Configuration> {
    return of(groupConfiguration).pipe(delay(1500));
  }

  getGlobalConfiguration(): Observable<Configuration> {
    return of(globalConfiguration).pipe(delay(1500));
  }

  saveConfiguration(configuration: Configuration): Observable<any> {
    return of({}).pipe(delay(1500));
  }
}

const groupConfiguration: Configuration = {
  id: 1,
  transitive: false,
  forwardCompatible: true,
  backwardCompatible: false,
  inherit: true,
  ruleConfigurations: [
    { ruleCode: 'PB0001', severity: 1, inherit: true },
    { ruleCode: 'PB0002', severity: 2, inherit: false },
    { ruleCode: 'PB0003', severity: 2, inherit: false },
  ],
};

const globalConfiguration: Configuration = {
  id: 1,
  transitive: true,
  forwardCompatible: true,
  backwardCompatible: true,
  inherit: false,
  ruleConfigurations: [
    { ruleCode: 'PB0001', severity: 3, inherit: false },
    { ruleCode: 'PB0002', severity: 3, inherit: false },
    { ruleCode: 'PB0003', severity: 3, inherit: false },
  ],
};
