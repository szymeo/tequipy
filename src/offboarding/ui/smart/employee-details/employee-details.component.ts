import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmployeesState } from '../../../application/employees.state';
import { injectParams } from 'ngxtension/inject-params';
import { EquipmentsState } from '../../../application/equipments.state';
import { Equipment } from '../../../domain/equipment/equipment.entity';
import { Status } from '../../../domain/employee/status.enum';
import { MatDialog } from '@angular/material/dialog';
import { OffboardingFormDialogComponent } from '../../presentational/offboarding-form-dialog/offboarding-form-dialog.component';
import { StringId } from '../../../../shared/vo/string-id.vo';
import { OffboardingFormData } from '../../../domain/offboarding-form.model';

@Component({
  selector: 'app-employee-details',
  standalone: false,
  templateUrl: './employee-details.component.html',
  host: {
    class: 'flex flex-col h-full w-full',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsComponent {
  protected readonly Status = Status;
  private readonly employeeId = injectParams('employeeId');

  constructor(
    private readonly dialog: MatDialog,
    private readonly employeesState: EmployeesState,
    private readonly equipmentsState: EquipmentsState
  ) {}

  get employee() {
    return this.employeesState.employees.get(this.employeeId());
  }

  resolveEquipment(equipmentId: string): Equipment {
    return this.equipmentsState.equipments.get(equipmentId);
  }

  offboardEmployee(employeeId: StringId) {
    let dialogRef = this.dialog.open(OffboardingFormDialogComponent, {
      minHeight: '400px',
      minWidth: '600px',
      data: {
        name: this.employee.name,
      },
    });

    dialogRef.afterClosed().subscribe((result: OffboardingFormData) => {
      if (result) {
        this.employeesState.offboard(employeeId, result);
      }
    });
  }
}
