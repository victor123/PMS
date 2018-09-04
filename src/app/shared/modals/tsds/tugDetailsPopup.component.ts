import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { TsdsModel } from '../form.model';

@Component({
    selector: 'kendo-tsds-form',
    styles: [
    "input[type=text] { width: 100%; } .form-group.text_bx.col-md-12 {width: 96%;}"
    ],

    templateUrl: './tugDetailsPopup.component.html',
})
export class TsdsFormComponent {
    public editForm = new FormGroup({
        'orderNumber': new FormControl(),
        'jobType': new FormControl(),
        'priorityCode': new FormControl(),
        'tugRequirement': new FormControl(),
        'tugOrderSRT': new FormControl(),
        'locationFrom': new FormControl(),
        'locationTo': new FormControl(),
        'pickupPoint': new FormControl(),
        'letGoPoint': new FormControl(),
        'confirmationIndicator': new FormControl(),
        'containerJobIndicator': new FormControl(),
        'tugOrderRemarks': new FormControl(),
        'pilotOrderRemarks': new FormControl(),
        'vesselId': new FormControl(),
        'callSign': new FormControl(),
        'vesselName': new FormControl(),
        'vesselType': new FormControl(),
        'grossTonnage': new FormControl(),
        'vesselHeight': new FormControl(),
        'vesselDraft': new FormControl(),
        'assignedTugNumber': new FormControl(),
        'tugName': new FormControl(),
        'jobDuration': new FormControl(),
        'status': new FormControl(),
        'deployedTime': new FormControl(),
        'ontheMoveTime': new FormControl(),
        'arriveTime': new FormControl(),
        'startTime': new FormControl(),
        'endTime': new FormControl(),
        'effectiveSRT': new FormControl(),
        'specialJobIndicator': new FormControl(),
        'company': new FormControl(),
        'specialTextField': new FormControl(),
        'pilotCode': new FormControl(),
        'pilotJobCST': new FormControl(),
        'pilotOnboardLocation': new FormControl(),
        'jobStatus': new FormControl(),
        'loa': new FormControl(),
        'tonrindicator': new FormControl()

    });

    public active: boolean = false;
    @Input() public isPsds: boolean = false;

    @Input() public set model(jobDemandModel: TsdsModel) {
        this.editForm.reset(jobDemandModel);

        this.active = jobDemandModel !== undefined;
    }

    @Output() openEmit: EventEmitter<any> = new EventEmitter();

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<TsdsModel> = new EventEmitter();

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
    public isOrder: boolean=true;
    public isVessel: boolean= false;
    public isTug: boolean= false;
    public isPilot: boolean= false;
}