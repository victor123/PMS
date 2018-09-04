import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PsdsService } from '../../../services/psds.service';
@Component({
  selector: 'app-pilot',
  templateUrl: './pilot.modal.html',
  styleUrls: ['./pilot.modal.css']
})
export class PilotdetailsComponent implements OnInit {
  @Input() pilotopened: any;
  basedetails: any;
  @Input() pilotdetails: any;
  @Input() Editspecial:any;
  @Input() operationalReadinessIndicator:any;
  @Output() Pioltdatasave = new EventEmitter < any > ();
  @Output() close = new EventEmitter < any > ();
  @Output() saveList = new EventEmitter < any > ();
  ujEdit:boolean=false;
  logopen:boolean;
  pilotdet:any[];
  pioltdata:any[]
  ujdetials:any[];
  ujopen:boolean=false;
  constructor(public services: PsdsService) { }
  
  ngOnInit() {
    this.services.getbasedetails().subscribe(res=>{
      this.basedetails=res;
    })
  }
  deleteun(val)
  {
  	this.logopen=true;
    this.pioltdata=val;
    console.log(val)
  }
  sPioltdata(event)
  {
  		
  }
  sPioltdaa(event)
  {
  		this.Pioltdatasave.emit(this.pilotdetails);
  }
  changeoperationalReadinessIndicator(val) {
    if (val === true) this.pilotdetails['operationalReadinessIndicator'] = "Y";
    else this.pilotdetails['operationalReadinessIndicator'] = "N";
  }
  saveData(jobs)
  {

  	console.log(jobs,this.Editspecial)
  		this.saveList.emit(jobs);
  		this.Editspecial=0
  }
  closepilot()
  {
      this.close.emit(event);
      //this.Form.reset();
  }
  closee()
  {
    this.ujopen=false;
    
  }
  openuj(pilots)
  {
    this.ujdetials=pilots
    this.ujopen=true;
    this.pilotdet=this.pilotdetails
    this.ujEdit=true;
    console.log(pilots)
  }
  closeDelete()
  {
  	this.logopen=false;
  }
  deleteuns()
  {
  		this.services.deleteuns(this.pioltdata).subscribe(val=>console.log(val))
  }
}
