import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

import { GridState, PagedGrid, generateFakeItems, SortState } from '@shared';
import { ClientListItem } from './client-list-item';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  @Input() pagedItems: PagedGrid<ClientListItem> = new PagedGrid<ClientListItem>();
  @Output() stateChange: EventEmitter<GridState> = new EventEmitter<GridState>();
  @Output() editClientClick: EventEmitter<ClientListItem> = new EventEmitter<ClientListItem>();
  @Output() deleteClientClick: EventEmitter<ClientListItem> = new EventEmitter<ClientListItem>();
  displayedColumns: string[] = COLUMNS;
  isLoading: boolean = true;
  fakeItems: PagedGrid<ClientListItem> = generateFakeItems<ClientListItem>();
  currentState: GridState = this.initialState();

  ngOnInit(): void {
    this.stateChange.emit({ ...this.currentState });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['pagedItems'].isFirstChange()) {
      this.isLoading = false;
    }
  }

  pageChanged(event: PageEvent): void {
    const newState = { page: event.pageIndex, size: event.pageSize };
    this.currentState = {
      ...this.currentState,
      paginationState: newState,
    };

    this.stateChange.emit(this.currentState);
  }

  sortData(sort: Sort): void {
    const newState: SortState[] = [];

    if (sort.direction !== '') {
      newState.push({
        field: sort.active,
        direction: sort.direction,
      });
    }

    this.currentState = {
      ...this.currentState,
      sortState: newState,
    };
    this.stateChange.emit(this.currentState);
  }

  editClientClicked(item: ClientListItem): void {
    this.editClientClick.emit(item);
  }

  deleteClientClicked(item: ClientListItem): void {
    this.deleteClientClick.emit(item);
  }

  resetGrid(): void {
    this.currentState = this.initialState();
    this.stateChange.emit({ ...this.currentState });
  }

  private initialState(): GridState {
    return {
      paginationState: { page: 1, size: 10 },
      sortState: [],
    };
  }
}

const COLUMNS: string[] = [
  'clientId',
  'clientName',
  'grantTypes',
  'redirectUris',
  'postLogoutRedirectUris',
  'allowedCorsOrigins',
  'groupRestrictions',
  'isActive',
  'createdOn',
  'createdBy',
  'editClient',
  'deleteClient',
];
