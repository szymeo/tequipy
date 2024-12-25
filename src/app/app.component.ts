import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  host: {
    class: 'flex flex-col py-10 h-full bg-gray-50',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-96 top-0 absolute w-full bg-[#ffbd75] z-0"></div>
    <div class="z-10 w-full h-full flex flex-col text-center">
      <h1 class="mb-10 text-4xl text-white font-semibold font-mono">
        Tequipy offboarding
      </h1>
      <router-outlet />
    </div>
  `,
})
export class AppComponent {
  title = 'tequipy-offboarding';
}
