import { Injectable } from '@angular/core';
import { Employee } from '../../domain/employee/employee.entity';
import { TequipyAPI } from '../tequipy.api';
import { OffboardingFormData } from '../../domain/offboarding-form.model';

@Injectable()
export class EmployeesService {
  constructor(private readonly employeesApi: TequipyAPI) {}

  load(): Promise<Employee[]> {
    return this.employeesApi
      .fetchAllEmployees()
      .then((rawEmployees) => rawEmployees.map(Employee.fromRaw));
  }

  offboard(id: string, payload: OffboardingFormData): Promise<void> {
    return this.employeesApi.offboardEmployee(id, payload);
  }
}
