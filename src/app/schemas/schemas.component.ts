import { Component, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { SchemasService, PagedResult, Schema } from '@core';
import { PagedGrid, GridState } from '@shared';
import { SchemaListItem } from './schema-list/schema-list-item';
import { SchemaListComponent } from './schema-list/schema-list.component';
import { CreateSchemaPopupComponent } from './create-schema-popup/create-schema-popup.component';
import { SchemaForm } from './schema-form/schema-form';
import { ViewSchemaPopupComponent } from './view-schema-popup/view-schema-popup.component';
import { ViewSchemaData } from './view-schema-popup/view-schema-data';

@Component({
  selector: 'app-schemas',
  templateUrl: './schemas.component.html',
  styleUrls: ['./schemas.component.scss']
})
export class SchemasComponent implements OnDestroy {
  @ViewChild(SchemaListComponent) groupList?: SchemaListComponent;
  pagedItems: PagedGrid<SchemaListItem> = new PagedGrid<SchemaListItem>();
  private groupName: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private schemasService: SchemasService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {

    this.readRouteData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  gridStateChanged(state: GridState): void {
    this.getSchamas(state);
  }

  openCreateSchemaDialog(): void {
    const dialogRef = this.dialog.open(CreateSchemaPopupComponent, {
      width: '900px',
      panelClass: 'overflow-dialog',
    });

    const dialogSubscription = dialogRef.componentInstance.formSubmit.subscribe((schema: SchemaForm) => {
      const subscription = this.schemasService
        .createSchema(this.groupName, schema) // map
        .subscribe(
          () => {
            this.groupList?.resetGrid();
            dialogRef.close();
            this.snackBar.open('Schema created', '', { duration: 2000 });
          },
          () => {
            dialogRef.componentInstance.submitDisabled = false;
            this.snackBar.open('An error occured while creating a schema', '', { duration: 2000 });
          });

      this.subscriptions.add(subscription);
    });

    this.subscriptions.add(dialogSubscription);
  }

  viewSchema(schema: SchemaListItem): void {
    const data: ViewSchemaData = {
      schema,
      groupName: this.groupName,
    }

    this.dialog.open(ViewSchemaPopupComponent, {
      width: '900px',
      data,
    });
  }

  private readRouteData(): void {
    const subscription = this.route.paramMap.subscribe(params => {
      this.groupName = params.get('group') || '';
    });

    this.subscriptions.add(subscription);
  }

  private getSchamas(state: GridState): void {
    const subscription = this.schemasService
      .getSchemas(this.groupName, state)
      .subscribe((groups: PagedResult<Schema>) => {
        this.pagedItems = groups;
      });

    this.subscriptions.add(subscription);
  }
}
