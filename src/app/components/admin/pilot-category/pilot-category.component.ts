import { Component, OnInit , AfterContentInit, Inject, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GridComponent, GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
import {  DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { process, State, aggregateBy } from '@progress/kendo-data-query';


import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';

import { ServiceLevelConfigModel } from '../../../shared/modals/form.model';
import { EditService } from '../../../services/admin.service';

import {ResposeComponentCategory} from './response.modal';
/**
* This class represents the toolbar component.
*/
@Component({
	selector: 'priority-category',
	templateUrl: './pilot-category.component.html',
	styleUrls: [],
	providers:[EditService]
})
export class PilotCategoryComponent {
	public delay: GridDataResult;
	private editedRowIndex: number;
    private editedProduct: ServiceLevelConfigModel;
    public pageSizes: boolean = true;
    public popupHead: string;
    public popupCont: string;
    public opened: boolean;
    public girdData: any[]=[];
    public editable:boolean = true;
    public state: State = {
	    skip: 0,
	    take: 10,
	    filter: {
	      logic: "and",
	      filters: []
	    }
  	};
    public resData: any[] = []; 
    constructor( private services: EditService, private dialogService: DialogService) {}

    public ngOnInit() {
       this.getServicelevelConfig();
    }
    public showConfirmation() {
      const dialog: DialogRef = this.dialogService.open({
          title: 'Changes take place',
          content: ResposeComponentCategory,
          actions: [
              { text: "Close", primary: true }
          ]
      });
      const userInfo = dialog.content.instance;
      userInfo.data = this.resData;
    }
    public showConfirmationError() {
      const dialog: DialogRef = this.dialogService.open({
          title: this.popupHead,
          content: this.popupCont,
          actions: [
              { text: "Close", primary: true }
          ],
          width: 450,
          height: 200,
          minWidth: 250
      });
    }
    public getServicelevelConfig(){
        let value = 'PSDS'
    	this.services.getPriorityConfigDetails()
    	.subscribe(res => {
    		this.girdData = res;
    		this.delay = process(res, this.state);
    		console.log(res);
    	})
    }
    public addHandler({sender}) {
        this.closeEditor(sender);
        this.editable = false;
        sender.addRow(new ServiceLevelConfigModel());
    }
    public editHandler({sender, rowIndex, dataItem}) {
        this.closeEditor(sender);
        this.editable = true;
        this.editedRowIndex = rowIndex;
        this.editedProduct = Object.assign({}, dataItem);

        sender.editRow(rowIndex);
    }
   	public cancelHandler({sender, rowIndex}) {
        this.closeEditor(sender, rowIndex);
    }
    public saveHandler({sender, rowIndex, dataItem, isNew}) {
    	console.log(dataItem);
        sender.closeRow(rowIndex);
        console.log('isNew', isNew);
        this.editedRowIndex = undefined;
        this.editedProduct = undefined;
     //    dataItem.moduleCode = 'PSDS';
    	if (rowIndex >= 0) {
            this.services.updatePriorityConfig(dataItem)
            .subscribe(res => {
                if (res.length != 0) {
                   this.resData = res;
                   console.log(this.resData);
                   this.showConfirmation();
                   this.getServicelevelConfig();
                } else {
                   // this.popupHead = 'Failed';
                   // this.popupCont = res.data[0].response;
                   // this.showConfirmationError();
                }
            })
        } else {
            this.services.createPriorityConfig(dataItem)
            .subscribe(res => {
                if (res.length != 0) {
                   this.resData = res;
                   console.log(this.resData);
                   this.showConfirmation();
                   this.getServicelevelConfig();
                } else {
                   // this.popupHead = 'Failed';
                   // this.popupCont = res.data[0].response;
                   // this.showConfirmation();
                }
            })
        }
    }
    public onStateChange(state: State) {
        console.log(state);
    }
    
    private closeEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
    }
    public checkData: any[]=[];
    public checkChange(ev: any, data: any){
        if (ev.target.checked) {
            this.checkData.push(data);
            console.log(this.checkData);
        } else {
            this.checkData.splice(this.checkData.indexOf(data),1);
            console.log('uncheck',this.checkData);
        }
    }
    public deleteVal: any;
    public removeHandler({dataItem}) {
        this.opened = true;
        this.deleteVal = dataItem;
    }
    public deleteDelayCode(){
        this.deleteVal = this.checkData;
        console.log(this.deleteVal.length, this.deleteVal);
        if (this.deleteVal.length != 0) {
            this.opened = true;
        }
    }
    public checkNew: boolean;
    public close(status) {
      console.log(`Dialog result: ${status}`);
        let data = [];
        if (this.deleteVal.length == undefined) {
            data.push(this.deleteVal.priorityCode);
            this.deleteVal.check = false;
        } else {
            this.deleteVal.forEach(key =>{
                data.push(key.priorityCode);
                key.check = false;
            })
            console.log('popup forEach',data);
        }
        if (status == 'yes') {
            this.services.deletPriorityConfig(data)
            .subscribe(res => {
                if (res.length != 0) {
                    this.getServicelevelConfig();
                    data = [];
                    this.resData = res;
                    this.opened = false;
                    this.showConfirmation();
                } else {
                    data = [];
                    // this.popupHead = 'Failed';
                    // this.popupCont = res.data[0].response;
                    // this.showConfirmation();
                }
            })
        } else {
            this.opened = false;
            this.deleteVal = [];
            this.checkNew = false;
            this.resData = [];
            this.checkData = [];
        }
    }
    public dataStateChange(state: DataStateChangeEvent): void {
	    this.state = state;

	    this.delay = process(this.girdData,this.state);
	    console.log(state)
	}

}