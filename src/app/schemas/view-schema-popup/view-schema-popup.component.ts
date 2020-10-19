import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewSchemaData } from './view-schema-data';

@Component({
  selector: 'app-view-schema-popup',
  templateUrl: './view-schema-popup.component.html',
  styleUrls: ['./view-schema-popup.component.scss']
})
export class ViewSchemaPopupComponent {
  editorOptions: any = {
    language: 'protobuf',
    theme: 'protobuf-theme',
    readOnly: true,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ViewSchemaData,
    private dialogRef: MatDialogRef<ViewSchemaPopupComponent>) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }  
}
