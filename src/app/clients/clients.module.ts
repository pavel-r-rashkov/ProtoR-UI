import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { SharedModule } from '@shared';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientPopupComponent } from './client-popup/client-popup.component';


@NgModule({
  declarations: [
    ClientsComponent,
    ClientListComponent,
    ClientFormComponent,
    ClientPopupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ClientsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule,
  ]
})
export class ClientsModule { }
