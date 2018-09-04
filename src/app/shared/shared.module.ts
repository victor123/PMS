import { NgModule, ModuleWithProviders,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SubHeaderComponent } from './subHeader/subHeader.component';
import { SideNavComponent } from './sidenav/sidenav.component';
import { routing, appRoutingProviders, appRoutingDeclarations } from '../app.routes';
import { PsdsModalFormComponent } from './modals/psds/pilotDetailsPopup.component';
import { TsdsFormComponent  } from './modals/tsds/tugDetailsPopup.component';
import { JobFormComponent  } from './modals/editjob/jobDetailsPopup.component';
import { AlertModal  } from './modals/alert/alert.modal';
import { DateFormatPipe } from './pipes/dateFilter.pipe';
import { DivisionPipe } from './pipes/divition.pipe';
import { NotifSearchPipe } from './pipes/notification.search.pipe';
import {datePipe} from './pipes/date.pipe';
import {SearchPipe} from './pipes/search.pipe';
import {Changecolor} from './pipes/changegroup.pipe';

/**
* Do not specify providers for modules that might be imported by a lazy loaded module.
*/

@NgModule({
	imports: [CommonModule, RouterModule, BrowserAnimationsModule, routing, DialogModule,DateInputsModule, FormsModule, ReactiveFormsModule,
	TabsModule.forRoot()],
	// declarations: [HeaderComponent, FooterComponent, SubHeaderComponent, SideNavComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	// exports: [HeaderComponent, FooterComponent, SubHeaderComponent, SideNavComponent, CommonModule, FormsModule, RouterModule]
	declarations: [HeaderComponent, FooterComponent, SubHeaderComponent, SideNavComponent, PsdsModalFormComponent, DateFormatPipe, DivisionPipe, TsdsFormComponent, NotifSearchPipe,AlertModal,JobFormComponent,datePipe,SearchPipe,Changecolor],
	exports: [HeaderComponent, FooterComponent, SubHeaderComponent, SideNavComponent, CommonModule, FormsModule, RouterModule, DateFormatPipe, DivisionPipe, TsdsFormComponent,JobFormComponent,AlertModal, PsdsModalFormComponent, NotifSearchPipe,SearchPipe,datePipe,Changecolor]})
export class SharedModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: []
		};
	}
}
