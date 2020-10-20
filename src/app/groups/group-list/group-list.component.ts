import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

import { PagedGrid, GridState, SortState, generateFakeItems } from '@shared';
import { GroupListItem } from './group-list-item';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  @Input() pagedItems: PagedGrid<GroupListItem> = new PagedGrid<GroupListItem>();
  @Output() stateChange: EventEmitter<GridState> = new EventEmitter<GridState>();
  @Output() viewSchemasClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() viewConfigurationClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteClick: EventEmitter<string> = new EventEmitter<string>();
  displayedColumns: string[] = ['name', 'createdOn', 'createdBy', 'viewSchemas', 'viewConfiguration', 'delete'];
  isLoading: boolean = true;
  fakeItems: PagedGrid<GroupListItem> = generateFakeItems<GroupListItem>();
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

  viewSchemasClicked(groupName: string): void {
    this.viewSchemasClick.emit(groupName);
  }

  viewConfigurationClicked(groupName: string): void {
    this.viewConfigurationClick.emit(groupName);
  }

  deleteGroupClicked(groupName: string): void {
    this.deleteClick.emit(groupName);
  }

  resetGrid(): void {
    this.currentState = this.initialState();
    this.stateChange.emit({ ...this.currentState });
  }

  private initialState(): GridState {
    return {
      paginationState: { page: 1, size: 10 },
      sortState: [{ field: 'name', direction: 'asc' }],
    };
  }
}
