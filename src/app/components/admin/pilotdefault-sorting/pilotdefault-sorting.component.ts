import { Component, OnInit, AfterContentInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridComponent, GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { process, State, aggregateBy } from '@progress/kendo-data-query';


import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';

import { PilotDelayCodeModel } from '../../../shared/modals/form.model';
import { EditService } from '../../../services/admin.service';
/**
* This class represents the toolbar component.
*/
@Component({
    selector: 'pilotdefault-sorting',
    templateUrl: './pilotdefault-sorting.component.html',
    styleUrls: [],
    providers: [EditService]
})
export class PilotDefaultSortingComponent {
    public delay: GridDataResult;
    private editedRowIndex: number;
    private editedProduct: PilotDelayCodeModel;
    public pageSizes: boolean = true;
    public popupHead: string;
    public popupCont: string;
    public opened: boolean;
    public updateCancelButton: boolean = false;
    public girdData: any[] = [];
    statusMessage: string = 'Data not found';
    checkSwitch: boolean = true;
    @ViewChild('inActive') button

    constructor(private services: EditService, private dialogService: DialogService) {

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
    public ngOnInit() {
        this.getPilotSorting();
    }
    se
    evArrayny: any[] = [];
    public getPilotSorting() {
        let value = 'PSDS';
        this.checkSwitch = true;
        this.services.getPilotSortingDetails()
            .subscribe(res => {
                this.girdData.push(res);
                this.delay = res;
                res.forEach(key => {
                    key.errorbox = false;
                    let data = key.sequenceNumber
                    this.evArrayny.push(data)

                    if (key.enableIndicator == 'Y') {
                        key.enableIndicator = true;
                    } else {
                        key.enableIndicator = false;
                    }
                })

            })
    }


    public cancelHandler({ sender, rowIndex }) {
        this.closeEditor(sender, rowIndex);
    }

    kendoGridData: boolean = true;
    kendoGridEditTemplate: boolean;

    public editContainer(event) {
        this.updateCancelButton = true;
        this.kendoGridData = false;
        this.checkSwitch = false;
        this.kendoGridEditTemplate = true;
    }
    inputs: any[] = [];
    dataItem: any[] = [];
    errorbox: boolean = false;
    formValid: boolean = true;
    filterContent(event: any, index: any, data: any) {
        this.inputs = [];
        this.dataItem = [];
        let array2 = [];
        data.forEach(key => {
            array2.push(Number(key.sequenceNumber));
            this.dataItem.push(Number(key.sequenceNumber));
        });
        this.onChangeValue();
        console.log(this.inputs, data);
        if (this.inputs.length == array2.length) {
            console.log('success');
            this.button.nativeElement.disabled = false;

        } else {
            console.log('Failed');
            this.popupHead = 'Alert';
            this.popupCont = 'Duplicate Sequence Number';
            this.showConfirmation();
            this.button.nativeElement.disabled = true;

        }
    }
    onChangeValue() {
        this.inputs = [];
        this.dataItem.forEach((key, i) => {
            if (this.inputs.indexOf(key) == -1) {
                this.inputs.push(key);
            }
        })
        console.log('this.inputs', this.inputs)
    }
    public saveHandler(event, dataItem) {
        this.inputs = [];
        this.dataItem = [];
        let array1 = [];
        let array2 = [], matches = [];
        array1 = this.evArrayny;
        // console.log('submit', dataItem);
        dataItem.forEach(key => {
            if (key.enableIndicator == true) {
                key.enableIndicator = 'Y';
            } else if (key.enableIndicator == false) {
                key.enableIndicator = 'N';
            }
        })
        this.services.updatePilotSortingDetails(dataItem)
            .subscribe(res => {
                
                if (res.status == 'S') {
                    // console.log("savaData", dataItem);
                    this.popupHead = 'Success';
                    this.popupCont = res.data[0].response;
                    // this.showConfirmation();
                    this.updateCancelButton = false;
                    this.getPilotSorting();
                } else {
                    this.popupHead = 'Failed';
                    this.popupCont = res.data[0].response;
                    this.showConfirmation();
                }
            })
        this.kendoGridData = true;
        this.kendoGridEditTemplate = false;
        this.updateCancelButton = false;
    }

    public cancel(event) {
        this.getPilotSorting();
        this.updateCancelButton = false;
        this.kendoGridEditTemplate = false;
        this.kendoGridData = true;
    }
    public onChangeCheck(ev: boolean) {
        console.log("CheckBoolean", ev)

    }
    public onStateChange(state: State) {
        console.log("state", state);
    }

    private closeEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
    }


}