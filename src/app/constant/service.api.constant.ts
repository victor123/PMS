import { Injectable } from '@angular/core';

@Injectable()
export class ServiceApi {

	// For Local Host Port and Api link

	// private localhost: string = 'http://172.30.241.178:8085/';

	// private urlapi = {
	// 	'jobDemand': 'mres/dashboard/ShowPilotageDetails',
	// 	'pilotDemand': 'mres/dashboard/PilotSupplyJobDemandChart'
	// }

	// For Web Server Port and Api link
	//private localhost: string = 'http://172.16.1.99:8080/';
	//	'http://172.16.1.102:8085/api/v1/mres/psds/plannedJobs'
	//private localhost: string = 'http://172.16.1.99:8080/';
	private localhost: string = 'http://172.16.1.99:8080/';
	//private localhost: string = 'http://172.16.1.99:8080/';

	// private localhost: string = 'http://172.30.241.178:8085/';
	private urlapi = {
		'jobDemand': 'ms_mres_dashboard_fe/dashboard/ShowPilotageDetails',
		'pilotDemand': 'ms_mres_dashboard_fe/dashboard/PilotSupplyJobDemandChart',
		'piloteffevtive':'ms_mres_dashboard_fe/dashboard/PilotEffectiveWorkingHours',
		'usermanual':'ms_mres_dashboard_fe/dashboard/UserManualAdjustment',
		'servicelevel': 'ms_mres_dashboard_fe/dashboard/SLA',
		'pilotdetails':'api/v1/mres/psds/pilots',
		'basedetails':'api/v1/mres/psds/baseCodes',
		'specialjobs':'api/v1/mres/psds/pilotSpecialJobs/',
		'reasonCodes':'api/v1/mres/psds/reasonCodes',
		'tugDemand': 'ms_mres_dashboard_fe/dashboard/TugSupplyJobDemandChart',
		'notification': 'ms_mres_dashboard_fe/dashboard/Notification',
		'unavilslots':'api/v1/psds/pilotUnAvailSlots',
		'delslots':'api/v1/psds/UnAvailSlots',

		'unPlannedJobs':'api/v1/mres/psds/unPlannedJobs',
		'plannedjobs':'api/v1/mres/psds/plannedJobs',
		'splannedjobs':'api/v3/mres/psds/plannedJobs',
		'priorityCodes':'api/v1/mres/psds/priorityCodes',
		'reliefjobs':'api/v1/mres/psds/reliefjobs',
		'assignJobs':'api/v1/mres/psds/assignJobs',
		'ponr':'api/v1/mres/psds/ponr',
		'updateUnplannedJobsNotSchedule':'api/v1/mres/psds/updateUnplannedJobsNotSchedule',
		'createVesselPortClearance':'api/v1/mres/psds/createVesselPortClearance',
		'pilotSectorDetails':'api/v1/mres/psds/pilotSectorDetails',
		'pilotGroupingDetails':'api/v1/mres/psds/pilotGrouping',
		'pilotJobColourConfig':'api/v1/mres/psds/pilotJobColourConfig',
		'unAssignJobs':'api/v1/mres/psds/unAssignJobs',
		'fixPlannedJobs':'api/v1/mres/psds/fixPlannedJobs',
		'plannedJobsStatus':'api/v1/mres/psds/plannedJobsStatus',
		'pilotDetails': 'ms_mres_dashboard_fe/dashboard/JobDetails',
		'deleteNotification': 'ms_mres_dashboard_fe/dashboard/deleteNotification',
		'tugusermanual': 'ms_mres_dashboard_fe/dashboard/TugUserManualAdjustment',
		'tugdetails': 'ms_mres_dashboard_fe/dashboard/TugJobsDetails',
		'constraints': 'ms_mres_psds_fe/api/v1/psds/pilotJobAssignment',
		'pilotGrouping':'ms_mres_psds_fe/api/v1/psds/pilotGroupingDetails',

		'pilotGroupColourDetails': 'ms_mres_psds_fe/api/v1/mres/psds/colourDetails',
		'pilotGroupShiftTypeDetails': 'ms_mres_psds_fe/api/v1/mres/psds/pilotShiftTypeDetails',
		'pilotGroupBaseCodes': 'ms_mres_psds_fe/api/v1/mres/psds/baseCodes',
		'createPilotGroup':'ms_mres_psds_fe/api/v1/psds/createPilotGrouping',

		'deletrPilotGroup':'ms_mres_psds_fe/api/v1/mres/psds/deletePilotGrouping',
		'updatePilotGroup':'ms_mres_psds_fe/api/v1/psds/updatePilotGrouping',

		'pilotDelayCode':'ms_mres_psds_fe/api/v1/mres/psds/pilotDelayCodeConfiguration',
		'pilotJobStatusDetails':'ms_mres_psds_fe/api/v1/mres/psds/pilotJobStatusDetails',
		'unavailableReason':'ms_mres_psds_fe/api/v1/psds/manageUnavailableReasonCode',
		'priorityconfiguration':'ms_mres_psds_fe/api/v1/psds/pilotJobPriorityConfiguration',
		'servicelevelconfig':'ms_mres_psds_fe/api/v1/psds/pilotJobServiceLevelCategoryConfiguration',
		'pilotGroupCode':'ms_mres_psds_fe/api/v1/mres/psds/pilotGroupCode',
		'managePreDefineSMS':'ms_mres_psds_fe/api/v1/psds/predefinedSMS',
		'pilotSorting':'/ms_mres_psds_fe1/api/v1/mres/psds/pilotSorting',
		'pilotSortingUpdate':'/ms_mres_psds_fe1/api/v1/mres/psds/pilotSortingUpdate',

		'pilotAutoUpdate':'ms_mres_psds_fe1/api/v1/mres/psds/getPoiltJobStatusAutoConfigDetails',
		'pilotJobStatusOriginalDetails':'ms_mres_psds_fe1/api/v1/mres/psds/pilotJobStatusOriginalDetails',
		'pilotJobUpdateStatus':'ms_mres_psds_fe1/api/v1/mres/psds/pilotJobUpdateStatusDetails',
		'createPoiltJobStatus':'ms_mres_psds_fe1/api/v1/mres/psds/createPoiltJobStatus',
		'updatePilotJobStatus':'ms_mres_psds_fe1/api/v1/mres/psds/updatePilotJobStatusAutoConfigDetails',
		'deletePilotJobStatus':'ms_mres_psds_fe1/api/v1/mres/psds/deletePilotJobStatusAutoConfigDetails'
	}
	public urlMethod(url: string) {

		return this.localhost + this.urlapi[url];
	}

}