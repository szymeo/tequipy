import { Status as Status } from './status.enum';
import { Email } from '../vo/email.vo';
import { StringId } from '../vo/string-id.vo';
import { Department } from './department.enum';
import { RawEmployee } from '../../infrastructure/responses/raw-employee';

export class Employee {
  constructor(
    public readonly id: StringId,
    public readonly name: string,
    public readonly email: Email,
    public readonly department: Department,
    public readonly status: Status
  ) {
    this.validateDepartment(department);
    this.validateStatus(status);
  }

  static fromRaw(raw: RawEmployee): Employee {
    return new Employee(
      StringId.fromRaw(raw.id),
      raw.name,
      Email.fromRaw(raw.email),
      raw.department as Department,
      raw.status as Status
    );
  }

  private validateDepartment(department: Department): void {
    if (!Object.values(Department).includes(department)) {
      throw new Error('Invalid department');
    }
  }

  private validateStatus(status: Status): void {
    if (!Object.values(Status).includes(status)) {
      throw new Error('Invalid status');
    }
  }
}
