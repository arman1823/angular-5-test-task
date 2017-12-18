import { Component, OnInit, Input } from '@angular/core';
import { ObservableProcess } from '../../infrastructure/observable-process';


@Component({
  selector: 'app-spinner-button',
  templateUrl: './spinner-button.component.html',
  styleUrls: ['./spinner-button.component.css']
})
export class SpinnerButtonComponent implements OnInit {
  @Input() process: ObservableProcess;
  @Input() public isValid = true;
  @Input() type = 'button';
  @Input() iconOnly = false;

  constructor () {
  }

  ngOnInit () {
  }

}
