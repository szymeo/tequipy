import { Injectable } from '@angular/core';
import { Equipment } from '../../domain/equipment/equipment.entity';
import { TequipyAPI } from '../tequipy.api';

@Injectable()
export class EquipmentsService {
  constructor(private readonly equipmentsApi: TequipyAPI) {}

  load(): Promise<Equipment[]> {
    return this.equipmentsApi
      .fetchAllEquipments()
      .then((rawEquipments) =>
        rawEquipments.map((raw) => Equipment.fromRaw(raw))
      );
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
