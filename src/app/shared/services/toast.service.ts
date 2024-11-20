import {inject, Injectable, signal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message = signal<any>(null);
  private langService = inject(TranslateService);
  showSuccess(summary: string, detail: string) {
    this.message.set({ severity: 'success', summary, detail });
  }

  showError(summary: string, errorCode: string) {
    this.message.set({ severity: 'error', summary, detail: this.langService.instant('app.errors.login.'+ errorCode) });
  }
}
