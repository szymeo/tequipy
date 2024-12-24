import { RawEquipment } from './raw-equipment';

export type RawEmployee = {
  id: string;
  name: string;
  department: string;
  status: string;
  email: string;
  equipments: RawEquipment[];
};
