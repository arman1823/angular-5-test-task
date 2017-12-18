import 'hammerjs';
import './rxjs-operators';

import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { FfhModule } from './ffh/ffh.module';
import { AppComponent } from './app.component';

export const appRoutes: Routes = [

  { path: '', redirectTo: '/business', pathMatch: 'full' },
  { path: 'business', loadChildren: './business/business.module#BusinessModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FfhModule.forRoot()
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
