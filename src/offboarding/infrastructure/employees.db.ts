import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { RawEmployee } from './responses/raw-employee';
import { faker } from '@faker-js/faker';
import { RawEquipment } from './responses/raw-equipment';

function createRandomEmployee(): RawEmployee {
  return {
    id: faker.string.uuid(),
    name: faker.internet.username(),
    email: faker.internet.email(),
    department: faker.helpers.arrayElement([
      'Engineering',
      'Marketing',
      'Sales',
    ]),
    status: faker.helpers.arrayElement(['ACTIVE', 'OFFBOARDED']),
    equipments: faker.helpers.multiple(createRandomEquipment, { count: 3 }),
  };
}

function createRandomEquipment(): RawEquipment {
  return {
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement([
      'Iphone 12',
      'Macbook Pro',
      'Macbook Air',
      'Dell 200XP',
      'Magic Mouse',
      'Keyboard 2000',
    ]),
  };
}

@Injectable()
export class EmployeesDB extends Dexie {
  employees!: Table<RawEmployee, number>;

  constructor() {
    super('com.tequipy.employees');
    this.version(1).stores({
      employees: '++id, name, email, phone, department',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    const employees = faker.helpers.multiple(createRandomEmployee, {
      count: 25,
    });

    await this.employees.bulkAdd(employees);
  }
}
