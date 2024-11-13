import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ToastComponent} from './shared/components/toast/toast.component';
import {CommonModule} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    ToastComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private translate = inject(TranslateService);

  constructor() {
    this.translate.setDefaultLang('en');
  }
}
