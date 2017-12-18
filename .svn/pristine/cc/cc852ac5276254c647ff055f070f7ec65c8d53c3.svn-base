import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertModule } from './alert/alert.module';
import { AlertViewModule } from './alert-view/alert-view.module';
import { ColorInputModule } from './color-input/color-input.module';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { LanguageSelectComponent } from './language-select/language-select.component';
import { SpinnerButtonComponent } from './spinner-button/spinner-button.component';
import { SearchComponent } from './search/search.component';
import { FilterComponent } from './filter/filter.component';
import { SpinnerLoaderComponent } from './spinner-loader/spinner-loader.component';
import { RefreshButtonComponent } from './refresh-button/refresh-button.component';

import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { MatButtonModule, MatDialogModule, MatInputModule, MatSelectModule } from '@angular/material';

const UI_MODULES = [
  AlertModule,
  AlertViewModule,
  ColorInputModule,
  WjInputModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatDialogModule
];

const UI_COMPONENTS = [
  SpinnerButtonComponent,
  SpinnerLoaderComponent,
  ConfirmDialogComponent,
  FilterComponent,
  SearchComponent,
  LanguageSelectComponent,
  RefreshButtonComponent,
];


@NgModule({
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    ColorInputModule.forRoot(),
    AlertViewModule,
    WjInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: UI_MODULES,
})
export class UiRootModule {
}


@NgModule({
  imports: [
    CommonModule,
    ...UI_MODULES,
  ],

  exports: [
    UI_MODULES,
    ...UI_COMPONENTS
  ],

  declarations: UI_COMPONENTS,

  entryComponents: [
    ConfirmDialogComponent,
  ]
})
export class UiModule {
  static forRoot (): ModuleWithProviders {
    return {
      ngModule: UiRootModule
    };
  }
}
