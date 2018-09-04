import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { IntlService } from '@progress/kendo-angular-intl';
import { ServiceApi } from '../constant/service.api.constant';
import { JobDemandFilterModel } from '../shared/modals/form.model';
import { PilotEffectiveFilerModel } from '../components/dashboard/pilot-effective/form.model';

import { DatePipe } from '@angular/common';
@Injectable()
export class PsdsService {
	constructor(private http: Http, private serviceApi: ServiceApi, public intl: IntlService) { }
	// Pilot details by ID function
	public pilotDetailById(value: any) {
		let params = new URLSearchParams();
		params.set('moduleCode', value.moduleCode);
		params.set('jobId', value.jobId);
		let options = new RequestOptions({ headers: this.getHeader(), params: params });
		// console.log('header params::', params);
		return this.http.get(this.serviceApi.urlMethod('pilotDetails'), options)
			.map(res => res.json())
	}
	public pilotGroupingDetails() {

		let options = new RequestOptions({ headers: this.getHeader() });
		// console.log('header params::', params);
		return this.http.get(this.serviceApi.urlMethod('pilotGroupingDetails'), options)
			.map(res => res.json())
	}
	public pilotJobColourConfig() {

		let options = new RequestOptions({ headers: this.getHeader() });
		// console.log('header params::', params);
		return this.http.get(this.serviceApi.urlMethod('pilotJobColourConfig'), options)
			.map(res => res.json())
	}
	public getreliefjobs(data) {
		let params = new URLSearchParams();
		var data1 = JSON.parse(JSON.stringify(data))
		var date = this.intl.formatDate(data.reliefTime, 'dd-MM-yyyy HH:mm')

		data1.reliefTime = date

		console.log(data, data1)
		let options = new RequestOptions({ headers: this.getHeader() });
		return this.http.post(this.serviceApi.urlMethod('reliefjobs'), data1, options)
			.map(res => res.json())
	}
	public saveponr(data) {
		let params = new URLSearchParams();
		var data1 = JSON.parse(JSON.stringify(data))
		var date = this.intl.formatDate(data.dateTime, 'dd-MM-yyyy HH:mm')
		data1.dateTime = date
		let options = new RequestOptions({ headers: this.getHeader() });
		return this.http.put(this.serviceApi.urlMethod('ponr'), data1, options)
			.map(res => res.json())
	}
	public unAssignJobs(data) {
		let params = new URLSearchParams();
		var data1 = JSON.parse(JSON.stringify(data))

		let options = new RequestOptions({ headers: this.getHeader() });
		return this.http.put(this.serviceApi.urlMethod('unAssignJobs'), data1, options)
			.map(res => res.json())
	}
	public fixPlannedJobs(data) {
		let params = new URLSearchParams();
		var data1 = JSON.parse(JSON.stringify(data))

		let options = new RequestOptions({ headers: this.getHeader() });
		return this.http.put(this.serviceApi.urlMethod('fixPlannedJobs'), data1, options)
			.map(res => res.json())
	}
	public updateUnplannedJobsNotSchedule(data) {
		let params = new URLSearchParams();
		var data1 = JSON.parse(JSON.stringify(data))

		let options = new RequestOptions({ headers: this.getHeader() });
		return this.http.put(this.serviceApi.urlMethod('updateUnplannedJobsNotSchedule'), data1, options)
			.map(res => res.json())
	}
	public createVesselPortClearance(data) {
		let params = new URLSearchParams();
		var data1 = JSON.parse(JSON.stringify(data))
		var date = this.intl.formatDate(data.approvalTime, 'dd-MM-yyyy HH:mm')
		data1.approvalTime = date
		let options = new RequestOptions({ headers: this.getHeader() });
		return this.http.put(this.serviceApi.urlMethod('createVesselPortClearance'), data1, options)
			.map(res => res.json())
	}
	public plannedJobsStatus(data) {
		let params = new URLSearchParams();
		var data1 = JSON.parse(JSON.stringify(data))
		var date = this.intl.formatDate(data.dateTime, 'dd-MM-yyyy HH:mm')
		data1.dateTime = date
		let options = new RequestOptions({ headers: this.getHeader() });
		return this.http.put(this.serviceApi.urlMethod('plannedJobsStatus'), data1, options)
			.map(res => res.json())
	}

