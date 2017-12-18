import {Alert, alertType } from '../ui/alert/alert';

import { IObserverableProcessView } from '../infrastructure/observable-process';

export class FfhViewBase implements IObserverableProcessView {

  nextAlertId = 1;
  alerts: Array<Alert> = [];

  constructor() {
  }

  onSpinnerButtonClick() {
    console.error('override FfhViewBase::onSpinnerButtonClick()');
  }

  addAlert(message: string, type: alertType, dismissible?: boolean) {
    if (dismissible ==  null) {
      this.alerts.push({id: this.nextAlertId++, type: type, message: message});
    } else {
      this.alerts.push({id: this.nextAlertId++, type: type, message: message, dismissible: dismissible});
    }
  }

  closeAlert(alert: Alert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  clearAlerts() {
    this.alerts = [];
    this.nextAlertId = 1;
  }

  handleError(error: any, title?: string) {
  }

}
