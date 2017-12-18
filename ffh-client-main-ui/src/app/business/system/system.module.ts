import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FfhSharedModule } from '../../ffh/ffh-shared/ffh-shared.module';

import { SystemComponent } from './system.component';
import { HomeComponent } from './home/home.component';
import { SysSitemAllFieldsComponent } from './sys-sitem-all-fields/sys-sitem-all-fields.component';
import { SysSitemAllFieldEditDialogComponent
} from './sys-sitem-all-fields/sys-sitem-all-field-edit-dialog/sys-sitem-all-field-edit-dialog.component';




const systemRoutes: Routes = [
  {
    path: '',
    component: SystemComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'sitem-all-fields', component: SysSitemAllFieldsComponent}
    ]
  }
];

export const sytemRouting: ModuleWithProviders = RouterModule.forChild(systemRoutes);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FfhSharedModule,
    sytemRouting
  ],
  declarations: [
    SystemComponent,
    HomeComponent,
    SysSitemAllFieldsComponent,
    SysSitemAllFieldEditDialogComponent
  ],
  entryComponents: [
    SysSitemAllFieldEditDialogComponent
  ]
})
export class SystemModule { }