	public getPilots() {
		let params = new URLSearchParams();

		params.set('shiftStartDate', "22-02-2018 07:30:00");
		params.set('shiftEndDate', "22-02-2018 07:30:00");
		let options = new RequestOptions({ headers: this.getHeader(), params: params });
		// return this.http.get("assets/dummy.json")
		// .map(res => res.json())
		return this.http.get(this.serviceApi.urlMethod('pilotdetails'), options)
			.map(res => res.json())
	}
	public savePilots(data) {
		var data1 = JSON.parse(JSON.stringify(data))
		var date = this.intl.formatDate(data.shiftEndDate, 'dd-MM-yyyy HH:mm')

		data1.tempShiftEndDate = date
		let options = new RequestOptions({ headers: this.getHeader() });
		// return this.http.get("assets/dummy.json")
		// .map(res => res.json())+
		return this.http.put(this.serviceApi.urlMethod('pilotdetails'), data1, options)
			.map(res => res.json())
	}
	public getbasedetails() {
		let options = new RequestOptions({ headers: this.getHeader() });

		// return this.http.get("assets/dummy.json")
		// .map(res => res.json())
		return this.http.get(this.serviceApi.urlMethod('basedetails'), options)
			.map(res => res.json())
	}
	public savespecialjobs(val) {
		var data1 = JSON.parse(JSON.stringify(val))
		var date = this.intl.formatDate(val.lastServicedDate, 'dd-MM-yyyy HH:mm')
		data1.lastServicedDate = date
		let options = new RequestOptions({ headers: this.getHeader() });
		// return this.http.get("assets/dummy.json")
		// .map(res => res.json())
		return this.http.put(this.serviceApi.urlMethod('specialjobs'), data1, options)
			.map(res => res.json())
	}
	public reasonCodes() {
		let options = new RequestOptions({ headers: this.getHeader() });
		return this.http.get(this.serviceApi.urlMethod('reasonCodes'), options)
			.map(res => res.json())
	}
	public getpriorityCodes() {
		let options = new RequestOptions({ headers: this.getHeader() });
		return this.http.get(this.serviceApi.urlMethod('priorityCodes'), options)
			.map(res => res.json())

	}
	public unavilslots(data) {
		let params = new URLSearchParams();
		var data1 = JSON.parse(JSON.stringify(data))
		var date = this.intl.formatDate(data.start, 'dd-MM-yyyy HH:mm')
		var date1 = this.intl.formatDate(data.end, 'dd-MM-yyyy HH:mm')
		data1.startDate = date
		data1.endDate = date1
		console.log(data, data1)
		let options = new RequestOptions({ headers: this.getHeader() });
		return this.http.post(this.serviceApi.urlMethod('unavilslots'), data1, options)
			.map(res => res.json())
	}
	public updateunavilslots(data) {

		let params = new URLSearchParams();
		var data1 = JSON.parse(JSON.stringify(data))
		var date = this.intl.formatDate(data.start, 'dd-MM-yyyy HH:mm')
		var date1 = this.intl.formatDate(data.end, 'dd-MM-yyyy HH:mm')
		data1.startDate = date
		data1.endDate = date1
		console.log(data, data1)
		let options = new RequestOptions({ headers: this.getHeader() });
		return this.http.put(this.serviceApi.urlMethod('unavilslots'), data1, options)
			.map(res => res.json())
	}
	public createjobs(data) {
		console.log(data)
		var data1 = JSON.parse(JSON.stringify(data))
		var date = this.intl.formatDate(data.planStartDate, 'dd-MM-yyyy HH:mm')
		var date1 = this.intl.formatDate(data.planEndDate, 'dd-MM-yyyy HH:mm')
		data1.planStartDate = date
		data1.planEndDate = date1
		let options = new RequestOptions({ headers: this.getHeader() });
		return this.http.post(this.serviceApi.urlMethod('assignJobs'), data1, options)
			.map(res => res.json())
	}
	public getjobs(data) {
		let options = new RequestOptions({ headers: this.getHeader() });
		return this.http.get(this.serviceApi.urlMethod('assignJobs'), options)
			.map(res => res.json())
	}


