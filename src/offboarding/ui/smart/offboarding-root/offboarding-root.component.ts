import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { EmployeesState } from '../../../application/employees.state';
import { EquipmentsState } from '../../../application/equipments.state';

@Component({
  selector: 'app-offboarding-root',
  templateUrl: './offboarding-root.component.html',
  styleUrl: './offboarding-root.component.scss',
  host: {
    class:
      'flex flex-col w-10/12 max-w-7xl mx-auto h-full bg-white shadow rounded-3xl overflow-hidden items-center justify-center relative',
  },
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffboardingRootComponent implements OnInit {
  loading = signal(true);

  constructor(
    private readonly employeesState: EmployeesState,
    private readonly equipmentsState: EquipmentsState
  ) {}

  ngOnInit() {
    Promise.all([this.employeesState.load(), this.equipmentsState.load()]).then(
      () => {
        this.loading.set(false);
      }
    );
  }
}
