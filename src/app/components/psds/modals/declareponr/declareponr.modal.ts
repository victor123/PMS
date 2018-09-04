import { Component, OnInit, Input, Output,OnChanges, EventEmitter } from '@angular/core';
import { PsdsService } from '../../../../services/psds.service';
import { Validators, FormGroup, FormControl,FormBuilder } from '@angular/forms';
@Component({
  selector: 'declareponr-modal',
  templateUrl: './declareponr.modal.html',
  styleUrls: ['./declareponr.modal.css']
})
export class Declareponrmodal implements OnInit,OnChanges {
  @Input() open: any;
  @Input() edit: any;
  @Input() data: any;
  @Output() close = new EventEmitter < any > ();
  @Output() save = new EventEmitter < any > ();
  min: any;
  max: any;
  onprompt: any;
  status: any;
  EMessage: any;
  @Input() time:any;
  errormessage: any;
  logopen: boolean;
  pioltdata: any[]
  constructor(public fg: FormBuilder, public services: PsdsService) {}
  public Form = this.fg.group({
    jobId: [''],
    dateTime: [null],
    isPonrUndoRequired: [false],
    remarks: ['',Validators.required],
    userId: ['system'],
  });

  ngOnInit() {}
  ngOnChanges() {
    console.log(this.time,this.open)
    if (this.data!=undefined && this.open) {
      this.Form.controls['jobId'].setValue(this.data.jobId)
      // var time=this.time.split(" ")
      // var data=time[2].split("/")
      // console.log(time[2]+":"+time[3],new Date(data+":"+time[3]))
      this.Form.controls['dateTime'].setValue(new Date(this.time.time))
      this.Form.controls['isPonrUndoRequired'].setValue(this.time.val)
      this.min = this.data.start
      this.max = this.data.end
    }
  }
  onSave(data) {
    console.log(data)
    this.services.saveponr(data).subscribe((res) => {
      if (res.status == "F") {
        this.onprompt = true;
        this.status = "F";
        var error = res.data;
        var data = []
        error.map((val, index) => {
          data[index] = val.response.split('::')
        })
        this.EMessage = "Error"
        this.errormessage = data;
      } else {
        this.errormessage = "Updated Successfully"
        this.onprompt = true;
        this.EMessage = "Success"
        this.status = "S"
      }
    })
  }
  closealert() {
    if(this.status = "F")
    {
      this.onprompt = false
      this.closemodal()
    }
    else
    {
      this.onprompt = false
    }
  }
  closemodal() {
    this.close.emit(event);
    
    this.Form.reset();
    this.Form.controls['remarks'].setValue("")
  }
}
