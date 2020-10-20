import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, forkJoin, throwError, of } from 'rxjs';
import { flatMap, tap, finalize, catchError } from 'rxjs/operators';

import { Configuration, ConfigurationService } from '@core';
import { ConfigurationForm } from './configuration-form/configuration-form';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  control: FormControl = new FormControl();
  globalConfiguration?: ConfigurationForm;
  submitDisabled: boolean = false;
  groupName?: string | null;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private configurationService: ConfigurationService) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  saveConfiguration(): void {
    const formValue: ConfigurationForm = this.control.value;
    const configuration: Configuration = { ...formValue, id: 1 };
    this.submitDisabled = true;

    const subscription = this.configurationService.saveConfiguration(configuration)
      .pipe(
        tap(() => {
          this.snackBar.open('Configuration saved', '', { duration: 2000 });
        }),
        catchError(err => {
          this.snackBar.open('An error occured while saving configuration', '', { duration: 2000 });

          return throwError(err);
        }),
        finalize(() => {
          this.submitDisabled = false;
        }),
      )
      .subscribe();

    this.subscriptions.add(subscription);
  }

  private loadData(): void {
    const subscription = this.route.paramMap
      .pipe(
        flatMap(params => {
          this.groupName = params.get('group');

          return forkJoin(
            this.groupName
              ? this.configurationService.getGroupConfiguration(this.groupName)
              : this.configurationService.getGlobalConfiguration(),
            this.groupName
              ? this.configurationService.getGlobalConfiguration()
              : of(null),
          )
        }),
        tap(configurations => {
          this.control.setValue(configurations[0]);

          if (configurations[1]) {
            this.globalConfiguration = configurations[1];
          }
        }),
      )
      .subscribe();

    this.subscriptions.add(subscription);
  }
}
