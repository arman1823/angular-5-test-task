import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  @Input() isSearching = false;
  @Output() searchString: EventEmitter<string> = new EventEmitter();
  private searchSubscription: Subscription;
  @ViewChild('search') searchInput;
  searchValueSubscription: Subscription;

  constructor () {
  }

  ngOnInit () {
    this.searchValueSubscription = Observable.fromEvent(this.searchInput.nativeElement, 'input')
      .debounceTime(400)
      .map(_ => this.searchInput.nativeElement.value)
      .distinctUntilChanged()
      .subscribe(value => this.onValueChange(value));
  }

  ngOnDestroy () {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    this.searchValueSubscription.unsubscribe();
  }

  onValueChange (value) {
    this.searchString.emit(value);
  }


}
