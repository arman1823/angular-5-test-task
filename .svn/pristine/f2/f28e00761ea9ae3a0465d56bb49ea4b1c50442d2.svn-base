import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import {AlertConfig} from './alert-config';
import {alertType} from './alert';

@Component({
  selector: 'app-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent  {

  @Input() dismissible: boolean;
  @Input() type: alertType;
  @Output() close = new EventEmitter();

  get typeClass(): string {
    if (this.type === alertType.success) {
      return 'success';
    } if (this.type === alertType.info) {
      return 'info';
    } if ( this.type === alertType.warning) {
      return 'warning';
    } else {
      return 'danger';
    }

  }

  constructor(config: AlertConfig) {

    this.dismissible = config.dismissible;
    this.type = config.type;

  }

  closeHandler() {
    this.close.emit(null);
  }
}
