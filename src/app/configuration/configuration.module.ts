import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { ConfigurationFormComponent } from './configuration-form/configuration-form.component';
import { RuleFormComponent } from './rule-form/rule-form.component';

@NgModule({
  declarations: [
    ConfigurationComponent,
    ConfigurationFormComponent,
    RuleFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConfigurationRoutingModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDividerModule,
    MatCardModule,
  ]
})
export class ConfigurationModule { }
