import {
  ChangeDetectionStrategy,
  Component,
  effect,
  HostBinding,
  signal,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fadeInOutRightLeft } from '../../../../shared/ui/animations';
import {
  EmployeeQuery,
  EmployeesState,
} from '../../../application/employees.state';
import { ListFiltersState } from '../../../application/list-filters.state';
import { ListColumn } from '../../../domain/list-column.enum';

@Component({
  selector: 'app-employees-list',
  standalone: false,
  templateUrl: './employees-list.component.html',
  host: {
    class: 'flex flex-col h-full w-full absolute',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOutRightLeft],
})
export class EmployeesListComponent {
  @HostBinding('@fadeInOutRightLeft') fadeInOutRightLeft = true;
  availableColumns: ListColumn[] = [
    ListColumn.NAME,
    ListColumn.EMAIL,
    ListColumn.DEPARTMENT,
    ListColumn.EQUIPMENTS,
    ListColumn.STATUS,
  ];
  filter = signal('');
  displayedColumns = new FormControl(this.availableColumns);
  dataSource: MatTableDataSource<EmployeeQuery>;
  readonly ListColumn = ListColumn;

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    private readonly employeesState: EmployeesState,
    private readonly listFiltersState: ListFiltersState
  ) {
    effect(() => {
      this.dataSource = new MatTableDataSource(
        this.employeesState.employeesQuery
      );
      this._restoreSort();
      this._restoreColumnVisibility();
      this._restoreFilter();
    });
  }

  ngOnInit() {
    this._tryLoadEmployees();
  }

  onColumnVisibilityChanged(event: ListColumn[]) {
    this.listFiltersState.updateColumns(event);
  }

  onFilterChanged(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.listFiltersState.updateFilter(filterValue);
  }

  onSortChanged(event: Sort) {
    this.listFiltersState.updateSort(event);
  }

  private _tryLoadEmployees() {
    if (this.employeesState.employees.size) {
      return;
    }

    this.employeesState.load();
  }

  private _restoreSort() {
    this.dataSource.sort = this.sort;

    const { active, direction } = this.listFiltersState.sort;
    const sortHasChanged =
      this.sort.active !== active || this.sort.direction !== direction;

    if (!sortHasChanged) {
      return;
    }

    this.sort.sort({
      id: active,
      start: direction,
      disableClear: false,
    });
  }

  private _restoreColumnVisibility() {
    const columns = this.listFiltersState.columns;
    this.displayedColumns.setValue(columns);
  }

  private _restoreFilter() {
    const { filter } = this.listFiltersState;
    this.dataSource.filter = filter;
    this.filter.set(filter);
  }
}
