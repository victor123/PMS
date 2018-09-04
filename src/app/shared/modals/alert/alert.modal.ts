import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { JobDemandModel } from '../form.model';

@Component({
    selector: 'alert-modal',
    styles: [
        "input[type=text] { width: 100%; } .form-group.text_bx.col-md-12 {width: 96%;}"
    ],

    templateUrl: './alert.modal.html',
})
export class AlertModal implements OnChanges {



    @Input() public open: boolean;
    @Input() public status: any;
    @Input() public error: any;
    @Output() close = new EventEmitter<any>();
    ngOnChanges(changes: SimpleChanges) {


    }
    closemodal() {
        this.close.emit();
    }

}
