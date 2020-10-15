import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchemasComponent } from './schemas.component';

const routes: Routes = [
  { path: '/{groupId}', component: SchemasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchemasRoutingModule { }
