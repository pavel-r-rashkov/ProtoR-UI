import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

import { ValidationMessageComponent } from './validation/validation-message/validation-message.component';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';
import { ChipInputComponent } from './validation/chip-input/chip-input.component';

@NgModule({
  declarations: [
    ValidationMessageComponent,
    ConfirmationPopupComponent,
    ChipInputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatChipsModule,
  ],
  exports: [
    ValidationMessageComponent,
    ConfirmationPopupComponent,
    ChipInputComponent,
  ]
})
export class SharedModule { }