	public deleteuns(data) {
		let params = new URLSearchParams();
		params.set('unAvailId', data.unAvailId);
		params.set('remarks', data.remarks)
		let options = new RequestOptions({ headers: this.getHeader() });
		let url = `${this.serviceApi.urlMethod('unavilslots')}/` + data.unAvailId + "/" + data.remarks;
		return this.http.delete(url, options)
			.map(res => res.json())
	}
	public plannedJobs() {
		var data = "22-02-2018"
		let params = new URLSearchParams();
		//var date= this.intl.formatDate(data, 'dd-MM-yyyy HH:mm')
		params.set('shiftStartDate', data);
		console.log(this.serviceApi.urlMethod('plannedjobs'), this.serviceApi.urlMethod('unPlannedJobs'))
		let options = new RequestOptions({ headers: this.getHeader(), params: params });
		return this.http.get(this.serviceApi.urlMethod('plannedjobs'), options)
			.map(res => res.json())
	}
	public sectorplannedJobs(val) {
		var data = "22-02-2018"
		let params = new URLSearchParams();
		//var date= this.intl.formatDate(data, 'dd-MM-yyyy HH:mm')
		params.set('shiftStartDate', data);
		params.set('sectorList',val)
		let options = new RequestOptions({ headers: this.getHeader(), params: params });
		return this.http.get(this.serviceApi.urlMethod('splannedjobs'), options)
			.map(res => res.json())
	}

