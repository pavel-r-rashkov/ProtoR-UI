import { Component, Output, Inject, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ClientPopupData } from './client-popup-data';
import { ClientForm } from '../client-form/client-form';

@Component({
  selector: 'app-client-popup',
  templateUrl: './client-popup.component.html',
  styleUrls: ['./client-popup.component.scss']
})
export class ClientPopupComponent {
  @Output() formSubmit: EventEmitter<ClientForm> = new EventEmitter<ClientForm>();
  clientForm: FormControl = new FormControl({});
  submitDisabled: boolean = false;
  isNewClient: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ClientPopupData,
    private dialogRef: MatDialogRef<ClientPopupComponent>) {

    this.isNewClient = !data.client;

    if (data.client) {
      const form: ClientForm | undefined = this.data.client;
      this.clientForm.setValue(form);
    }
  }

  submitForm(): void {
    this.submitDisabled = true;
    this.formSubmit.emit(this.clientForm.value);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
