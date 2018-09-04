import { Component, OnInit , AfterContentInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GridComponent, GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
import {  DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { process, State, aggregateBy } from '@progress/kendo-data-query';


import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';

import { PilotDelayCodeModel } from '../../../shared/modals/form.model';
import { EditService } from '../../../services/admin.service';
/**
* This class represents the toolbar component.
*/
@Component({
	selector: 'unavailable-reason',
	templateUrl: './unavailable-reason.component.html',
	styleUrls: [],
	providers:[EditService]
})
export class UnavailableReasonComponent {
	public delay: GridDataResult;
	private editedRowIndex: number;
    private editedProduct: PilotDelayCodeModel;
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
    constructor( private services: EditService, private dialogService: DialogService) {}

    public ngOnInit() {
       this.getUnavailableReason();
    }

    public getUnavailableReason(){
        let value = 'PSDS'
    	this.services.getUnavailableReasonDetails(value)
    	.subscribe(res => {
    		this.girdData = res;
    		this.delay = process(res, this.state);
    		console.log(res);
    	})
    }
    public addHandler({sender}) {
        this.closeEditor(sender);
        this.editable = false;
        sender.addRow(new PilotDelayCodeModel());
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
        this.editedRowIndex = undefined;
        this.editedProduct = undefined;
        dataItem.moduleCode = 'PSDS';
    	if (rowIndex >= 0) {
            this.services.updateUnavailableReason(dataItem)
            .subscribe(res => {
                if (res.status == 'S') {
                	console.log(res.status);
                   this.popupHead = 'Success';
                   this.popupCont = res.data[0].response;
                   // this.showConfirmation();
                   this.getUnavailableReason();
                } else {
                   this.popupHead = 'Failed';
                   this.popupCont = res.data[0].response;
                   this.showConfirmation();
                }
            })
        } else {
            this.services.createUnavailableReason(dataItem)
            .subscribe(res => {
                console.log(res.status);
                if (res.status == 'S') {
                   this.popupHead = 'Success';
                   this.popupCont = res.data[0].response;
                   // this.showConfirmation();
                   this.getUnavailableReason();
                } else {
                   this.popupHead = 'Failed';
                   this.popupCont = res.data[0].response;
                   this.showConfirmation();
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
    public showConfirmation() {
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
    public checkNew:boolean;
    public close(status) {
      console.log(`Dialog result: ${status}`);
        let data = [];
        // data.push(this.deleteVal.reasonCode);
        if (this.deleteVal.length == undefined) {
            data.push(this.deleteVal.reasonCode);
            this.deleteVal.check = false;
        } else {
            this.deleteVal.forEach(key =>{
                data.push(key.reasonCode);
                key.check = false;
            })
        }
        if (status == 'yes') {
            this.services.deletUnavailableReason(data)
            .subscribe(res => {
                if (res.status == 'S') {
                    this.getUnavailableReason();
                    data = [];
                    this.opened = false;
                    this.popupHead = 'Success';
                    this.popupCont = res.data[0].response;
                    // this.showConfirmation();
                } else {
                    data = [];
                    this.popupHead = 'Failed';
                    this.popupCont = res.data[0].response;
                    this.showConfirmation();
                }
            })
        } else {
            this.opened = false;
            this.deleteVal = [];
            this.checkNew = false;
            this.checkData = [];
        }
    }
    public dataStateChange(state: DataStateChangeEvent): void {
	    this.state = state;

	    this.delay = process(this.girdData,this.state);
	    console.log(state)
	}

}