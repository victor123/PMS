import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { IntlService } from '@progress/kendo-angular-intl';
import { ServiceApi } from '../constant/service.api.constant';
import {JobDemandFilterModel} from '../shared/modals/form.model';
import {PilotEffectiveFilerModel} from '../components/dashboard/pilot-effective/form.model';

import { DatePipe } from '@angular/common';
@Injectable()
export class PilotDemandDataService {
	constructor(private http: Http, private serviceApi: ServiceApi, public intl: IntlService){}
	public pilotchartData(date,time,hour){
		console.log(date,time,hour)
		let params = new URLSearchParams();
		params.set('date', date +" "+time);
		params.set('hours', hour);
		let options = new RequestOptions({ headers: this.getHeader(), params: params }); 
		// console.log('header params::', params);
		return this.http.get(this.serviceApi.urlMethod('pilotDemand'), options)
		.map(res => res.json())
	}
	public jobtableData(filterModel: JobDemandFilterModel){
		let params = new URLSearchParams();
		params.set('type', filterModel.type);
		params.set('name', filterModel.name);
		params.set('fromDate', filterModel.fromDate);
		params.set('toDate', filterModel.toDate);
		// params.set('skip', '0');
		// params.set('top', '10');

		let options = new RequestOptions({ headers: this.getHeader(), params: params }); 
		return this.http.get(this.serviceApi.urlMethod('jobDemand'), options)
		.map(res => res.json())
	}
	public pilotchartDataAxis(){
		return this.http.get('assets/axis.json', {headers: this.getHeader()})
		.map(res => res.json())
	}
	// Job demand Grid service function
	public filterService(filterModel: JobDemandFilterModel, callback) {
		// let url = this.serviceApi.urlMethod('jobDemand')+"?"+"type="+filterModel.type+"&"+"name="+filterModel.name+"&"+"?data="+filterModel.date;
		let params = new URLSearchParams();
		params.set('type', filterModel.type);
		params.set('name', filterModel.name);
		params.set('fromDate', filterModel.fromDate);
		params.set('toDate', filterModel.toDate);
		// params.set('skip', '0');
		// params.set('top', '10');
		let options = new RequestOptions({ headers: this.getHeader(), params: params }); 
		return this.http.get(this.serviceApi.urlMethod('jobDemand'), options)
		.map(res => res.json()).subscribe((res) => {
			console.log("service post", res);
			return callback(res);
		});
	}
	// Pilot Effecttive chart service function
	public pilotEffectiveData(fromdate,fromtime,todate,totime){
		let params = new URLSearchParams();
		params.set('startDate', fromdate +" "+fromtime);
		params.set('endDate', todate+" "+ totime);
		let options = new RequestOptions({ headers: this.getHeader(), params: params }); 
		return this.http.get(this.serviceApi.urlMethod('piloteffevtive'), options)
		.map(res => res.json())
	}
	public pilotEffectiveFilerData(filterDate: PilotEffectiveFilerModel, callback){
		let params = new URLSearchParams();
		params.set('fromDate', filterDate.fromDate +" "+ filterDate.fromTime);
		params.set('toDate', filterDate.toDate +" "+ filterDate.toTime);
		let options = new RequestOptions({ headers: this.getHeader(), params: params });
		return this.http.get(this.serviceApi.urlMethod('piloteffevtive'), options)
		.map(res => res.json()).subscribe((res) => {
			return callback(res);
		});
	}
	// pilot User Manual chart service function
	public userManualData(fromdate,fromtime,todate,totime){
		let params = new URLSearchParams();
		params.set('startDate', fromdate +" "+fromtime);
		params.set('endDate', todate+" "+ totime);
		let options = new RequestOptions({ headers: this.getHeader(), params: params });
		return this.http.get(this.serviceApi.urlMethod('usermanual'), options)
		.map(res => res.json())
	}
	public userManualFilerData(filterDate: PilotEffectiveFilerModel, callback){
		let params = new URLSearchParams();
		params.set('fromDate', filterDate.fromDate +" "+ filterDate.fromTime);
		params.set('toDate', filterDate.toDate +" "+ filterDate.toTime);
		let options = new RequestOptions({ headers: this.getHeader(), params: params });
		return this.http.get(this.serviceApi.urlMethod('usermanual'), options)
		.map(res => res.json()).subscribe((res) => {
			return callback(res);
		});
	}
	// Service Level Requirement service function
	public serviceLevelData(fromdate,fromtime,todate,totime){
		console.log(fromdate,todate)
		let params = new URLSearchParams();
		params.set('startDate', fromdate +" "+fromtime);
		params.set('endDate', todate+" "+ totime);
		let options = new RequestOptions({ headers: this.getHeader(), params: params }); 
		// console.log('header params::', params);
		return this.http.get(this.serviceApi.urlMethod('servicelevel'), options)
		.map(res => res.json())
	}
	// Tug demand service function
	public tugchartData(date,time,hour){
		console.log(date,time,hour)
		let params = new URLSearchParams();
		params.set('date', date +" "+time);
		params.set('hours', hour);
		let options = new RequestOptions({ headers: this.getHeader(), params: params }); 
		// console.log('header params::', params);
		return this.http.get(this.serviceApi.urlMethod('tugDemand'), options)
		.map(res => res.json())
	}
	// System notification function
	public sysNotification(){
		let options = new RequestOptions({ headers: this.getHeader()}); 
		// console.log('header params::', params);
		return this.http.get(this.serviceApi.urlMethod('notification'), options)
		.map(res => res.json())
	}
	public sysNotificationAlert(value: any){
		let params = new URLSearchParams();
		params.set('notificationId', value.notificationId);
		params.set('userId', 'USER');
		let url = `${this.serviceApi.urlMethod('notification')}?${'notificationId='+value.notificationId}&${'userId='+'USER'}`;
		let options = new RequestOptions({ headers: this.getHeader(), params: params }); 
		return this.http.put(url, {headers: this.getHeader()})
		.map(res => res.json())
	}
	
