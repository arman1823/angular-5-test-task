import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FfhSharedModule } from './ffh-shared/ffh-shared.module';

@NgModule({
  imports: [
    CommonModule,
    FfhSharedModule.forRoot()
  ],
  exports: [
    FfhSharedModule
  ],
  declarations: [
  ]
})
export class FfhRootModule {
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class FfhModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FfhRootModule,
      providers: [
      ]
    };
  }
}
