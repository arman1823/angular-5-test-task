import { Component, OnInit, Input, Output, EventEmitter, forwardRef, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-ffh-color-input',
  templateUrl: './ffh-color-input.component.html',
  styleUrls: ['./ffh-color-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FfhColorInputComponent),
      multi: true
    }
  ]
})
export class FfhColorInputComponent implements ControlValueAccessor, OnChanges, DoCheck {

  @Input() value;
  @Input() disabled = false;
  oldValue;
  hexColor = '';

  propagateChange: any = () => {
  }

  constructor () {
  }

  registerOnChange (fn) {
    this.propagateChange = fn;
  }

  registerOnTouched () {
  }

  writeValue (value: any) {
    this.value = value;
    this.propagateChange(this.value);
  }

  ngOnChanges (changes: SimpleChanges): void {
    if (changes.value) {
      this.setColor(changes.value.currentValue);
    }
  }

  ngDoCheck () {
    if (this.oldValue !== this.value) {
      this.oldValue = this.value;
      this.setColor(this.value);
    }
  }

  onColorChange (newColor: string) {
    this.hexColor = newColor;
    const int = parseInt(newColor.substr(1), 16);
    this.writeValue(int);
  }

  intToColour (value: number) {
    return '#' + ('000000' + value.toString(16)).slice(-6);
  }

  setColor (value) {
    if (value || value === 0) {
      this.hexColor = this.intToColour(value);
    }
  }

}
