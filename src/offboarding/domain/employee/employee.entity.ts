import { Status as Status } from './status.enum';
import { Department } from './department.enum';
import { RawEmployee } from './raw-employee';
import { Email } from '../../../shared/vo/email.vo';
import { StringId } from '../../../shared/vo/string-id.vo';

export class Employee {
  constructor(
    public _id: StringId,
    public _name: string,
    public _email: Email,
    public _department: Department,
    public _status: Status,
    public _equipments: StringId[]
  ) {
    this.validateDepartment(_department);
    this.validateStatus(_status);
  }

  get id(): StringId {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): Email {
    return this._email;
  }

  get department(): Department {
    return this._department;
  }

  set status(status: Status) {
    this.validateStatus(status);
    this._status = status;
  }

  get status(): Status {
    return this._status;
  }

  get equipments(): StringId[] {
    return this._equipments;
  }

  static fromRaw(raw: RawEmployee): Employee {
    return new Employee(
      StringId.fromRaw(raw.id),
      raw.name,
      Email.fromRaw(raw.email),
      raw.department as Department,
      raw.status as Status,
      raw.equipments.map(StringId.fromRaw)
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
