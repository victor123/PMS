import { Component, OnChanges, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PsdsService } from '../../../services/psds.service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-uj',
  templateUrl: './uj.modal.html',
  styleUrls: ['./uj.modal.css']
})
export class UJModal implements OnChanges,OnInit {
  @Input() ujopen :any;
  basedetails :any;
  reasaonCode :any;
  @Input() pilotdet:any;
  @Input() ujdetials :any;
  @Output() ujSave = new EventEmitter<any>();
  @Output() closee = new EventEmitter<any>();
  Pilotdata: FormGroup;
  pilots:any={ "availId":"", 
  "staffRecordId":"", 
  "reasonCode":"", 
  "remarksText":"", 
  "start":new Date(), 
  "end":new Date(), 
  "baseCode":"", 
  "adviceCode":"" };
  onprompt:any;
  status:any;
  EMessage:any;
  errormessage:any;
  @Input() edit:boolean;
  constructor(public services: PsdsService,public fg:FormBuilder) {
       this.Pilotdata=this.fg.group({
         unAvailId:[""],
         availId:[""],
         staffRecordId:[""],
         reasonCode:["",Validators.required],
         remarksText:["",Validators.required],
         start:[this.services.get5minsTime()],
         end:[this.services.get5minsTime()],
         baseCode:["",Validators.required],

       })
   }
   ngOnInit(){
    this.services.getbasedetails().subscribe((res) => {
      this.basedetails = res
    })
    this.services.reasonCodes().subscribe((res) => {
      this.reasaonCode = res
    })
   }
  ngOnChanges() {
    console.log(this.pilotdet,
      this.ujdetials,
      this.ujSave,
      this.edit)
  	if(this.edit==true)
  	{
        this.Pilotdata.patchValue(this.ujdetials)
        console.log(this.Pilotdata.value)
  	}
  }
  close()
  {


  	this.closee.emit();
  }
  saveunjobs()
  {
    var un=this.Pilotdata.value
    console.log(un)
    if(!this.edit)
  	{   un.staffRecordId=this.pilotdet.staffRecordId;
        un.availId=this.pilotdet.pilotAvailId;
        this.services.unavilslots(un).subscribe(res=>{
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
    else
  	this.services.updateunavilslots(un).subscribe(res=>{
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
  closemodal()
  {
      this.closee.emit(event);
      this.Pilotdata.reset();
  }
  closealert()
  {
    this.onprompt=false;
  }

}
