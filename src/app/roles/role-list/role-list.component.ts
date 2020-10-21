import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

import { PagedGrid, GridState, generateFakeItems, SortState } from '@shared';
import { RoleListItem } from './role-list-item';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
  @Input() pagedItems: PagedGrid<RoleListItem> = new PagedGrid<RoleListItem>();
  @Output() stateChange: EventEmitter<GridState> = new EventEmitter<GridState>();
  @Output() editRoleClick: EventEmitter<RoleListItem> = new EventEmitter<RoleListItem>();
  displayedColumns: string[] = ['name', 'createdOn', 'createdBy', 'editRole'];
  isLoading: boolean = true;
  fakeItems: PagedGrid<RoleListItem> = generateFakeItems<RoleListItem>();
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

  editRoleClicked(item: RoleListItem): void {
    this.editRoleClick.emit(item);
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
