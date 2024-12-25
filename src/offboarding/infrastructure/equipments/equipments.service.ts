import { Injectable } from '@angular/core';
import { Equipment } from '../../domain/equipment/equipment.entity';
import { TequipyAPI } from '../tequipy.api';

@Injectable()
export class EquipmentsService {
  constructor(private readonly equipmentsApi: TequipyAPI) {}

  load(): Promise<Equipment[]> {
    return this.equipmentsApi
      .fetchAllEquipments()
      .then((rawEquipments) => rawEquipments.map(Equipment.fromRaw));
  }
}
