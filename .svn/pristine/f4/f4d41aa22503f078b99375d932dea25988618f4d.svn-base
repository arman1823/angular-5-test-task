import { Component, Input } from '@angular/core';
import { Alert } from '../alert/alert';

@Component({
  selector: 'app-alert-view',
  templateUrl: './alert-view.component.html',
  styleUrls: ['./alert-view.component.css']
})
export class AlertViewComponent {
  @Input() dismissible: boolean;
  @Input() alerts: Array<Alert> = [];

  constructor() {

  }

  closeAlert(alert: Alert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

}
