import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false,
  host: {
    class: 'flex flex-col py-10 h-full bg-gray-50',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'tequipy-offboarding';
}
