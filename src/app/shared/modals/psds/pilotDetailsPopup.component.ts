import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { JobDemandModel } from '../form.model';

@Component({
    selector: 'kendo-psds-form',
    styles: [
    "input[type=text] { width: 100%; } .form-group.text_bx.col-md-12 {width: 96%;}"
    ],

    templateUrl: './pilotDetailsPopup.component.html',
})
export class PsdsModalFormComponent {
    public editForm = new FormGroup({
        'orderNo': new FormControl(),
        'jobType': new FormControl(),
        'priorityCode': new FormControl(),
        'effectiveCST': new FormControl(),
        'plannedStartTime': new FormControl(),
        'plannedEndTime': new FormControl(),
        'locationToCode': new FormControl(),
        'locationFromCode': new FormControl(),
        'customerName': new FormControl(),
        'agentContactDetails': new FormControl(),
        'customerAgentName': new FormControl(),
        'status': new FormControl(),
        'pilotLicense': new FormControl(),
        'deployedTime': new FormControl(),
        'arrivedTime': new FormControl(),
        'onboardTime': new FormControl(),
        'startTime': new FormControl(),
        'endTime': new FormControl(),
        'remarksText':new FormControl(),
        'vesselId': new FormControl(),
        'vesselName': new FormControl(),
        'vesselTypeCode': new FormControl(),
        'grossTonnage': new FormControl(),
        'draft': new FormControl(),
        'height': new FormControl(),
        'pilotCode': new FormControl(),
        'srt': new FormControl(),
        'cst': new FormControl(),
        'mmsi': new FormControl(),
        'contDetail': new FormControl()
    });

    public active: boolean = false;
    @Input() public isNew: boolean = false;

    @Input() public set model(jobDemandModel: JobDemandModel) {
        this.editForm.reset(jobDemandModel);

        this.active = jobDemandModel !== undefined;
    }

    @Output() openEmit: EventEmitter<any> = new EventEmitter();

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<JobDemandModel> = new EventEmitter();

    public onSave(e): void {
        e.preventDefault();
        this.save.emit(this.editForm.value);
        this.active = false;
    }

    public onCancel(e): void {
        e.preventDefault();
        this.closeForm();
    }

    public closeForm(): void {
        this.active = false;
        this.cancel.emit();
        console.log(this.active);
    }

    open(event) {
        this.openEmit.emit(event)
    }
}