import { faker } from '@faker-js/faker';
import { RawEmployee } from '../domain/employee/raw-employee';
import { RawEquipment } from '../domain/equipment/raw-equipment';

export const equipmentMock = faker.helpers.multiple(createRandomEquipment, {
  count: 80,
});

export const employeesMock = faker.helpers.multiple(createRandomEmployee, {
  count: 50,
});

function createRandomEmployee(): RawEmployee {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = faker.internet.username({ firstName, lastName });

  return {
    id: faker.string.uuid(),
    name: `${firstName} ${lastName}`,
    email: `${username}@tequipy.com`,
    department: faker.helpers.arrayElement([
      'ENGINEERING',
      'MARKETING',
      'SALES',
    ]),
    status: faker.helpers.arrayElement(['ACTIVE', 'OFFBOARDED']),
    equipments: faker.helpers.arrayElements(
      equipmentMock.map((e) => e.id),
      { min: 1, max: 5 }
    ),
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
