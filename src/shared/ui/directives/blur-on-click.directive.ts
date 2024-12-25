import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  standalone: false,
  selector: '[appBlurOnClick]',
})
export class BlurOnClickDirective {
  constructor(private el: ElementRef) {}

  @HostListener('click')
  onClick(): void {
    this.el.nativeElement.blur();
  }
}
