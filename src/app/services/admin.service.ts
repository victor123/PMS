import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ServiceApi } from '../constant/service.api.constant';
import 'rxjs/add/operator/map';

@Injectable()
export class EditService extends BehaviorSubject<any[]> {
    constructor(private http: HttpClient, private serviceApi: ServiceApi, private https: Http) {
        super([]);
    }
    public getPilotGroupingDetails (){
        return this.https.get(this.serviceApi.urlMethod('pilotGrouping'), {headers: this.getHeader()})
        .map(res => res.json())
    }
    public getPilotGroupColourDetails (){
        return this.https.get(this.serviceApi.urlMethod('pilotGroupColourDetails'), {headers: this.getHeader()})
        .map(res => res.json())
    }
    public getPilotGroupShiftTypeDetails (){
        return this.https.get(this.serviceApi.urlMethod('pilotGroupShiftTypeDetails'), {headers: this.getHeader()})
        .map(res => res.json())
    }
    public getPilotGroupBaseCodesDetails (){
        return this.https.get(this.serviceApi.urlMethod('pilotGroupBaseCodes'), {headers: this.getHeader()})
        .map(res => res.json())
    }
    public createPilotGroup (data: any){
        data.userId = 'USER';
        return this.https.post(this.serviceApi.urlMethod('pilotGrouping'),data , {headers: this.getHeader()})
        .map(res => res.json())
    }
    public updatePilotGroup (data: any){
        data.userId = 'USER';
        return this.https.put(this.serviceApi.urlMethod('pilotGrouping'),data , {headers: this.getHeader()})
        .map(res => res.json())
    }
    public deletPilotGroup (data: any){
        let body = data;
        let options = new RequestOptions({ 
            body: body,
            headers: this.getHeader()
        });
        return this.https.delete(this.serviceApi.urlMethod('pilotGrouping'), options)
        .map(res => res.json())
    }
    // Pilot Delay code services 
    public getPilotDelayCode (){
        return this.https.get(this.serviceApi.urlMethod('pilotDelayCode'), {headers: this.getHeader()})
        .map(res => res.json())
    }
    public createPilotDelayCode (data: any){
        data.userId = 'USER';
        return this.https.post(this.serviceApi.urlMethod('pilotDelayCode'),data , {headers: this.getHeader()})
        .map(res => res.json())
    }
    public updatePilotDelayCode (data: any){
        data.userId = 'USER';
        return this.https.put(this.serviceApi.urlMethod('pilotDelayCode'),data , {headers: this.getHeader()})
        .map(res => res.json())
    }
    public deletDelayCode (data: any){
        let body = data;
        let options = new RequestOptions({ 
            body: body,
            headers: this.getHeader()
        });
        return this.https.delete(this.serviceApi.urlMethod('pilotDelayCode'), options)
        .map(res => res.json())
    }
     // Pilot Delay grid status list
    public getPilotJobStatusDetails() {
        return this.https.get(this.serviceApi.urlMethod('pilotJobStatusDetails'), {headers: this.getHeader()})
        .map(res => res.json())
    }
    
