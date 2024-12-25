import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'offboarding',
    loadChildren: () =>
      import('../offboarding/offboarding.module').then(
        (m) => m.OffboardingModule
      ),
  },
  {
    path: '**',
    redirectTo: 'offboarding',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
