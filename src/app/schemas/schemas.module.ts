import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { SchemasRoutingModule } from './schemas-routing.module';
import { SchemasComponent } from './schemas.component';
import { SchemaFormComponent } from './schema-form/schema-form.component';
import { SchemaListComponent } from './schema-list/schema-list.component';
import { CreateSchemaPopupComponent } from './create-schema-popup/create-schema-popup.component';
import { ViewSchemaPopupComponent } from './view-schema-popup/view-schema-popup.component';
import { monacoConfig } from './editor-config';

@NgModule({
  declarations: [
    SchemasComponent,
    SchemaFormComponent,
    SchemaListComponent,
    CreateSchemaPopupComponent,
    ViewSchemaPopupComponent,
  ],
  imports: [
    CommonModule,
    SchemasRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MonacoEditorModule.forRoot(monacoConfig),
  ]
})
export class SchemasModule { }
