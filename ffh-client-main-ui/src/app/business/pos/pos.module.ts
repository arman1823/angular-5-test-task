import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FfhSharedModule } from '../../ffh/ffh-shared/ffh-shared.module';

import { PosComponent } from './pos.component';
import { PosPrintGroupsComponent } from './pos-print-groups/pos-print-groups.component';
import { PosPrintGroupEditDialogComponent } from './pos-print-groups/pos-print-group-edit-dialog/pos-print-group-edit-dialog.component';
import { HomeComponent } from './home/home.component';

const posRoutes: Routes = [
  {
    path: '',
    component: PosComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'print-groups', component: PosPrintGroupsComponent}
    ]
  }
];

export const posRouting: ModuleWithProviders = RouterModule.forChild(posRoutes);


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FfhSharedModule,
    posRouting
  ],
  declarations: [
    PosComponent,
    PosPrintGroupsComponent,
    PosPrintGroupEditDialogComponent,
    HomeComponent
  ],
  entryComponents: [
    PosPrintGroupEditDialogComponent
  ]
})
export class PosModule { }
