import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { SchemaForm } from '../schema-form/schema-form';

@Component({
  selector: 'app-create-schema-popup',
  templateUrl: './create-schema-popup.component.html',
  styleUrls: ['./create-schema-popup.component.scss']
})
export class CreateSchemaPopupComponent {
  @Output() formSubmit: EventEmitter<SchemaForm> = new EventEmitter<SchemaForm>();
  schemaForm: FormControl = new FormControl({});
  submitDisabled: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CreateSchemaPopupComponent>) { }

  createSchema(): void {
    this.submitDisabled = true;
    this.formSubmit.emit(this.schemaForm.value);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
