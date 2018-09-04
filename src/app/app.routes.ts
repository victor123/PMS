import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PsdsComponent } from './components/psds/psds.component';
import { PilotChartComponent } from './components/dashboard/pilot-chart/pilot-chart.component';
import { JobComponent } from './components/dashboard/job/job.component';
import { PilotEffectiveComponent } from './components/dashboard/pilot-effective/pilot-effective.component';
import { UserManualComponent } from './components/dashboard/user-manual/user-manual.component';
import { ServiceLevelComponent } from './components/dashboard/service-level/service-level.component';
import { TugSupplyComponent } from './components/dashboard/tug-supply/tug-supply.component';
import { SysNotificationComponent } from './components/sys-notification/sys-notification.component';
import { TugDetailsComponent } from './components/dashboard/tug-details/tug-details.component';
import { TugEffectiveComponent } from './components/dashboard/tug-effective/tug-effective.component';
import { AdminNavComponent } from './components/admin/admin.component';
import { ConstraintComponent } from './components/admin/constraints/constraints.component';
import {PilotGroupingComponent} from './components/admin/pilot-grouping/pilot-grouping.component';
import {DelayCodeConfigComponent} from './components/admin/delayCode-config/delayCode.component';
 
/**
 * All the routes for our application
 */
const routes: Routes = [
	 {path: '', pathMatch: 'full', redirectTo: '/dashboard'},
		{ path: '', component: DashboardComponent },
		{path: 'dashboard', component: DashboardComponent,data: {title: 'Dashboard'}, 
			children: [
				{ path: 'pilotchart', component: PilotChartComponent },
				{ path: 'jobdetails', component: JobComponent },
				{ path: 'piloteffective', component: PilotEffectiveComponent },
				{ path: 'usermanual', component: UserManualComponent },
				{ path: 'servicelevel', component: ServiceLevelComponent},
				{ path: 'tugsupply', component: TugSupplyComponent},
				{ path: 'tugdetails', component: TugDetailsComponent},
				{ path: 'tugeffective', component: TugEffectiveComponent}
			]
		},
		{path: 'psds', component:PsdsComponent,data: {title: 'Psds'}},
		{ path: 'notification', component: SysNotificationComponent, data: {title: 'System Notification'},},
		{ path: 'admin', component: AdminNavComponent, data: {title: 'Admin'},
			children:[
				{path: 'constraint', component: ConstraintComponent, data: {subtitle: 'constraint'}},
				{path: 'pilotgrouping', component: PilotGroupingComponent, data: {subtitle: 'pilotgrouping'}},
				{path: 'delaycode', component: DelayCodeConfigComponent, data: {subtitle: 'pilotdelaycode'}}
			] 
		}
		];
/**
 * A listing of all the route providers (Guards and such)
 * @type {any[]}
 */
export const appRoutingProviders: any[] = [
];

/**
 * A list of all the component declarations
 */
export const appRoutingDeclarations: any[] = [
];

export const routing = RouterModule.forRoot(routes, { useHash: false });