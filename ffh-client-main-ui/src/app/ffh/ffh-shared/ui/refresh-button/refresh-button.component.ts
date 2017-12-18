import { Component, OnInit, Input } from '@angular/core';
import { ObservableProcess } from '../../infrastructure/observable-process';


@Component({
  selector: 'app-refresh-button',
  templateUrl: './refresh-button.component.html',
  styleUrls: ['./refresh-button.component.css']
})
export class RefreshButtonComponent implements OnInit {
  @Input() process: ObservableProcess;
  @Input() public isValid = true ;
  @Input() type = 'button' ;

  constructor() { }

  ngOnInit() {
  }

}
