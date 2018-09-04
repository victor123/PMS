import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule, BsDatepickerModule, ModalModule, TabsModule } from 'ngx-bootstrap';
import { routing } from './app.routes';


import { DashboardModule } from './components/dashboard/dashboard.module';
import { PsdsModule } from './components/psds/psds.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


/*Related to services */

import { ServiceApi } from './constant/service.api.constant';

/* Kendo Modules */

import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

import { ChartsModule } from '@progress/kendo-angular-charts';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { SysNotificationModule } from './components/sys-notification/sys-notification.module';
import { AdminModule } from './components/admin/admin.module';


/* Componets  */

import { SharedModule } from './shared/shared.module';


import { AppComponent } from './app.component';


import '@progress/kendo-ui';
import 'hammerjs';

@NgModule({
  imports: [
    BrowserModule,CommonModule,HttpModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, GridModule, DialogModule, DateInputsModule,ChartsModule,DropDownsModule,HttpClientModule, BrowserAnimationsModule, DashboardModule, SysNotificationModule, AdminModule, 
    routing,
    SharedModule,
    PsdsModule,
    ModalModule.forRoot()
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
    HttpModule, ServiceApi
  ],
  declarations: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
