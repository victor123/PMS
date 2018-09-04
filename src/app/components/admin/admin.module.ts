import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { TabsModule } from 'ngx-bootstrap';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import {AdminNavComponent} from './admin.component';
import { ConstraintComponent } from './constraints/constraints.component'; 
import { PilotGroupingComponent } from './pilot-grouping/pilot-grouping.component';
import { EditService } from '../../services/admin.service';
import { DelayCodeConfigComponent } from './delayCode-config/delayCode.component';
import { ManagePreDefinedComponent } from './manage-preDefine/manage-preDefined.component';
import { UnavailableReasonComponent } from './unavailable-reason/unavailable-reason.component';
import { ServicelevelConfigComponent } from './servicelevel-config/servicelevel-config.component';
import { PilotCategoryComponent } from './pilot-category/pilot-category.component';
import { PilotDefaultSortingComponent } from './pilotdefault-sorting/pilotdefault-sorting.component';
import {ManagePreDefinedPilotComponent} from './manage-preDefine-PilotShift/manage-preDefinedPilotShift.component'
import { PilotAutoDeploy }from './pilot-auto-Deploy/pilot-deploy.component';
import { ResposeComponent } from './servicelevel-config/response.modal';
import { ResposeComponentCategory } from './pilot-category/response.modal';
import { ManageConfigSnapshot} from './managedisplayconfig-snapshot/snapshot.component';
import { ManageConfigMouseOver} from './managedisplayconfig-mouseover/mouseOver.component';
import { PilotAutoConfigComponent} from  './pilot-auto-Update/pilot-auto-update.component';
import { PilotSectorComponent} from  './manage-pilot-sectorConfig/pilot-sector.component';

import { LocationGroupConfig } from  './locationgroup-config/locationgroup-config.component';
import { EstimatedEndTimeConfig } from './estimatedendtime-config/estimatedendtime.component';

import { SortableModule } from '@progress/kendo-angular-sortable';

import { LayoutModule } from '@progress/kendo-angular-layout';

import 'hammerjs';

@NgModule({
  imports: [
  	CommonModule,
   	HttpModule,  
   	HttpClientJsonpModule, 
   	BrowserAnimationsModule, 
   	FormsModule, 
   	ReactiveFormsModule, 
   	InputsModule, 
   	SharedModule, 
   	DialogModule, 
   	ButtonsModule, 
   	HttpClientModule, 
   	GridModule,
   	TabsModule,
    DropDownsModule,
    LayoutModule,
    SortableModule,
    DateInputsModule
    
  ],
  declarations: [
    AdminNavComponent, 
    ConstraintComponent, 
    PilotGroupingComponent, 
    DelayCodeConfigComponent,
    UnavailableReasonComponent,
    ServicelevelConfigComponent,
    PilotCategoryComponent,
    ManagePreDefinedComponent,
    ResposeComponent,

    PilotAutoDeploy,
    PilotDefaultSortingComponent,
    ManagePreDefinedPilotComponent,
    ManageConfigSnapshot,
    ManageConfigMouseOver,
    PilotAutoConfigComponent,
    PilotSectorComponent,
    LocationGroupConfig,
    EstimatedEndTimeConfig,
    ResposeComponentCategory
    ],
    entryComponents:[ResposeComponent, ResposeComponentCategory],
  exports: [],
  providers: [ ],
})
export class AdminModule {}
