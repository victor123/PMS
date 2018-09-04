import { Component, Input, Output, EventEmitter, OnInit,OnChanges } from '@angular/core';
import { Validators, FormGroup,AbstractControl, FormControl,FormBuilder } from '@angular/forms';
import { PsdsService } from '../../../services/psds.service';
import { JobDemandModel } from '../form.model';
let that;
@Component({
    selector: 'job-grid-form',
    styles: [
    "input[type=text] { width: 100%; } .form-group.text_bx.col-md-12 {width: 96%;}"
    ],

    templateUrl: './jobDetailsPopup.component.html',
})
export class JobFormComponent implements OnChanges,OnInit {
    basedetails:any;
    priorityCodes:any;
    constructor(public fg:FormBuilder,public services: PsdsService){}
    public editForm = this.fg.group({
        'vesselName': [""],
        'height': ["", [Validators.required, Validators.minLength(1),Validators.maxLength(999)]],
        'vesselDraft': [""],
        'cst': [""],
        'srt':[""],
        'orderNumber': [""],
        'jobType': [""],
        'locationFromCode': [""],
        'locationToCode': ['', Validators.required],
        'jobsat':[""],
        'jobStatus':[""],
        'status': [""],
        'piloTLicenceCode': [""],
        'deployDate': ['', [Validators.required, this.ValidatedeployDate]],
        'typeCode':[""],
        'arriveDate': ['', [Validators.required, this.ValidatearriveDate]],
        'onBoardDate': ['', [Validators.required, this.ValidateonBoardDate]],
        'remarks': [""],
        'vesselId': [""],
        'vesselType': [""],
        'pilotCode': [""],
        'vesselMMSINumber': [""],
        'startDateTime': ['', [Validators.required, this.ValidatestartDateTime]],
        'endDateTime': ['', [Validators.required, this.ValidateendDateTime]],
        'agentContactNumber': [""],
        'start': [""],
        'end': [""],
        'efficativeCST': ['', Validators.required],
        'priorityCode': ['', Validators.required],
        'priorityCategoryName': [""],
        'agentContactName': [""],
        'vesselGRT': [""],
        'contDetail': [""]
    });
    ValidateefficativeCST(control: AbstractControl)
    {
        if(that)
        {
            if(new Date(that.editForm.value['arriveDate']).getTime()<=new Date(control.value).getTime())
            {
                return {arriveDate:false,onBoardDate:true, startDateTime:true,endDateTime:true}
            }
            if(new Date(that.editForm.value['onBoardDate']).getTime()<=new Date(control.value).getTime())
            {
                return {onBoardDate:false,arriveDate:true, startDateTime:true,endDateTime:true}
            }
            if(new Date(that.editForm.value['startDateTime']).getTime()<=new Date(control.value).getTime())
            {
                return {startDateTime:false,onBoardDate:true, arriveDate:true,endDateTime:true}
            }
            if(new Date(that.editForm.value['endDateTime']).getTime()<=new Date(control.value).getTime())
            {
                return {endDateTime:false,startDateTime:true,onBoardDate:true, arriveDate:true}
            }
        }
        return {  arriveDate:true, onBoardDate:true, startDateTime:true,endDateTime:true };
    }
    ValidatedeployDate(control: AbstractControl)
    {
        if(that)
        {
              console.log(control)
            console.log(new Date(control.value).getTime(),new Date(that.editForm.value['deployDate']).getTime(),new Date(that.editForm.value['onBoardDate']).getTime()
            ,new Date(that.editForm.value['arriveDate']).getTime(),new Date(that.editForm.value['startDateTime']).getTime())
          
          
            if(new Date(that.editForm.value['arriveDate']).getTime()<=new Date(control.value).getTime())
            {
                return {arriveDate:false,onBoardDate:true, startDateTime:true,endDateTime:true}
            }
            if(new Date(that.editForm.value['onBoardDate']).getTime()<=new Date(control.value).getTime())
            {
                return {onBoardDate:false,arriveDate:true, startDateTime:true,endDateTime:true}
            }
            if(new Date(that.editForm.value['startDateTime']).getTime()<=new Date(control.value).getTime())
            {
                return {startDateTime:false,onBoardDate:true, arriveDate:true,endDateTime:true}
            }
            if(new Date(that.editForm.value['endDateTime']).getTime()<=new Date(control.value).getTime())
            {
                return {endDateTime:false,startDateTime:true,onBoardDate:true, arriveDate:true}
            }
        }
        return {  arriveDate:true, onBoardDate:true, startDateTime:true,endDateTime:true };
    }
    ValidatearriveDate(control: AbstractControl)
    {
        if(that)
        {
            if(new Date(that.editForm.value['onBoardDate']).getTime()<=new Date(control.value).getTime())
            {
                return {onBoardDate:false, startDateTime:true,endDateTime:true}
            }
            if(new Date(that.editForm.value['startDateTime']).getTime()<=new Date(control.value).getTime())
            {
                return {startDateTime:false,onBoardDate:true,endDateTime:true}
            }
            if(new Date(that.editForm.value['endDateTime']).getTime()<=new Date(control.value).getTime())
            {
                return {endDateTime:false,startDateTime:true,onBoardDate:true}
            }
        }
        return { onBoardDate:true, startDateTime:true,endDateTime:true };
    }
    ValidateonBoardDate(control: AbstractControl)
    {
        if(that)
        {
            if(new Date(that.editForm.value['arriveDate']).getTime()<=new Date(control.value).getTime())
            {
                return {arriveDate:false,deployDate:true, startDateTime:true,endDateTime:true}
            }
            if(new Date(that.editForm.value['deployDate']).getTime()<=new Date(control.value).getTime())
            {
                return {deployDate:false, startDateTime:true,endDateTime:true,arriveDate:true}
            }
            if(new Date(that.editForm.value['startDateTime']).getTime()<=new Date(control.value).getTime())
            {
                return {startDateTime:false,deployDate:true,endDateTime:true,arriveDate:true}
            }
            if(new Date(that.editForm.value['endDateTime']).getTime()<=new Date(control.value).getTime())
            {
                return {endDateTime:false,startDateTime:true,deployDate:true,arriveDate:true}
            }
        }
        return { deployDate:true, startDateTime:true,endDateTime:true,arriveDate:true };
    }
    ValidatestartDateTime(control: AbstractControl)
    {
        if(that)
        {
            if(new Date(that.editForm.value['onBoardDate']).getTime()<=new Date(control.value).getTime())
            {
                return {onBoardDate:false,arriveDate:true, deployDate:true,endDateTime:true}
            }
            if(new Date(that.editForm.value['deployDate']).getTime()<=new Date(control.value).getTime())
            {
                return {deployDate:false, endDateTime:true,arriveDate:true,onBoardDate:true}
            }
            if(new Date(that.editForm.value['arriveDate']).getTime()<=new Date(control.value).getTime())
            {
                return {arriveDate:false,onBoardDate:true,endDateTime:true,deployDate:true}
            }
            if(new Date(that.editForm.value['endDateTime']).getTime()<=new Date(control.value).getTime())
            {
                return {endDateTime:false,arriveDate:true,onBoardDate:true,deployDate:true}
            }
        }
        return { onBoardDate:true, arriveDate:true,endDateTime:true,deployDate:true };
    }
    ValidateendDateTime(control: AbstractControl)
    {
         if(that)
        {
            if(new Date(that.editForm.value['deployDate']).getTime()<=new Date(control.value).getTime())
            {
                return {deployDate:false, startDateTime:true,arriveDate:true,onBoardDate:true}
            }
            if(new Date(that.editForm.value['onBoardDate']).getTime()<=new Date(control.value).getTime())
            {
                return {onBoardDate:false, arriveDate:true,startDateTime:true,deployDate:true}
            }
            if(new Date(that.editForm.value['arriveDate']).getTime()<=new Date(control.value).getTime())
            {
                return {arriveDate:false,onBoardDate:true,startDateTime:true,deployDate:true}
            }
            if(new Date(that.editForm.value['startDateTime']).getTime()<=new Date(control.value).getTime())
            {
                return {startDateTime:false,arriveDate:true,onBoardDate:true,deployDate:true}
            }
        }
        return { onBoardDate:true, arriveDate:true,startDateTime:true,deployDate:true };
    }
    public active: boolean = false;
    @Input() public isNew: boolean = false;
    public edit: boolean = false;
    @Input() public model 
    @Output() openEmit: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<any> = new EventEmitter();
    public CstMin:any=new Date();
    public min;