	// Notification multi delete
	public delete(deleteData: any) {
		let arrayData= [deleteData];
		let body = {
		    userId: 'USER',
		    notificationIdList: deleteData
		};
		let options = new RequestOptions({ headers: this.getHeader()});
		return this.http.put(this.serviceApi.urlMethod('deleteNotification'),body, options)
		.map(res => res.json());
	}
	
	// User Manual chart service function
	public tugUserManualData(fromdate,fromtime,todate,totime){
		let params = new URLSearchParams();
		params.set('startDate', fromdate +" "+fromtime);
		params.set('endDate', todate+" "+ totime);
		let options = new RequestOptions({ headers: this.getHeader(), params: params });
		return this.http.get(this.serviceApi.urlMethod('tugusermanual'), options)
		.map(res => res.json())
	}
	public tugUserManualFilerData(filterDate: PilotEffectiveFilerModel, callback){
		let params = new URLSearchParams();
		params.set('fromDate', filterDate.fromDate +" "+ filterDate.fromTime);
		params.set('toDate', filterDate.toDate +" "+ filterDate.toTime);
		let options = new RequestOptions({ headers: this.getHeader(), params: params });
		return this.http.get(this.serviceApi.urlMethod('tugusermanual'), options)
		.map(res => res.json()).subscribe((res) => {
			return callback(res);
		});
	}
	// Tug based job details
	public tugjobtableData(filterModel: JobDemandFilterModel){
		let params = new URLSearchParams();
		params.set('type', filterModel.type);
		params.set('name', filterModel.name);
		params.set('fromDate', filterModel.fromDate);
		params.set('toDate', filterModel.toDate);
		// params.set('skip', '0');
		// params.set('top', '10');

		let options = new RequestOptions({ headers: this.getHeader(), params: params }); 
		return this.http.get(this.serviceApi.urlMethod('tugdetails'), options)
		.map(res => res.json())
	}
	public tugfilterService(filterModel: JobDemandFilterModel, callback) {
		// let url = this.serviceApi.urlMethod('jobDemand')+"?"+"type="+filterModel.type+"&"+"name="+filterModel.name+"&"+"?data="+filterModel.date;
		let params = new URLSearchParams();
		params.set('type', filterModel.type);
		params.set('name', filterModel.name);
		params.set('fromDate', filterModel.fromDate);
		params.set('toDate', filterModel.toDate);
		// params.set('skip', '0');
		// params.set('top', '10');
		let options = new RequestOptions({ headers: this.getHeader(), params: params }); 
		return this.http.get(this.serviceApi.urlMethod('tugdetails'), options)
		.map(res => res.json()).subscribe((res) => {
			console.log("service post", res);
			return callback(res);
		});
	}
	public pilotDetailById(value: any) {
		let params = new URLSearchParams();
		params.set('moduleCode', value.moduleCode);
		params.set('jobId', value.jobId);
		let options = new RequestOptions({ headers: this.getHeader(), params: params });
		// console.log('header params::', params);
		return this.http.get(this.serviceApi.urlMethod('pilotDetails'), options)
			.map(res => res.json())
	}
	private getHeader() {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return headers;
	}
	public get5minsTime()
	{
		var tim= new Date()
		var val=(tim.getMinutes()+5-tim.getMinutes()%5)
		if(val>=60)
		{
			val=0;
		}
		return new Date(tim.getMonth() + 1 + "/" + tim.getUTCDate() + "/" + tim.getFullYear() + " "+tim.getHours()+":"+ val);
	}
}
//{ "jobId":11969, "staffRecordId":94989, "pilotAvailId":1143, "priorityId":1, "vesselHeight":23, "effectiveCST":"03-11-2017 22:00:00", "cst":"03-11-2017 21:00:00", "deployTime":"03-11-2017 21:50:00", "arriveTime":"03-11-2017 21:10:00", "onBoardTime":"03-11-2017 21:10:00", "startTime":"03-11-2017 21:35:00", "endTime":"03-11-2017 23:40:00", "locationTo":"SEA5" , "status":"7" }