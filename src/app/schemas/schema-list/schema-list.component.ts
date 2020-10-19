import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

import { PagedGrid, GridState, generateFakeItems, SortState } from '@shared';
import { SchemaListItem } from './schema-list-item';

@Component({
  selector: 'app-schema-list',
  templateUrl: './schema-list.component.html',
  styleUrls: ['./schema-list.component.scss']
})
export class SchemaListComponent implements OnInit {
  @Input() pagedItems: PagedGrid<SchemaListItem> = new PagedGrid<SchemaListItem>();
  @Output() stateChange: EventEmitter<GridState> = new EventEmitter<GridState>();
  @Output() viewSchemaClick: EventEmitter<SchemaListItem> = new EventEmitter<SchemaListItem>();
  displayedColumns: string[] = ['version', 'createdOn', 'createdBy', 'viewSchema'];
  isLoading: boolean = true;
  fakeItems: PagedGrid<SchemaListItem> = generateFakeItems<SchemaListItem>();
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

  viewSchemaClicked(item: SchemaListItem): void {
    this.viewSchemaClick.emit(item);
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
