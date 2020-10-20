import { Component, OnDestroy, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { GridState, PagedGrid, ConfirmationPopupComponent } from '@shared';
import { GroupsService, PagedResult, Group } from '@core';
import { GroupListItem } from './group-list/group-list-item';
import { CreateGroupPopupComponent } from './create-group-popup/create-group-popup.component';
import { GroupForm } from './group-form/group-form';
import { GroupListComponent } from './group-list/group-list.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnDestroy {
  @ViewChild(GroupListComponent) groupList?: GroupListComponent;
  pagedItems: PagedGrid<GroupListItem> = new PagedGrid<GroupListItem>();
  private subscription: Subscription = new Subscription();

  constructor(
    private groupsService: GroupsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  gridStateChanged(state: GridState): void {
    this.getGroups(state);
  }

  openGroupDialog(): void {
    const dialogRef = this.dialog.open(CreateGroupPopupComponent, {
      width: '550px',
    });

    const dialogSubscription = dialogRef.componentInstance.formSubmit.subscribe((group: GroupForm) => {
      const subscription = this.groupsService
        .createGroup(group) // map
        .subscribe(
          () => {
            this.groupList?.resetGrid();
            dialogRef.close();
            this.snackBar.open('Group created', '', { duration: 2000 });
          },
          () => {
            dialogRef.componentInstance.submitDisabled = false;
            this.snackBar.open('An error occured while creating a group', '', { duration: 2000 });
          });

      this.subscription.add(subscription);
    });

    this.subscription.add(dialogSubscription);
  }

  viewSchemas(groupName: string): void {
    this.router.navigate(['schemas', { group: groupName }]);
  }

  viewConfiguration(groupName: string): void {
    this.router.navigate(['configuration', { group: groupName }]);
  }

  deleteGroupClicked(groupName: string): void {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      width: '550px',
    });

    const subscription = dialogRef
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.deleteGroup(groupName);
        }
      });

    this.subscription.add(subscription);
  }

  private deleteGroup(groupName: string): void {
    const subscription = this.groupsService
      .deleteGroup(groupName)
      .subscribe(
        () => {
          this.groupList?.resetGrid();
          this.snackBar.open('Group deleted', '', { duration: 2000 });
        },
        () => {
          this.snackBar.open('An error occured while deleting a group', '', { duration: 2000 });
        });

    this.subscription.add(subscription);
  }

  private getGroups(state: GridState): void {
    const subscription = this.groupsService
      .getGroups(state)
      .subscribe((groups: PagedResult<Group>) => {
        this.pagedItems = groups;
      });

    this.subscription.add(subscription);
  }
}

