import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    @Output() searchValueChanged: EventEmitter<string> = new EventEmitter();

    constructor () {
    }

    ngOnInit () {
    }

    onValueChange (value) {
        this.searchValueChanged.emit(value);
    }

}
