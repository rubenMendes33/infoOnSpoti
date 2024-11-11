import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ToastComponent} from './shared/components/toast/toast.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'infoOnSpoti';
}
