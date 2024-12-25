import { StringId } from '../../../shared/vo/string-id.vo';
import { RawEquipment } from './raw-equipment';

export class Equipment {
  constructor(public readonly id: StringId, public readonly name: string) {}

  static fromRaw(raw: RawEquipment): Equipment {
    return new Equipment(StringId.fromRaw(raw.id), raw.name);
  }
}
