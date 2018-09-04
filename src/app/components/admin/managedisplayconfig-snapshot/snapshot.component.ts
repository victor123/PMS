import { Component, Inject , OnInit} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import {  DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { process, State, aggregateBy } from '@progress/kendo-data-query';

import { PilotGroupingModel } from '../../../shared/modals/form.model';
import { EditService } from '../../../services/admin.service';

@Component({
  selector: 'snapshot-layout',
  templateUrl: './snapshot.component.html',
  styleUrls: [],
  providers:[EditService]
})
export class ManageConfigSnapshot implements OnInit {
	public view:any[] = [];
    public girdData: GridDataResult;
    public colorData: any[] = [];
    public pilotGroupingList: any [] = [];
    public baseCodesList: any [] = [];
    public shiftTypeList: any [] = [];
    public gridState: State = {
        skip: 0,
        take: 10,
        filter: {
          logic: "and",
          filters: []
        }
      };
    public opened: boolean;
    // private editService: EditService;
    private editedRowIndex: number;
    private editedProduct: PilotGroupingModel;
    public popupHead: string;
    public popupCont: string;
    public check: boolean= false;
    constructor( private editService: EditService, private dialogService: DialogService) {
        // this.editService = editServiceFactory();
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
    public ngOnInit(): void {
        this.loadData();
        // this.getColorDetails();
        // this.getShiftTypeDetails();
        // this.getBaseCodesDetails();
           }

    public loadData (){
        this.checkData = [];
        this.editService.getManageSnapshot()
        .subscribe(data =>{
            // data.forEach(key=> {
            // if(key.autoDeployIndicator == 'Y')  {
            //      key.autoDeployIndicator = true;
            //  } else {
            //      key.autoDeployIndicator = false
            //  }
            // })
            console.log("Grid data",data)
            // this.view = data;
            // data.check = false; 
            this.girdData = process(data, this.gridState);
            
        })
    }
    public onStateChange(state: State) {
        // this.gridState = state;

        // this.editService.read();
        console.log(state);
    }

    public addHandler({sender}) {
        this.closeEditor(sender);

        sender.addRow(new PilotGroupingModel());
    }
    public editHandler({sender, rowIndex, dataItem}) {
        this.closeEditor(sender);
        this.check = false; 
        console.log(sender);
        this.editedRowIndex = rowIndex;
        this.editedProduct = Object.assign({}, dataItem);

        sender.editRow(rowIndex);
    }

    public cancelHandler({sender, rowIndex}) {
        this.closeEditor(sender, rowIndex);
    }
    public colorText: string;
    public saveHandler({sender, rowIndex, dataItem, isNew}) {
        // this.editService.save(dataItem, isNew);
        dataItem.colourName = this.colorText;
        sender.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.editedProduct = undefined;

            if (dataItem.autoDeployIndicator == true) {
                dataItem.autoDeployIndicator = 'Y';
            } else if (dataItem.autoDeployIndicator == false)   {
                dataItem.autoDeployIndicator = 'N';
            }
     

        if ((dataItem.pilotShiftType == 'NORMAL' )|| (dataItem.pilotShiftType == 'N')) {
            dataItem.pilotShiftType = 'N';
        } else {
            dataItem.pilotShiftType = 'S';
        }
        if (rowIndex >= 0) {
            dataItem.check = false;
            this.editService.updatePilotGroup(dataItem)
            .subscribe(res => {
                console.log(res);
                if (res.status == 'S') {
                   this.popupHead = 'Success';
                   this.popupCont = res.data[0].response;
                   this.showConfirmation();
                   this.loadData();
                } else {
                   this.popupHead = 'Failed';
                   this.popupCont = res.data[0].response;
                   this.showConfirmation();
                }
            })
        } else {
            dataItem.check = false;
            this.editService.createPilotGroup(dataItem)
            .subscribe(res => {
                console.log(res);
                if (res.status == 'S') {
                   this.popupHead = 'Success';
                   this.popupCont = res.data[0].response;
                   this.showConfirmation();
                   this.loadData();
                } else {
                   this.popupHead = 'Failed';
                   this.popupCont = res.data[0].response;
                   this.showConfirmation();
                }
            })
        }
    }
    public selectCol(ev: any){
        let selectItem = ev.target['options']
        [ev.target['options'].selectedIndex].text
        this.colorText = selectItem;
        console.log(selectItem);
    }
    public deleteVal: any;
    public removeHandler({dataItem}) {
        // this.editService.remove(dataItem);
        this.opened = true;
        this.deleteVal = dataItem;
        // this.deleteGroup(dataItem);
    }
    public checkData: any[]=[];
    checkChange(ev: any, data: any){
        if (ev.target.checked) {
            this.checkData.push(data);
        } else {
            this.checkData.splice(this.checkData.indexOf(data),1);
            console.log('uncheck',this.checkData);
        }
    }
    // public getColorDetails (){
    //     this.editService.getPilotGroupColourDetails()
    //     .subscribe(res => {
    //         this.colorData = res;
    //     })
    // }
    deleteGroup(){
        this.deleteVal = this.checkData;
        console.log(this.deleteVal.length, this.deleteVal);
        if (this.deleteVal.length != 0) {
            this.opened = true;
        }
        // console.log(putData);
    }
    // public getShiftTypeDetails (){
    //     this.editService.getManageSnapshot()
    //     .subscribe(res => {
    //         this.shiftTypeList = res;
    //     })
    // }
    // public getBaseCodesDetails (){
    //     this.editService.getPilotGroupBaseCodesDetails()
    //     .subscribe(res => {
    //         this.baseCodesList = res;
    //     })
    // }
    private closeEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
        // this.editService.resetItem(this.editedProduct);
        // this.editedRowIndex = undefined;
        this.editedProduct = undefined;
    }
    
    public checkNew:boolean;
    public close(status) {
      console.log(`Dialog result: ${status}`);
        let data = [];
        if (this.deleteVal.length == undefined) {
            data.push(this.deleteVal.deploymentCode);
            this.deleteVal.check = false;
            console.log('IsUndefined', data);
        } else {
            this.deleteVal.forEach(key =>{
                data.push(key.deploymentCode);
                key.check = false;
            })
            console.log('popup forEach',data);
        }
        this.opened = false;
        if (status == 'yes') {
            this.editService.deletPilotGroup(data)
            .subscribe(res => {
                if (res.status == 'S') {
                    this.loadData();
                    data = [];
                    this.opened = false;
                    this.popupHead = 'Success';
                    this.popupCont = res.data[0].response;
                    this.showConfirmation();
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
            this.checkData = [];
            this.checkNew = false;
        }
    }

    public open() {
      this.opened = true;
    }
    public dataStateChange(state: DataStateChangeEvent): void {
        this.gridState = state;

        this.girdData = process(this.view,this.gridState);
        console.log(state)
    }
}
