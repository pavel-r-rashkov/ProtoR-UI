import { PaginationState } from './pagination-state';
import { SortState } from './sort-state';

export interface GridState {
  paginationState: PaginationState;
  sortState: SortState[];
}
