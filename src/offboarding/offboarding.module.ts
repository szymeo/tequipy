import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { BlurOnClickModule } from '../shared/directives/blur-on-click.module';
import { EmployeesState } from './application/employees.state';
import { EquipmentsState } from './application/equipments.state';
import { TequipyAPI } from './infrastructure/tequipy.api';
import { EmployeesService } from './infrastructure/employees/employees.service';
import { EquipmentsService } from './infrastructure/equipments/equipments.service';
import { OffboardingFormDialogComponent } from './ui/presentational/offboarding-form-dialog/offboarding-form-dialog.component';
import { EmployeeDetailsComponent } from './ui/smart/employee-details/employee-details.component';
import { EmployeesListComponent } from './ui/smart/employees-list/employees-list.component';
import { OffboardingRootComponent } from './ui/smart/offboarding-root/offboarding-root.component';
import { MatSelectModule } from '@angular/material/select';
import { ListFiltersState } from './application/list-filters.state';

@NgModule({
  declarations: [
    OffboardingRootComponent,
    EmployeeDetailsComponent,
    EmployeesListComponent,
    OffboardingFormDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: OffboardingRootComponent,
        children: [
          {
            path: '',
            component: EmployeesListComponent,
          },
          {
            path: ':employeeId',
            component: EmployeeDetailsComponent,
          },
        ],
      },
    ]),
    MatDialogModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    BlurOnClickModule,
  ],
  providers: [
    EmployeesState,
    EmployeesService,
    TequipyAPI,
    EquipmentsState,
    EquipmentsService,
    ListFiltersState,
  ],
})
export class OffboardingModule {}
