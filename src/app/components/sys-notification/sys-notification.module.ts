import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap';
import { NgxPaginationModule} from 'ngx-pagination';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { routing } from '../../app.routes';


import {SysNotificationComponent} from './sys-notification.component';
// import {DashboardModule} from '../dashboard/dashboard.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule,HttpModule, BrowserAnimationsModule, BrowserModule, FormsModule, ReactiveFormsModule,
  NgxPaginationModule, routing, DashboardModule, DialogModule, SharedModule],
  declarations: [SysNotificationComponent],
  exports: [],
})
export class SysNotificationModule {}