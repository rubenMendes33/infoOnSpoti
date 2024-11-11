import {Component, effect, inject} from '@angular/core';
import {ToastModule} from 'primeng/toast';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {MessageService} from 'primeng/api';
import {RippleModule} from 'primeng/ripple';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    ToastModule,
    AvatarModule,
    RippleModule,
    ButtonModule
  ],
  providers: [MessageService],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  messageService = inject(MessageService);
  toastService = inject(ToastService);

  constructor() {
    effect(() => {
      const message = this.toastService.message();
      this.messageService.add(message);
    })

  }

}
