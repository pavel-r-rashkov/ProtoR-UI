import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { GroupForm } from '../group-form/group-form';

@Component({
  selector: 'app-create-group-popup',
  templateUrl: './create-group-popup.component.html',
  styleUrls: ['./create-group-popup.component.scss']
})
export class CreateGroupPopupComponent {
  @Output() formSubmit: EventEmitter<GroupForm> = new EventEmitter<GroupForm>();
  groupForm: FormControl = new FormControl({});
  submitDisabled: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CreateGroupPopupComponent>)
  { }

  createGroup(): void {
    this.submitDisabled = true;
    this.formSubmit.emit(this.groupForm.value);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
