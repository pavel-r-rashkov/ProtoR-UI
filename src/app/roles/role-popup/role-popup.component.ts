import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SelectItem } from '@shared';
import { RoleForm } from '../role-form/role-form';
import { RolePopupData } from './role-popup-data';

@Component({
  selector: 'app-role-popup',
  templateUrl: './role-popup.component.html',
  styleUrls: ['./role-popup.component.scss']
})
export class RolePopupComponent {
  @Output() formSubmit: EventEmitter<RoleForm> = new EventEmitter<RoleForm>();
  permissions: SelectItem[] = [];
  roleForm: FormControl = new FormControl({});
  submitDisabled: boolean = false;
  isNewRole: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: RolePopupData,
    private dialogRef: MatDialogRef<RolePopupComponent>) {

    this.isNewRole = !data.role;

    if (data.role) {
      const form: RoleForm | undefined = this.data.role;
      this.roleForm.setValue(form);
    }
    
    this.permissions = data.permissions.map(p => ({ id: p.id, displayName: p.name }));
  }

  submitForm(): void {
    this.submitDisabled = true;
    this.formSubmit.emit(this.roleForm.value);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
