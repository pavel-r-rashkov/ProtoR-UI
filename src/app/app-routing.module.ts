import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: 'clients', loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule) }, { path: 'configuration', loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule) }, { path: 'groups', loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule) }, { path: 'roles', loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule) }, { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
