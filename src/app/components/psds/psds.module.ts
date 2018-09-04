import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
// import { SchedulerComponent } from './scheduler.component';
import { SharedModule } from '../../shared/shared.module';
import { PsdsComponent } from './psds.component';
import { PilotdetailsComponent } from './modals/pilot.modal';
import { Reliefmodal } from './modals/relief/relief.modal';
import { Declareponrmodal } from './modals/declareponr/declareponr.modal';
import { UJModal } from './modals/uj.modal';
import { Cvsmmodal } from './modals/cvsm/cvsm.modal'
import {FilterModal } from './modals/filter/filter.modal'
import { SortableModule } from '@progress/kendo-angular-sortable';
import '@progress/kendo-ui';
import 'hammerjs';

@NgModule({
  imports: [CommonModule,HttpModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule,SharedModule,SortableModule, GridModule, DialogModule, DateInputsModule,ChartsModule,DropDownsModule,HttpClientModule],
  declarations: [PsdsComponent,    PilotdetailsComponent,Declareponrmodal,    Reliefmodal,    UJModal,Cvsmmodal,FilterModal],
})
export class PsdsModule {}
