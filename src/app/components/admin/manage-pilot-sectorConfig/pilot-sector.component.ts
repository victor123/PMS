import { Component, OnInit, AfterContentInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridComponent, GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { process, State } from '@progress/kendo-data-query';
import { PilotSectorConfig } from '../../../shared/modals/form.model';
import { EditService } from '../../../services/admin.service';

@Component({
    selector: 'pilotsector-layout',
    templateUrl: './pilot-sector.component.html',
    styleUrls: [],
    providers: [EditService]
})
export class PilotSectorComponent {
    public manage: GridDataResult;
    public pageSizes: boolean = true;
    public popupHead: string;
    public popupCont: string;
    public opened: boolean;
    public girdData: any[] = [];
    private editedRowIndex: number;
    private editedProduct: PilotSectorConfig;
    public state: State = {
        skip: 0,
        take: 10,
        filter: {
            logic: "and",
            filters: []
        }
    };
    public staticData: Object = {
        moduleCode:'PSDS',
        prefix: 'SMS'
    }

    constructor(private services: EditService, private dialogService: DialogService) { }


    public ngOnInit() {
        this.loadSectorData(this.staticData);
      
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
    public checkData: any[] = [];
    public checkChange(ev: any, data: any) {
        if (ev.target.checked) {
            this.checkData.push(data);
        } else {
            this.checkData.splice(this.checkData.indexOf(data), 1);
        }
    }

    public loadSectorData(staticData: any) {
        this.services.getManagePilotSector(this.staticData)
            .subscribe(res => {
                this.girdData = res;
                this.manage = process(res, this.state);
            })
    }
    public addHandler({ sender }) {
        this.closeEditor(sender);

        sender.addRow(new PilotSectorConfig());
    }
    public editHandler({ sender, rowIndex, dataItem }) {
        this.closeEditor(sender);

        this.editedRowIndex = rowIndex;
        this.editedProduct = Object.assign({}, dataItem);

        sender.editRow(rowIndex);
    }
    public cancelHandler({ sender, rowIndex }) {
        this.loadSectorData(this.staticData);
        this.closeEditor(sender, rowIndex);
    }

    public saveHandler({ sender, rowIndex, dataItem, isNew }) {
        dataItem.moduleCode ="PSDS";
        sender.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.editedProduct = undefined;
        if (rowIndex >= 0) {
            dataItem.check = false;
            this.services.updateManagePilotSector(dataItem)
                .subscribe(res => {
                    if (res.status == 'S') {
                        this.popupHead = 'Success';
                        this.popupCont = res.data[0].response;
                        // this.showConfirmation();
                        this.loadSectorData(this.staticData);
                    } else {
                        this.popupHead = 'Failed';
                        this.popupCont = res.data[0].response;
                        this.showConfirmation();
                    }
                })
        } else {
            dataItem.check = false;
            this.services.createManagePilotSector(dataItem)
                .subscribe(res => {
                    if (res.status == 'S') {
                        this.popupHead = 'Success';
                        this.popupCont = res.data[0].response;
                        // this.showConfirmation();
                        this.loadSectorData(this.staticData);
                    } else {
                        this.popupHead = 'Failed';
                        this.popupCont = res.data[0].response;
                        this.showConfirmation();
                    }
                })
        }
    }

    public onStateChange(state: State) {
        this.state = state;
        // this.editService.read();
    }
    private closeEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
    }
    public deleteVal: any;
    public removeHandler({dataItem}) {
        this.opened = true;
        this.deleteVal = dataItem;
    }
    public deletePreDefine() {
        this.deleteVal = this.checkData;
        if (this.deleteVal.length != 0) {
            this.opened = true;
        }
        console.log(" multiD::", this.deleteVal)
    }


    public checkNew: boolean;
    public close(status) {
      
        this.checkNew = false;

        let data = [];
        // data.push(this.deleteVal.reasonCode);
        if (this.deleteVal.length == undefined) {
            data.push(this.deleteVal.configId);
            this.deleteVal.check = true;
           
        } else {
            this.deleteVal.forEach(key => {
                data.push(key.configId);
                key.check = false;
            })

        }
        if (status == 'yes') {
            this.services.deleteManagePilotSector(data)
                .subscribe(res => {
                    if (res.status == 'S') {
                        this.loadSectorData(this.staticData);
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
            this.checkNew = false;
            this.opened = false;
            this.checkData = [];
            data = [];
            this.deleteVal = [];

        }
    }

  public onlyNumberKey(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }

  }
    
    public dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.manage = process(this.girdData, this.state);

    }

}
