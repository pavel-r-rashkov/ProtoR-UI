import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { ValidationMessageComponent } from './validation/validation-message/validation-message.component';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';

@NgModule({
  declarations: [
    ValidationMessageComponent,
    ConfirmationPopupComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  exports: [
    ValidationMessageComponent,
    ConfirmationPopupComponent,
  ]
})
export class SharedModule { }
