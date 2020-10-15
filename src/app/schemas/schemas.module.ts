import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemasRoutingModule } from './schemas-routing.module';
import { SchemasComponent } from './schemas.component';


@NgModule({
  declarations: [SchemasComponent],
  imports: [
    CommonModule,
    SchemasRoutingModule
  ]
})
export class SchemasModule { }
