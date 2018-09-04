import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DashboardComponent } from './dashboard.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
// import { SchedulerComponent } from './scheduler.component';
import { PilotChartComponent } from './pilot-chart/pilot-chart.component';
import { JobComponent } from './job/job.component';
import { SharedModule } from '../../shared/shared.module';
import { PilotEffectiveComponent } from './pilot-effective/pilot-effective.component';
import { UserManualComponent } from './user-manual/user-manual.component';
import { ServiceLevelComponent } from './service-level/service-level.component';
import { TugSupplyComponent } from './tug-supply/tug-supply.component';
import {TugDetailsComponent} from './tug-details/tug-details.component';
import {TugEffectiveComponent} from './tug-effective/tug-effective.component';


import 'hammerjs';

@NgModule({
  imports: [CommonModule,HttpModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, SharedModule, GridModule, DialogModule, DateInputsModule,ChartsModule,DropDownsModule,HttpClientModule],
  declarations: [DashboardComponent, PilotChartComponent, JobComponent, PilotEffectiveComponent, UserManualComponent, ServiceLevelComponent, TugSupplyComponent, TugDetailsComponent, TugEffectiveComponent],
  exports: [DashboardComponent],
})
export class DashboardModule {}
