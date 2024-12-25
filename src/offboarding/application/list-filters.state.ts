import { Injectable, signal } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ListColumn } from '../domain/list-column.enum';

type State = {
  filter: string;
  columns: ListColumn[];
  sort: Sort;
};

@Injectable()
export class ListFiltersState {
  private state = signal<State>({
    filter: '',
    columns: [
      ListColumn.NAME,
      ListColumn.EMAIL,
      ListColumn.DEPARTMENT,
      ListColumn.EQUIPMENTS,
      ListColumn.STATUS,
    ],
    sort: { active: '', direction: '' },
  });

  get sort(): Sort {
    return this.state().sort;
  }

  get filter(): string {
    return this.state().filter;
  }

  get columns(): ListColumn[] {
    return this.state().columns;
  }

  updateSort(sort: Sort): void {
    this.state.set({
      ...this.state(),
      sort,
    });
  }

  updateFilter(filter: string): void {
    this.state.set({
      ...this.state(),
      filter,
    });
  }

  updateColumns(columns: ListColumn[]): void {
    this.state.set({
      ...this.state(),
      columns,
    });
  }
}
