import { Injectable } from '@angular/core';
import { NgxToastNotifyService } from 'ngx-toast-notify';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private notifyService: NgxToastNotifyService) {}

  success(message: string) {
    this.notifyService.showToast(message, 'success', 'bottom-center');
  }
  warning(message: string) {
    this.notifyService.showToast(message, 'warning', 'bottom-center');
  }
  info(message: string) {
    this.notifyService.showToast(message, 'info', 'bottom-center');
  }
  error(message: string) {
    this.notifyService.showToast(message, 'danger', 'bottom-center');
  }
}