	public getpilotSectorDetails() {
		var data = "22-02-2018"
		let options = new RequestOptions({ headers: this.getHeader() });
		return this.http.get(this.serviceApi.urlMethod('pilotSectorDetails'), options)
			.map(res => res.json())
	}
	public daysBetween(date1, date2) {
		//Get 1 day in milliseconds
		date1 = new Date(date1)
		date2 = new Date(date2)
		var one_day = 1000 * 60 * 60 * 24;
	
		// Convert both dates to milliseconds
		var date1_ms = date1.getTime();
		var date2_ms = date2.getTime();
	
		// Calculate the difference in milliseconds
		var difference_ms = date2_ms - date1_ms;
		//take out milliseconds
		difference_ms = difference_ms / 1000;
		var seconds = Math.floor(difference_ms % 60);
		difference_ms = difference_ms / 60;
		var minutes = Math.floor(difference_ms % 60);
		difference_ms = difference_ms / 60;
		var hours = Math.floor(difference_ms % 24);
		var days = Math.floor(difference_ms / 24);
	
		return days * 24 * 60 + ((hours * 60) + minutes);
	  }
	public saveplannedJobs(data) {
		console.log(data)
		let params = new URLSearchParams();
		var dataval = {
			"jobId": data.jobId, "staffRecordId": data.staffRecordId, "pilotAvailId": 1143, "priorityId": data.priorityId,
			"vesselHeight": 256, "effectiveCST": this.intl.formatDate(data.efficativeCST, 'dd-MM-yyyy HH:mm:ss'), "cst": this.intl.formatDate(data.cst, 'dd-MM-yyyy HH:mm:ss'), "deployTime": this.intl.formatDate(data.deployDate, 'dd-MM-yyyy HH:mm:ss'),
			"arriveTime": this.intl.formatDate(data.arriveDate, 'dd-MM-yyyy HH:mm:ss'), "onBoardTime": this.intl.formatDate(data.onBoardDate, 'dd-MM-yyyy HH:mm:ss'), "startDateTime": this.intl.formatDate(data.startDateTime, 'dd-MM-yyyy HH:mm:ss'), "endDateTime": this.intl.formatDate(data.endDateTime, 'dd-MM-yyyy HH:mm:ss'),
			"locationTo": data.locationToCode, "status": data.jobStatus
		}
		let options = new RequestOptions({ headers: this.getHeader() });
		return this.http.put(this.serviceApi.urlMethod('plannedjobs'), dataval, options)
			.map(res => res.json())
	}
	public getunplannedjobs() {
		console.log(this.serviceApi.urlMethod('plannedjobs'), this.serviceApi.urlMethod('unPlannedJobs'))
		let options = new RequestOptions({ headers: this.getHeader() });
		return this.http.get(this.serviceApi.urlMethod('unPlannedJobs'), options)
			.map(res => res.json())
	}
	public getunavailbleslots(startDate, endDate) {
		var date = this.intl.formatDate(startDate, 'dd-MM-yyyy HH:mm')
		var date1 = this.intl.formatDate(endDate, 'dd-MM-yyyy HH:mm')
		let params = new URLSearchParams();
		params.set('startDateTime', "22-02-2018 00:00");
		params.set('endDateTime', "22-02-2018 23:00");
		let options = new RequestOptions({ headers: this.getHeader(), params: params });
		return this.http.get(this.serviceApi.urlMethod('unavilslots'), options)
			.map(res => res.json())
	}
	public getunvaild(event: any) {
		if (event.efficativeCST === null || event.efficativeCST === undefined) {
			event.efficativeCST = undefined
		}
		else {
			event.efficativeCST = new Date(event.efficativeCST)
		}
		if (event.start === null || event.start === undefined) {
			event.start = undefined
		}
		else {
			event.start = new Date(event.start)
		}
		if (event.end === null || event.end === undefined) {
			event.end = undefined
		}
		else {
			event.end = new Date(event.end)
		}
		if (event.jobStatus == "4" || event.jobStatus == "5" || event.jobStatus == "6" || event.jobStatus == "7" || event.jobStatus == "8" || event.jobStatus == "9") {
			if (event.deployDate === null || event.deployDate === undefined) {
				let j = new Date();
				j.setMinutes(j.getMinutes() + 10)
				event.deployDate = j
			}
			else {
				event.deployDate = new Date(event.deployDate)
			}
		}
		else
			event.deployDate = undefined
		if (event.jobStatus == "5" || event.jobStatus == "6" || event.jobStatus == "7" || event.jobStatus == "8" || event.jobStatus == "9") {
			if (event.arriveDate === null || event.arriveDate === undefined) {
				let j = new Date();
				j.setMinutes(j.getMinutes() + 10)
				event.arriveDate = j
			}
			else {
				event.arriveDate = new Date(event.arriveDate)
			}
		}
		else
			event.arriveDate = undefined;
		if (event.jobStatus == "6" || event.jobStatus == "7" || event.jobStatus == "8" || event.jobStatus == "9") {
			if (event.onBoardDate === null || event.onBoardDate === undefined) {
				event.onBoardDate = undefined
			}
			else {
				event.onBoardDate = new Date(event.onBoardDate)
			}
		}
		else
			event.onBoardDate = undefined
		if (event.jobStatus == "7" || event.jobStatus == "8" || event.jobStatus == "9") {
			if (event.startDateTime === null || event.startDateTime === undefined) {
				let j = new Date();
				j.setMinutes(j.getMinutes() + 10)
				event.startDateTime = j
			}
			else {
				event.startDateTime = new Date(event.startDateTime)
			}
		}
		else
			event.startDateTime = undefined
		if (event.jobStatus == "8" || event.jobStatus == "9") {
			if (event.endDateTime === null || event.endDateTime === undefined) {
				let j = new Date();
				j.setMinutes(j.getMinutes() + 10)
				event.endDateTime = j
			}
			else {
				event.endDateTime = new Date(event.endDateTime)
			}
		}
		else
			event.endDateTime = undefined
		if (event.cst === null || event.cst === undefined) {
			event.cst = undefined
		}
		else {
			event.cst = new Date(event.cst)
		}
		if (event.srt === null || event.srt === undefined) {
			event.srt = undefined
		}
		else {
			event.srt = new Date(event.srt)
		}
		console.log(event)
		return event;
	}
	private getHeader() {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return headers;
	}
	public get5minsTime() {
		var tim = new Date()
		var val = (tim.getMinutes() + 5 - tim.getMinutes() % 5)
		if (val >= 60) {
			val = 0;
		}
		return new Date(tim.getMonth() + 1 + "/" + tim.getUTCDate() + "/" + tim.getFullYear() + " " + tim.getHours() + ":" + val);
	}
	
}
//{ "jobId":11969, "staffRecordId":94989, "pilotAvailId":1143, "priorityId":1, "vesselHeight":23, "effectiveCST":"03-11-2017 22:00:00", "cst":"03-11-2017 21:00:00", "deployTime":"03-11-2017 21:50:00", "arriveTime":"03-11-2017 21:10:00", "onBoardTime":"03-11-2017 21:10:00", "startTime":"03-11-2017 21:35:00", "endTime":"03-11-2017 23:40:00", "locationTo":"SEA5" , "status":"7" }