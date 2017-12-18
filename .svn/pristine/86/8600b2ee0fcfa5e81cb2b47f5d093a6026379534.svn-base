import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BusinessComponent } from './business.component';

const businessRoutes: Routes = [
  {
    path: '',
    component: BusinessComponent,
    children: [
      {
        path: '',
        children: [
          {path: '', component: HomeComponent},
          {
            path: 'system', loadChildren: './system/system.module#SystemModule'
          },
          {
            path: 'pos', loadChildren: './pos/pos.module#PosModule'
          }
        ]
      }
    ]
  }
];


export const businessRouting: ModuleWithProviders = RouterModule.forChild(businessRoutes);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    businessRouting
  ],
  declarations: [
    BusinessComponent,
    HomeComponent
  ]
})
export class BusinessModule { }
