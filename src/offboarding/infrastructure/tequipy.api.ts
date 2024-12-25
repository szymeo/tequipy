import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { RawEmployee } from '../domain/employee/raw-employee';
import { employeesMock, equipmentMock } from './db-mock';
import { OffboardingFormData } from '../domain/offboarding-form.model';
import { Logger } from '../../shared/logger/logger';
import { RawEquipment } from '../domain/equipment/raw-equipment';

@Injectable()
export class TequipyAPI extends Dexie {
  private readonly logger = new Logger('TequipyAPI');
  employees!: Table<RawEmployee, string>;
  equipments!: Table<RawEquipment, string>;

  constructor() {
    super('com.tequipy.api');
    this.version(1).stores({
      employees: 'id, name, department, status, email, equipments',
      equipments: 'id, name',
    });
    this.on('populate', () => this.populate());
  }

  async fetchAllEmployees(): Promise<RawEmployee[]> {
    this.logger.debug('Getting all employees');

    return this.employees.toArray();
  }

  async fetchAllEquipments(): Promise<RawEquipment[]> {
    this.logger.debug('Getting all equipments');

    return this.equipments.toArray();
  }

  async offboardEmployee(
    id: string,
    payload: OffboardingFormData
  ): Promise<void> {
    this.logger.info('Offboarding employee', id, payload);

    const employee = this.employees.where('id').equals(id);
    await employee.modify((employee) => {
      employee.status = 'OFFBOARDED';
    });
  }

  async populate() {
    this.logger.debug('Populating db...');

    await this.equipments.bulkAdd(equipmentMock);
    await this.employees.bulkAdd(employeesMock);
  }
}
