import {Component} from '@angular/core';
import {ToastModule} from 'primeng/toast';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {MessageService} from 'primeng/api';
import {RippleModule} from 'primeng/ripple';

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
  constructor(private messageService: MessageService) {}
  show() {
    // this.messageService.clear();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });  }
}
