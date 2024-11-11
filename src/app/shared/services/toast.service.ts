import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message = signal<any>(null);
  showSuccess(summary: string, detail: string) {
    this.message.set({ severity: 'success', summary, detail });
  }

  showError(summary: string, detail: string) {
    this.message.set({ severity: 'error', summary, detail });
  }
}
