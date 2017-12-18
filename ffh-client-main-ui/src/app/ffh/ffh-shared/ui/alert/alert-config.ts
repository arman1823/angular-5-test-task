import {Injectable} from '@angular/core';
import {alertType} from './alert';

@Injectable()
export class AlertConfig {
  dismissible = true;
  type = alertType.warning;
}