    ngOnInit(){
        this.min=new Date();
        this.min.setMinutes(this.min.getMinutes() + 10)
        this.services.getbasedetails().subscribe((res) => {
            this.basedetails = res
      })
      this.services.getpriorityCodes().subscribe((res)=>{
            this.priorityCodes=res;
      })

      //.setMinutes(j.getMinutes() + 10)
      //this.editForm.disable();
    }
    ngOnChanges()
    {
        that=this
        if(this.model!==undefined)
        {
            if(this.model.srt!==undefined)
            {
                let CstMin=new Date(this.model.cst)
                CstMin.setMinutes(CstMin.getMinutes() + 10)
                this.CstMin=CstMin;
            }
            else
            {
                let CstMin=new Date()
                CstMin.setMinutes(CstMin.getMinutes() + 10)
                this.CstMin=CstMin;
            }
            this.editForm.patchValue(this.model)
        }
        else
        {
            let CstMin=new Date()
            CstMin.setMinutes(CstMin.getMinutes() + 10)
        }
    }
    public onSave(e): void {
         
        this.save.emit(this.model);
        this.active = false;
    }
    public onCancel(e): void {
        this.editForm.reset();
        this.editForm.disable();
        this.edit=false;
        this.closeForm();
    }
    public closeForm(): void {
        this.active = false;
        this.cancel.emit();
        console.log(this.active);
    }
    public editforms()
    {
        this.editForm.enable();

        this.edit=true;
    }
    open(event) {
        this.openEmit.emit(event)
    }
}