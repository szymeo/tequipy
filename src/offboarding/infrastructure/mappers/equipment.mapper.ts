import { Equipment } from '../../domain/equipment/equipment.entity';
import { RawEquipment } from '../responses/raw-equipment';

export class EquipmentMapper {
  static fromRaw(rawEquipment: RawEquipment): Equipment {
    return Equipment.fromRaw(rawEquipment);
  }

  static toRaw(equipment: Equipment): RawEquipment {
    return {
      id: equipment.id.value,
      name: equipment.name,
    };
  }
}
