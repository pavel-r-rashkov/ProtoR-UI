import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { PagedGrid, GridState, ConfirmationPopupComponent } from '@shared';
import { RolesService, PagedResult, Role, Permission, PermissionsService } from '@core';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleListItem } from './role-list/role-list-item';
import { RolePopupComponent } from './role-popup/role-popup.component';
import { RoleForm } from './role-form/role-form';
import { RolePopupData } from './role-popup/role-popup-data';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, OnDestroy {
  @ViewChild(RoleListComponent) roleList?: RoleListComponent;
  pagedItems: PagedGrid<RoleListItem> = new PagedGrid<RoleListItem>();
  private roles: Role[] = [];
  private permissions: Permission[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private rolesService: RolesService,
    private permissionsService: PermissionsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadPermissions();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  gridStateChanged(state: GridState): void {
    this.loadRoles(state);
  }

  openCreateRoleDialog(): void {
    const popupData: RolePopupData = {
      permissions: this.permissions,
    };

    const dialogRef = this.dialog.open(RolePopupComponent, {
      width: '550px',
      panelClass: 'overflow-dialog',
      data: popupData,
    });

    const dialogSubscription = dialogRef.componentInstance.formSubmit.subscribe((role: RoleForm) => {
      const subscription = this.rolesService
        .createRole(role)
        .subscribe(
          () => {
            this.roleList?.resetGrid();
            dialogRef.close();
            this.snackBar.open('Role created', '', { duration: 2000 });
          },
          () => {
            dialogRef.componentInstance.submitDisabled = false;
            this.snackBar.open('An error occured while creating a role', '', { duration: 2000 });
          });

      this.subscriptions.add(subscription);
    });

    this.subscriptions.add(dialogSubscription);
  }

  openUpdateRoleDialog(roleToEdit: RoleListItem): void {
    const role = this.roles.find(r => r.id === roleToEdit.id);
    const popupData: RolePopupData = {
      permissions: this.permissions,
      role: role,
    };

    const dialogRef = this.dialog.open(RolePopupComponent, {
      width: '550px',
      panelClass: 'overflow-dialog',
      data: popupData,
    });

    const dialogSubscription = dialogRef.componentInstance.formSubmit.subscribe((roleForm: RoleForm) => {
      const subscription = this.rolesService
        .updateRole(roleForm)
        .subscribe(
          () => {
            this.roleList?.resetGrid();
            dialogRef.close();
            this.snackBar.open('Role updated', '', { duration: 2000 });
          },
          () => {
            dialogRef.componentInstance.submitDisabled = false;
            this.snackBar.open('An error occured while updating a role', '', { duration: 2000 });
          });

      this.subscriptions.add(subscription);
    });

    this.subscriptions.add(dialogSubscription);
  }

  deleteRoleClicked(role: RoleListItem): void {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      width: '550px',
    });

    const subscription = dialogRef
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.deleteRole(role.id);
        }
      });

    this.subscriptions.add(subscription);
  }

  private loadRoles(state: GridState): void {
    const subscription = this.rolesService
      .getRoles(state)
      .subscribe((roles: PagedResult<Role>) => {
        this.roles = roles.items;
        this.pagedItems = roles;
      });

    this.subscriptions.add(subscription);
  }

  private loadPermissions(): void {
    const subscription = this.permissionsService
      .getPermissions()
      .subscribe((permissions: Permission[]) => {
        this.permissions = permissions;
      });

    this.subscriptions.add(subscription);
  }

  private deleteRole(id: number): void {
    const subscription = this.rolesService
      .deleteRole(id)
      .subscribe(
        () => {
          this.roleList?.resetGrid();
          this.snackBar.open('Role deleted', '', { duration: 2000 });
        },
        () => {
          this.snackBar.open('An error occured while deleting a role', '', { duration: 2000 });
        });

    this.subscriptions.add(subscription);
  }
}
