import { Employee } from '../../domain/employee/employee.entity';
import { RawEmployee } from '../responses/raw-employee';

export class EmployeeMapper {
  static fromRaw(rawEmployee: RawEmployee): Employee {
    return Employee.fromRaw(rawEmployee);
  }

  static toRaw(employee: Employee): RawEmployee {
    return {
      id: employee.id.value,
      name: employee.name,
      department: employee.department,
      status: employee.status,
      email: employee.email.value,
      equipments: [],
    };
  }
}
