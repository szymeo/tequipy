import { Injectable, signal } from '@angular/core';
import { Department } from '../domain/employee/department.enum';
import { Employee } from '../domain/employee/employee.entity';
import { Status } from '../domain/employee/status.enum';
import { EmployeesService } from '../infrastructure/employees/employees.service';
import { Sort } from '@angular/material/sort';
import { OffboardingFormData } from '../domain/offboarding-form.model';

type State = {
  employees: Map<string, Employee>;
};

export type EmployeeQuery = {
  id: string;
  name: string;
  email: string;
  status: Status;
  department: Department;
  equipments: string[];
};

@Injectable()
export class EmployeesState {
  private state = signal<State>({
    employees: new Map(),
  });

  constructor(private readonly employeesService: EmployeesService) {}

  get employees(): State['employees'] {
    return this.state().employees;
  }

  get employeesQuery(): EmployeeQuery[] {
    return Array.from(this.employees.values()).map(mapToEmployeeQuery);
  }

  load(): Promise<EmployeeQuery[]> {
    return this.employeesService.load().then((employees) => {
      this.state.set({
        ...this.state(),
        employees: new Map(
          employees.map((employee) => [employee.id.value, employee])
        ),
      });
      return this.employeesQuery;
    });
  }

  offboard(
    employeeId: Employee['id'],
    offboardFormData: OffboardingFormData
  ): void {
    const employee = this.employees.get(employeeId.value);

    employee.status = Status.OFFBOARDED;
    this.employees.set(employeeId.value, employee);

    this.employeesService
      .offboard(employeeId.value, offboardFormData)
      .then(() => {
        this.state.set({
          ...this.state(),
          employees: new Map(this.employees),
        });
      });
  }
}

function mapToEmployeeQuery(employee: Employee): EmployeeQuery {
  return {
    id: employee.id.value,
    name: employee.name,
    email: employee.email.value,
    status: employee.status,
    department: employee.department,
    equipments: employee.equipments.map((equipmentId) => equipmentId.value),
  };
}
