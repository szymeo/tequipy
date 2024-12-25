import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { injectParams } from 'ngxtension/inject-params';
import { fadeInOutLeftRight } from '../../../../shared/ui/animations';
import { StringId } from '../../../../shared/vo/string-id.vo';
import { EmployeesState } from '../../../application/employees.state';
import { EquipmentsState } from '../../../application/equipments.state';
import { Status } from '../../../domain/employee/status.enum';
import { Equipment } from '../../../domain/equipment/equipment.entity';
import { OffboardingFormData } from '../../../domain/offboarding-form.model';
import { OffboardingFormDialogComponent } from '../../presentational/offboarding-form-dialog/offboarding-form-dialog.component';

@Component({
  selector: 'app-employee-details',
  standalone: false,
  templateUrl: './employee-details.component.html',
  host: {
    class: 'flex flex-col h-full w-full absolute',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOutLeftRight],
})
export class EmployeeDetailsComponent {
  @HostBinding('@fadeInOutLeftRight') fadeInOutLeftRight = true;
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
