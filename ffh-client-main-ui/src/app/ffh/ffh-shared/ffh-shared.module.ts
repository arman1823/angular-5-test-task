import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatTooltipModule,
  MatTableModule,
} from '@angular/material';

import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjGridDetailModule } from 'wijmo/wijmo.angular2.grid.detail';

import { UiModule } from './ui/ui.module';
import { SecToMinPipe } from './pipes/sec-to-min.pipe';
import { IntToColorPipe } from './pipes/int-to-color.pipe';
import { CountryService } from './services/country.service';

@NgModule({
  imports: [
    UiModule.forRoot()
  ],
  exports: [
  ],
  declarations: [
  ],
  providers: [
    CountryService
  ]
})
export class FfhSharedRootModule {
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatTooltipModule,
    WjInputModule,
    WjGridModule,
    WjGridDetailModule,
    UiModule
  ],
  exports: [
    IntToColorPipe,
    SecToMinPipe,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatTooltipModule,
    WjInputModule,
    WjGridModule,
    WjGridDetailModule,
    UiModule
  ],
  declarations: [
    SecToMinPipe,
    IntToColorPipe
  ]
})
export class FfhSharedModule {
  static forRoot (): ModuleWithProviders {
    return {
      ngModule: FfhSharedRootModule
    };
  }
}
