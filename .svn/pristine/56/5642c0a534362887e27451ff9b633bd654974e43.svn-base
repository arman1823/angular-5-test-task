import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FfhColorInputComponent } from './ffh-color-input.component';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

@NgModule({
  imports: [
    CommonModule,
    WjInputModule,
  ],
  declarations: [FfhColorInputComponent],
  exports: [FfhColorInputComponent],
})
export class ColorInputModule {
  static forRoot (): ModuleWithProviders {
    return {
      ngModule: ColorInputModule,
    };
  }
}
