import { RawEquipment } from '../../infrastructure/responses/raw-equipment';
import { StringId } from '../vo/string-id.vo';

export class Equipment {
  constructor(public readonly id: StringId, public readonly name: string) {}

  static fromRaw(raw: RawEquipment): Equipment {
    return new Equipment(StringId.fromRaw(raw.id), raw.name);
  }
}
