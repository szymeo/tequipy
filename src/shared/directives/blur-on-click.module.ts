import { NgModule } from '@angular/core';
import { BlurOnClickDirective } from './blur-on-click.directive';

@NgModule({
  declarations: [BlurOnClickDirective],
  exports: [BlurOnClickDirective],
})
export class BlurOnClickModule {}