     // Manage Unavailable Reason
    public getUnavailableReasonDetails(value: any) {
        let url = `${this.serviceApi.urlMethod('unavailableReason')}/${value}`;
        return this.https.get(url, {headers: this.getHeader()})
        .map(res => res.json())
    }
    public createUnavailableReason (data: any){
        data.userId = 'SYSTEM';
        return this.https.post(this.serviceApi.urlMethod('unavailableReason'),data , {headers: this.getHeader()})
        .map(res => res.json())
    }
    public updateUnavailableReason (data: any){
        data.userId = 'SYSTEM';
        return this.https.put(this.serviceApi.urlMethod('unavailableReason'),data , {headers: this.getHeader()})
        .map(res => res.json())
    }
    public deletUnavailableReason (data: any){
        let body = data;
        let options = new RequestOptions({ 
            body: body,
            headers: this.getHeader()
        });
        return this.https.delete(this.serviceApi.urlMethod('unavailableReason'), options)
        .map(res => res.json())
    }
    // priority configuration
    public getPriorityConfigDetails() {
        // let url = `${this.serviceApi.urlMethod('servicelevelconfig')}/${value}`;
        return this.https.get(this.serviceApi.urlMethod('priorityconfiguration'), {headers: this.getHeader()})
        .map(res => res.json())
    }
    public createPriorityConfig (data: any){
        data.userId = 'SYSTEM';
        return this.https.post(this.serviceApi.urlMethod('priorityconfiguration'),data , {headers: this.getHeader()})
        .map(res => res.json())
    }
    public updatePriorityConfig (data: any){
        data.userId = 'SYSTEM';
        return this.https.put(this.serviceApi.urlMethod('priorityconfiguration'),data , {headers: this.getHeader()})
        .map(res => res.json())
    }
    public deletPriorityConfig (data: any){
        let body = data;
        let options = new RequestOptions({ 
            body: body,
            headers: this.getHeader()
        });
        return this.https.delete(this.serviceApi.urlMethod('priorityconfiguration'), options)
        .map(res => res.json())
    }
    // Service level configuration
    public getServicelevelConfigDetails(value: any) {
        let url = `${this.serviceApi.urlMethod('servicelevelconfig')}/${value}`;
        return this.https.get(url, {headers: this.getHeader()})
        .map(res => res.json())
    }
    public createServicelevelConfig (data: any){
        data.userId = 'SYSTEM';
        return this.https.post(this.serviceApi.urlMethod('servicelevelconfig'),data , {headers: this.getHeader()})
        .map(res => res.json())
    }
    public updateServicelevelConfig (data: any){
        data.userId = 'SYSTEM';
        return this.https.put(this.serviceApi.urlMethod('servicelevelconfig'),data , {headers: this.getHeader()})
        .map(res => res.json())
    }
    public deletServicelevelConfig (data: any){
        let body = data;
        let options = new RequestOptions({ 
            body: body,
            headers: this.getHeader()
        });
        return this.https.delete(this.serviceApi.urlMethod('servicelevelconfig'), options)
        .map(res => res.json())
    }
    public getPilotGroupCodeList(){
        return this.https.get(this.serviceApi.urlMethod('pilotGroupCode'),{headers:this.getHeader()})
        .map(res => res.json())
    }
    public getPilotDefinedCode (){
        return this.https.get('assets/axis.json', {headers: this.getHeader()})
        .map(res => res.json())
    }
    //Manage Pre Defined grid List
    public getManageDataList(data:any){
        let url = `${this.serviceApi.urlMethod('managePreDefineSMS')}/${data.moduleCode}/${data.prefix}`;
        return this.https.get(url, { headers: this.getHeader() })
        .map(res => res.json())
    }

    public createManagePreDefine(data:any) {
        data.userId = 'USER';
        return this.https.post(this.serviceApi.urlMethod('managePreDefineSMS'),data , {headers: this.getHeader()})
        .map(res => res.json())

    }
    public updateManagePreDefine(data:any) {
        data.userId = 'USER';
        return this.https.put(this.serviceApi.urlMethod('managePreDefineSMS'),data , {headers: this.getHeader()})
     .map(res => res.json())

    }
    public deleteManagePreDefine(data: any) {
        let body = data;
        let options = new RequestOptions({ 
            body: body,
            headers: this.getHeader()
        });
        return this.https.delete(this.serviceApi.urlMethod('managePreDefineSMS'), options)
        .map(res => res.json())
    }
    // Manage pilot Default Sorting
    public getPilotSortingDetails() {
        return this.https.get(this.serviceApi.urlMethod('pilotSorting'), {headers:this.getHeader()})
        .map(res => res.json());
    }
    public updatePilotSortingDetails(data:any) {
       return this.https.put(this.serviceApi.urlMethod('pilotSortingUpdate'),data, {headers:this.getHeader()})
        .map(res => res.json());
    }

