import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {


  showSuccess(summary: string, detail: string) {
    // this.messageService.add({ severity: 'success', summary, detail });
  }

  showError(summary: string, detail: string) {
    // this.messageService.add({ severity: 'error', summary, detail });
  }
}
