import { Injectable } from '@angular/core';
import { Employee } from '../../domain/employee/employee.entity';
import { TequipyAPI } from '../tequipy.api';
import { OffboardingFormData } from '../../domain/offboarding-form.model';

@Injectable()
export class EmployeesService {
  constructor(private readonly employeesApi: TequipyAPI) {}

  load(): Promise<Employee[]> {
    return this.employeesApi.fetchAllEmployees().then((rawEmployees) => {
      console.log('rawEmployees', rawEmployees);
      return rawEmployees.map((raw) => Employee.fromRaw(raw));
    });
  }

  offboard(id: string, payload: OffboardingFormData): Promise<void> {
    return this.employeesApi.offboardEmployee(id, payload);
  }

  //   get(id: string) {
  //     return this.employeesDB.get(id);
  //   }

  //   create(employee: Employee) {
  //     return this.employeesDB.create(employee);
  //   }

  //   update(employee: Employee) {
  //     return this.employeesDB.update(employee);
  //   }

  //   delete(id: string) {
  //     return this.employeesDB.delete(id);
  //   }
}
