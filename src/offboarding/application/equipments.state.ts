import { Injectable, signal } from '@angular/core';
import { Equipment } from '../domain/equipment/equipment.entity';
import { EquipmentsService } from '../infrastructure/equipments/equipments.service';

type State = {
  equipments: Map<string, Equipment>;
};

@Injectable()
export class EquipmentsState {
  private state = signal<State>({ equipments: new Map() });

  constructor(private readonly equipmentsService: EquipmentsService) {}

  get equipments() {
    return this.state().equipments;
  }

  load(): Promise<Equipment[]> {
    return this.equipmentsService.load().then((equipments) => {
      this.state.set({
        equipments: new Map(
          equipments.map((equipment) => [equipment.id.value, equipment])
        ),
      });
      return Array.from(this.equipments.values());
    });
  }
}
