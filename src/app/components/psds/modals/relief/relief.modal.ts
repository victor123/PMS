import { Component, OnInit, Input, Output,OnChanges, EventEmitter } from '@angular/core';
import { PsdsService } from '../../../../services/psds.service';
import { Validators, FormGroup, FormControl,FormBuilder } from '@angular/forms';
@Component({
  selector: 'relief-modal',
  templateUrl: './relief.modal.html',
  styleUrls: ['./relief.modal.css']
})
export class Reliefmodal implements OnInit,OnChanges {

  @Input() open: any;
  @Input() edit:any;
  @Input() data:any;
  
  @Output() close = new EventEmitter < any > ();
  @Output() save = new EventEmitter < any > ();
min:any;
max:any;
  onprompt:any;
status:any;
EMessage:any;
errormessage:any;
  logopen:boolean;
  pioltdata:any[]

  constructor(public fg:FormBuilder,public services: PsdsService) {}
    public Form = this.fg.group({
        jobId:[''],
        reliefJobRemarks:['', Validators.required],
        reliefLocation:[null, Validators.required],
        reliefTime:[null],
        userId:['system'],

    });
  ngOnInit() {
  }
  ngOnChanges() {
    if(this.data)
    {

      this.Form.controls['jobId'].setValue(this.data.jobId)
      this.min=this.data.start
      this.max=this.data.end

    }
  }


  onSave(data)
  {
      console.log(data)
      this.services.getreliefjobs(data).subscribe((res) => {
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
        }
        else {
          this.errormessage = "Updated Successfully"
          this.onprompt = true;
          this.EMessage = "Success"
          this.status = "S"

        }
      })
  }
closealert(){
  this.onprompt=false
}
  closemodal()
  {
      this.close.emit(event);
      this.Form.reset();
  }
}
