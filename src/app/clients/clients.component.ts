import { Component, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { Client, ClientsService, PagedResult } from '@core';
import { PagedGrid, GridState, ConfirmationPopupComponent } from '@shared';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientListItem } from './client-list/client-list-item';
import { ClientPopupData } from './client-popup/client-popup-data';
import { ClientPopupComponent } from './client-popup/client-popup.component';
import { ClientForm } from './client-form/client-form';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  @ViewChild(ClientListComponent) clientList?: ClientListComponent;
  pagedItems: PagedGrid<ClientListItem> = new PagedGrid<ClientListItem>();
  private clients: Client[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private clientsService: ClientsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  gridStateChanged(state: GridState): void {
    this.loadClients(state);
  }

  openCreateClientDialog(): void {
    const popupData: ClientPopupData = {};

    const dialogRef = this.dialog.open(ClientPopupComponent, {
      width: '550px',
      panelClass: 'overflow-dialog',
      data: popupData,
    });

    const dialogSubscription = dialogRef.componentInstance.formSubmit.subscribe((client: ClientForm) => {
      const subscription = this.clientsService
        .createClient(client)
        .subscribe(
          () => {
            this.clientList?.resetGrid();
            dialogRef.close();
            this.snackBar.open('Client created', '', { duration: 2000 });
          },
          () => {
            dialogRef.componentInstance.submitDisabled = false;
            this.snackBar.open('An error occured while creating a client', '', { duration: 2000 });
          });

      this.subscriptions.add(subscription);
    });

    this.subscriptions.add(dialogSubscription);
  }

  openUpdateClientDialog(clientToEdit: ClientListItem): void {
    const client = this.clients.find(r => r.id === clientToEdit.id);
    const popupData: ClientPopupData = {
      client: client,
    };

    const dialogRef = this.dialog.open(ClientPopupComponent, {
      width: '550px',
      panelClass: 'overflow-dialog',
      data: popupData,
    });

    const dialogSubscription = dialogRef.componentInstance.formSubmit.subscribe((clientForm: ClientForm) => {
      const subscription = this.clientsService
        .updateClient(clientForm)
        .subscribe(
          () => {
            this.clientList?.resetGrid();
            dialogRef.close();
            this.snackBar.open('Client updated', '', { duration: 2000 });
          },
          () => {
            dialogRef.componentInstance.submitDisabled = false;
            this.snackBar.open('An error occured while updating a client', '', { duration: 2000 });
          });

      this.subscriptions.add(subscription);
    });

    this.subscriptions.add(dialogSubscription);
  }

  deleteClientClicked(client: ClientListItem): void {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      width: '550px',
    });

    const subscription = dialogRef
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.deleteClient(client.id);
        }
      });

    this.subscriptions.add(subscription);
  }

  private loadClients(state: GridState): void {
    const subscription = this.clientsService
      .getClients(state)
      .subscribe((clients: PagedResult<Client>) => {
        this.clients = clients.items;
        this.pagedItems = {
          items: this.mapToListItem(clients.items),
          totalCount: clients.totalCount,
        };
      });

    this.subscriptions.add(subscription);
  }

  private deleteClient(id: number): void {
    const subscription = this.clientsService
      .deleteClient(id)
      .subscribe(
        () => {
          this.clientList?.resetGrid();
          this.snackBar.open('Client deleted', '', { duration: 2000 });
        },
        () => {
          this.snackBar.open('An error occured while deleting a client', '', { duration: 2000 });
        });

    this.subscriptions.add(subscription);
  }

  private mapToListItem(clients: Client[]): ClientListItem[] {
    return clients.map(client => ({
      ...client,
      grantTypes: client.grantTypes.join(', '),
      redirectUris: client.redirectUris.join(', '),
      postLogoutRedirectUris: client.postLogoutRedirectUris.join(', '),
      allowedCorsOrigins: client.allowedCorsOrigins.join(', '),
      groupRestrictions: client.groupRestrictions.join(', '),
    }));
  }
}

// chip component
// pass validator to chip component
// chip comp errors
// secret validator
// group restriction validator
// secret hide
// roles infinite scroll
// client id validator