    // manage Pilot snapshot details
    public getManageSnapshot() {
        return this.https.get('assets/data.json', {headers: this.getHeader()})
        .map(res => res.json());
    }
 
    //Manage Pilot Job Status Auto Update Configuration
    public getPilotAutoConfigDetails (){
        return this.https.get(this.serviceApi.urlMethod('pilotAutoUpdate'), {headers: this.getHeader()})
        .map(res => res.json())
    }
    public getPilotAutoDetails (){
        return this.https.get(this.serviceApi.urlMethod('pilotGrouping'), {headers: this.getHeader()})
        .map(res => res.json())
    }
    public pilotJobStatus (){
        return this.https.get(this.serviceApi.urlMethod('pilotJobStatusOriginalDetails'), {headers: this.getHeader()})
        .map(res => res.json())
    }
    public getpilotJobUpdateStatus (data:any){
        let url = `${this.serviceApi.urlMethod('pilotJobUpdateStatus')}/${data}`;
        return this.https.get(url, {headers: this.getHeader()})
        .map(res => res.json())
    }
    public createPilotAutoConfig (data: any){
        data.userId = 'SYSTEM';
        return this.https.post(this.serviceApi.urlMethod('createPoiltJobStatus'),data , {headers: this.getHeader()})
        .map(res => res.json())
    }
    public updatePilotAutoConfig (data: any){
        data.userId = 'SYSTEM';
        return this.https.put(this.serviceApi.urlMethod('updatePilotJobStatus'),data , {headers: this.getHeader()})
        .map(res => res.json())
    }
    
    public deletPilotAutoConfig (data:any){
        let body = data;
        let options = new RequestOptions({ 
            body: body,
            headers: this.getHeader()
        });
        return this.https.delete(this.serviceApi.urlMethod('deletePilotJobStatus'), options)
        .map(res => res.json())
    }


     
    //Manage pilot job sector config
    public getManagePilotSector(data:any){
       // let url = `${this.serviceApi.urlMethod('managePreDefineSMS')}/${data.moduleCode}`;
        return this.https.get('assets/data.json', { headers: this.getHeader() })
        .map(res => res.json())
    }

    public createManagePilotSector(data:any) {
        data.userId = 'USER';
        return this.https.post(this.serviceApi.urlMethod('managePreDefineSMS'),data , {headers: this.getHeader()})
        .map(res => res.json())

    }
    public updateManagePilotSector(data:any) {
        data.userId = 'USER';
        return this.https.put(this.serviceApi.urlMethod('managePreDefineSMS'),data , {headers: this.getHeader()})
     .map(res => res.json())

    }
    public deleteManagePilotSector(data: any) {
        let body = data;
        let options = new RequestOptions({ 
            body: body,
            headers: this.getHeader()
        });
        return this.https.delete(this.serviceApi.urlMethod('managePreDefineSMS'), options)
        .map(res => res.json())
    }

    private getHeader() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }
}

@Injectable()
export class AdminServices {
    constructor(private http: Http, private serviceApi: ServiceApi){}
    // Get data for constraits
    public getHardSoftConstraints (value){
        let url = `${this.serviceApi.urlMethod('constraints')}/${value}`;
        return this.http.get(url, {headers: this.getHeader()})
        .map(res => res.json())
        // return this.http.get(this.serviceApi.urlMethod('constraints'), {headers: this.getHeader()})
        // .map(res => res.json())
    }
    // PUT request for constraits
    public putHardSoftConstraints (val: any){
        if (val.engineValidation) {
          val.engineValidation = 'Y';
        } else if (val.engineValidation == false){
            val.engineValidation = 'N';
        }
        if (val.systemValidation) {
            val.systemValidation = 'Y';
        } else if (val.systemValidation == false) {
            val.systemValidation = 'N';
        }
        console.log('put service',val);
        val.userId='USER';
        // let boolData = JSON.parse(JSON.stringify(val))
        return this.http.put(this.serviceApi.urlMethod('constraints'),val, {headers: this.getHeader()})
        .map(res => res.json())
    }
    private getHeader() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }
}